<template>
  <top-content-bottom-layout :height="height"
                             :width="width">
    <template v-slot:top>
      <div class="flex flex-row justify-between border-b-2 m-2 pb-2"
           ref="title-box">
        <div class="flex flex-col justify-center select-none">场景列表</div>
        <el-button @click="goBack">返回</el-button>
      </div>
    </template>
    <template v-slot:content>
      <div class="m-2">
        <el-form label-position="top">
          <el-form-item label="场景名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="全景图">
            <el-image style="width: 210px; height: 105px"
                      :src="thumbUrl"
                      fit="fill"
                      @click="toggleFileSelectShow()" />
          </el-form-item>
          <!--
          todo 缺场景角度和热点分组的完善
        -->
          <div v-show="type=='update'">
            <el-form-item label="场景角度">
              <el-select>
                <!-- <el-option>默认角度</el-option> -->
              </el-select>
            </el-form-item>
            <el-form-item label="热点分组">
              <el-select>
                <!-- <el-option>交通配套</el-option> -->
              </el-select>
            </el-form-item>
            <el-form-item label="热点">
              <el-select>
                <!-- <el-option>项目地</el-option> -->
              </el-select>
            </el-form-item>
            <el-form-item label="文字"> </el-form-item>
            <el-form-item label="图片"> </el-form-item>
          </div>
        </el-form>
        <file-select-dialog ref="fileSelectDialog"
                            @save="updateForm"
                            type="radio"></file-select-dialog>
      </div>
    </template>
    <template v-slot:bottom>
      <div class="border-t-2 m-2 pt-2">
        <el-button class="w-full"
                   ref="button-box"
                   @click="save">快速保存</el-button>
      </div>
    </template>
  </top-content-bottom-layout>
</template>
<script>
import axios from "axios";
import FileSelectDialog from "@/pages/panorama/dialog/file-select-dialog.vue";
import TopContentBottomLayout from "@/components/layout/top-content-bottom-layout.vue"
import * as MutationType from "@/MutationType"

export default {
  props: {
    uuid: String
  },
  setup () { },
  components: { FileSelectDialog, TopContentBottomLayout },
  mounted () {
    this.form.work_uuid = this.uuid;
    if (this.formData) {
      this.form = Object.assign({}, this.form, this.formData)
    }
  },
  /**
   * uuid 为资源uuid
   * type 为 create 或 edit .
   * formData 如果 type 为 create 则为空对象, 如果为 edit 为 资源对象
   */
  computed: {
    formData () {
      return this.$store.state.panorama.activeScene;
    },
    type () {
      return this.$store.state.rightType;
    },
    access_token () {
      return "";
    },
    http () {
      let http = axios.create({
        timeout: 1000 * 12,
      });
      http.interceptors.request.use((req) => {
        req.headers.Authorization = "Bearer " + this.access_token;
        return req;
      });
      return http;
    },
    thumbUrl () {
      return this.form.thumb ? this.getThumbPath(this.form.thumb) : "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
    }
  },
  methods: {
    // remove () {
    //   this.$store.dispatch("editor/" + MutationType.DELETE_DATA, {
    //     uuid: this.form.uuid
    //   })
    // },
    save () {
      if (this.type == 'edit') {
        this.$store.dispatch("editor/" + MutationType.UPDATE_DATA, this.form);
      } else {
        this.$store.dispatch("editor/" + MutationType.STORE_DATA, this.form);
        this.clearForm();
      }
    },
    goBack () {
      this.$store.commit('setRightType', 'list')
    },
    clearForm () {
      let form = {
        uuid: '',
        work_uuid: "",
        name: "",
        resource_type: 2,
        file_uuid: "",
      };
      if (this.formData) {
        form = Object.assign({}, form, this.formData)
      }
      form.work_uuid = this.uuid;
      this.form = form;
    },
    toggleFileSelectShow () {
      this.$refs.fileSelectDialog.fileSelectShow = true;
    },
    updateForm (form) {
      let that = this;
      axios
        .get("http://192.168.10.10/api/v2/filesystems/" + form.file_uuid)
        .then(function (res) {
          that.form.thumb = res.data.data.file_path
        });
      this.form = Object.assign({}, this.form, form);
    },
    getThumbPath (filePath) {
      return "http://192.168.10.10:9000/alpha-api/" + filePath;
    },
  },
  data () {
    return {
      form: {
        uuid: '',
        work_uuid: "",
        name: "",
        resource_type: 2,
        file_uuid: "",
      },
    };
  },
  watch: {
    type () {
      this.clearForm();
    },
    formData (val) {
      this.form = Object.assign({}, this.form, val)
    },
  },
};
</script>
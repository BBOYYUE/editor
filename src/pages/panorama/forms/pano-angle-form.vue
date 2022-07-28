<template>
  <top-content-bottom-layout :height="height"
                             :width="width">
    <template v-slot:top>
      <div class="flex flex-row justify-between border-b-2 m-2 pb-2"
           ref="title-box">
        <div class="flex flex-col justify-center select-none">场景角度</div>
        <el-button @click="goBack">返回</el-button>
      </div>
    </template>
    <template v-slot:content>
      <div class="m-2">
        <el-form label-position="top">
          <el-form-item label="角度名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="初始角度">
            <div class="flex flex-col w-full">
              <el-button @click="getAngle">获取当前角度</el-button>
              <div class="flex flex-col justify-center my-2 space-y-1 ">
                <div class="flex flex-row">
                  <div class="flex flex-col justify-center w-12">
                    <span>atv:</span>
                  </div>
                  <div class="flex-grow">
                    <el-slider v-model="form.atv"
                               show-stops
                               @change="changeAngle"
                               :max="180" />
                  </div>
                </div>
                <div class="flex flex-row">
                  <div class="flex flex-col justify-center w-12">
                    <span>ath:</span>
                  </div>
                  <div class="flex-grow">
                    <el-slider v-model="form.ath"
                               show-stops
                               @change="changeAngle"
                               :max="180" />
                  </div>
                </div>
                <div class="flex flex-row">
                  <div class="flex flex-col justify-center w-12">
                    <span>fov:</span>
                  </div>
                  <div class="flex-grow">
                    <el-slider v-model="form.fov"
                               show-stops
                               @change="changeAngle"
                               :max="180" />
                  </div>
                </div>
              </div>
              <el-button @click="clearAngle">重置角度</el-button>
            </div>
          </el-form-item>
          <el-form-item label="相机距离范围">
            <el-slider class="mx-3"
                       v-model="distanceMap"
                       range
                       show-stops
                       :min="0"
                       :max="180"
                       @change="changeFovMap" />
          </el-form-item>
          <el-form-item label="水平视野范围">
            <el-slider class="mx-3"
                       v-model="horizontalMap"
                       @change="changeHorizontalMap"
                       range
                       show-stops
                       :min="-180"
                       :max="180" />
          </el-form-item>
          <el-form-item label="垂直视野范围">
            <el-slider class="mx-3"
                       v-model="verticalMap"
                       @change="changeVerticalMap"
                       range
                       show-stops
                       :min="-180"
                       :max="180" />
          </el-form-item>
        </el-form>
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
// import * as MutationType from "@/MutationType";
import TopContentBottomLayout from "@/components/layout/top-content-bottom-layout.vue"
export default {
  components: { TopContentBottomLayout },
  setup () {

  },
  data () {
    return {
      form: {
        uuid: "",
        work_uuid: "",
        resource_type: 7,
        name: "",
        atv: 0,
        ath: 0,
        fov: 120,
        distanceMap: [1, 179],
        horizontalMap: [-179, 179],
        verticalMap: [-179, 179],
      }
    }
  },

  computed: {
    formHeight () {
      return this.width - this.$refs['title-box'].offsetHeight - this.$refs['button-box'].offsetHeight
    },
    prview () {
      return this.$store.state.panorama.activePrview
    }
  },
  mounted () {
    this.form.work_uuid = this.uuid;
    if (this.formData) {
      this.form = Object.assign({}, this.form, this.formData)
    }
  },
  props: { width: String, height: String, uuid: String, type: String },
  methods: {
    // save () {
    //   if (this.type == 'edit') {
    //     this.$store.dispatch("editor/" + MutationType.UPDATE_DATA, this.form);
    //   } else {
    //     this.$store.dispatch("editor/" + MutationType.STORE_DATA, this.form);
    //     this.clearForm();
    //   }
    // },

    getAngle () {
      this.form.ath = this.prview.get('view.hlookat')
      this.form.atv = this.prview.get('view.vlookat')
      this.form.fov = this.prview.get('view.fov')
    },
    changeAngle () {
      this.prview.set('view.hlookat', this.form.ath)
      this.prview.set('view.vlookat', this.form.atv)
      this.prview.set('view.fov', this.form.fov)
    },
    changeHorizontalMap (val) {
      console.log(val, this.form)
      this.form.horizontalMap = val
      this.prview.set('view.limitview', 'range')
      if (this.form.horizontalMap && this.form.horizontalMap[0]) this.prview.set('view.hlookatmin', this.form.horizontalMap[0])
      if (this.form.horizontalMap && this.form.horizontalMap[1]) this.prview.set('view.hlookatmax', this.form.horizontalMap[1])
    },
    changeVerticalMap (val) {
      console.log(val, this.form)
      this.form.verticalMap = val
      this.prview.set('view.limitview', 'range')
      if (this.form.verticalMap && this.form.verticalMap[0]) this.prview.set('view.vlookatmin', this.form.verticalMap[0])
      if (this.form.verticalMap && this.form.verticalMap[1]) this.prview.set('view.vlookatmax', this.form.verticalMap[1])
    },
    changeFovMap (val) {
      console.log(val, this.form)
      this.form.fovMap = val
      this.prview.set('view.limitview', 'range')
      if (this.form.fovMap && this.form.fovMap[0]) this.prview.set('view.fovmin', this.form.fovMap[0])
      if (this.form.fovMap && this.form.fovMap[1]) this.prview.set('view.fovmax', this.form.fovMap[1])
    },
    clearAngle () {
      this.prview.set('view.hlookat', 0)
      this.prview.set('view.vlookat', 0)
      this.prview.set('view.fov', 100)
    },
    clearForm () {
      let form = {
        uuid: "",
        work_uuid: "",
        resource_type: 7,
        name: "",
        atv: 0,
        ath: 0,
        fov: 120,
        distanceMap: [1, 179],
        horizontalMap: [-179, 179],
        verticalMap: [-90, 90],
      };
      if (this.formData) {
        form = Object.assign({}, form, this.formData)
      }
      form.work_uuid = this.uuid;
      this.form = form;
    },
    goBack () {
      this.$store.commit('setRightType', 'list')
    }
  },
  watch: {
    type () {
      this.clearForm();
    },
    formData (val) {
      this.form = Object.assign({}, this.form, val)
    },
  }
}
</script>
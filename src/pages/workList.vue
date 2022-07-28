<template>
  <top-content-bottom-layout>
    <template v-slot:top>
      <div class="flex flex-row justify-between border-b-2 m-2 pb-2"
           ref="title-box">
        <div class="flex flex-col justify-center select-none">我的作品列表</div>
        <el-button @click="()=>{this.createDialogVisible = true}">创建作品</el-button>
      </div>
    </template>
    <template v-slot:content>
      <div class="m-2">
        <el-table class="w-full h-full"
                  :data="workList">
          <el-table-column label="序号"
                           width="180"
                           type="index"
                           index="id" />
          <el-table-column label="作品名称"
                           prop="name" />
          <el-table-column label="作品类型">
            <template #default="scope">
              <div v-if="scope.row.work_type == 1">全景作品</div>
              <div v-else-if="scope.row.work_type == 2">平面作品</div>
              <div v-else>3D模型作品</div>
            </template>
          </el-table-column>
          <el-table-column label="创建日期"
                           prop="created_at" />
          <el-table-column fixed="right"
                           label="选项"
                           width="120">
            <template #default="scope">
              <el-button link
                         type="primary"
                         size="small"
                         @click.prevent="editWork(scope.row.work_type, scope.row.uuid)">
                编辑
              </el-button>
              <el-button link
                         type="primary"
                         size="small"
                         @click.prevent="deleteWork(scope.$index)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog v-model="createDialogVisible"
                   width="450px">
          <template #header>
            创建作品
          </template>
          <el-form label-position="top">
            <el-form-item label="作品名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="作品类型">
              <el-select v-model="form.work_type"
                         class="w-full">
                <el-option v-for="item in workTypeList"
                           :key="item"
                           :label="item.alias"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <template #footer>
            <el-button class="w-full"
                       @click="createWork">创建作品</el-button>
          </template>
        </el-dialog>
      </div>

    </template>
  </top-content-bottom-layout>
</template>
<script>
import * as MutationType from "@/MutationType"
import { mapActions } from 'vuex'
import topContentBottomLayout from '@/components/layout/top-content-bottom-layout.vue'
export default {
  components: { topContentBottomLayout },
  data () {
    return {
      createDialogVisible: false,
      form: {
        name: "",
        work_type: ""
      },
      workTypeList: [
        {
          alias: "平面作品",
          value: 2
        },
        {
          alias: "全景作品",
          value: 1
        },
        {
          alias: "3D模型作品",
          value: 3
        }
      ],
    }
  },
  computed: {
    work () {

      console.log(this.$store.state.work.work)
      return this.$store.state.work.work
    },
    workList () {
      let workList = [];
      for (let item in this.work) {
        workList.push(this.work[item]);
      }
      return workList
    },
  },

  mounted () {
    this[MutationType.GET_LIST]({
      model: "work",
      apiUrl: "http://192.168.10.10/api/v2/works",
    })
    return this.$store.state.work.work
  },
  methods: {
    ...mapActions({
      [MutationType.GET_LIST]: 'work/' + MutationType.GET_LIST,
      [MutationType.STORE_DATA]: "work/" + MutationType.STORE_DATA
    }),
    deleteWork () {

    },
    createWork () {
      this[MutationType.STORE_DATA]({
        apiUrl: "http://192.168.10.10/api/v2/works",
        form: this.form
      })
      this.createDialogVisible = false
    },
    editWork (workType, uuid) {
      switch (workType) {
        case '1':
        default:
          this.$router.push('/panorama-editor/' + uuid)
      }
    }
  },
  watch: {

    workList (val) {
      console.log(val)
    }
  },
}
</script>
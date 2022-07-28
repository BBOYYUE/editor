<template>
  <div>
    <div class="flex flex-col justify-center h-screen w-screen">
      <div class=" flex flex-row justify-center ">
        <div class=' flex flex-col space-y-16 h-80 bg-blue-400 p-14 rounded-md shadow-md'>
          <div class="flex flex-col  justify-between space-y-4">
            <div class="text-4xl">
              欢迎来到:
            </div>
            <div class="text-7xl ml-10">
              ALPHA编辑器
            </div>
          </div>
          <div class="flex flex-row space-x-1"
               v-if="isLogin">
            <div>
              <el-button @click="()=>{this.createDialogVisible = true}">创建新的</el-button>
            </div>
            <div>
              <el-button @click="()=>{this.$router.push('/workList')}">查看我的作品</el-button>
            </div>
          </div>
          <div class="flex flex-row space-x-1"
               v-else>
            <div>
              <el-button @click="()=>{this.loginDialogVisible = true}">登陆</el-button>
            </div>
            <div>
              <el-button>注册</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
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
    <el-dialog v-model="loginDialogVisible"
               width="450px">
      <template #header>
        登陆
      </template>
      <el-form label-position="top"
               :model="authForm"
               ref="authForm"
               :rules="authRules">
        <el-form-item label="手机号码">
          <el-input v-model="authForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="authForm.password"
                    type="password"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button class="w-full"
                   @click="login">登陆</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import * as MutationType from "@/MutationType"
import { mapActions } from 'vuex'
export default {
  setup () {

  },
  data () {
    return {
      form: {
        name: "",
        work_type: ""
      },
      authForm: {
        username: "",
        password: ""
      },
      authRules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
          }
        ],
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
      createDialogVisible: false,
      loginDialogVisible: false
    }
  },
  computed: {
    auth () {
      return this.$store.state.auth
    },
    isLogin () {
      return this.$store.state.isAuth;
    }
  },
  methods: {
    ...mapActions({
      [MutationType.AUTHENTICATION]: 'auth/' + MutationType.AUTHENTICATION,
      [MutationType.STORE_DATA]: "work/" + MutationType.STORE_DATA
    }),
    createWork () {
      this[MutationType.STORE_DATA]({
        apiUrl: "http://192.168.10.10/api/v2/works",
        form: this.form
      })
    },
    login () {
      let that = this
      this.$refs['authForm'].validate((valid) => {
        if (!valid) return
        that[MutationType.AUTHENTICATION]({
          username: that.authForm.username,
          password: that.authForm.password,
        })
      });
    },
  },
  watch: {
    isLogin (val) {
      if (val) {
        this.loginDialogVisible = true
      }
    }
  }
}
</script>
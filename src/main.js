import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import 'animate.css/animate.min.css'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import VueCodemirror from 'vue-codemirror'
import { json } from '@codemirror/lang-json'
import { lineNumbers, gutter } from "@codemirror/view"
import router from './router'
import store from './store'

let app = createApp(App)
app.use(VueCodemirror, {
  // optional default global options
  autofocus: true,
  disabled: false,
  indentWithTab: true,
  tabSize: 4,
  placeholder: '在这里输入',
  extensions: [lineNumbers(), gutter({ class: "cm-mygutter" }), json()],
  mode: 'application/json'
})

/**
 * 重写了 localStorage
 */
let originalSetItem = localStorage.setItem
localStorage.setItem = function (key, newValue) {
  let event = new Event('setItemEvent')
  event.key = key
  event.newValue = newValue
  window.dispatchEvent(event)
  originalSetItem.apply(this, arguments)
}


/**
 * 重写了Date的日期格式化
 * @param {*} fmt
 * @returns
 */
Date.prototype.format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router)
app.use(store)
app.use(ElementPlus)
app.mount('#app')
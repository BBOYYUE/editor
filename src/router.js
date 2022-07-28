import { createRouter, createWebHashHistory } from 'vue-router'
import panoramaEditor from "@/pages/panorama/index.vue"
import editorHome from "@/pages/editorHome"
import workList from "@/pages/workList"

const routes = [
  {
    path: '/',
    name: 'editorHome',
    component: editorHome
  },
  {
    path: "/workList",
    name: "workList",
    component: workList
  },
  {
    path: '/panorama-editor/:uuid',
    name: "panoramaEditor",
    component: panoramaEditor,
    props: true
  }
]

const router = createRouter({
  history: createWebHashHistory('/editor/'),
  routes,
  scrollBehavior (to, from, savedPosition) {
    to, from, savedPosition
    return {
      x: 0,
      y: 0,
    }
  },
})

export default router
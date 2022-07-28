import { createStore } from 'vuex'

import auth from "@/store/auth"
import work from "@/store/work"
import editor from "@/store/editor"
import panorama from "@/store/panorama"

const store = createStore({
  getters: {},
  actions: {},
  mutations: {
    setLayoutSize (state, layoutSize) {
      state.layoutSize = layoutSize
    },
    setContentType (state, contentType) {
      state.contentType = contentType
    },

    /**
     * form type 表示右侧展示的是左侧的那个项
     * @param {*} state 
     * @param {*} formType 
     */
    setFormType (state, formType) {
      state.formType = formType
    },

    /**
     * right 表示新增修改或删除
     * @param {*} state 
     * @param {*} rightType 
     */
    setRightType (state, rightType) {
      state.rightType = rightType
    },

    setFetching (state, fetching) {
      state.fetching = fetching
    },
    setAuth (state, isAuth) {
      state.isAuth = isAuth
    },
    setActives (state, asset) {
      state.activeAsset = asset
    }

  },
  state: {
    layoutSize: {},
    contentType: "privew",
    rightType: "list",
    formType: "",
    fetching: false,
    isAuth: false,
    activeWork: {},
    activeAsset: {}
  },
  modules: {
    auth: auth,
    work: work,
    editor: editor,
    panorama: panorama
  }
});
export default store
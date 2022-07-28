// import { normalize, schema } from 'normalizr'
import * as MutationType from "../MutationType"
// import { v4 as uuidv4 } from "uuid";
import axios from 'axios'

let http = {}
let axiosConfig = (context) => {
  let instance = axios.create({
    timeout: 1000 * 12,
  })

  instance.interceptors.request.use((req) => {
    // if (Object.keys(this.loadingAPI).length === 0) {
    //   store.commit('SHOW_LOADING')
    // }
    req.headers.Authorization = 'Bearer ' + context.rootState.auth.access_token
    return req
  })
  instance.interceptors.response.use((res) => {
    // if (Object.keys[this.loadingAPI].length === 0) {
    //   store.commit('HIDE_LOADING')
    // }
    return res
  })
  http = instance
}

export default {
  namespaced: true,
  state: {
    list: [],
    detail: {},
    activeScene: {}
  },
  actions: {
    [MutationType.GET_LIST] (context, formData) {
      axiosConfig(context)
      context.commit(MutationType.GET_LIST, {
        apiUrl: "http://192.168.10.10/api/v2/resource",
        uuid: formData.uuid
      })
    },
    [MutationType.STORE_DATA] (context, formData) {
      context.commit(MutationType.STORE_DATA, {
        apiUrl: "http://192.168.10.10/api/v2/resource",
        form: formData
      })
    },
    [MutationType.UPDATE_DATA] (context, formData) {
      context.commit(MutationType.UPDATE_DATA, {
        apiUrl: "http://192.168.10.10/api/v2/resource",
        form: formData,
        uuid: formData.uuid
      })
    },
    [MutationType.DELETE_DATA] (context, formData) {
      context.commit(MutationType.DELETE_DATA, {
        apiUrl: "http://192.168.10.10/api/v2/resource",
        uuid: formData.uuid
      })
    },
  },
  mutations: {
    [MutationType.SET_ACTIVE] (state, active) {
      state.activeScene = active
    },
    [MutationType.GET_LIST] (state, formData) {
      let { apiUrl, uuid } = formData;
      http.get(apiUrl + '?uuid=' + uuid).then((res) => {
        state.list = res.data.data.resource
        console.log(res.data)
      });
    },
    [MutationType.STORE_DATA] (state, formData) {
      let { apiUrl, form } = formData;
      http.post(apiUrl, form).then((res) => {
        state.list = res.data.data.resource
      })
    },
    [MutationType.UPDATE_DATA] (state, formData) {
      let { apiUrl, form, uuid } = formData;
      http.put(apiUrl + "/" + uuid, form).then((res) => {
        state.list = res.data.data.resource
      })
    },
    [MutationType.DELETE_DATA] (state, formData) {
      let { apiUrl, uuid } = formData;
      http.delete(apiUrl + "/" + uuid).then((res) => {
        state.list = res.data.data.resource
      })
    }
  }
}
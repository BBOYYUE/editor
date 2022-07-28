import { normalize, schema } from 'normalizr'
import * as MutationType from "../MutationType"
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
const work = new schema.Entity('works', {})
const workList = new schema.Array(work)


export default {
  namespaced: true,
  state: {
    work: {},
  },
  actions: {
    [MutationType.GET_LIST] (context, formData) {
      axiosConfig(context)
      let apiUrl;
      let model;
      apiUrl = formData.apiUrl
      model = formData.model
      if (formData.include || formData.filter || formData.sort || formData.fields || formData.append || formData.page) {
        apiUrl = apiUrl + "?page=" + formData.page
        apiUrl = formData.include ? apiUrl + "&include=" + formData.include : apiUrl
        apiUrl = formData.filter ? apiUrl + "&filter=" + formData.filter : apiUrl
        apiUrl = formData.sort ? apiUrl + "&sort=" + formData.sort : apiUrl
        apiUrl = formData.fields ? apiUrl + "&fields=" + formData.fields : apiUrl
        apiUrl = formData.append ? apiUrl + "&append=" + formData.append : apiUrl
      }
      context.commit(MutationType.GET_LIST, { apiUrl, model, include: formData.include });
    },
    [MutationType.STORE_DATA] (context, formData) {
      axiosConfig(context)
      let apiUrl;
      let form;
      apiUrl = formData.apiUrl
      form = formData.form
      context.commit(MutationType.STORE_DATA, { apiUrl, form });
    },
  },
  mutations: {
    [MutationType.GET_LIST] (state, formData) {
      let { apiUrl, model } = formData
      /**
       * 这里很神奇的可以直接拿到 store 对象
       */
      let entities
      this.commit('setFetching', true)
      http.get(apiUrl).then((res) => {
        state.paginate = Object.assign({}, state.paginate, {
          [model]: {
            total: res.data.total,
            current_page: res.data.current_page,
            per_page: res.data.per_page,
            last_page: res.data.last_page,
            form: res.data.form,
            to: res.data.to,
          }
        })
        entities = normalize(res.data.data, workList).entities;
        state.work = Object.assign({}, state.work, entities.works)
        this.commit('setFetching', false)
      }).catch((err) => {
        console.log(err)
        if (err.response && err.response.data) {
          if (err.response.status === 401) {
            /**
             * 登陆失效
             */
            this.commit('setAuth', false)
          }
        }
      })
    },
    [MutationType.STORE_DATA] (state, formData) {
      let { apiUrl, form } = formData
      this.commit('setFetching', true)
      let that = this;
      http.post(apiUrl, form).then((res) => {
        state.work = Object.assign({}, state.work, normalize(res.data.data, work).entities.works)
        that.commit('setFetching', false)
      }).catch((err) => {
        if (err.response.data) {
          if (err.response.status === 401) {
            /**
             * 登陆失效
             */
            this.commit('setAuth', false)
          }
        }
      })
    },
  }
}


export default {
  namespaced: true,
  getters: {},
  actions: {},
  mutations: {
    setActivesWork (state, work) {
      state.activeWork = work
    },
    setActivesScene (state, scene) {
      state.activeScene = scene
    },
    setActiveSceneAngle (state, angle) {
      state.activeAngle = angle
    },
    setActivePrview (state, privew) {
      state.activePrview = privew
    }
  },
  state: {
    activeWork: {},
    activeScene: {},
    activeAngle: {},
    activePrview: {}
  },
};
<template>
  <component :is="componentName"
             :width="width"
             :height="height"
             :uuid="uuid"></component>
</template>
<script>
import PanoAngleForm from "./forms/pano-angle-form.vue"
import PanoAngleList from "./lists/pano-angle-list.vue"
import SceneList from "./lists/pano-scene-list.vue"
import SceneForm from "./forms/pano-scene-form.vue"
export default {
  setup () {

  },
  props: {
    uuid: String
  },
  components: { PanoAngleForm, PanoAngleList, SceneList, SceneForm },
  computed: {
    layoutSize () {
      return this.$store.state.layoutSize
    },
    width () {
      return this.layoutSize.rightBox ? this.layoutSize.rightBox.width : '100%'
    },
    height () {
      return this.layoutSize.rightBox ? this.layoutSize.rightBox.height : '100%'
    },
    formType () {
      return this.$store.state.formType;
    },
    rightType () {
      return this.$store.state.rightType;
    },
    componentName () {
      switch (this.formType) {
        case 'pano-angle':
          switch (this.rightType) {
            case 'update':
            case 'create':
              return 'PanoAngleForm'
            case 'list':
            default:
              return 'PanoAngleList'
          }
        case 'scene-list':
          switch (this.rightType) {
            case 'update':
            case 'create':
              return "SceneForm"
            case "list":
            default:
              return "SceneList"
          }
        default:
          return ""
      }
    }
  },
}
</script>
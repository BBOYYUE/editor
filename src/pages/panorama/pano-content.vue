<template>
  <div>
    <pano-privew v-show="contentType == 'privew'"></pano-privew>
    <pano-editor v-show="contentType == 'text'"></pano-editor>
  </div>
</template>
<script>
import PanoPrivew from "./pano-privew.vue"
import PanoEditor from "./pano-editor.vue"
export default {
  components: { PanoPrivew, PanoEditor },
  computed: {
    contentType () {
      return this.$store.state.contentType
    }
  }
}
</script>
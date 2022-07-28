<template>
  <div :style="{width,height}">
    <div id="prview"
         v-show="contentType == 'privew'"
         @mousedown="mouseDown"
         @mouseup="mouseUp"
         @click="mouseClick"
         style="width: 100%; height: 100%; overflow: hidden">
    </div>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  mounted () {
    this.test = './test.xml'
    this.loadXmlForPath('./test.xml')
  },
  computed: {
    activeAsset () {
      return this.$store.state.panorama.activeScene
    },
    contentType () {
      return this.$store.state.contentType
    },
    layoutSize () {
      return this.$store.state.layoutSize
    },
    width () {
      return this.layoutSize.content ? this.layoutSize.content.width + "px" : '100%'
    },
    height () {
      return this.layoutSize.content ? this.layoutSize.content.height + "px" : '100%'
    },
    aspectRatio () {
      return (this.width / this.height).toFixed(2)
    },

  },
  methods: {
    loadXmlForPath (path) {
      let p = document.getElementById('krpanoSWFObject')
      if (p) p.remove()
      embedpano({
        swf: "./krpano/tour.swf",
        xml: "./krpano/tour.xml",
        target: "prview",
        html5: "auto",
        mobilescale: 1.0,
        passQueryParameters: true,
        onready: this.KrpanoReady,
        initvars: { xmlPath: path },
        consolelog: true,
      });
    },
    KrpanoReady (prview) {
      this.prview = prview;
      this.$store.commit('panorama/setActivePrview', prview)
    },
  },
  watch: {
    activeAsset (val) {
      if (val) {
        let path = "http://192.168.10.10:9000/alpha-api/" + val.xml
        this.loadXmlForPath(path);
      }
    }
  }
}
</script>

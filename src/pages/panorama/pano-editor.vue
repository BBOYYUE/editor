<template>
  <div :style="{width,height}"
       id="editor">
    <vue-codemirror v-model="optionString"
                    @change="textChange"
                    :extensions="editorExtensions"
                    style="width: 100%; height: 100%; overflow: hidden"></vue-codemirror>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  data () {

  },
  mounted () {
    this.test = './test.xml'
    this.loadXmlForPath('./test.xml')
  },
  computed: {
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
    }
  },
  methods: {
    textChange () {
      console.log("客户输入")
    },
    loadXmlForPath (path) {
      let p = document.getElementById('krpanoSWFObject')
      console.log(p)
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
    }
  },
}
</script>
<style scoped>
#editor,
.el-scrollbar {
  --el-scrollbar-opacity: 0.3;
  --el-scrollbar-bg-color: var(--el-text-color-secondary);
  --el-scrollbar-hover-opacity: 0.5;
  --el-scrollbar-hover-bg-color: var(--el-text-color-secondary);
  overflow: hidden;
  position: relative;
  height: 0.5rem;
}
</style>
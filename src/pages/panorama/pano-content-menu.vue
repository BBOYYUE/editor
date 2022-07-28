<template>
  <div class="flex flex-row w-full h-8 justify-between">
    <div class="flex flex-row space-x-1">
      <div class="h-full flex flex-col justify-center">
        <div class="rounded-md select-none">
          <el-button size="small"
                     @click="setContentType('privew')">可视化编辑</el-button>
        </div>
      </div>
      <div class="h-full flex flex-col justify-center">
        <div class=" rounded-md select-none">
          <el-button size="small"
                     @click="setContentType('text')">文本编辑</el-button>
        </div>
      </div>
    </div>
    <div class="flex flex-row"
         style="font-size: 0.5rem">
      <div class="h-full flex flex-col justify-center mx-1 select-none">
        宽: {{width}} 高: {{height}} 长宽比: {{aspectRatio}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    layoutSize () {
      return this.$store.state.layoutSize
    },
    width () {
      return this.layoutSize.content ? this.layoutSize.content.width : '100%'
    },
    height () {
      return this.layoutSize.content ? this.layoutSize.content.height : '100%'
    },
    aspectRatio () {
      return (this.width / this.height).toFixed(2)
    }
  },
  methods: {
    setContentType (type) {
      this.$store.commit('setContentType', type)
    }
  }
}
</script>
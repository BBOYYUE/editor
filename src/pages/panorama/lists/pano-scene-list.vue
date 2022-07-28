<template>
  <top-content-bottom-layout :height="height"
                             :width="width">
    <template v-slot:top>
      <div class="flex flex-row justify-between border-b-2 m-2 pb-2"
           ref="title-box">
        <div class="flex flex-col justify-center select-none">场景列表</div>
        <el-button @click="createScene">新增场景</el-button>
      </div>
    </template>
    <template v-slot:content>
      <div class="m-2">
        <div v-if="sceneList.length > 0"
             class="flex flex-wrap">
          <div class="w-64 h-40 text-center flex flex-col justify-between m-2"
               v-for="scene in sceneList"
               :key="scene"
               @click="itemClick(scene)">
            <div class="text-center">
              <el-image class="border rounded-sm w-64 h-32"
                        :src="getThumbPath(scene.thumb)"
                        fit="cover"></el-image>
            </div>
            <div class="overflow-clip">
              {{ scene.name }}
            </div>
          </div>
        </div>
        <el-empty v-else />
      </div>
    </template>
  </top-content-bottom-layout>
</template>
<script>
import TopContentBottomLayout from "@/components/layout/top-content-bottom-layout.vue"

export default {
  components: { TopContentBottomLayout },
  computed: {
    list () {
      return this.$store.state.editor.list
    },
    sceneList () {
      return this.list.scene_list ? this.list.scene_list : []
    }
  },
  methods: {
    getThumbPath (filePath) {
      return "http://192.168.10.10:9000/alpha-api/" + filePath;
    },
    createScene () {
      this.$store.commit('setRightType', 'create')
    },
    itemClick (data) {
      this.$store.commit('panorama/setActivesScene', data)
      this.$store.commit('setRightType', 'update')
    },
    updateScene () {
      this.$store.commit('setRightType', 'update')
    },
    goBack () {
      this.$store.commit('setRightType', 'list')
    }
  },
  watch: {
    sceneList (val) {
      console.log(val);
    }
  }
}
</script>
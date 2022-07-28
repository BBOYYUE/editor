<template>
  <el-menu :collapse="collapse"
           @select="(item)=>{
            menuItemChange(item)
      }">
    <el-sub-menu index="info">
      <template #title>
        <el-icon>
          <Management />
        </el-icon>
        <span>基本信息</span>
      </template>
      <el-menu-item index="work-info">作品信息</el-menu-item>
      <el-menu-item index="scene-list">场景列表</el-menu-item>
      <el-menu-item index="scene-group">场景分组</el-menu-item>
      <el-menu-item index="scene-map">场景小地图</el-menu-item>
      <el-menu-item index="scene-text">场景文字</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="scene">
      <template #title>
        <el-icon>
          <School />
        </el-icon>
        <span>场景设置</span>
      </template>
      <el-menu-item index="pano-angle">场景角度</el-menu-item>
      <el-menu-item index="pano-hotspot">热点</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>
<script>
export default {
  computed: {
    layoutSize () {
      return this.$store.state.layoutSize
    },
    width () {
      return this.layoutSize.leftBox ? this.layoutSize.leftBox.width : '100%'
    },
    collapse () {
      return this.width == 70
    }
  },
  methods: {
    menuItemChange (item) {
      this.$store.commit('setFormType', item);
      this.$store.commit('setRightType', 'list')
    }
  }
}
</script>
<style scoped>
.el-menu {
  border-right: none;
  height: 100%;
}
</style>
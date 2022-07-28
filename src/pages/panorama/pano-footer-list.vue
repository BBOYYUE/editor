<template>
  <el-tabs type="border-card"
           class="select-none"
           :style="{
    width, height
  }">
    <el-tab-pane label="文件列表"
                 key="files">
      <el-tabs tab-position="left">
        <el-tab-pane label="上传列表"
                     class="h-full w-full">
          <el-scrollbar :height="height - 80 + 'px'">
            <pano-file-upload-form :uuid="uuid"></pano-file-upload-form>
          </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="所有文件"
                     class="h-full w-full">
          <el-scrollbar :height="height - 80 + 'px'">
            <pano-file-list :uuid="uuid"></pano-file-list>
          </el-scrollbar>
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
    <el-tab-pane label="任务列表"
                 key="files"
                 class="h-full w-full">
      <el-scrollbar :height="height - 80 + 'px'">
        <pano-task-list :uuid="uuid"></pano-task-list>
      </el-scrollbar>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import PanoFileUploadForm from "@/pages/panorama/forms/pano-file-upload-form.vue"
import PanoFileList from "@/pages/panorama/lists/pano-file-list.vue"
import PanoTaskList from "@/pages/panorama/lists/pano-task-list.vue"
export default {
  props: { uuid: String },
  components: { PanoFileUploadForm, PanoFileList, PanoTaskList, },
  computed: {
    layoutSize () {
      return this.$store.state.layoutSize
    },
    width () {
      return this.layoutSize.footerBox ? this.layoutSize.footerBox.width : '100%'
    },
    height () {
      return this.layoutSize.footerBox ? this.layoutSize.footerBox.height : '100%'
    },
  },
}
</script>
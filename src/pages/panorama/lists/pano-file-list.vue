<template>
  <el-table class="w-full h-full"
            :data="fileList">
    <el-table-column type="index"
                     label="序号"
                     width="80" />
    <el-table-column label="图标"
                     width="80">
      <template #default="scope">
        <component :is="fileIcon(scope.row)"
                   class="w-10 h-10"></component>
      </template>
    </el-table-column>
    <el-table-column label="预览"
                     width="180">
      <template #default="scope">
        <el-image z-index="999"
                  :src="getThumbPath(scope.row.file_path)"
                  v-show="
              scope.row.extension == 'jpg' || scope.row.extension == 'png'
            ">
          <template #viewer>
            <el-image-viewer :url-List="[getThumbPath(scope.row.file_path)]"
                             :z-index="999"></el-image-viewer>
          </template>
        </el-image>
      </template>
    </el-table-column>
    <el-table-column prop="source_name"
                     label="文件名称" />
    <el-table-column prop="extension"
                     label="文件类型" />
    <el-table-column prop="filesize"
                     label="文件大小" />
  </el-table>
</template>
<script>
import UnKnownFile from "../../../components/icon/unKnownFile.vue";
import PngFile from "../../../components/icon/png.vue";
import JpgFile from "../../../components/icon/jpg.vue";
export default {
  setup () {

  },
  props: { height: String },
  components: { UnKnownFile, PngFile, JpgFile },
  computed: {
    list () {
      return this.$store.state.editor.list
    },
    fileList () {
      return this.list.file_list ?? []
    },
  },
  methods: {
    getThumbPath (filePath) {
      return "http://192.168.10.10:9000/alpha-api/" + filePath;
    },
    fileIcon (file) {
      switch (file.extension) {
        case "jpg":
        case "jpeg":
          return "JpgFile";
        case "png":
          return "PngFile";
        default:
          return "UnKnownFile";
      }
    },
  },
  watch: {
    list (val) {
      console.log(val)
    }
  }
}
</script>
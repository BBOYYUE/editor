<template>
  <el-table>
    <el-table-column prop="id"
                     label="序号" />
    <el-table-column prop="name"
                     label="资源名称" />
    <el-table-column prop="method"
                     label="任务类型" />
    <el-table-column prop="status"
                     label="任务状态" />
    <el-table-column prop="progress"
                     label="任务进度" />
  </el-table>
</template>
<script>
export default {
  props: { height: String },
  computed: {
    taskList () {
      return {}
    }
  }
}
</script>
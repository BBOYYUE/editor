<template>
  <top-content-bottom-layout :height="height"
                             :width="width">
    <template v-slot:top>
      <div class="flex flex-row justify-between border-b-2 m-2 pb-2"
           ref="title-box">
        <div class="flex flex-col justify-center select-none">场景角度</div>
        <el-button @click="createAngle">新增角度</el-button>
      </div>
    </template>
    <template v-slot:content>
      <div class="m-2">
        <el-table :data="angleData"
                  v-if="angleData.length > 0">
          <el-table-column prop="name"
                           label="角度名称" />
          <el-table-column prop="info"
                           label="描述"
                           width="240" />
          <el-table-column prop="atv"
                           label="atv" />
          <el-table-column prop="ath"
                           label="ath" />
          <el-table-column prop="fov"
                           label="fov" />
          <el-table-column prop="maxAtv"
                           label="maxAtv" />
          <el-table-column prop="minAtv"
                           label="minAtv" />
          <el-table-column prop="maxAth"
                           label="maxAth" />
          <el-table-column prop="minAth"
                           label="minAth" />
          <el-table-column prop="maxFov"
                           label="maxFov" />
          <el-table-column prop="minFov"
                           label="minFov" />
          <el-table-column fixed="right"
                           label="选项"
                           width="120">
            <template #default="scope">
              <el-button link
                         type="primary"
                         size="small"
                         @click.prevent="updateAngle(scope.$index)">
                编辑
              </el-button>
              <el-button link
                         type="primary"
                         size="small"
                         @click.prevent="deleteAngle(scope.$index)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-empty v-else />
      </div>
    </template>
  </top-content-bottom-layout>
</template>
<script>
import TopContentBottomLayout from "@/components/layout/top-content-bottom-layout.vue"

export default {
  components: { TopContentBottomLayout },
  data () {
    return {
      angleData: [
        // {
        //     name: "默认角度",
        //     info: "场景一打开时的默认角度",
        //     atv: 0,
        //     ath: 0,
        //     fov: 120,
        //     maxAtv: 179,
        //     minAtv: -179,
        //     maxAth: 179,
        //     minAth: -179,
        //     maxFov: 179,
        //     minFov: 1,
        //   }
      ]

    }
  },
  methods: {
    createAngle () {
      this.$store.commit('setRightType', 'create')
    },
    updateAngle () {
      this.$store.commit('setRightType', 'update')
    }
  }
}
</script>
<template>
  <div class="flex flex-row justify-between h-full">
    <div class="flex flex-col justify-center">
      <div class="text-lg ml-4">
        全景编辑器
        <span class="text-base">3.0.0</span>
      </div>
    </div>
    <div class="flex flex-col justify-center">
      <el-button class="mr-3"
                 circle
                 @click="this.$router.push('/')">
        <el-icon :size="15">
          <SwitchButton />
        </el-icon>
      </el-button>
    </div>
  </div>
</template>
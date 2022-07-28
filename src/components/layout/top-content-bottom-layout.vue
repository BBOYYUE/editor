<template>
  <!-- <div class="flex flex-col justify-between"
       :style="{
    width:width  + 'px',height : height  + 'px'
  }"> -->
  <div class="flex flex-col justify-between w-full h-full p-2">
    <div ref="top"
         class="w-full h-18">
      <slot name="top"></slot>
    </div>
    <div ref="content"
         class="w-full flex-grow overflow-y-auto">
      <slot name="content"></slot>
    </div>
    <div ref="bottom"
         class="w-full h-18">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: { width: String, height: String }
}
</script>
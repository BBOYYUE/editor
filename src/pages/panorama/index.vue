<template>
  <base-layout>
    <template v-slot:header>
      <pano-header></pano-header>
    </template>
    <template v-slot:left>
      <pano-left-menu></pano-left-menu>
    </template>
    <template v-slot:content-menu>
      <pano-content-menu></pano-content-menu>
    </template>
    <template v-slot:content>
      <pano-content></pano-content>
    </template>
    <template v-slot:right>
      <pano-right-form :uuid="uuid"></pano-right-form>
    </template>
    <template v-slot:footer>
      <pano-footer-list :uuid="uuid"></pano-footer-list>
    </template>
  </base-layout>
</template>
<script>
import BaseLayout from "@/components/layout/base-layout.vue"
import PanoHeader from "./pano-header.vue";
import PanoLeftMenu from "./pano-left-menu.vue";
import PanoContentMenu from "./pano-content-menu.vue";
import PanoContent from "./pano-content.vue";
import PanoRightForm from "./pano-right-form.vue";
import PanoFooterList from "./pano-footer-list.vue";
import * as MutationType from "@/MutationType";

export default {
  name: "panorama-editor",
  props: { uuid: String },
  components: {
    BaseLayout,
    PanoHeader,
    PanoLeftMenu,
    PanoContentMenu,
    PanoContent,
    PanoRightForm,
    PanoFooterList
  },
  mounted () {
    this.getFileList()
  },
  methods: {
    getFileList () {
      this.$store.dispatch("editor/" + [MutationType.GET_LIST], {
        uuid: this.uuid,
      });
    },
  }
}
</script>
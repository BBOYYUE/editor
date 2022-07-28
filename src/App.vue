<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script>
import * as MutationType from "@/MutationType"
export default {
  name: 'App',
  mounted () {
    this.authGates()
  },
  methods: {
    authGates () {
      let user = localStorage.getItem("user");
      if (user && user != "undefined" && Object.keys(user).length > 0) {
        let auth = JSON.parse(user);
        this.$store.commit(
          "auth/" + MutationType.SET_ACCESS_TOKEN,
          auth.access_token
        );
        this.$store.dispatch(
          "auth/" + MutationType.AUTHENTICATION_UPDATE
        );
        this.$store.commit("setFetching", false);
      } else {
        this.$message.error("登陆失效!");
        this.$router.push("login");
      }
    },
  }
}
</script>

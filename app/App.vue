<template>
  <div>
    <router-link :to="{path: '/'}">Главная</router-link>
    <router-link :to="{name: 'Home'}">Home</router-link>
    <router-link :to="{name: 'Account'}">Аккаунт</router-link>
    <router-link :to="{name: 'Login'}">Войти</router-link>
    <router-view></router-view>
  </div>
</template>
<script>
  import {USER_REQUEST} from "./client/store/const/user";

  export default {
    name: 'app',
    metaInfo: {},
    created() {
      if (this.$store.getters["auth/isAuthenticated"]) {
        this.$store.dispatch("auth/USER_REQUEST")
      }
    }
  }
</script>
<style lang="stylus">
  /*общие стили*/
  @import 'client/style/main.styl';
</style>
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
    watch: {},
    created() {
      if (this.$store.getters["isAuthenticated"]) {
        //this[USER_REQUEST](null)

        this.$store.dispatch("user/USER_REQUEST")
      }
    }
  }
</script>
<style lang="stylus">
  /*общие стили*/
  @import 'client/style/main.styl';
</style>
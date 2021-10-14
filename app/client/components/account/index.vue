<template>
  <div>
    <h1>Account</h1>

  </div>
</template>
<script>
  import Login from '../login/index.vue'
  export default {
    metaInfo() {
      return {
        title: `${this.$route.meta.pageTitle}`,
      }
    },
    name: 'account',
    components: {
      Login
    },
    data() {
      return {}
    },
    mounted() {

    }
  }
</script>

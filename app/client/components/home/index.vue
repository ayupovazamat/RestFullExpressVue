<template>
  <div>
    <h1>Home</h1>
  </div>
</template>
<script>
  export default {
    metaInfo() {
      return {
        title: `${this.$route.meta.pageTitle}`,
      }
    },
    name: 'Home',
    data() {
      return {
      }
    },

    mounted() {

    }
  }
</script>

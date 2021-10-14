<template>
  <div>
    <h1>Main</h1>
  </div>
</template>
<script>
  import calendar from './calendar.vue'

  export default {
    metaInfo() {
      return {
        title: `${this.$route.meta.pageTitle}`,
      }
    },
    components: {Calendar: calendar},
    data() {
      return {
        preloader: false
      }
    },
    mounted() {

    }
  }
</script>

<template>
  <div>
    <h1>Login</h1>
    <form class="login" @submit.prevent="login">
      <h1>Sign in</h1>
      <label>User name</label>
      <input required v-model="email" type="text" placeholder="Snoopy"/>
      <label>Password</label>
      <input required v-model="password" type="password" placeholder="Password"/>
      <hr/>
      <button type="submit">Login</button>
    </form>
  </div>
</template>
<script>
  import {createNamespacedHelpers} from "vuex";

  const {mapState, mapActions, mapMutations} = createNamespacedHelpers('auth');
  import {
    AUTH_REQUEST
  } from '../../store/const/auth'

  export default {
    name: 'Login',
    data() {
      return {
        email: 'test@mail.ru',
        password: '123456'
      }
    },
    methods: {
      ...mapActions([AUTH_REQUEST]),
      login() {
        const {email, password} = this
        this[AUTH_REQUEST]({email, password}).then(() => {
          //this.$router.push('/').catch(() => {})
        })
        /*this.$store.dispatch(AUTH_REQUEST, null, {email, password}).then(() => {
          this.$router.push('/')
        })*/
      }
    }
  }

</script>
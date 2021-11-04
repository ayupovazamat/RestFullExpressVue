import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_ERROR, AUTH_LOGOUT,
} from '../const/auth'
import {USER_REQUEST} from "../const/user";
import axios from "axios";

const axiosSetting = {
  proxy: {
    host: 'http://127.0.0.1',
    port: 3000
  }
}
export default {
  namespaced: true,
  state: () => ({
    token: (typeof window !== 'undefined') ? localStorage.getItem("user-token") || "" : "",
    status: "",
    hasLoadedOnce: false
  }),
  mutations: {
    [AUTH_REQUEST](state) {
      state.status = 'loading'
    },
    [AUTH_SUCCESS](state, token) {
      state.status = 'success'
      state.token = token
    },
    [AUTH_ERROR](state) {
      state.status = 'error'
    },
  },
  actions: {
    [AUTH_REQUEST]({commit, dispatch}, user) {
      return new Promise((resolve, reject) => { // Обещание, используемое для перенаправления маршрутизатора при входе в систему
        commit(AUTH_REQUEST)
        axios({url: '/api/user/auth', data: user, method: 'POST', headers: {"Authorization": "Bearer token"}})
           .then(resp => {
             const token = resp.data.token
             localStorage.setItem('user-token', token)
             //(typeof window !== 'undefined') ? localStorage.setItem('user-token', token) : console.log("localStorage.setItem('user-token', token)") // хранить токен в локальном хранилище

             commit(AUTH_SUCCESS, token)
             // у вас есть токен, теперь войдите в систему как пользователь
             dispatch('USER_REQUEST', null, {root:true})
             resolve(resp)
           })
           .catch(err => {
             console.log(err)
             commit(AUTH_ERROR, err)
             localStorage.removeItem('user-token')
             //(typeof window !== 'undefined') ? localStorage.removeItem('user-token') : console.log("localStorage.removeItem('user-token')") // если запрос не выполняется, удалите любой возможный токен пользователя, если это возможно
             reject(err)
           })
      })
    },
    /*[REGISTER_REQUEST]({commit, dispatch}, user) {
      return new Promise((resolve, reject) => { // Обещание, используемое для перенаправления маршрутизатора при входе в систему
        commit(AUTH_REQUEST)
        axios({url: '/rest/user/auth', data: user, method: 'POST', headers: {"Authorization": "Bearer token"} })
           .then(resp => {
             console.log(resp)
             const token = resp.data.token
             (typeof window !== 'undefined') ? localStorage.setItem('user-token', token) : console.log("localStorage.setItem('user-token', token)") // хранить токен в локальном хранилище

             commit(AUTH_SUCCESS, token)
             // у вас есть токен, теперь войдите в систему как пользователь
             dispatch(USER_REQUEST)
             resolve(resp)
           })
           .catch(err => {
             console.log(err)
             commit(AUTH_ERROR, err)
             (typeof window !== 'undefined') ? localStorage.removeItem('user-token') : console.log("localStorage.removeItem('user-token')") // если запрос не выполняется, удалите любой возможный токен пользователя, если это возможно
             reject(err)
           })
      })
    },*/
    [AUTH_LOGOUT]: ({commit, dispatch}) => {
      return new Promise(((resolve, reject) => {
        commit(AUTH_LOGOUT)
        if (localStorage) localStorage.removeItem('user-token')
        resolve()
      }))
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status
  }
}
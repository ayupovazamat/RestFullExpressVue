import axios from "axios";

import {USER_REQUEST, USER_ERROR, USER_SUCCESS} from "../const/user";
//import apiCall from "utils/api";
import Vue from "vue";
import {AUTH_LOGOUT} from "../const/auth";

const state = {status: "", profile: {}};

const getters = {
  getProfile: state => state.profile,
  isProfileLoaded: state => !!state.profile.name
};

const actions = {
  [USER_REQUEST]: async ({commit, dispatch}) => {
    commit(USER_REQUEST);
    console.log('token')
    const user = await ({url: '/api/user/', method: 'POST', headers: {"Authorization": "Bearer token"}})
    const token = user.data.token
    console.log(token)
    /*apiCall({ url: "user/me" })
       .then(resp => {
         commit(USER_SUCCESS, resp);
       })
       .catch(() => {
         commit(USER_ERROR);
         // if resp is unauthorized, logout, to
         dispatch(AUTH_LOGOUT);
       });*/
  }
};

const mutations = {
  [USER_REQUEST]: state => {
    state.status = "loading";
  },
  [USER_SUCCESS]: (state, resp) => {
    state.status = "success";
    Vue.set(state, "profile", resp);
  },
  [USER_ERROR]: state => {
    state.status = "error";
  },
  [AUTH_LOGOUT]: state => {
    state.profile = {};
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
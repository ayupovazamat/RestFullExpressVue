import Vue from 'vue';
import Vuex from 'vuex';

import main from './modules/main';
import auth from './modules/auth';
import user from './modules/user';

import config from '../../config';

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1
})

Vue.use(Vuex);

const storeOptions = {
  strict: !config.isProduction,
  modules: {
    main,
    auth,
    user
  },
}
export function createStore() {
  return new Vuex.Store(storeOptions);
}

export const clientStore = new Vuex.Store(storeOptions) // для использования в app/router.js
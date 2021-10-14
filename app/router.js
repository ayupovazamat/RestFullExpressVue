import Vue from 'vue';
import Router from 'vue-router';
import VueMeta from 'vue-meta';

import Account from "./client/components/account/index.vue";
import Login from "./client/components/login/index.vue";
import Home from "./client/components/home/index.vue";

import {clientStore as store} from "./client/store";

Vue.use(Router);
Vue.use(VueMeta);

const ifNotAuthenticated = (to, from, next) => {
  //  если не авторизован
  if (!store.getters["auth/isAuthenticated"]) {
    next()
    return
  }
  next('/')
}


const ifAuthenticated = (to, from, next) => {
  // если авторизован
  if (store.getters["auth/isAuthenticated"]) {
    next()
    return
  }
  next('/login')
}

export function createRouter(store) {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'Main',
        component: () => import('./client/components/Main.vue'),
        meta: {
          breadCrumb: 'Main',
          pageTitle: 'Main',
        }
      },
      {
        path: '/account',
        name: 'Account',
        component: Account,
        meta: {
          pageTitle: 'Account',
        },
        beforeEnter: ifAuthenticated
      },
      {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
          pageTitle: 'Login',
        },
        beforeEnter: ifNotAuthenticated
      },
      {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
          pageTitle: 'Home',
          requiresAuth: true
        },
        beforeEnter: ifAuthenticated
      }
    ],
  });
}
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
// import { objapi } from './axios/main';
import { objapi } from './fetch/main';
import './scss/bulma.scss';

import notify from './component/notify/main';

Vue.use(notify);
Vue.use(Vuex); // what about promise? if you are thinking this you may need es6-promise
Vue.use(VueRouter);

Vue.component('user-check', userCheck);

const router = new VueRouter({
  mode: 'hash',
  base: '/public/',
  routes: [
    // {
    //   path: '/test',
    //   component: helloworld,
    // },
  ],
});
router.beforeEach((to, from, next) => {
  if (!frontCheck(objapi)) {
    backCheck(objapi, (uData) => {
      router.app.$options.store.commit('userData', uData);
    });
    router.app.$options.store.commit('userCheck', true);
  }
  next();
});

// eslint-disable-next-line no-unused-vars
const SAN = new Vue({
  el: '#main',
  router,
  store: new Vuex.Store({
    /* eslint no-param-reassign: ["error", { "props": false }] */
    state: {
      user: {
        check: false,
        data: {},
      },
    },
    mutations: {
      userCheck(state, payload) {
        // eslint-disable-next-line no-param-reassign
        state.user.check = payload;
      },
      userData(state, payload) {
        state.user.data = payload;
      },
    },
    actions: {},
    getters: {},
  }),
  template: '<router-view/>',
});

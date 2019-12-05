// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import st from "./store";
import Vuex from "vuex";
import createLogger from 'vuex/dist/logger'
Vue.config.productionTip = false
Vue.use(Vuex);
/* eslint-disable no-new */
var store = new Vuex.Store({...st, plugins: [createLogger()]})
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

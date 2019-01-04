// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '../common/style/index.css'
import Vue from 'vue'
import App from './App'
import router from '../common/router'



import store from '../common/store'


Vue.config.productionTip = false

/* eslint-disable no-new */
const Hogwards = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
})

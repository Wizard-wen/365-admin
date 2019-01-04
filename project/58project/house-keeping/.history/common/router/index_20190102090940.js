import Vue from 'vue'
import Router from 'vue-router'
import routerConfig from './routerConfig.js'
import loginPage from '@/pages/login.vue'

import notFound from '@/pages/notFound.vue'

import mainPage from '@/pages/main.vue'

Vue.use(Router)
window.router = new Router({
  routes: [
    {
        path: '*',
        components: notFound,
    },
    {
        path: '/',
        component: mainPage,
        children: [...routerConfig],
    },
    {
      path: '/login',
      component: loginPage,
    }
  ]
})


export default router

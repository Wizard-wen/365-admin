import Vue from 'vue'
import Router from 'vue-router'
import routerConfig from './routerConfig.js'
import loginPage from '@/pages/login.vue'
import homePage from '@/pages/home.vue'
import notFound from '@/pages/notFound.vue'

Vue.use(Router)
window.router = new Router({
  routes: [
    {
        path: '*',
        components: notFound,
    },
    {
        path: '/',
        component: homePage,
        children: [...routerConfig],
    },
    {
      path: '/login',
      component: loginPage,
    }
  ]
})


export default router

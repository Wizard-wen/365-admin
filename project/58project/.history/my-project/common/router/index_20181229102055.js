import Vue from 'vue'
import Router from 'vue-router'
import routerConfig from './routerConfig.js'

Vue.use(Router)
window.router = new Router({
  routes: [
    {
        path: '*',
        components: notFound,

    }
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})


export default router

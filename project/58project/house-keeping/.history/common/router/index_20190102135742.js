import Vue from 'vue'
import Router from 'vue-router'
import routerConfig from './routerConfig.js'
import loginPage from '@/pages/login.vue'

import notFound from '@/pages/notFound.vue'

import mainPage from '@/pages/main.vue'

import store from '../store/index.js'

let isLogin = store.state.loginModule.isLogin

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
            meta: {
                requiresAuth:false,//该页面不需要登录
            }
        }
    ]
})

//登录验证，要求用户必须先登录系统在访问网页
router.beforeEach((to, from, next) => {
    //如果用户配置了requiresAuth等于false，则可以不校验，否则会校验用户是否登录。要求登录页一定要配置requiresAuth为false
    if (to.meta.requiresAuth !== false) {
        if (!store.state.loginModule.isLogin) {
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            })
        } else {
            next()
        }
    } else {
        next()
    }
})
export default router

/**
 * 路由配置
 */

//框架配置
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


//路由列表
import routerConfig from './routerConfig.js'

//登录页
import loginPage from '@/pages/Login.vue'

//404页
import notFound from '@/pages/notFound.vue'

//模板页
import mainPage from '@/pages/Main.vue'

//vuex数据
import store from '../store/index.js'


window.router = new Router({
    routes: [
        {
            path: '*',
            components: notFound,
        },
        {
            path: '/',
            component: mainPage,
            children:[...routerConfig],
        },
        {
            path: '/login',
            component: loginPage,
            meta: {
                requiresAuth:false,//该页面不需要登录
            }
        },
    ]
})


/**
 * 路由拦截
 * 要求用户必须登录才能进入系统
 * 只有登录页被设置 requiresAuth等于false，可以不登录
 */
router.beforeEach((to, from, next) => {

    if (to.meta.requiresAuth !== false) {
        if (!store.state.loginModule.isLogin) {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            })
        } else {
            next()
        }
    } else {
        next()
    }
})


export default router

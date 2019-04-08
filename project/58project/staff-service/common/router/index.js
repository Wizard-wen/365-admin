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
import { Message } from 'element-ui';

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

// var routerNavigator = store.state.loginModule.user.routerNavigator



/**
 * 路由拦截
 * 要求用户必须登录才能进入系统
 * 只有登录页被设置 requiresAuth等于false，可以不登录
 */
router.beforeEach((to, from, next) => {
    /**
     * 如果要进入的页面路由吧必须要登录
     */
    if (to.meta.requiresAuth !== false) {
        /**
         * 若是页面未登录
         */
        if (!store.state.loginModule.isLogin) {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            })
        } else {
            /**
             * 如果不是从登录页跳转
             */
            if(from.path != '/login'){
                /**
                 * 判断to.path在不在权限列表中
                 */
                if(store.state.loginModule.user.routerNavigator.hasOwnProperty(to.path)){
                    next()
                } else {
                    //访问权限外路由
                    Message({
                        type: 'warning',
                        message: "非法访问"
                    })
                    debugger
                    router.push(from.path)
                }
            } else {
                //从登录页跳转，直接进homePage
                next()
            }
        }
    } else {
        next()
    }
})


export default router

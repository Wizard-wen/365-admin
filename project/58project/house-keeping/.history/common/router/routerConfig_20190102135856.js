

/**
 * 首页
 */

import homePage from '@/pages/home.vue'

const homeModule = [
    {
        path: '/homePage',
        name: homePage,
        component: homePage,
        meta: {
            requiresAuth:false,//该页面不需要登录
        }
    }
]

/**
 * 分类
 */

import classify from '@/pages/classify.vue'
import serviceList from '@/pages/classify/serviceList.vue'
import search from '@/pages/search.vue'

const classifyModule = [
    {
        path: '/classify',
        name: classify,
        component: classify,
        meta: {
            requiresAuth:false,//该页面不需要登录
        }
    },
    {
        path: '/classify/serviceList',
        name: serviceList,
        component: serviceList,
    },
    {
        path: '/search',
        name: search,
        component: search,
    },
]

/**
 * 我的订单
 */

import order from '@/pages/order.vue'

const cartModule = [
    {
        path: '/order',
        name: order,
        component:order
    }
]


/**
 * 我的模块
 */
import userpage from '@/pages/user.vue'

const usersModule = [
    {
        path: '/userpage',
        name: userpage,
        component: userpage
    }
]


/**
 * 重定向
 */
export default [
    {path: '/', redirect: '/homepage'},
    ...homeModule,
    ...classifyModule,
    ...cartModule,
    ...usersModule,
]
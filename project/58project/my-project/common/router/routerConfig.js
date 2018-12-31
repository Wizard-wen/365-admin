

/**
 * 首页
 */

import homePage from '@/pages/home.vue'

const homeModule = [
    {
        path: '/homePage',
        name: homePage,
        component: homePage
    }
]

/**
 * 分类
 */

import classify from '@/pages/classify.vue'
import serviceList from '@/pages/classify/serviceList.vue'

const classifyModule = [
    {
        path: '/classify',
        name: classify,
        component: classify,
        children:[
            {
                path: '/classify/serviceList',
                name: serviceList,
                component: serviceList,
            }
        ]
    }
]

/**
 * 购物车
 */

import cart from '@/pages/cart.vue'

const cartModule = [
    {
        path: '/cart',
        name: cart,
        component:cart
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
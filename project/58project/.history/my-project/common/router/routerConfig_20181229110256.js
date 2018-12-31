

/**
 * 首页
 */

import homePage from '@/pages/home.vue'

const home = [
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

const home = [
    {
        path: '/classify',
        name: classify,
        component: classify
    }
]


/**
 * 我的模块
 */
import userpage from '@/pages/user.vue'

const users = [
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
    ...users,
    ...home,
]
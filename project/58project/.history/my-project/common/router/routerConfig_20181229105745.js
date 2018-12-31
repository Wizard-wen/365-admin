

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
    // {path: '/', redirect: '/home'},
    ...users,
    ...home,
]
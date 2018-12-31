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
    // {path: '/', redirect: '/'},
    ...users,
]
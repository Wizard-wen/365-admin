import userpage from '@/pages/user.vue'

const users = [
    {
        path: '/userpage',
        name: userpage,
        component: userpage
    }
]

export default [
    {path: '/', redirect: '/'},
    ...home,
]
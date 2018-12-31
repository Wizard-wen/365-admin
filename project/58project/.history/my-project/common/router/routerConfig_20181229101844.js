import home from '@/pages/home.vue'

const home = [
    {
        path: '/',
        name: 'home',
        component: home
    }
]

export default [
    {path: '/', redirect: '/'},
    ...home,
]
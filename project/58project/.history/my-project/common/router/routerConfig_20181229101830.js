import home from '@/pages/home.vue'

const home = [
    {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld
    }
]

export default [
    {path: '/', redirect: ''},
    ...home,
]
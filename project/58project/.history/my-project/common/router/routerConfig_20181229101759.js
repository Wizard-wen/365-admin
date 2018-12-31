import helloworld from '../components/HelloWorld.vue'

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
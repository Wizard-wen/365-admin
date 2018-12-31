<template>
    <div class="main">
        <router-view></router-view>
        <v-footer 
            :footerList="items"></v-footer>
    </div>
</template>

<script>
import footer from '../../common/components/footer/footer.vue'


import homeActive from './home/img/home-active.svg'
import home from './home/img/home.svg'
import classifyActive from './home/img/classify-active.svg'
import classify from './home/img/classify.svg'
import cartActive from './home/img/cart-active.svg'
import cart from './home/img/cart.svg'
import mineActive from './home/img/mine-active.svg'
import mine from './home/img/mine.svg'


export default {
    data(){
        return {
            items: [
                {
                    name: '首页',
                    router: '/',
                    highIcon: homeActive,
                    icon: home,
                },
                {
                    name: '分类',
                    router: '/classify',
                    highIcon: classifyActive,
                    icon: classify,
                },
                {
                    name: '购物车',
                    router: '/cart',
                    highIcon: cartActive,
                    icon: cart,
                },
                {
                    name: '我的',
                    router: '/userpage',
                    highIcon: mineActive,
                    icon: mine, 
                },
            ]
        }
    },
    methods:{
        goPage(router){
            this.$router.push(router)
        }
    },
    components:{
        'v-footer': footer,
    }
}
</script>

<style scoped>

</style>

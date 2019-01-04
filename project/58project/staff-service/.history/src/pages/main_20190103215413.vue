<template>
    <div class="main">
        <router-view></router-view>
        <div class="main-footer"></div>
        <v-footer :footerList="items"></v-footer>
    </div>
</template>

<script>
import footer from '../../common/components/footer/footer.vue'

//footer图片
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
                    name: '订单',
                    router: '/order',
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
    components:{
        'v-footer': footer,
    },
    mounted(){
        console.log(this.$store.state.loginModule.isLogin)
    }
}
</script>

<style scoped lang="scss">
    .main{
        // position: relative;
        background: #f5f5f5;
        height: 100vh;
        padding-bottom: .5rem;
        width: 100%;
        .main-footer{
            height: .5rem;
            width: 100%;
        }
    }
</style>





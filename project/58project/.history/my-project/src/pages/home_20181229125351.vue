<template>
    <div class="home">

        <router-view></router-view>
        <v-footer 
            :footerList="items"></v-footer>
    </div>
</template>

<script>
import footer from '../../common/components/footer/footer.vue'
export default {
    data(){
        return {
            items: [
                {
                    name: '首页',
                    router: '/'
                },
                {
                    name: '分类',
                    router: '/classify'
                },
                {
                    name: '我的',
                    router: '/userpage'
                },
                {
                    name: '购物车',
                    router: '/cart'
                }
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

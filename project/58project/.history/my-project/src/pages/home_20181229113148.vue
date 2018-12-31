<template>
    <div class="home">
        首页
        <!-- <div 
            class=""
            v-for="(item,index) in items"
            :key="index">
            <div class="" @click="goPage(item.router)">
                {{item.name}}
            </div>
        </div> -->
        <router-view></router-view>
        <v-footer></v-footer>
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
    componentd:{
        'v-footer': footer;
    }
}
</script>

<style scoped>

</style>

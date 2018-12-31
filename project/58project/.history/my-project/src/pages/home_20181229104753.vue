<template>
    <div class="home">
        <div 
            class=""
            v-for="(item,index) in items"
            :key="index">
            <div class="">
                {{item.name}}
            </div>
        </div>
    </div>
</template>

<script>
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
                    router: '/user'
                },
                {
                    name: '购物车',
                    router: '/cart'
                }
            ]
        }
    }
}
</script>

<style scoped>

</style>

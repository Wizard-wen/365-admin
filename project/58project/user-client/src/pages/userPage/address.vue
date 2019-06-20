<template>
     <Hog-page>
         <Hog-header :title="'我的地址'" :isShowImg="true"></Hog-header>
         <div class="address">
             <div @click="goCreate" class="add">添加服务地址</div>
         </div>
    </Hog-page>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    methods: {
        goCreate(){
            this.$router.push('/createAddress')
        }
    },
}
</script>
<style scoped lang="scss">
    .address {
        height: 100vh;
        .add {
            margin: 1rem auto;
            background-color: pink;
            height: 0.4rem;
            line-height: 0.4rem;
            text-align: center;
            border-radius: 0.2rem;
            font-size: 0.16rem;
            color: #fff;
            width: 2rem;
        }
    }
</style>



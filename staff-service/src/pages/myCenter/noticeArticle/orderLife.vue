<template>
    <div class="article">  
        <img :src="orderLife" class="article-img" alt="">
    </div>
</template>

<script>
import orderLife from './images/orderLife.png'
export default {
    data(){
        return {
            orderLife,
        }
    }
}
</script>

<style lang="scss" scoped>
    .article{
        width: 1100px;
        margin: 0 auto;
        .article-img{
            width: 1100px;
        }
    }
</style>
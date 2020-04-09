<template>
    <div class="article">  
        <img :src="signedOrderProcess" class="article-img" alt="">
    </div>
</template>

<script>
import signedOrderProcess from './images/programProcess.png'
export default {
    data(){
        return {
            signedOrderProcess,
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
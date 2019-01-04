<template>
    <div class="home">
        <v-header :title="'我们的系统'"></v-header>
        <div class="home-contains">
            <div class="banner"></div>
            <div class="hot-service">
                <div class="hot-service-1"></div>
                <div class="hot-service-2"></div>
            </div>
            <div class="hot-service-list">
                <p class=""></p>
                <div 
                    v-for="(item, index) in hotServiceList"
                    :key="index">
                    <img class="service-icon" :src="item.icon" alt="">
                    <p class="service-name">{{item.text}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import header from '../../common/components/header/header.vue'
export default {
    data(){
        return {
            hotServiceList: []
        }
    },
    components: {
        'v-header': header
    }
}
</script>

<style scoped lang="scss">
.home{
    .home-contains{
        padding: .65rem .15rem;
        .banner{
            height:1rem;
            width: 100%;
            border-radius: .06rem;
            background: #185;
        }
    }
}
</style>

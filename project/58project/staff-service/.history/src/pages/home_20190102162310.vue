<template>
    <div class="home">
        <v-header :title="'我们的系统'"></v-header>
        <div class="banner"></div>
        <div class="hot-service">
            <div class="hot-service-1"></div>
            <div class="hot-service-2"></div>
        </div>
        <div class="hot-service-list">
            <div 
                v-for="(item, index) in hotServiceList"
                :key="index">
                <img class="service-icon" :src="item.icon" alt="">
                <p class="service-name">{{item.text}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import header from '../../common/components/header/header.vue'
export default {
    data(){
        return {

        }
    },
    components: {
        'v-header': header
    }
}
</script>

<style scoped>
.home{
    /* background: #f5f5f5;
    min-height: calc(100vh - .7rem);
    width: 100%; */
}
</style>

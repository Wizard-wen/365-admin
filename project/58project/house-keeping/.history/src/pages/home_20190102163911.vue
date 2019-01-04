<template>
    <div class="home">
        <div class="home-search">
            <div class="home-address">
                沈阳
                <img :src="downPic" alt="">
            </div>
            <div class="search-item" @click="goSearch">
                搜索
                <img :src="searchPic" alt="">
            </div>
            
        </div>
        <div class="px-line"></div>
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
import searchPic from './classify/img/search.svg'
import downPic from './home/img/down.svg'
export default {
    data(){
        return {
            hotServiceList: [],
            searchPic,
            downPic,
        }
    },
    methods:{
        /**
         * 跳转搜索页
         */
        goSearch(){
            this.$router.push('/search')
        },
    },
    components: {
        'v-header': header
    }
}
</script>

<style scoped lang="scss">
.home{
    .home-search{
        height: .5rem;
        padding: 0.1rem .3rem;
        display: flex;
        .home-address{
            position: relative;
            height: .3rem;
            width: .6rem;
            line-height: .3rem;
            font-size: .14rem;
            color:#999;
            img{
                position: absolute;
                right: .1rem;
                top: .075rem;
                height: .15rem;
                width:.15rem;
            }
        }
        .search-item{
            height: .3rem;
            flex:1;
            border-radius: .3rem;
            background: #eee;
            line-height: .3rem;
            color: #bfbfbf;
            text-align: center;
            position:relative;
            img{
                position: absolute;
                display: inline-block;
                height: .15rem;
                width: .15rem;
                left: calc(50% - .32rem);
                top: .075rem;
            }
        }
        
    }
    .px-line{
        height: .01rem;
        width: 100%;
        background: #eee;
    }
    .home-contains{
        padding: .15rem .15rem;
        
        .banner{
            height:1.2rem;
            width: 100%;
            border-radius: .06rem;
            background: #185;
        }
    }
}
</style>

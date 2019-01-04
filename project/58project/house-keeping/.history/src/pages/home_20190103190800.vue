<template>
    <Hog-page>
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
                <div class="hot-service-list">
                    <div 
                        class="hot-service-item"
                        v-for="(item, index) in hotServiceList"
                        :key="index">
                        <img class="service-icon" :src="item.icon" alt="">
                        <p class="service-name">{{item.text}}</p>
                    </div>
                </div>
                <div class="px-line"></div>
                <div class="hot-service">
                    <div class="hot-service-1"></div>
                    <div class="hot-service-2"></div>
                </div>
            </div>
        </div>
        <Hog-footer></Hog-footer>
    </Hog-page>
    
</template>

<script>

import searchPic from './classify/img/search.svg'
import downPic from './home/img/down.svg'
export default {
    data(){
        return {
            hotServiceList: [
                {
                    text: '保洁',
                    icon: ''
                },
                {
                    text: '家电清洗',
                    icon: ''
                },
                {
                    text: '家居保养',
                    icon: ''
                },
                {
                    text: '搬家',
                    icon: ''
                },
                {
                    text: '保姆月嫂',
                    icon: ''
                },
            ],
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
    }
}
</script>

<style scoped lang="scss">
.home{
    .home-search{
        height: .5rem;
        padding: 0.1rem .2rem;
        display: flex;
        .home-address{
            position: relative;
            @include textStyle(.3rem, .6rem, .14rem, #999);
            img{
                @include position(absolute, .07rem, .13rem, auto, auto);
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
                display: inline-block;
                @include position(absolute, .075rem, auto, auto, calc(50% - .32rem)); 
                height: .15rem;
                width: .15rem;
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
            margin-bottom: .2rem;
        }
        .hot-service-list{
            height: .65rem;
            width:100%;
            display: flex;
            justify-content: space-between;
            .hot-service-item{
                height: .65rem;
                width: 20%;
                .service-icon{
                    display: block;
                    height: .35rem;
                    width:.35rem;
                    border-radius: 50%;
                    background: #185;
                    margin: 0 auto;
                }
                .service-name{
                    height: .3rem;
                    width: 100%;
                    text-align: center;
                    line-height: .3rem;
                    font-size: .12rem;
                    color:#333;
                }
            }
        }
    }
}
</style>

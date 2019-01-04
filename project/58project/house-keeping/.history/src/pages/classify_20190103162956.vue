<template>
    <Hog-page>
        <div class="classify">
            <div class="classify-search">
                <div class="search-item" @click="goSearch">搜索</div>
                <img :src="searchPic" alt="">
            </div>
            <div class="px-line"></div>
            <div class="classify-contains">
                <div class="classify-list">
                    <div 
                    class="list-item"
                    v-for="(item, index) in classifyList"
                    :key="index"
                    :class="[highIndex == index? 'highItem' : '']"
                    @click="changeHigh(index, item)"
                    >{{item.name}}</div>
                </div>
                <div class="px-line"></div>
                <div class="classify-second">
                    <img class="classify-pic" :src="secondLevel.sliderPic" alt="">
                    <div class="second-level-name">
                        <div 
                            class="level-name" 
                            :style="{width: secondLevel.name.length * 0.2 +'rem'}">
                            <div class="px-line-left" :style="{left: '-'+0.4 + 'rem'}"></div>
                            {{secondLevel.name}}
                            <div class="px-line-right" :style="{right: '-'+0.4 + 'rem'}"></div>
                        </div>
                    </div>
                    <div class="second-level-contains">
                        <div 
                            class="level-item"
                            v-for="(item, index) in secondLevel.typeList"
                            :key="item.name+index">{{item.name}}</div>
                            <div 
                                class="level-item-help"
                                v-for="(i,index1) in (3 - (secondLevel.typeList.length)%3)"
                                :key="i+index1"></div>
                    </div>
                </div>
            </div>
            <router-view></router-view>
        </div>
        <Hog-footer></Hog-footer>
    </Hog-page> 
</template>
<script>
//组件
// import {HogPage, HogFooter, footerConfig} from '../../common/components'

//服务
import classifyService from '../../common/service/classifyService.js'

//资源
import searchPic from './classify/img/search.svg'
export default {
    data(){
        return {
            searchPic,//搜索图片
            classifyList: [],//分类
            highIndex: 0,//高亮的
        }
    },
    methods: {
        /**
         * 跳转分类列表页
         */
        goPage(){
            this.$router.push('/classify/serviceList')
        },
        /**
         * 跳转搜索页
         */
        goSearch(){
            this.$router.push('/search')
        },
        /**
         * 切换分类
         * @param index 索引
         * @param item 该分类的详情
         */
        changeHigh(index, item){
            this.highIndex = index;
        }
    },
    computed:{
        /**
         * 二级目录列表
         */
        secondLevel(){
            let obj = {
                name: '',
                sliderPic: '',
                typeList: [],
                ...this.classifyList[this.highIndex]
            }
            return  obj
        }
    },
    async mounted(){
        this.classifyList = await classifyService.getClassifyList()
    }
}
</script>
<style scoped lang="scss">
    .classify{
        .classify-search{
            height: .5rem;
            padding: 0.1rem .3rem;
            position: relative;
            .search-item{
                height: .3rem;
                width: 80%;
                margin: 0 auto;
                border-radius: .3rem;
                background: #eee;
                line-height: .3rem;
                color: #bfbfbf;
                text-align: center;
            }
            img{
                position: absolute;
                display: inline-block;
                height: .15rem;
                width: .15rem;
                left: calc(50% - .32rem);
                top: .17rem;
            }
        }
        .px-line{
            height: .01rem;
            width: 100%;
            background: #eee;
        }
        .classify-contains{
            &:after{
                content:"";display:block;clear:both;
            }
            .classify-list{
                float: left;
                height: calc(100vh - 1.1rem);
                width: .9rem;
                background: #eee;
                .list-item{
                    height: .4rem;
                    width: 100%;
                    line-height: .4rem;
                    text-indent: .15rem;
                }
                .highItem{
                    position: relative;
                    color: #f31629;
                    font-weight: bold;
                    background: #fff;
                }
                .highItem:after{
                    position: absolute;
                    left: 0;
                    top: .1rem;
                    content: "";
                    display: block;
                    height: .2rem;
                    width: .03rem;
                    background: #f31629;
                }
            }
            .px-line{
                float: left;
                height: calc(100vh - 1.25rem);
                width: .01rem;
                background: #eee;
            }
            .classify-second{
                float : left;
                width: calc(100% - .91rem);
                height: calc(100vh - 1.01rem);
                padding: .2rem .15rem;
                .classify-pic{
                    width: 100%;
                    margin: 0 auto;
                    img{
                        display: inline-block;
                        width: 100%;
                        border-radius: .06rem;
                    }
                }
                .second-level-name{
                    height: .5rem;
                    padding: .15rem 0;
                    .level-name{
                        position: relative;
                        margin: 0 auto;
                        height: .2rem;
                        line-height: .2rem;
                        font-size: .16rem;
                        text-align: center;
                        .px-line-left{
                            position: absolute;
                            height: .015rem;
                            width: .3rem;
                            background: #eee;
                            top: .1rem;
                        }
                        .px-line-right{
                            position: absolute;
                            height: .015rem;
                            width: .3rem;
                            background: #eee;
                            top: .1rem;
                        }
                    }
                }
                .second-level-contains{
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    .level-item{
                        height: .25rem;
                        width: 30%;
                        background: #ccc;
                        line-height: .25rem;
                        text-align: center;
                        color: #333;
                        margin-bottom: .1rem;
                    }
                    .level-item-help{
                        height: .25rem;
                        width: 30%;
                    }
                }
            }
        }
    }
</style>



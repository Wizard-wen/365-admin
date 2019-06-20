<template>
    <Hog-page>
        <div class="search">
            <div class="search-box">
                <img :src="searchPic" alt="">
                <input 
                    type="search" 
                    class="search-input" 
                    :placeholder="hotWords.placeholder" 
                    autofocus="true"
                    @keypress="search">
                <span class="search-cancel" @click="goback">取消</span>
            </div>
            <div class="search-hot">
                <p class="search-title">大家都在搜</p>
                <div class="search-hot-box">
                    <div 
                        class="hot-word"
                        v-for="(item, index) in hotWords.hotWords"
                        :key="index">{{item.name}}</div>
                </div>
            </div>
        </div>
    </Hog-page>
</template>
<script>
/**
 * autofocus 在手机上失效
 */
import searchService from '../../common/service/searchService.js'
import searchPic from './classify/img/search.svg'
export default {
    data(){
        return{
            hotWords: {
                placeholder: '',
                hotWords: []
            },
            searchValue: "",//搜索框内容
            searchPic,//搜索图
        }
    },
    methods: {
        /**
         * 返回上一级菜单
         */
        goback(){
            this.$router.go(-1)
        },
        /**
         * 搜索事件
         */
        async search(e){
            //回车搜索
            if(e.keyCode == 13){
                
                await searchService.searchWord(e.target.value);

                //跳转某页面
                this.$router.push('');
            }
        },
        /**
         * 排序
         * @param obj 待排序对象
         * @param sortRule 排序规则 0 为升序 1为降序
         * @param sortValue 针对这个键名排序
         */
        sort(obj, sortRule, sortValue){
            if(sortRule){}
        }
    },
    async mounted(){
        this.hotWords = await searchService.getHotWords()
    }
}
</script>
<style scoped lang="scss">
    .search{
        
        .search-box{
            position: relative;
            height: .5rem;
            width: 100%;
            padding: .1rem .2rem .1rem .2rem;
            display: flex;
            background: #fff;
            img{
                position: absolute;
                display: inline-block;
                height: .15rem;
                width: .15rem;
                left: .32rem;
                top: .17rem;
            }
            .search-input{
                outline: none;
                padding: 0;
                border-radius: .3rem;
                border: 0;
                height: .3rem;
                line-height: .2rem;
                flex: 1;
                padding-left: .31rem;
                background: #f5f5f5;
                font-size: .16rem;
            }
            .search-cancel{
                height: .3rem;
                line-height: .3rem;
                width: .3rem;
                font-size: .14rem;
                margin-left: .1rem;
                cursor: pointer;
            }
        }
        .search-hot{
            padding: 0.1rem .2rem;
            .search-title{
                height: .4rem;
                line-height: .4rem;
                width: 100%;
                font-size: .14rem;
                color: #c2c2c2
            }
            .search-hot-box{
                display: flex;
                // justify-content: space-between;
                flex-wrap: wrap;
                .hot-word{
                    line-height: .2rem;
                    font-size: .14rem;
                    background: #dadfe1;
                    margin-right: .08rem;
                    margin-bottom: .1rem;
                    padding: .07rem .07rem;
                    color: #333;
                }
            }
        }
    }
</style>



<template>
    <div class="notice">
        <div class="notice-contains"> 
             <component v-bind:is="currentTabComponent"></component>
        </div>
        <div class="backBtn" :title="'返回'" @click="goback">
            <i class="el-icon-back"></i>
        </div>
    </div>
</template>

<script>
import {noticeArticleList} from './noticeArticle/index.js'
export default {
    data(){
        return {
            noticeArticleList,
            currentTabComponent: ''
        }
    },
    methods: {
        goback(){
            this.$router.push('/myCenter/homePage')
        }
    },
    mounted(){
        this.currentTabComponent = this.noticeArticleList.find(item => item.id == this.$route.query.id).component
    }
}
</script>

<style lang="scss" scoped>
    .notice{
        min-height: calc(100vh - 50px);
        width: 100%;
        background: #f0f2f5;
        padding: 24px;
        .notice-contains{
            height: 100%;
            width: 100%;
        }
    }
    .backBtn{
        position: fixed;
        top: 100px;
        right: 50px;
        height: 50px;
        width: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 25px;
        color: #fff;
        background: rgba(0,0,0,.2);
        cursor: pointer;
    }
</style>
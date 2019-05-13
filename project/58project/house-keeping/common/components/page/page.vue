<template>
    <div class="Hog-page">
        
        <div class="Hog-page-header">
            <slot name="header"></slot>
        </div>
        
        <!-- 错误页面 -->
        <template v-if="isError">
            <div class="Hog-page-content">
                <error-page></error-page>
            </div>
        </template>
        <!-- 全局loading页面  -->
        <template v-else-if="isLoading">
            <div class="Hog-page-content">
                <loading-page></loading-page>
            </div>
        </template>
        <!-- 正常页面 -->
        <template v-else>
            <div class="Hog-page-content">
                <slot></slot>
            </div>
        </template>

        <div class="Hog-page-footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>
<script>
import errorPage from './components/errorPage.vue'
import loadingPage from './components/loadingPage.vue'
export default {
    data(){
        return {
            
        }
    },
    props:{
        /**
         * 页面是否出错
         */
        isError: {
            type: Boolean,
            defaulr: false,
        },
        /**
         * 页面是否在加载中
         */
        isLoading: {    
            type: Boolean,
            default: false,
        }

    },
    components: {
        errorPage,
        loadingPage,
    },
}
</script>
<style lang="scss" scoped>
    .Hog-page{
        padding: 0;
        margin: 0;
        min-height: 100vh;
        width: 100%;
        overflow: hidden;

        .Hog-page-header, .Hog-page-footer{
            background: transparent;
            overflow: visible;   
        }
        
        .Hog-page-content{
            position: relative;
            z-index: 2;
            -webkit-overflow-scrolling: touch;
        }
    }
</style>



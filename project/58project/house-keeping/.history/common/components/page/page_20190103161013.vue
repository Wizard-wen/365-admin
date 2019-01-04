<template>
    <div class="Hog-page">
        <div class="Hog-page-header">
            <slot name="header"></slot>
        </div>
            <div class="Hog-page-content">
                <div v-if="isError">
                    <error-page></error-page>
                </div>
                <div v-else-if="!isLoading">
                    <loading-page></loading-page>
                </div>
                <div v-else>
                    <slot></slot>
                </div>
            </div>
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
    components:{
        errorPage,
        loadingPage,
    }
}
</script>
<style lang="scss" scoped>
    .Hog-page{
        padding: 0;
        margin: 0;
        min-height: 100vh;
        width: 100%;
        overflow: hidden;
    }
</style>



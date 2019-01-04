<template>
    <div class="Hog-page">
        <div class="Hog-page-header">
            <slot name="header"></slot>
        </div>
            <div class="c_page_content">
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


        <div class="Hog-page-foooter">
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
    component:{
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



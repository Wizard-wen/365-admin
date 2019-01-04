<template>
    <div class="Hog-page">
        <div class="Hog-page-header">
            <slot name="header"></slot>
        </div>
            <div class="c_page_content">
                <div v-if="isError">
                    <div>
                        <component :is="errorComponent"></component>
                        <div class="c_page_reload" @click="reload()">重新加载</div>
                    </div>
                </div>
                <div v-else-if="!isLoading">
                    <component :is="loadedComponent"></component>
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
export default {
    data(){
        return {

        }
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



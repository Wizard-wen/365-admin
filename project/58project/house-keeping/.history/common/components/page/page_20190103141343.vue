<template>
    <div class="Hog-page">
        <div class="Hog-page-header">
            <slot name="header"></slot>
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



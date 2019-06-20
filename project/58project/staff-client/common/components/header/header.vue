<template>
    <div class="header">
        <div class="header-title">{{title}}</div>
        <div class="px-line"></div>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    props: {
        title: {
            type: String,
            default: ''
        }
    }
}
</script>
<style scoped lang="scss">
    .header{
        height: .5rem;
        width: 100%;
        position: fixed;
        top: 0;
        .header-title{
            font-size: .16rem;
            height: .49rem;
            width: 100%;
            line-height: .49rem;
            text-align: center;
            background: #fff;
        }
        .px-line{
            height: .01rem;
            width: 100%;
            background: #ccc;
        }
    }
</style>



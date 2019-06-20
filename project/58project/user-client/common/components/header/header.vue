<template>
    <div class="header">
        <div v-show="isShowImg" class="back" @click="goBack">后退</div>
        <div class="header-title">{{title}}</div>
        <!-- <div class="px-line"></div> -->
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
        },
        isShowImg: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        goBack(){
            this.$router.go(-1)
        }
    },
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
        .back {
            width: 0.16rem;
            height: 0.16rem;
            position: absolute;
            left: 0.1rem;
        }
    }
</style>



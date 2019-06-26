<template>
    <Hog-page>
        <Hog-header :title="'订单详情'" :isShowImg="true"></Hog-header>
        <div class="orderContent">
            <div class="orderstate">
            <div class="title">订单状态</div>
            <div class="content">已完成</div>
            </div>
            <div class="information">
            <div class="title">订单信息</div>
            <div class="content">

            </div>
            </div>
        </div>
    </Hog-page>
</template>
<script>
    export default {
        data() {
            return {
                list: 4
            }
        },
        methods: {

        },
    }

</script>
<style scoped lang="scss">
    .orderContent {
        height: 100vh;
        background-color: #fff;
        padding: .5rem 0.2rem;
    }

</style>

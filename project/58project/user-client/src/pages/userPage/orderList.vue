<template>
    <Hog-page>
        <Hog-header :title="'我的订单'" :isShowImg="true"></Hog-header>
        <div class="orderList">
            <div v-for="item in list" :key="item.id" class="list">
                <div @click="goOrder">
                    <div>hhhh</div>
                    <div>222222</div>
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
            goOrder(){
                this.$router.push('/orderDetail')
            }
        },
    }

</script>
<style scoped lang="scss">
    .orderList {
        height: 100vh;
        background-color: #fff;
        padding: .5rem 0.2rem;
        .list {
            padding: 0.1rem;
            line-height: 0.2rem;
            border-bottom: 1px solid #f5f5f5;
            display: flex;
            justify-content: space-between;
        }
        img {
            width: 0.2rem;
            height: 0.2rem;
            margin-top: 0.1rem;

        }
    }

</style>

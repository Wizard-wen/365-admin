<template>
    <Hog-page>
        <Hog-header :title="'我的地址'" :isShowImg="true"></Hog-header>
        <div class="address">
            <div v-for="item in list" :key="item.id" class="list">
                <div>
                    <div>hhhh</div>
                    <div>222222</div>
                </div>
                <img src="./img/right.svg" alt="" @click="goCreate">
            </div>
            <div @click="goCreate" class="add" v-show="list.length == 0">添加服务地址</div>
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
            goCreate() {
                this.$router.push('/createAddress')
            }
        },
    }

</script>
<style scoped lang="scss">
    .address {
        height: 100vh;
        background-color: #fff;
        padding: .5rem 0.2rem;
        .add {
            margin: 1rem auto;
            background-color: pink;
            height: 0.4rem;
            line-height: 0.4rem;
            text-align: center;
            border-radius: 0.2rem;
            font-size: 0.16rem;
            color: #fff;
            width: 2rem;
        }
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

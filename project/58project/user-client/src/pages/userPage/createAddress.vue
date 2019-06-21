<template>
    <Hog-page>
        <Hog-header :title="'新增地址'" :isShowImg="true"></Hog-header>
        <div class="createAddress">
            <div class="input">
                <div>联系人</div>
                <input type="text" v-model="name">
            </div>
            <div class="input">
                <div>手机号</div>
                <input type="text" v-model="phone">
            </div>
            <div class="input">
                <div>服务地址</div>
                <input type="text" v-model="address" placeholder="请填写详细地址">
            </div>
            <div class="submit">保存</div>
        </div>
    </Hog-page>
</template>
<script>
    export default {
        data() {
            return {
                name: '',
                phone: '',
                address: ''
            }
        }
    }

</script>
<style scoped lang="scss">
    .createAddress {

        height: 100vh;
        padding: .5rem 0.2rem;
        background-color: #fff;
        .input {
            height: 0.5rem;
            line-height: 0.5rem;
            display: flex;
            justify-content: space-between;
            font-size: 0.14rem;
            margin-top: 0.2rem;
            border-bottom: 1px solid #f5f5f5;
            padding: 0 0.2rem;
        }
        & input {
            outline: none;
            border: 0;
            font-size: 0.14rem;
            padding: 0 0.2rem;
        }
        & .submit {
            padding: 0 0.2rem;
            background-color: pink;
            height: 0.4rem;
            width: 2rem;
            line-height: 0.4rem;
            margin: 0.5rem auto;
            text-align: center;
            border-radius: 0.2rem;
            font-size: 0.16rem;
            color: #fff;
        }
    }

</style>

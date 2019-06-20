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
            <div class="save">保存</div>
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
    .createAddress {
        display: flex;

    }
    .save {
            margin: 1rem auto;
            background-color: pink;
            height: 0.4rem;
            line-height: 0.4rem;
            text-align: center;
            border-radius: 0.2rem;
            font-size: 0.16rem;
            color: #fff;
    }
}

</style>

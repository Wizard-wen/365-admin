<template>
    <div class="login">
        <div class="login-phone" v-if="loginType == 1">
            <div class="phone">
                <p class="phone-number-label">手机号</p>
                <input type="text" placeholder="请输入手机号">
                <p class="code">获取验证码</p>
            </div>
            <div class="check-code">
                <p class="check-code-label"></p>
                <input type="text" placeholder="请输入验证码">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            loginType: 1,//登录方式 1 手机号 2 账号密码
        }
    }
}
</script>

<style scoped lang="scss">

</style>


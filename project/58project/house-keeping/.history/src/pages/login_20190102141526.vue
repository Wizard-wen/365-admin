<template>
    <div class="login">
        <div class="login-phone" v-if="loginType == 1">
            <div class="phone">
                <p class="phone-number-label">手机号</p>
                <input class="phone-number-input" type="text" placeholder="请输入手机号">
                <p class="code">获取验证码</p>
            </div>
            <div class="check-code">
                <p class="check-code-label">验证码</p>
                <input type="text" placeholder="请输入验证码">
            </div>
            <div class="login-btn">立即登录</div>
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
    .login{
        .login-phone{
            padding: .2rem 0 0 .2rem;
            .phone{
                width: 100%;
                height: .5rem;
                display: flex;
                .phone-number-label{
                    height: .5rem;
                    width: .5rem;
                    line-height: .5rem;
                    font-size: .14rem;
                }
                .phone-number-input{

                }
            }
        }
    }
</style>


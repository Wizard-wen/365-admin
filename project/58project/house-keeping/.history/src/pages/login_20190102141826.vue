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
            padding: .2rem 0 0 .15rem;
            .phone{
                width: 100%;
                height: .4rem;
                display: flex;
                .phone-number-label{
                    height: .4rem;
                    width: .4rem;
                    line-height: .4rem;
                    font-size: .14rem;
                }
                .phone-number-input{
                    flex: 1;
                    display: inline-block;
                    height: .4rem;
                    outline: none;
                    border: 0;
                    background: #FFF;
                }
                .code{
                    height: .2rem;
                    width: .4rem;
                    border-radius: .04rem;
                    border:.01rem solid #ccc;
                }
            }
        }
    }
</style>


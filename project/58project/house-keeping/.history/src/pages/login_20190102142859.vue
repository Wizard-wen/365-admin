<template>
    <div class="login">
        <div class="login-phone" v-if="loginType == 1">
            <div class="phone">
                <p class="phone-number-label">手机号</p>
                <input class="phone-number-input" type="text" placeholder="请输入手机号">
                <p class="code">获取验证码</p>
            </div>
            <div class="line-px"></div>
            <div class="check-code">
                <p class="check-code-label">验证码</p>
                <input class="check-code-input" type="text" placeholder="请输入验证码">
            </div>
            <div class="line-px"></div>
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
            padding: .125rem .15rem;
            .phone{
                width: 100%;
                height: .5rem;
                display: flex;
                .phone-number-label{
                    height: .5rem;
                    width: .6rem;
                    line-height: .5rem;
                    font-size: .14rem;
                }
                .phone-number-input{
                    flex: 1;
                    display: inline-block;
                    height: .33rem;
                    outline: none;
                    border: 0;
                    background: #f9f9f9;
                    padding-left: .15rem;
                }
                .code{
                    height: .25rem;
                    line-height: .25rem;
                    width: .8rem;
                    color: #999;
                    font-size: .12rem;
                    text-align:center;
                    border-radius: .04rem;
                    border:.01rem solid #ccc;
                }
            }
            .line-px{
                height: .01rem;
                width:100%;
                background: #ccc;
            }
            .check-code{
                width: 100%;
                height: .5rem;
                display: flex;
                .check-code-label{
                    height: .5rem;
                    width: .6rem;
                    line-height: .5rem;
                    font-size: .14rem;
                }
                .check-code-input{
                    flex: 1;
                    display: inline-block;
                    height: .33rem;
                    outline: none;
                    border: 0;
                    background: #f9f9f9;
                    padding-left: .15rem;
                }
            }
            .line-px{
                height: .01rem;
                width:100%;
                background: #ccc;
            }
        }
    }
</style>


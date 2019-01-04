<template>
    <div class="login">
        <div class="login-phone" v-if="loginType == 1">
            <div class="phone px-line">
                <input class="phone-number-input" type="text" placeholder="请输入手机号">
                <p class="code">获取验证码</p>
            </div>
            
            <div class="check-code">
                <input class="check-code-input" type="text" placeholder="请输入验证码">
                <p class="no-code">没有收到？</p>
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
            padding-top: .5rem; 
            .phone{
                width: 100%;
                height: .5rem;
                padding: .125rem .15rem;
                display: flex;
                background: #fff;
                position:relative;
                .phone-number-input{
                    flex: 1;
                    display: inline-block;
                    height: .25rem;
                    outline: none;
                    border: 0;
                    background: #fff;
                    font-size:.14rem;
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
            .px-line{
                &:after{
                    content: '';
                    position: absolute;
                    height: .01rem;
                    width: 100%;
                    background: #f5f5f5;
                    bottom: 0;
                }
            }
            .check-code{
                width: 100%;
                height: .5rem;
                display: flex;
                padding: .125rem .15rem;
                background: #fff;
                margin-bottom:.2rem;
                .check-code-input{
                    flex: 1;
                    display: inline-block;
                    height: .25rem;
                    outline: none;
                    border: 0;
                    background: #fff;
                    font-size:.14rem;
                }
            }
            .login-btn{
                height: .35rem;
                width: 90%;
                margin: 0 auto;
                background: #ccc;
                line-height: .35rem;
                text-align: center;
                border-radius: .04rem;
                color:#fff;
            }
        }
    }
</style>


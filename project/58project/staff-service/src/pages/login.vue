<template>
    <div class="login" v-loading="is_loading">
        <div class="login-box">
            <div class="line"></div>
            <img class="logo-image" src="./login/images/logo.png" alt="">
            <div class="title">后台业务管理系统</div>
            <el-form ref="form" :rules="rules" :model="form" style="padding: 0 40px;">
                <el-form-item prop="username">
                    <el-input 
                        autocomplete="off" 
                        v-model="form.username" 
                        :maxlength="20" 
                        size="medium" 
                        type="text" 
                        placeholder="请输入用户名"
                        :clearable="true">
                        <!-- <i slot="prefix" class="el-input__icon el-icon-search"></i> -->
                        <img slot="prefix" style="heihgt: 16px;width: 16px;margin:12px 4px; " src="./login/images/user.png" alt="">
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input 
                        autocomplete="off" 
                        v-model="form.password" 
                        ref="password" 
                        :maxlength="20" 
                        size="medium"  
                        type="password"
                        placeholder="请输入密码"
                        :clearable="true">
                        <img slot="prefix" style="heihgt: 16px;width: 16px;margin:12px 4px; " src="./login/images/password.png" alt="">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button style="width: 100%;background: #ff6400;color: #fff;" size="medium" @click="submitForm('form')">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="login-back"></div>
        <div>
            Copyright © 2018 - 2019 365 Inc. All Rights Reserved
        </div>
    </div>
</template>

<script>
import {loginService} from '../../common'
export default {
    data() {
        return {
            is_loading: false,
            form: {
                username: '',
                password: '',
            },
            rules: {
                username: [
                    {required: true, message: '请填写用户名', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '请输入密码', trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        /**
         * 提交登录
         */
        submitForm(formName) {
            let _this = this;
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    this.is_loading = true
                    try{
                        await loginService.getToken(this.form.username, this.form.password).then((data) =>{
                                this.$message({
                                    type: 'success',
                                    message: data.message
                                });
                                _this.$router.push('/');
                            }).catch(error =>{
                                this.$message({
                                    type: 'error',
                                    message: error.message
                                });
                            }).finally(() =>{
                                this.is_loading  = false
                            })
                    }catch(e){
                        this.$message({
                            type: 'error',
                            message: e.message
                        })
                    }
                } else {
                    return false;
                }
            });
        },
        /**
         * 改变input类型
         */
        changeType(){
            this.$refs['password'].type = 'password'
        }
    },
}
</script>

<style lang="scss" scoped>
    .login{
        height :100vh;
        width :100%;
        background: #f2f2f2;
        .login-back{
            position: fixed;
            top: calc(50% - 110px);
            left: 0;
            height: 220px;
            width: 100%;
            background: #ff6400;
        }
        .login-box{
            position: fixed;
            left : calc(50% - 200px);
            top : calc(50% - 160px);
            z-index: 100;
            height : 420px;
            width : 400px;
            background :#fff;
            // border-radius : 6px;
            // padding :50px 30px;
            box-shadow: 0 2px 3px 0 rgba(0,0,0,.2);
            .line{
                height: 10px;
                width: 100%;
                background: #ff6400;
            }
            .logo-image{
                height: 106px;
                width: 200px;
                margin: 10px auto -5px auto;
                display: block;
            }
            .title{
                height: 47px;
                width: 100%;
                text-align: center;
                line-height: 47px;
                font-size: 24px;
                font-weight: 700;
                color: #ff6400;
                margin-bottom: 20px;
            }
        }
    }

</style>



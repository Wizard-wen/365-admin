<template>
    <div class="login" v-loading="isLoaded">
        <div class="login-box">
            <el-form ref="form" :rules="rules" :model="form" label-width="80px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username" size="medium" type="text" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" size="medium" type="password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="medium" @click="submitForm('form')">登录</el-button>
                    <el-button size="medium" @click="resetForm('form')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import {loginService} from '../../common'
export default {
    data() {
        return {
            isLoaded: false,
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
        submitForm(formName) {
            let _this = this;
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    try{
                        this.isLoaded = true
                        await loginService.getToken(this.form.username, this.form.password)
                        this.isLoaded  = false
                        // debugger
                        this.$message({
                            type: 'success',
                            message: '登陆成功！'
                        });
                        
                        _this.$router.push('/');
                    }catch(e){
                        this.$message({
                            type: 'error',
                            message: '登录失败'
                        })
                    }
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
}
</script>

<style lang="scss" scoped>
    .login{
        height :100vh;
        width :100%;
        background: #f2f2f2;
        .login-box{
            height : 280px;
            width : 400px;
            background :#fff;
            position: fixed;
            left : calc(50% - 200px);
            top : calc(50% - 140px);
            border-radius : 6px;
            padding :50px 30px;
            box-shadow: 0 2px 3px 0 rgba(0,0,0,.2);
        }
    }
    
</style>



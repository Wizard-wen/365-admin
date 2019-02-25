<template>
    <div class="account-edit">
        <el-form 
            class="form-style"
            ref="form" 
            :rules="accountRules"
            :model="accountForm" 
            label-width="120px">
            <el-form-item label="账号"  prop="account">
                <el-input v-model="accountForm.account" :disabled="$route.query.type == 1" ></el-input>
            </el-form-item> 
            <el-form-item label="用户名" prop="username">
                <el-input v-model="accountForm.username"></el-input>
            </el-form-item> 
            <el-form-item label="密码" prop="password">
                <el-input v-model="accountForm.password" type="password"></el-input>
            </el-form-item> 
            <el-form-item label="确认密码" prop="repassword">
                <el-input v-model="accountForm.repassword" type="password"></el-input>
            </el-form-item> 
            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button @click="$router.go(-1)">取消</el-button>
            </el-form-item>
        </el-form>   
    </div>
</template>
<script>
import {authService} from '../../../../common'
export default {
    data(){
        const validatePassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.accountForm.repassword !== '') {
                    this.$refs.form.validateField('repassword');
                }
                callback();
            }
        };
        const validateRePassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.accountForm.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            //账户信息
            accountForm: {
                id: this.$route.query.id ? this.$route.query.id : '',
                account: '',
                username: '', //用户名
                password: '', //密码
                repassword: '',//确认密码
            },
            accountRules: {
                password: [
                     { validator: validatePassword, trigger: 'blur' }
                ],
                repassword: [
                     { validator: validateRePassword, trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        
    },
    methods:{
        async onSubmit(){
            let accountObj = {}
            if(this.$route.query.type == 1){
                accountObj = {
                    id: this.$route.query.id,
                    name: this.accountForm.username,
                    password: this.accountForm.password,
                    repassword: this.accountForm.repassword,
                }
            } else {
                accountObj = {
                    account: this.accountForm.account,
                    name: this.accountForm.username,
                    password: this.accountForm.password,
                    repassword: this.accountForm.repassword,
                }
            }
            await authService.editManager(accountObj)
                .then(data =>{
                    if(data.code == '0'){
                        this.$message({
                            type: "success",
                            message: data.message
                        })
                        this.$router.push("/auth/accountList")
                    }
                }).catch(error =>{
                    this.$message({
                        type: "error",
                        message: data.message
                    })
                })
        }
    },
    async mounted(){
        store.commit('setLoading',true)
        try{
            //若是编辑，请求编辑数据
            if(this.$route.query.type == 1){
                await authService.getManager(this.$route.query.id)
                    .then(data =>{
                        console.log(data)
                        this.accountForm.username = data.data.name
                        this.accountForm.account = data.data.account
                    })
            }
        }catch(e){

        }
        store.commit('setLoading',false)
    }
}
</script>
<style lang="scss" scoped>
    .account-edit{
        padding: 30px;
        .form-style{
            width: 600px;
        }
    }
</style>


<template>
    <page-edit-component>
        <el-form
            slot="form"
            class="form-style"
            ref="form"
            :rules="accountRules"
            :model="accountForm"
            label-width="120px">
            <el-form-item label="账号"  prop="account">
                <el-input v-model="accountForm.account" :maxlength="20" :disabled="$route.query.type == 1" ></el-input>
            </el-form-item>

            <el-form-item label="用户名" prop="username">
                <el-input autocomplete="off" v-model="accountForm.username" :maxlength="20"></el-input>
            </el-form-item>

            <el-form-item label="手机号" prop="phone">
                <el-input autocomplete="off" v-model="accountForm.phone" :maxlength="11"></el-input>
            </el-form-item>

            <el-form-item v-if="this.$route.query.type == 1" label="明文密码" prop="clear_password">
                <el-input :maxlength="50" autocomplete="new-password" :disabled="true" v-model="accountForm.clear_password" type="text"></el-input>
                <el-button type="text" @click="isSetPassword=!isSetPassword">{{isSetPassword? '收起' : '密码重置'}}</el-button>
            </el-form-item>

            <div v-if="isSetPassword == true || this.$route.query.type == 0">
                <el-form-item :label="$route.query.type == 1? '重置密码' : '密码'" prop="password">
                    <el-input :maxlength="50" autocomplete="new-password"  v-model="accountForm.password" type="password"></el-input>
                </el-form-item>

                <el-form-item label="确认密码" prop="repassword">
                    <el-input :maxlength="50" v-model="accountForm.repassword" @focus.native="this.type='password'" type="password"></el-input>
                </el-form-item>
            </div>


            <el-form-item label="角色配置" prop="roleIds">
                <select-tag-component :propTagList="roleList" v-model="accountForm.roleIds" :isSingle="false"></select-tag-component>
            </el-form-item>

            <el-form-item label="部门配置" prop="department_id">
                <select-tag-component :propTagList="departmentList" v-model="accountForm.department_id" :isSingle="true"></select-tag-component>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">提交</el-button>
                <el-button @click="$router.go(-1)">取消</el-button>
            </el-form-item>
        </el-form>
    </page-edit-component>
</template>
<script>

import {authService} from '../../../../common'
import {selectTagComponent,pageEditComponent} from '@/pages/components'

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
        const validateAccount = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入账号名'));
            } else {
                callback();
            }
        }
        const validateUsername = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入用户名'));
            } else {
                callback();
            }
        }
        return {
            //账户信息
            accountForm: {
                id: this.$route.query.id ? this.$route.query.id : '',
                account: '',
                phoneL: '',//手机号
                username: '', //用户名
                clear_password: '',//明文密码
                password: '', //密码
                repassword: '',//确认密码
                roleIds: [],
                department_id: 0
            },
            accountRules: {
                account: [
                    { validator: validateAccount, trigger: 'blur' }
                ],
                username: [
                    { validator: validateUsername, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePassword, trigger: 'blur' }
                ],
                repassword: [
                    { validator: validateRePassword, trigger: 'blur' }
                ]
            },
            roleList: [],//角色id
            isSetPassword: false,//是否展示设置密码
        }
    },
    components: {
        selectTagComponent,
        pageEditComponent
    },
    computed: {
        /**
         * 部门信息
         */
        departmentList(){
            return this.$store.state.authModule.departmentList
        }
    },
    methods:{
        /**
         * 提交数据
         */
        async onSubmit(formName){
            let accountObj = {
                id: this.$route.query.id,
                account: this.accountForm.account, //编辑状态不可修改

                name: this.accountForm.username,
                password: this.accountForm.password,
                repassword: this.accountForm.repassword,
                roleIds: this.accountForm.roleIds,
                department_id: this.accountForm.department_id
            } //

            await this.$refs[formName].validate((valid) => {
                if (valid) {
                    authService.editManager(accountObj)
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
                            message: error.message
                        })
                    })
                } else {
                    return false;
                }
            });
        }
    },
    async mounted(){
        store.commit('setLoading',true)
        try{
            let managerId = this.$route.query.id?this.$route.query.id: '' //判断是不是有id

            await authService.getManager(managerId).then(data =>{
                console.log(data)
                if(data.code == '0'){
                    //全部角色列表
                    this.roleList =  data.data.roleList

                    //账户表单配置项
                    this.accountForm.roleIds = data.data.manager.roleIds
                    this.accountForm.username = data.data.manager.name
                    this.accountForm.account = data.data.manager.account
                    this.accountForm.clear_password = data.data.manager.clear_password
                    this.accountForm.department_id = data.data.manager.department_id
                }

            }).catch(error =>{
                if(error.code == "1"){
                    this.$message({
                        type: 'error',
                        message: error.message
                    })
                    this.$router.push('/auth/accountList')
                }
            }).finally(() =>{
                store.commit('setLoading',false)
            })
        } catch(error){
            this.$message({
                type: 'error',
                message: error.message
            })
        }
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


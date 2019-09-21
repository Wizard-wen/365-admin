<template>
    <page-edit-component
        :title="'账户配置'">
        <template slot="control">
            <el-button size="mini" @click="goback">返回</el-button>
            <el-button size="mini" @click="onSubmit('form')">修改</el-button>
        </template>

        
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

            <el-form-item label="工号"  prop="staff_code">
                <el-input v-model="accountForm.staff_code" :maxlength="20" :disabled="$route.query.type == 1" ></el-input>
            </el-form-item>

            <el-form-item label="真实姓名" prop="real_name">
                <el-input autocomplete="off" v-model="accountForm.real_name" ></el-input>
            </el-form-item>

            <el-form-item label="角色配置" prop="roleIds">
                <select-tag-component :propTagList="roleList" v-model="accountForm.roleIds" :isSingle="false"></select-tag-component>
            </el-form-item>

            <el-form-item label="部门配置" prop="department_id">
                <select-tag-component :propTagList="departmentList" v-model="accountForm.department_id" :isSingle="true"></select-tag-component>
            </el-form-item>

            <!-- <el-form-item v-if="this.$route.query.type == 1" label="明文密码" prop="clear_password">
                <el-input :maxlength="50" autocomplete="new-password" :disabled="true" v-model="accountForm.clear_password" type="text"></el-input>
                <el-button type="text" @click="isSetPassword=!isSetPassword">{{isSetPassword? '收起' : '密码重置'}}</el-button>
            </el-form-item> -->

            <div v-if="this.$route.query.type == 0">
                <el-form-item label="密码" prop="password">
                    <el-input :maxlength="50" autocomplete="new-password"  v-model="accountForm.password" type="password"></el-input>
                </el-form-item>

                <el-form-item label="确认密码" prop="repassword">
                    <el-input :maxlength="50" v-model="accountForm.repassword" @focus.native="this.type='password'" type="password"></el-input>
                </el-form-item>
            </div>

            <el-form-item label="用户名" prop="name">
                <el-input autocomplete="off" v-model="accountForm.name" :maxlength="20"></el-input>
            </el-form-item>

            <el-form-item label="手机号" prop="phone">
                <el-input autocomplete="off" v-model="accountForm.phone" :maxlength="11"></el-input>
            </el-form-item>

            <el-form-item label="生日" prop="phone">
                <el-date-picker
                    v-model="accountForm.birthday"
                    :picker-options="pickerOptions"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="timestamp"></el-date-picker>
            </el-form-item>

            
            <el-form-item label="邮箱" prop="email">
                <el-input autocomplete="off" v-model="accountForm.email"></el-input>
            </el-form-item>

            <el-form-item label="微信号" prop="wechat">
                <el-input autocomplete="off" v-model="accountForm.wechat"></el-input>
            </el-form-item>
            
            <el-form-item label="个人简介" prop="personal_intro">
                <el-input autocomplete="off" type="textarea" v-model="accountForm.personal_intro"></el-input>
            </el-form-item>
            
            <el-form-item label="紧急联系人" prop="urgent">
                <el-input autocomplete="off" v-model="accountForm.urgent"></el-input>
            </el-form-item>
            
            <el-form-item label="现住址" prop="current_address">
                <el-input autocomplete="off" v-model="accountForm.current_address"></el-input>
            </el-form-item>





            <el-form-item>
                <el-button type="primary" size="medium" @click="onSubmit('form')">提交</el-button>
                <el-button size="medium" @click="goback">取消</el-button>
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
                account: '',//账号
                staff_code: '',//工号
                real_name: '',//真实姓名
                roleIds: [],//角色
                department_id: 0,//部门
                password: '', //密码
                repassword: '',//确认密码

                name: '', //用户名
                phone: '',//手机号
                birthday: 0,//生日
                email: '',//邮箱
                wechat: '',//微信
                personal_intro: '',//个人简介
                urgent: '',//紧急联系人
                current_address: '',//现住址          
            },
            accountRules: {
                account: [
                    { validator: validateAccount, trigger: 'blur' }
                ],
                name: [
                    { validator: validateUsername, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePassword, trigger: 'blur' }
                ],
                repassword: [
                    { validator: validateRePassword, trigger: 'blur' }
                ]
            },
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                },
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
            
            await this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    store.commit('setLoading',true)
                    try {
                        await authService.editManager(this.accountForm).then(data =>{
                            if(data.code == '0'){
                                this.$message({
                                    type: "success",
                                    message: data.message
                                })
                                // store.commit('setLoading',false)
                                this.$router.push("/auth/accountList")
                            }
                        }).catch(error =>{
                            this.$message({
                                type: "error",
                                message: error.message
                            })
                            store.commit('setLoading',false)
                        }).finally(() =>{
                            store.commit('setLoading',false)
                        })
                    } catch (error) {
                        this.$message({
                            type: "error",
                            message: error.message
                        })
                        store.commit('setLoading',false)
                    }
                } else {
                    return false;
                }
            });
        },
        goback(){
            this.$router.push('/auth/accountList')
        }
    },
    async mounted(){
        store.commit('setLoading',true)
        try{
            let managerId = this.$route.query.id?this.$route.query.id: '' //判断是不是有id

            await authService.getManager(managerId).then(data =>{
                if(data.code == '0'){
                    //全部角色列表
                    this.roleList =  data.data.roleList

                    //账户表单配置项
                    this.accountForm = data.data.manager
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


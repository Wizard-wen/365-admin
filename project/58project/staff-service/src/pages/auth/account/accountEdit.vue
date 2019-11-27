<template>
    <page-edit-component
        :title="accountForm.real_name">
        <template slot="control">
            <el-button size="mini" @click="goback">返回</el-button>
            <el-button size="mini" type="primary" @click="onSubmit('form')">修改</el-button>
        </template>

        <template slot="icon">
            <div class="icon">
                <img style="height: 120px;width: 120px;" :src="`./resource/${accountForm.icon}`" alt="" v-if="accountForm.icon">
                <div class="no-icon-style" v-else>暂无头像</div>
            </div>
        </template>
        <template slot="detail">
            <div class="detail-left">
                <div class="detail-left-box">
                    <div class="detail-left-line">账号：{{accountForm.account}}</div>
                    <div class="detail-left-line">工号：{{accountForm.manager_code}}</div>
                </div>
            </div>
        </template>
        <template slot="form" >
            <el-form            
                ref="form"
                style="width: 760px;"
                :rules="accountRules"
                :model="accountForm"
                label-width="120px">

                <el-form-item v-if="!accountForm.id" label="账号" prop="account">
                    <el-input autocomplete="off" v-model="accountForm.account" ></el-input>
                </el-form-item>

                <!-- <el-form-item v-if="!accountForm.id" label="工号" prop="manager_code">
                    <el-input autocomplete="off" v-model="accountForm.manager_code" ></el-input>
                </el-form-item> -->

                <el-form-item label="真实姓名" prop="real_name">
                    <el-input autocomplete="off" v-model="accountForm.real_name" ></el-input>
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

                <el-form-item label="邮箱" prop="email">
                    <el-input autocomplete="off" v-model="accountForm.email"></el-input>
                </el-form-item>

                <el-form-item label="微信号" prop="wechat">
                    <el-input autocomplete="off" v-model="accountForm.wechat"></el-input>
                </el-form-item>

                <el-form-item label="角色配置" prop="roleIds">
                    <select-tag-component :propTagList="roleList" v-model="accountForm.roleIds" :isSingle="false"></select-tag-component>
                </el-form-item>

                <el-form-item label="部门配置" prop="department_id">
                    <select-tag-component :propTagList="departmentList" v-model="accountForm.department_id" :isSingle="true"></select-tag-component>
                </el-form-item>
                
                <el-form-item label="个人简介" prop="personal_intro">
                    <el-input autocomplete="off" type="textarea" v-model="accountForm.personal_intro"></el-input>
                </el-form-item>

                <el-form-item label="生日" prop="birthday">
                    <el-date-picker
                        v-model="accountForm.birthday"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="timestamp"></el-date-picker>
                </el-form-item>
                
                <el-form-item label="头像" class="form-item-size">
                    <upload-single-picture-component
                        :pictureUrl="accountForm.icon"
                        @singlePictureUploadSucess="uploadIconSuccess"></upload-single-picture-component>
                </el-form-item>

                <el-form-item label="紧急联系人" prop="urgent">
                    <el-input autocomplete="off" v-model="accountForm.urgent"></el-input>
                </el-form-item>
                
                <el-form-item label="现住址" prop="current_address">
                    <el-input autocomplete="off" v-model="accountForm.current_address"></el-input>
                </el-form-item>





                <el-form-item>
                    <el-button type="primary" size="medium" @click="onSubmit('form')">修改</el-button>
                    <el-button size="medium" @click="goback">取消</el-button>
                </el-form-item>
            </el-form>
        </template>
        
    </page-edit-component>
</template>
<script>

import {authService} from '@common/index.js'


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
        const checkPhone = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('手机号不能为空'));
            } else {
                const reg = /^1[0-9][0-9]\d{8}$/
                if (reg.test(value)) {
                    callback();
                } else {
                    return callback(new Error('请输入正确的手机号'));
                }
            }
        }
        return {
            is_loading: false,
            //账户信息
            accountForm: {
                id: this.$route.query.id ? this.$route.query.id : '',
                account: '',//账号
                real_name: '',//真实姓名
                roleIds: [],//角色
                department_id: 0,//部门
                password: '', //密码
                repassword: '',//确认密码

                name: '', //用户名
                phone: '',//手机号
                birthday: this.getNowTime(),//生日
                icon: '',//头像
                email: '',//邮箱
                wechat: '',//微信
                personal_intro: '',//个人简介
                urgent: '',//紧急联系人
                current_address: '',//现住址          
            },
            accountRules: {
                account: [
                    {required: true, message: '请填写账号',trigger: 'blur',},
                ],
                name: [
                    {required: true, message: '请填写用户名',trigger: 'blur',},
                ],
                real_name: [
                    {required: true, message: '请填写真实姓名',trigger: 'blur',},
                ],
                phone: [
                    {required: true, message: '请填写用户电话',trigger: 'blur',},
                    {validator: checkPhone},
                ],
                password: [
                    {required: true, message: '请输入密码',trigger: 'blur',},
                    { validator: validatePassword, trigger: 'blur' }
                ],
                repassword: [
                    {required: true, message: '请再次输入密码',trigger: 'blur',},
                    { validator: validateRePassword, trigger: 'blur' }
                ],
                wechat: [
                    {required: true, message: '请输入微信号', trigger: 'blur'},
                ]
            },
            // pickerOptions: {
            //     disabledDate(time) {
            //         return time.getTime() < Date.now() - 8.64e7;
            //     },
            // },
            roleList: [],//角色id
            isSetPassword: false,//是否展示设置密码
        }
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
        /**
         * 获取当前账号信息
         */
        async getManager(){
            try{
                this.is_loading = true
                let managerId = this.$route.query.id? this.$route.query.id : 0
                await authService.getManager(managerId).then(data =>{
                    if(data.code == '0'){
                        if(managerId){
                            //账户表单配置项
                            this.accountForm = data.data.manager
                        }
                        //全部角色列表
                        this.roleList =  data.data.roleList
                    }
                }).catch(error =>{
                    if(error.code == "1"){
                        this.$message({
                            type: 'error',
                            message: error.message
                        })
                        this.is_loading = false
                        this.$router.push('/auth/accountList')
                    }
                }).finally(() =>{
                    this.is_loading = false
                })
            } catch(error){
                this.$message({
                    type: 'error',
                    message: error.message
                })
                this.is_loading = false
            }
        },
        /**
         * 返回上一级
         */
        goback(){
            this.$router.push('/auth/accountList')
        },
        //头像上传成功
        uploadIconSuccess(param) {
            this.accountForm.icon = param;
            this.accountForm.icon_url = param;
        },
        //处理默认选中当前日期
	    getNowTime() {
	       var now = new Date();
	       var year = now.getFullYear(); //得到年份
	       var month = now.getMonth(); //得到月份
	       var date = now.getDate(); //得到日期
	       var hour =" 00:00:00"; //默认时分秒 如果传给后台的格式为年月日时分秒，就需要加这个，如若不需要，此行可忽略
	       month = month + 1;
	       month = month.toString().padStart(2, "0");
	       date = date.toString().padStart(2, "0");
	       var defaultDate = `${year}-${month}-${date}${hour}`;

	       return defaultDate;
	    },
    },
    async mounted(){
        await this.getManager()
    }
}
</script>
<style lang="scss" scoped>
    .account-edit{
        padding: 30px;
    }
    .no-icon-style{
        height: 120px;
        width: 120px;
        line-height: 120px;
        text-align: center;
        color: #fff;
        background: rgba(0,0,0,0.3)
    }
    .detail-left{
        flex:1;
        .detail-left-box{
            display: flex;
            flex-wrap: wrap;
            .detail-left-line{
                width: 50%;
                color: rgba(0,0,0,.65);
                line-height: 20px;
                padding-bottom: 8px;
            }
        }
    }
    .detail-right{
        min-width: 400px;
        display: flex;
        .right-box{
            height: 80px;
            width: 50%;
            .title{
                color: rgba(0,0,0,.45);
                font-size: 14px;
                line-height: 1.5;
            }
            .value{
                font-size: 20px;
                color: rgba(0,0,0,.85);
                line-height: 1.5;
            }
        }
    }
.icon-uploader{
    height: 178px;
    width: 178px;
    & /deep/ .el-upload {
        height: 178px;
        width: 178px;
        line-height: 178px;
    }
}
</style>


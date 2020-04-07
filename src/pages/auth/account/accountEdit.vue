<template>
    <page-edit-component
        v-loading="is_loading"
        :title="accountForm.real_name">
        <template slot="control">
            <el-button size="mini" @click="goback">返回</el-button>
            <el-button size="mini" type="primary" @click="onSubmit('form')">
                {{this.$route.query.type == 0? '创建' : '修改'}}
            </el-button>
        </template>

        <template slot="icon">
            <icon-component
                :iconUrl="accountForm.icon?`/${accountForm.icon}`:''"
                :height="140"
                :width="100"></icon-component>
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
            <el-form class="account" ref="form" :rules="accountRules" :model="accountForm" label-width="120px">
                <card-box-component 
                :title="'基本信息'">
                    <div slot="contains" class="contains-form">
                        <el-form-item v-if="!accountForm.id" prop="account">
                            <el-tooltip slot="label" class="item" effect="dark" content="账号通常为姓名全拼" placement="top-start">
                                <span>账号<i class="el-icon-info"></i></span>
                            </el-tooltip>
                            <el-input autocomplete="off" v-model="accountForm.account" placeholder="请输入账号，格式通常为姓名全拼"></el-input>
                        </el-form-item>

                        <el-form-item prop="real_name">
                            <el-tooltip slot="label" class="item" effect="dark" content="请务必输入真实姓名" placement="top-start">
                                <span>真实姓名<i class="el-icon-info"></i></span>
                            </el-tooltip>
                            <el-input autocomplete="off" v-model="accountForm.real_name" placeholder="请输入真实姓名"></el-input>
                        </el-form-item>

                        <div v-if="this.$route.query.type == 0">
                            <el-form-item label="密码" prop="password">
                                <el-input :maxlength="50" autocomplete="new-password" placeholder="请输入密码" v-model="accountForm.password" type="password"></el-input>
                            </el-form-item>

                            <el-form-item label="确认密码" prop="repassword">
                                <el-input 
                                    :maxlength="50" type="password" placeholder="请重新输入密码"
                                    v-model="accountForm.repassword"  
                                    @focus.native="this.type='password'" ></el-input>
                            </el-form-item>
                        </div>

                        <el-form-item prop="name">
                            <el-tooltip slot="label" class="item" effect="dark" content="用户名应为部门+真实姓名" placement="top-start">
                                <span>用户名<i class="el-icon-info"></i></span>
                            </el-tooltip>
                            <el-input autocomplete="off" v-model="accountForm.name" placeholder="请输入用户名，格式为部门+真实姓名" :maxlength="20"></el-input>
                        </el-form-item>

                        <el-form-item label="手机号" prop="phone">
                            <el-input autocomplete="off" v-model="accountForm.phone" placeholder="请输入手机号" :maxlength="11"></el-input>
                        </el-form-item>

                        <el-form-item label="邮箱" prop="email">
                            <el-input autocomplete="off" v-model="accountForm.email" placeholder="请输入邮箱"></el-input>
                        </el-form-item>

                        <el-form-item label="微信号" prop="wechat">
                            <el-input autocomplete="off" v-model="accountForm.wechat" placeholder="请输入微信号"></el-input>
                        </el-form-item>

                        <el-form-item label="角色配置" prop="roleIds">
                            <el-select 
                                v-model="accountForm.roleIds" 
                                placeholder="请选择技能证书"
                                filterable multiple>
                                <el-option
                                    v-for="item in roleList"
                                    :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        
                        <el-form-item label="部门配置" prop="department_id">
                            <el-select 
                                v-model="accountForm.department_id" 
                                placeholder="请选择技能证书"
                                filterable>
                                <el-option
                                    v-for="item in departmentList"
                                    :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-alert
                            title="决不能同时兼具运营和销售两种身份"
                            type="error"
                            :closable="false"></el-alert>
                        </el-form-item>
                        
                        <el-form-item>
                             <el-table :data="roleDesList" border style="width: 100%">
                                 <el-table-column prop="name" label="身份" ></el-table-column>
                                <el-table-column prop="department" label="所属部门" >
                                    <template slot-scope="scope">
                                        <el-tag size="small" v-for="(item ,index) in scope.row.department" :key="index">{{item}}</el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="roles" label="角色提示">
                                    <template slot-scope="scope">
                                        <el-tag size="small" v-for="(item ,index) in scope.row.roles" :key="index">{{item}}</el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="des" label="描述"></el-table-column>
                            </el-table>
                        </el-form-item>
                        
                        <el-form-item label="个人简介" prop="personal_intro">
                            <el-input autocomplete="off" type="textarea" placeholder="请输入个人简介" v-model="accountForm.personal_intro"></el-input>
                        </el-form-item>

                        <el-form-item label="生日" prop="birthday">
                            <el-date-picker
                                v-model="accountForm.birthday"
                                :default-value="new Date()"
                                :picker-options="pickerOptions"
                                type="date"
                                placeholder="请选择生日"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="timestamp"></el-date-picker>
                        </el-form-item>
                        
                        <el-form-item label="头像" class="form-item-size">
                            <single-picture-upload
                                :uploadHeader="customizeUploadHeader"
                                :height="140"
                                :width="100"
                                :initUrl="accountForm.icon?`${accountForm.icon}`:''"
                                @onSinglePictureSuccess="onIconPictureSuccess"></single-picture-upload>
                        </el-form-item>

                        <el-form-item label="紧急联系人" prop="urgent">
                            <el-input autocomplete="off" placeholder="请输入紧急联系人" v-model="accountForm.urgent"></el-input>
                        </el-form-item>
                        
                        <el-form-item label="现住址" prop="current_address">
                            <el-input autocomplete="off" placeholder="请输入现住址" v-model="accountForm.current_address"></el-input>
                        </el-form-item>
                    </div>
                </card-box-component>

                <el-form-item>
                    <el-button type="primary" size="medium" @click="onSubmit('form')">修改</el-button>
                    <el-button size="medium" @click="goback">取消</el-button>
                </el-form-item>
            </el-form>
        </template>
        
    </page-edit-component>
</template>
<script>

import {authService} from '@/service/auth'

import {departmentList} from '@/pages/myCenter/ImyCenter'
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
            // 日期选择器设置为只能选择今天之前的日子
            pickerOptions: {
                disabledDate(time) {
                    var times = Date.now() - 24 * 60 * 60 * 1000;
                    return time.getTime() > times;
                }
            },
            roleDesList:[
                {
                    name: '销售人员',
                    department: ['门店','加盟店'],
                    roles:['直营店经理','直营店销售专员','加盟店销售专员','加盟店经理'],
                    des: '销售人员是指在各个门店工作的安置老师，角色只能是这四种其中之一。'
                },
                {
                    name: '运营人员',
                    department: ['运营中心'],
                    roles:['运营经理','运营专员'],
                    des: '运营人员'
                },

            ],
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
                birthday: '',//生日
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
            departmentList,
            roleList: [],//角色id
            isSetPassword: false,//是否展示设置密码
        }
    },
    methods:{
        /**
         * 提交数据
         */
        async onSubmit(formName){
            
            await this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    try {
                        this.is_loading = true
                        await authService.editManager(this.accountForm).then(data =>{
                            if(data.code == '0'){
                                this.$message({
                                    type: "success",
                                    message: data.message
                                })
                                this.is_loading = false
                                this.$router.push("/auth/accountList")
                            }
                        }).catch(error =>{
                            this.$message({
                                type: "error",
                                message: error.message
                            })
                            this.is_loading = false
                        }).finally(() =>{
                            this.is_loading = false
                        })
                    } catch (error) {
                        this.$message({
                            type: "error",
                            message: error.message
                        })
                        this.is_loading = false
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
                        this.is_loading = false
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
        onIconPictureSuccess(res) {
            this.accountForm.icon = res.path;
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
.contains-form{
    max-width: 900px; 
}
.account{
    width: 100%;
}
</style>


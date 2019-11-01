<template>
    <div class="my-setting" v-loading="is_loading" >
        <div class="my-setting-contains">
            <el-tabs v-model="currentTabPosition" :tab-position="tabPosition" @tab-click="changeTab">
                <el-tab-pane label="员工基本信息" name="basic">
                    <detail-form-component>
                        <detail-form-item-component
                            :label="'账号'"
                            :size="1"
                            :value="baseForm.account">
                        </detail-form-item-component>
                        <detail-form-item-component
                            :label="'工号'"
                            :size="1"
                            :value="baseForm.manager_code">
                        </detail-form-item-component>
                        <detail-form-item-component
                            :label="'真实姓名'"
                            :size="1"
                            :value="baseForm.real_name">
                        </detail-form-item-component>
                        <detail-form-item-component
                            :label="'所属部门'"
                            :size="1"
                            :value="baseForm.department_id">
                            <select-tag-component 
                                slot="define"
                                v-if="baseForm.department_id"
                                :isEdit="false" 
                                :propTagList="departmentList" 
                                v-model="baseForm.department_id" 
                                :isSingle="true"></select-tag-component>
                        </detail-form-item-component>
                    </detail-form-component>
                </el-tab-pane>
                <el-tab-pane label="员工个人信息" name="personal">
                    <el-form label-width="120px" ref="personalInfoForm" :rules="personalInfoRules" :model="personalInfoForm" class="publicForm personalInfoForm">

                        <el-form-item label="用户名" prop="name">
                            <el-input autocomplete="off" v-model="personalInfoForm.name"  placeholder="请输入用户名"></el-input>
                        </el-form-item>
                        <el-form-item label="头像" class="form-item-size">
                            <upload-single-picture-component
                                :pictureUrl="personalInfoForm.icon"
                                @singlePictureUploadSucess="uploadIconSuccess"></upload-single-picture-component>
                        </el-form-item>

                        <el-form-item label="手机号" prop="phone">
                            <el-input autocomplete="off" v-model="personalInfoForm.phone"  placeholder="请输入手机号"></el-input>
                        </el-form-item>

                        <el-form-item label="生日" prop="birthday">
                            <el-date-picker  
                                :default-value="timeDefaultShow"
                                v-model="personalInfoForm.birthday" 
                                value-format="timestamp" 
                                type="date" 
                                placeholder="请选择出生日期"></el-date-picker>
                        </el-form-item>

                        <el-form-item label="邮箱" prop="email">
                            <el-input autocomplete="off" v-model="personalInfoForm.email"  placeholder="请输入邮箱"></el-input>
                        </el-form-item>

                        <el-form-item label="微信号" prop="wechat">
                            <el-input autocomplete="off" v-model="personalInfoForm.wechat" placeholder="请输入微信号"></el-input>
                        </el-form-item>

                        <el-form-item label="现住址" prop="current_address">
                            <el-input v-model="personalInfoForm.current_address" placeholder="请输入现住址"></el-input>
                        </el-form-item>

                        <el-form-item label="紧急联系人" prop="urgent">
                            <el-input v-model="personalInfoForm.urgent" placeholder="请输入紧急联系人"></el-input>
                        </el-form-item>

                        <el-form-item label="个人简介" prop="personal_intro">
                            <el-input type="textarea" v-model="personalInfoForm.personal_intro" placeholder="请输入个人简介"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="changePersonalInfo('personalInfoForm')">确认更改</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="更改密码">
                    <el-form label-width="120px" ref="passwordChangeForm" :rules="passwordChangeRules" :model="passwordChangeForm" class="publicForm passwordChangeForm">
                        <el-form-item label="原密码" prop="password">
                            <el-input type="password" v-model="passwordChangeForm.password" placeholder="请输入原密码"></el-input>
                        </el-form-item>
                        <el-form-item label="新密码" prop="newPassword">
                            <el-input type="password" v-model="passwordChangeForm.newPassword" placeholder="请输入新密码"></el-input>
                        </el-form-item>
                        <el-form-item label="确认新密码" prop="reNewPassword">
                            <el-input type="password" v-model="passwordChangeForm.reNewPassword" placeholder="请再次输入新密码"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="changePassword('passwordChangeForm')">确认更改</el-button>
                            <el-button  @click="resetNewPasswordForm">重置</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>  
        </div>
        
    </div>
</template>
<script>
import {myCenterService} from '../../../common/index.js'
import {selectTagComponent} from '@/pages/components/index.js'
   export default {
    data() {
        let _this = this;
        const validate = {
            //新密码
            newPassword(rule, value, callback){
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (_this.passwordChangeForm.reNewPassword !== '') {
                        _this.$refs.passwordChangeForm.validateField('reNewPassword');
                    }
                    callback();
                }
            },
            //重复密码
            reNewPassword(rule, value, callback) {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== _this.passwordChangeForm.newPassword) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            }
        }
        return {
            is_loading: false,
            //tab位置
            tabPosition: 'left',
            //tab当前所在页
            currentTabPosition: 'basic',
            datePickerOption: {
                disabledDate(time) {
                    return time.getTime() > Date.now();//如果没有后面的-8.64e6就是不可以选择今天的
                }
            },
            /**
             * 更改密码字段
             */
            passwordChangeForm: {
                password: '',//原始密码
                newPassword: '',//新密码
                reNewPassword: '',//确认新密码
            },
            /**
             * 更改密码表单验证
             */
            passwordChangeRules: {
                password: [
                    {required: true, message: '请输入原始密码', trigger: 'blur'}
                ],
                newPassword: [
                    {required: true, message: '请输入密码', trigger: 'blur'},
                    {validator: validate.newPassword, trigger: 'blur'}
                ],
                reNewPassword: [
                    {required: true, message: '请再次输入密码', trigger: 'blur'},
                    {validator: validate.reNewPassword, trigger: 'blur'}
                ],
            },
            //账号基本信息
            baseForm: {
                get_for: 'basic',
                account: '',//账号
                manager_code: '',//员工号
                real_name: '',//真实姓名
                department_id: '',//所属部门
            },
            //用户个人信息
            personalInfoForm: {
                get_for: 'personal',
                name: '',//用户名
                phone: '',//手机号
                birthday: null,//生日
                email: '',//邮箱
                wechat: '',//微信
                personal_intro: '',//个人简介
                urgent: '',//紧急联系人
                current_address: '',//现住址
                icon: '',//头像
                icon_url: '',
            },
            //个人信息表单验证
            personalInfoRules: {
                name: [
                    {required: true, message: '请输入用户名', trigger: 'blur'}
                ],
                phone: [
                    {required: true, message: '请输入手机号', trigger: 'blur'}
                ],
                wechat: [
                    {required: true, message: '请输入微信号', trigger: 'blur'}
                ],
            },
            //时间选择器默认时间
            timeDefaultShow:'',
        };
    },
    components: {
        selectTagComponent,
    },
    computed: {
        /**
         * 当前用户信息
         */
        presentUser(){
            return this.$store.state.loginModule.user
        },
        /**
         * 部门信息
         */
        departmentList(){
            return this.$store.state.authModule.departmentList
        }
    },
    methods: {
        /**
         * 切换tag 请求数据
         */
        async changeTab(param){
            if(param.name){
                try{
                    this.is_loading = true
                    await myCenterService.getPersonal(this.presentUser.id, param.name).then(data =>{
                        //若当前标签页是基本信息
                        if(param.name == 'basic'){
                            this.baseForm = data.data
                        } else {
                            //赋值给个人信息
                            this.personalInfoForm = {
                                ...this.personalInfoForm,
                                ...data.data,
                                icon_url: '',
                            }
                        }
                    }).catch(error =>{
                        this.$message({
                            type: 'error',
                            message: error.message
                        })
                        this.is_loading = false
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
            } else {
                return 
            }
        },
        /**
         * 更改用户信息
         */
        async changePersonalInfo(formName){
            await this.$refs[formName].validate(async valid =>{
                if(valid){
                    try{
                        this.is_loading = true
                        //定义用户信息传输字段
                        let sendPersonalInfoObject = {
                            ...this.personalInfoForm,
                            icon: this.personalInfoForm.icon_url
                        }

                        await myCenterService.editPersonal(sendPersonalInfoObject).then(data =>{
                            if(data.code == '0'){
                                this.$message({
                                    type: 'success',
                                    message: data.message
                                })
                                this.is_loading = false
                            }
                        }).catch(error =>{
                            this.$message({
                                type: 'error',
                                message: error.message
                            })
                            this.is_loading = false
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
                } else {
                    return false
                }
            })
        },
        /**
         * 更改密码
         */
        async changePassword(formName){
            let _this = this;
            await this.$refs[formName].validate(async valid =>{
                if(valid){
                    try{
                        this.is_loading = true
                        this.passwordChangeForm = {
                            ...this.passwordChangeForm,
                            id: _this.presentUser.id
                        }
                        await myCenterService.changePassword(this.passwordChangeForm).then(data =>{
                            if(data.code == '0'){
                                this.$message({
                                    type: 'success',
                                    message: data.message
                                })
                                //清空更改密码表单
                                this.resetNewPasswordForm()
                                
                                this.is_loading = false
                            }
                        }).catch(error =>{
                            this.$message({
                                type: 'error',
                                message: error.message
                            })
                            this.is_loading = false
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
                } else {
                    return false
                }
            })
        },
        /**
         * 重置更改密码表单
         */
        resetNewPasswordForm(){
            this.passwordChangeForm.password = ''
            this.passwordChangeForm.newPassword = ''
            this.passwordChangeForm.reNewPassword = ''
        },
        //头像上传成功
        uploadIconSuccess(param) {
            this.personalInfoForm.icon = param;
            this.personalInfoForm.icon_url = param;
        },
    },
    async mounted(){
        this.timeDefaultShow = Date.parse(new Date());
        try{
            this.is_loading = true
            await myCenterService.getPersonal(this.presentUser.id, 'basic').then(data =>{
                this.baseForm = data.data
                this.is_loading = false
            }).catch(error =>{
                this.$message({
                    type: 'error',
                    message: error.message
                })
                this.is_loading = false
            })
        } catch(error){
            this.$message({
                type: 'error',
                message: error.message
            })
            this.is_loading = false
        }
    }
  };
</script>


<style lang="scss" scoped>

.my-setting{
    padding: 24px;
    min-height: calc(100vh - 50px);
    width: 100%;
    background: rgb(240, 242, 245);
    .my-setting-contains{
        background: #fff;
        padding: 24px;
    }
    .publicForm{
        width:760px;
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
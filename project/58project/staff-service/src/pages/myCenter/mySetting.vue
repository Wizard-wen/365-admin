<template>
<div class="my-setting" v-loading="is_loading" >
    <div class="my-setting-contains">
        <el-tabs v-model="currentTabPosition" :tab-position="tabPosition" @tab-click="changeTab">
            <el-tab-pane label="员工基本信息" name="basic">
                <el-form label-width="120px" ref="baseForm" :model="baseForm" class="publicForm baseForm">
                    <el-form-item label="账号"  prop="account">
                        <!-- <el-input v-model="baseForm.account" :maxlength="20" :disabled="true" ></el-input> -->
                        {{baseForm.account}}
                    </el-form-item>

                    <el-form-item label="工号" prop="manager_code">
                        <!-- <el-input autocomplete="off" v-model="baseForm.manager_code"  :disabled="true" :maxlength="20"></el-input> -->
                        {{baseForm.manager_code}}
                    </el-form-item>

                    <el-form-item label="真实姓名" prop="real_name">
                        <!-- <el-input autocomplete="off" :disabled="true" v-model="baseForm.real_name" ></el-input> -->
                        {{baseForm.real_name}}
                    </el-form-item>

                    <el-form-item label="所属部门" prop="department_id">
                        <!-- <el-input v-model="department_name" :disabled="true"></el-input> -->
                        <select-tag-component
                            v-if="baseForm.department_id"
                            :propTagList="departmentList"
                            v-model="baseForm.department_id"
                            :isSingle="true"
                            :isEdit="false"></select-tag-component>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="员工个人信息" name="personal">
                <el-form label-width="120px" ref="personalInfoForm" :rules="personalInfoRules" :model="personalInfoForm" class="publicForm personalInfoForm">

                    <el-form-item label="用户名" prop="name">
                        <el-input autocomplete="off" v-model="personalInfoForm.name" ></el-input>
                    </el-form-item>
                    <el-form-item label="头像" class="form-item-size">
                        <el-upload
                            accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
                            class="icon-uploader"
                            action="/admin/common/uploadImage"
                            :show-file-list="false"
                            :file-list="icon_fileList"
                            :on-success="iconUploadSuccess"
                            :before-upload="beforeAvatarUpload"
                            :headers="uploadHeader">

                            <div
                                v-if="personalInfoForm.icon!=''"
                                class="icon-box"
                                @mouseover="showblack('0')"
                                @mouseout="showblack('1')">
                                <img class="icon-item" :src="personalInfoForm.icon == '' ? '' : `./resource/${personalInfoForm.icon}`" >
                                <div class="icon-item-back" v-if="isShowBlack">
                                    <i class="el-icon-edit icon-uploader-icon" style="color: #fff;font-size: 20px;"></i>
                                </div>
                            </div>

                            <i v-else class="el-icon-plus icon-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="手机号" prop="phone">
                        <el-input autocomplete="off" v-model="personalInfoForm.phone" ></el-input>
                    </el-form-item>

                    <el-form-item label="生日" prop="birthday">
                        <el-date-picker 
                            :picker-options="datePickerOption" 
                            :default-value="timeDefaultShow"
                            v-model="personalInfoForm.birthday" 
                            value-format="timestamp" 
                            type="date" 
                            placeholder="请选择出生日期"></el-date-picker>
                    </el-form-item>

                    <el-form-item label="邮箱" prop="email">
                        <el-input autocomplete="off" v-model="personalInfoForm.email" ></el-input>
                    </el-form-item>

                    <el-form-item label="微信号" prop="wechat">
                        <el-input autocomplete="off" v-model="personalInfoForm.wechat"></el-input>
                    </el-form-item>

                    <el-form-item label="个人简介" prop="personal_intro">
                        <el-input type="textarea" v-model="personalInfoForm.personal_intro"></el-input>
                    </el-form-item>

                    <el-form-item label="紧急联系人" prop="urgent">
                        <el-input v-model="personalInfoForm.urgent"></el-input>
                    </el-form-item>

                    <el-form-item label="现住址" prop="current_address">
                        <el-input v-model="personalInfoForm.current_address"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="changePersonalInfo('personalInfoForm')">确认更改</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="更改密码">
                <el-form label-width="120px" ref="passwordChangeForm" :rules="passwordChangeRules" :model="passwordChangeForm" class="publicForm passwordChangeForm">
                    <el-form-item label="原密码" prop="password">
                        <el-input type="password" v-model="passwordChangeForm.password"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newPassword">
                        <el-input type="password" v-model="passwordChangeForm.newPassword"></el-input>
                    </el-form-item>
                    <el-form-item label="确认新密码" prop="reNewPassword">
                        <el-input type="password" v-model="passwordChangeForm.reNewPassword"></el-input>
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
                birthday: '',//生日
                email: '',//邮箱
                wechat: '',//微信
                personal_intro: '',//个人简介
                urgent: '',//紧急联系人
                current_address: '',//现住址
                icon: ''
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
            icon_fileList: [],//头像数组
            isShowBlack: false,//头像阴影
            timeDefaultShow:'',//时间选择器默认时间
            //图片上传header
            uploadHeader:{
                accessToken: this.$store.state.loginModule.token.access_token
            },
        };
    },
    components: {
        selectTagComponent,
    },
    computed: {
        presentUser(){
            return this.$store.state.loginModule.user
        },
        departmentList(){
            return this.$store.state.authModule.departmentList
        }
    },
    methods: {
        /**
         * 切换tag
         */
        async changeTab(param){
            if(param.name){
                try{
                    this.is_loading = true
                    await myCenterService.getPersonal(this.presentUser.id, param.name).then(data =>{
                        if(param.name == 'basic'){
                            this.baseForm = data.data
                        } else {
                            this.timeDefaultShow = Date.parse(new Date());
                            this.personalInfoForm = {
                                ...this.personalInfoForm,
                                ...data.data
                            }
                            // this.personalInfoForm.icon = this.personalInfoForm.icon ? 
                            //     `./resource/${this.personalInfoForm.icon}` : ''
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
                        await myCenterService.editPersonal(this.personalInfoForm).then(data =>{
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
                                this.passwordChangeForm.password = ''
                                this.passwordChangeForm.newPassword = ''
                                this.passwordChangeForm.reNewPassword = ''
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
        /**
         * 上传头像，显示阴影
         */
        showblack(type){
            if(type == '0'){
                this.isShowBlack = true
            } else {
                this.isShowBlack = false
            }
        },
        //头像上传成功
        iconUploadSuccess(res, file) {
            this.personalInfoForm.icon = res.data.path;

            this.icon_fileList =  [{
                url: `./resource/${this.personalInfoForm.icon}`,
                name: 'head'
            }]
        },
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isLt2M;
        },
    },
    async mounted(){
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
//图片
.icon-uploader{
    & /deep/ .el-upload {
        height: 65px;
        width: 65px;
        line-height: 65px;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    & /deep/ .el-upload:hover {
        border-color: #409EFF;
    }
    .icon-box{
        width:65px;
        height: 65px;
        position: relative;
        .icon-item {
            width:65px;
            height: 65px;
            display: block;
        }
        .icon-item-back{
            position: absolute;
            height: 65px;
            width: 65px;
            top: 0;
            z-index: 4;
            background: rgba(0,0,0,.5)
        }
    }
}
</style>
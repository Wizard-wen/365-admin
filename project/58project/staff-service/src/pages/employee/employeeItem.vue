<template>
    <div class="employee-box">
        <el-form class="employee-form" ref="form" :model="employeeForm" :rules="employeeRules" label-width="100px">

            <el-form-item label="员工姓名" prop="name" class="form-item-size" size="mini">
                <el-input v-model="employeeForm.name" :maxlength="20" placeholder="请输入员工姓名"></el-input>
            </el-form-item>

            <el-form-item label="手机号" prop="phone" class="form-item-size">
                <el-input v-model="employeeForm.phone" :maxlength="11" placeholder="请输入手机号"></el-input>
            </el-form-item>

            <el-form-item label="员工头像" class="form-item-size">
                <el-upload
                    accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
                    class="avatar-uploader"
                    action="/admin/common/uploadImage"
                    :show-file-list="false"
                    :file-list="icon_fileList"
                    :on-success="iconUploadSuccess"
                    :before-upload="beforeAvatarUpload"
                    :headers="uploadHeader">

                    <div v-if="employeeForm.icon!=''" class="avatar-box" @mouseover="showblack('0')" @mouseout="showblack('1')">
                        <img  :src="employeeForm.icon == '' ? '' : `./resource/${employeeForm.icon}`" class="avatar">
                        <div class="avatar-back" v-if="isShowBlack">
                            <i class="el-icon-edit avatar-uploader-icon" style="color: #fff;font-size: 20px;"></i>
                        </div>
                    </div>

                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>

            <el-form-item label="性别" prop="sex" class="form-item-size">
                <el-radio-group v-model="employeeForm.sex">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="2">女</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="微信号" prop="wechat" class="form-item-size">
                <el-input v-model="employeeForm.wechat" :maxlength="50" placeholder="请输入微信号"></el-input>
            </el-form-item>

            <el-form-item label="年龄" prop="age" class="form-item-size">
                <el-input v-model="employeeForm.age"></el-input>
            </el-form-item>

            <el-form-item label="身份证号" prop="identify" class="form-item-size">
                <el-input v-model="employeeForm.identify" :maxlength="18" placeholder="请输入身份证号"></el-input>
            </el-form-item>

            <el-form-item label="住址" prop="address" class="form-item-size">
                <el-input v-model="employeeForm.address" :maxlength="150" placeholder="请输入现住址"></el-input>
            </el-form-item>

            <el-form-item label="教育程度" prop="education" class="form-item-size">
                <el-select v-model="employeeForm.education" placeholder="请选择教育程度">
                    <el-option
                        v-for="(item, index) in educationList"
                        :key="index"
                        :label="item.name"
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">{{$route.query.id? '确认编辑' : '立即创建'}}</el-button>
                <el-button @click="goback">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

/**
 * type 0 新建  1 编辑
 */
import {employeeService} from '../../../common'

export default {
    data() {
        //表单验证
        const validator = {
            //姓名
            nameValidate(rule, value, callback){
                if(value!=''){
                    if (!/^[\u4e00-\u9fa5]+$/.test(value)) {
                        callback(new Error('只能输入汉字'));
                    }else {
                        callback();
                    }
                }
            },
            //年龄
            ageValidate(rule, value, callback){
                if (!value) {
                    callback(new Error('请输入年龄'));
                } else {
                    if (!(/^\d+$/.test(value))) {
                        callback(new Error('请输入数字'));
                    }
                    callback();
                }
            },
            //手机号
            phoneValidate(rule, value, callback){
                if (value === '') {
                    callback(new Error('请输入手机号'));
                } else {
                    if (!(/^1[34578]\d{9}$/.test(value))) {
                        callback(new Error('请输入正确格式的手机号'));
                    }
                    callback();
                }
            },
            //身份证号
            identifyValidate(rule, value, callback){
                if (value === '') {
                    callback(new Error('请输入身份证号'));
                } else {
                    if (!(value.length == 18)) {
                        callback(new Error('请输入18位有效身份证号'));
                    }
                    callback();
                }
            },
            //住址
            addressValidate(rule, value, callback){
                if (value === '') {
                    callback(new Error('请输入住址'));
                } else {
                    callback();
                }
            },
        }
        return {

            selectedTag: [1],

            icon_fileList: [],
            //员工信息表单
            employeeForm: {
                id: '',//员工id
                version: '',//操作版本号,两个人同时操作
                //业务字段
                name: '',//员工姓名
                phone: '',//员工联系方式
                icon: '',//头像
                sex: 1,//员工性别                
                wechat: '',//微信号
                age: '',//员工年龄
                identify: '',//身份证号
                address: '',//员工住址
                education: 0,//教育程度
            },
            //表单验证规则
            employeeRules: {
                //姓名
                name: [

                    { required:true,message:'请填写姓名',trigger: 'blur' },
                    { validator: validator.nameValidate, trigger: 'blur' },
                ],
                //手机号
                phone: [
                    {validator: validator.phoneValidate, trigger: 'blur'}
                ],

                //年龄
                age: [
                    {validator: validator.ageValidate, trigger: 'blur'}
                ],

                //身份证
                identify: [
                    {validator: validator.identifyValidate, trigger: 'blur'}
                ],
                //住址
                address: [
                    {validator: validator.addressValidate, trigger: 'blur'}
                ],
            },
            isShowBlack: false,//头像阴影
            //图片上传header
            uploadHeader:{
                accessToken: this.$store.state.loginModule.token.access_token
            }
        }
    },
    computed: {
        //受教育程度数组
        educationList(){
            return this.$store.state.hrModule.educationList
        },
    },
    methods: {
        /**
         * 提交表单
         * 区分新建和编辑
         */
        async onSubmit(formName) {
            await this.$refs[formName].validate((valid, fileds) => {
                if (valid) {
                    employeeService.editEmployeeItem(this.employeeForm).then(data =>{
                            if(data.code == '0'){
                                this.$message({
                                    type:"success",
                                    message: "修改成功"
                                })
                                this.$router.push('/employee/staffList')
                            }
                        }).catch(error =>{
                            this.$message({
                                type:'error',
                                message: error.message
                            })
                        })
                } else {
                    return false;
                }
            });
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
        /**
         * 图片上传成功
         */
        iconUploadSuccess(res, file) {
            this.employeeForm.icon = res.data.path;

            this.icon_fileList =  [{
                url: `./resource/${this.employeeForm.icon}`,
                name: 'head'
            }]
        },
        /**
         * 图片上传前
         */
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isLt2M;
        },
        /**
         * 返回
         */
        goback(){
            this.$router.push("/employee/staffList")
        },
    },
    async mounted(){
        store.commit('setLoading',true)
        try{

            //如果是编辑则请求接口
            if(this.$route.query.type == 1){
                await employeeService.getEmployee(this.$route.query.id).then(data =>{
                    if(data.code == "0"){
                        this.employeeForm = data.data

                        this.icon_fileList = this.employeeForm.icon == ''? [] : [{
                            url: `./resource/${this.employeeForm.icon}`,
                            name: 'head'
                        }]
                    }
                }).catch(error =>{
                    this.$message({
                        type:'error',
                        message: error.message
                    })
                }).finally(() =>{
                    store.commit('setLoading',false)
                })
            }
        }catch(error){
            this.$message({
                type:'error',
                message: error.message
            })
        }

    }
}
</script>
<style lang="scss" scoped>
    .employee-box{
        width: 100%;
        padding-top: 30px;
        .employee-form{
            width: 100%;
            .form-item-size{
                width: 30%;
                & /deep/ .el-input{
                    min-width: 260px;
                }
            }
        }
        .paper-imgs{
            height: 110px!important;
            padding: 5px 0;
            .paper-item-img{
                display: inline-block;
                height:100px;
                width: 100px;
                margin : 0 10px;
            }
        }
        .image-messsage{
            line-height: 40px;
            display: flex;
            justify-content: space-between;
            padding: 0 20px;
        }
    }
    //图片上传
    .avatar-uploader /deep/ .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader /deep/ .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 16px;
        color: #8c939d;
        width: 65px;
        height: 65px;
        line-height: 65px;
        text-align: center;
    }
    .avatar-box{
        width:65px;
        height: 65px;
        position: relative;
        .avatar {
            width:65px;
            height: 65px;
            display: block;
        }
        .avatar-back{
            position: absolute;
            height: 65px;
            width: 65px;
            top: 0;
            z-index: 4;
            background: rgba(0,0,0,.5)
        }
    }

</style>



<template>
    <div class="staff-box">
        <el-form class="staff-form"  ref="form" :model="workerForm" :rules="staffRules" label-width="140px">
            
            <el-form-item label="登记日期" prop="register_at" class="form-item-size" size="small">
                <el-date-picker v-model="workerForm.register_at" type="date" placeholder="请选择登记日期"></el-date-picker>
            </el-form-item>     
            
            <el-form-item label="认证状态" prop="authentication" class="form-item-size" size="small">
                <select-tag :propTagList="tagList" v-model="workerForm.authentication" :isSingle="true"></select-tag>
            </el-form-item> 
            
            <el-form-item label="姓名" prop="name" class="form-item-size" size="small">
                <el-input v-model="workerForm.name" :maxlength="20" placeholder="请输入服务人员姓名"></el-input>
            </el-form-item>
            
            <el-form-item label="年龄" prop="age" class="form-item-size" size="small">
                <el-input v-model="workerForm.age" :maxlength="2" placeholder="请输入年龄"></el-input>
            </el-form-item>
            
            <el-form-item label="电话" prop="phone" class="form-item-size" size="small">
                <el-input v-model="workerForm.phone" :maxlength="11" placeholder="请输入手机号"></el-input>
            </el-form-item>           
            
            <el-form-item label="回访信息" prop="return_msg" class="form-item-size" size="small">
                <el-input v-model="workerForm.return_msg" :maxlength="200" placeholder="请输入回访信息"></el-input>
            </el-form-item>

            <el-form-item label="接单状态" prop="working_status" class="form-item-size" size="small">
                <select-tag :propTagList="tagList" v-model="workerForm.working_status" :isSingle="true"></select-tag>
            </el-form-item> 

            <el-form-item label="备注（商家情况）" prop="remarks" class="form-item-size" size="small">
                <el-input v-model="workerForm.remarks" :maxlength="200" placeholder="请输入备注信息"></el-input>
            </el-form-item>

            <el-form-item label="职业类型" prop="skill" class="form-item-size" size="small">
                <select-tag :propTagList="workerConfigList.service_category" v-model="workerForm.skill" :isSingle="false"></select-tag>
            </el-form-item> 

            <el-form-item label="服务类型" prop="service_type" class="form-item-size" size="small">
                <select-tag :propTagList="tagList" v-model="workerForm.service_type" :isSingle="true"></select-tag>
            </el-form-item> 

            <el-form-item label="可服务人群" prop="service_crowd" class="form-item-size" size="small">
                <select-tag :propTagList="tagList" v-model="workerForm.service_crowd" :isSingle="false"></select-tag>
            </el-form-item> 

            <el-form-item label="工龄" prop="working_age" class="form-item-size" size="small">
                <select-tag :propTagList="tagList" v-model="workerForm.working_age" :isSingle="true"></select-tag>
            </el-form-item> 

            <el-form-item label="工作经验（备注）" prop="working_experience" class="form-item-size" size="small">
                <el-input v-model="workerForm.working_experience" :maxlength="200" placeholder="请输入备注信息"></el-input>
            </el-form-item>

            <el-form-item label="民族" prop="nation" class="form-item-size" size="small">
                <select-tag :propTagList="tagList" v-model="workerForm.nation" :isSingle="true"></select-tag>
            </el-form-item>

            <el-form-item label="籍贯" prop="birthPlace" class="form-item-size" size="small">
                <el-input v-model="workerForm.birthPlace" :maxlength="20" placeholder="请输入籍贯信息"></el-input>
            </el-form-item>

            <el-form-item label="身份证号码" prop="identify" class="form-item-size" size="small">
                <el-input v-model="workerForm.identify" :maxlength="18" placeholder="请输入身份证号"></el-input>
            </el-form-item>

            <el-form-item label="地址" prop="address" class="form-item-size" size="small">
                <el-input v-model="workerForm.address" :maxlength="50" placeholder="请输入备注"></el-input>
            </el-form-item>

            <el-form-item label="区域" prop="region" class="form-item-size" size="small">
                <select-tag :propTagList="tagList" v-model="workerForm.region" :isSingle="false"></select-tag>
            </el-form-item>
        
            <el-form-item label="学历" prop="education" class="form-item-size" size="small">
                <select-tag :propTagList="tagList" v-model="workerForm.education" :isSingle="true"></select-tag>
            </el-form-item>

            <el-form-item label="紧急联系人电话" prop="urgent" class="form-item-size" size="small">
                <el-input v-model="workerForm.urgent" :maxlength="11" placeholder="请输入备注"></el-input>
            </el-form-item>

            <el-form-item label="银行卡号" prop="bank_card" class="form-item-size" size="small">
                <el-input v-model="workerForm.bank_card" :maxlength="50" placeholder="请输入备注"></el-input>
            </el-form-item>

            <el-form-item label="照片" class="form-item-size">
                <el-upload
                    accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
                    class="avatar-uploader"
                    action="/admin/common/uploadImage"
                    :show-file-list="false"
                    :file-list="icon_fileList"
                    :on-success="iconUploadSuccess"
                    :before-upload="beforeAvatarUpload"
                    :headers="uploadHeader">

                    <div v-if="workerForm.icon!=''" class="avatar-box" @mouseover="showblack('0')" @mouseout="showblack('1')">
                        <img  :src="workerForm.icon == '' ? '' : `./resource/${workerForm.icon}`" class="avatar">
                        <div class="avatar-back" v-if="isShowBlack">
                            <i class="el-icon-edit avatar-uploader-icon" style="color: #fff;font-size: 20px;"></i>
                        </div>
                    </div>

                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
        
            <el-form-item label="参加培训" prop="course" class="form-item-size" size="small">
                <select-tag :propTagList="tagList" v-model="workerForm.course" :isSingle="true"></select-tag>
            </el-form-item>

            <el-form-item label="技能证书" prop="paper" >
                <paper-component v-model="workerForm.paper"></paper-component>
            </el-form-item>
        
            <el-form-item label="信息来源" prop="source" class="form-item-size" size="small">
                <select-tag :propTagList="tagList" v-model="workerForm.source" :isSingle="true"></select-tag>
            </el-form-item>

            <el-form-item label="创建人姓名" prop="manager_name" class="form-item-size" size="small">
                <el-input v-model="workerForm.manager_name" :maxlength="50" disabled=""></el-input>
            </el-form-item>

            <el-form-item label="性别" prop="sex" class="form-item-size">
                <el-radio-group v-model="workerForm.sex">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="2">女</el-radio>
                </el-radio-group>
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
import {hrService} from '../../../../common'

import {
    tagsComponent,
    paperComponent,
    selectTag} from './components'

export default {
    components: {
        tagsComponent,
        paperComponent,
        selectTag,
    },
    data() {
        //表单验证
        const validator = {
            //年龄
            ageValidate(rule, value, callback){
                if (!value) {
                    callback(new Error('请输入年龄'));
                } else {
                    if (!(/^\d+$/.test(value))) {
                        callback(new Error('年龄只能是数字'));
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
                if (value != '') {
                    if (!(value.length == 18) || !(/(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value))) {
                        callback(new Error('请输入18位有效身份证号'));
                    }
                    callback();
                } else {
                    callback()
                }
            },
            //紧急联系人电话
            urgentValidate(rule, value, callback){
                if (value != '') {
                    if (!(/^1[34578]\d{9}$/.test(value))) {
                        callback(new Error('请输入正确格式的手机号'));
                    }
                    callback();
                } else {
                    callback()
                }
            },
            //银行卡号
            bankCardValidate(rule, value, callback){
                if (value != '') {
                    if (!(/^[0-9]+$/.test(value))) {
                        callback(new Error('银行卡号只能是数字'));
                    } else {
                        callback();
                    }
                } else {
                    callback()
                }
            },
        }
        return {
            tagList: [
                {
                    id: 1,
                    name: '1111',
                },
                {
                    id: 2,
                    name: '2222',
                },{
                    id: 3,
                    name: '3333333',
                },{
                    id: 4,
                    name: '4444444',
                },{
                    id: 5,
                    name: '555555',
                },{
                    id: 6,
                    name: '6666',
                },{
                    id: 7,
                    name: '7777',
                },{
                    id: 8,
                    name: '8888',
                },{
                    id: 9,
                    name: '9999',
                },{
                    id: 10,
                    name: '1010101',
                },{
                    id: 11,
                    name: '111111',
                },{
                    id: 12,
                    name: '121212',
                },{
                    id: 13,
                    name: '131313',
                },{
                    id: 14,
                    name: '141414',
                },{
                    id: 15,
                    name: '151515',
                },
            ],
            selectedTag: [1],

            icon_fileList: [],
            //员工信息表单
            workerForm: {
                /**
                 * 逻辑字段
                 */
                id:null,//员工id
                code:null,//员工号
                version:null,//操作版本号
                created_at:null,//创建时间
                type:null,//签约状态
                sex:1,//性别

                /**
                 * 业务字段
                 */
                register_at:null,//登记时间
                authentication:0,//认证状态
                name:'',//姓名
                age:null,//年龄
                phone:'',//电话
                return_msg:'',//回访信息
                working_status:0,//接单状态-----工作状态

                remarks:'',//备注（商家情况）
                skill:[],//职业类型
                service_type:0,//服务类型
                service_crowd:[],//可服务人群
                working_age:0,//工龄
                working_experience:'',//工作经验（备注）
                nation:0,//民族
                birthPlace:'',//籍贯
                identify:'',//身份证号码
                address:'',//地址
                region:[],//服务区域 
                education:0,//学历
                urgent:'',//紧急联系人电话
                bank_card:'',//银行卡号
                icon:'',//照片&&头像
                course:0,//参加培训课程
                paper:[],//技能证书
                source:0,//信息来源
                manager_id:0,//创建人id
                manager_name:this.$store.state.loginModule.user.username,//创建人姓名
            },
            //表单验证规则
            staffRules: {
                //登记日期
                register_at:[
                    { type:'date', required:true, message:'选择登记时间', trigger: ['blur','change']},
                ],
                //姓名
                name: [
                    { required:true,message:'请输入姓名',trigger: 'blur' },
                ],
                //年龄
                age: [
                    { required:true,message:'请输入年龄',trigger: 'blur'},
                    {validator: validator.ageValidate, trigger: 'blur'}
                ],
                //电话
                phone: [
                    { required:true,message:'请输入电话',trigger: 'blur'},
                    {validator: validator.phoneValidate, trigger: 'blur'}
                ],
                //身份证
                identify: [
                    {validator: validator.identifyValidate, trigger: 'blur'}
                ],
                //紧急联系人
                urgent: [
                    {validator: validator.urgentValidate, trigger: 'blur'}
                ],               
                //银行卡号
                bank_card: [
                    {validator: validator.bankCardValidate, trigger: 'blur'}
                ],
            },
            workerConfigList:[],
            // region: [],//地区信息
            // areaList: [],//地区数组

            // skill: [],//技能级联选择器筛选信息
            // skillList: [],//技能级联选择器渲染数组

            // label: [],//能力标签级联选择器筛选信息
            // labelList: [],//能力标签级联选择器渲染数组

            // //地区级联选择字段
            // setCascaderProps: {
            //     label: 'name',
            //     value: 'id'
            // },
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
        //民族
        nationList(){
            return this.$store.state.hrModule.nation
        }
    },
    methods: {
        /**
         * 提交表单
         * 区分新建和编辑
         */
        async onSubmit(formName) {
            await this.$refs[formName].validate((valid, fileds) => {
                if (valid) {
                    hrService.editStaff(this.workerForm).then(data =>{
                            if(data.code == '0'){
                                this.$message({
                                    type:"success",
                                    message: "修改成功"
                                })
                                this.$router.push('/worker/workerList')
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
        iconUploadSuccess(res, file) {
            this.workerForm.icon = res.data.path;

            this.icon_fileList =  [{
                url: `./resource/${this.workerForm.icon}`,
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
        /**
         * 返回
         */
        goback(){
            this.$router.push("/worker/workerList")
        },
    },
    async mounted(){
        
        try{
            await store.commit('setLoading',true)
            //如果是编辑则请求接口
            if(this.$route.query.type == 1){
                await hrService.getStaff(this.$route.query.id).then(data =>{
                    if(data.code == "0"){

                        this.workerForm = data.data

                        this.workerForm.paper.forEach((item, index) =>{
                            item.images.forEach((it, index) =>{
                                it.url = './resource/'+it.path
                            })
                        })
                        this.icon_fileList = this.workerForm.icon == ''? [] : [{
                            url: `./resource/${this.workerForm.icon}`,
                            name: 'head'
                        }]
                    }
                }).catch(error =>{
                    this.$message({
                        type:'error',
                        message: error.message
                    })
                })
            }
            await hrService.getFormConfig().then((data) =>{
                if(data.code == '0'){
                    this.workerConfigList = data.data
                }
            })
            
        }catch(error){
            this.$message({
                type:'error',
                message: error.message
            })
        }
    await store.commit('setLoading',false)
    }
}
</script>
<style lang="scss" scoped>
    .staff-box{
        width: 100%;
        padding-top: 30px;
        .staff-form{
            width: 100%;
            & /deep/ .el-form-item{
                margin-bottom: 15px;
            }
            .form-item-size{
                width: 900px;
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



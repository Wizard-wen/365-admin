<template>
    <div class="staff-box">
        <el-form class="staff-form"  ref="form" :model="workerForm" :rules="staffRules" label-width="140px">
            
            <el-form-item label="登记日期" prop="register_at" class="form-item-size" size="small">
                <el-date-picker v-model="workerForm.register_at" type="date" placeholder="请选择登记日期"></el-date-picker>
            </el-form-item>     
            
            <el-form-item label="认证状态" prop="authentication" class="form-item-size" size="small">
                <select-tag :propTagList="workerConfigList.authentication" v-model="workerForm.authentication" :isSingle="true"></select-tag>
            </el-form-item> 
            
            <el-form-item label="姓名" prop="name" class="form-item-size" size="small">
                <el-input v-model="workerForm.name" :maxlength="20" placeholder="请输入服务人员姓名"></el-input>
            </el-form-item>
            <div v-if="nameCheck" class="nameCheckBox">
                <p>{{`共有${nameCheckObject.count}个可能重名的人`}}</p>
                <div class="nameBox">
                    <div class="name-tag" v-for="(item, index) in nameCheckObject.names" :key="index">{{item.name}}</div>
                </div>
            </div>
            
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
                <select-tag :propTagList="workerConfigList.working_status" v-model="workerForm.working_status" :isSingle="true"></select-tag>
            </el-form-item> 

            <el-form-item label="备注（商家情况）" prop="remarks" class="form-item-size" size="small">
                <el-input v-model="workerForm.remarks" :maxlength="200" placeholder="请输入备注信息"></el-input>
            </el-form-item>

            <el-form-item label="职业类型" prop="skill" class="form-item-size" size="small">
                <select-tag :propTagList="workerConfigList.service_category" v-model="workerForm.skill" :isSingle="false"></select-tag>
            </el-form-item> 

            <el-form-item label="服务类型" prop="service_type" class="form-item-size" size="small">
                <select-tag :propTagList="workerConfigList.service_type" v-model="workerForm.service_type" :isSingle="false"></select-tag>
            </el-form-item> 

            <el-form-item label="可服务人群" prop="service_crowd" class="form-item-size" size="small">
                <select-tag :propTagList="workerConfigList.service_crowd" v-model="workerForm.service_crowd" :isSingle="false"></select-tag>
            </el-form-item> 

            <el-form-item label="工龄" prop="working_age" class="form-item-size" size="small">
                <select-tag :propTagList="workerConfigList.working_age" v-model="workerForm.working_age" :isSingle="true"></select-tag>
            </el-form-item> 

            <el-form-item label="工作经验（备注）" prop="working_experience" class="form-item-size" size="small">
                <el-input v-model="workerForm.working_experience" :maxlength="200" placeholder="请输入备注信息"></el-input>
            </el-form-item>

            <el-form-item label="民族" prop="nation" class="form-item-size" size="small">
                <select-tag :propTagList="workerConfigList.nation" v-model="workerForm.nation" :isSingle="true"></select-tag>
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
                <select-tag :propTagList="workerConfigList.service_region" v-model="workerForm.region" :isSingle="false"></select-tag>
            </el-form-item>
        
            <el-form-item label="学历" prop="education" class="form-item-size" size="small">
                <select-tag :propTagList="$store.state.hrModule.educationList" v-model="workerForm.education" :isSingle="true"></select-tag>
            </el-form-item>

            <el-form-item label="紧急联系人电话" prop="urgent_phone" class="form-item-size" size="small">
                <el-input v-model="workerForm.urgent_phone" :maxlength="11" placeholder="请输入备注"></el-input>
            </el-form-item>

            <el-form-item label="银行卡号" prop="bank_card" class="form-item-size" size="small">
                <el-input v-model="workerForm.bank_card" :maxlength="50" placeholder="请输入备注"></el-input>
            </el-form-item>

            <el-form-item label="头像" class="form-item-size">
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

            <el-form-item label="照片" class="form-item-size">
                
                <el-upload
                    accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
                    class="avatar-uploader"
                    action="/admin/common/uploadImage"
                    :show-file-list="false"
                    :on-success="photoUploadSuccess"
                    :before-upload="beforeAvatarUpload"
                    :headers="uploadHeader">
                    <i  class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <div class="picture-box" v-if="photo_fileList.length">
                    <!-- <img v-for="(item,index) in photo_fileList" :src="item.url"  :key="index" alt=""> -->


                    <div v-for="(item,index) in photo_fileList" :key="index" class="avatar-box" @mouseover="showPhotoblack(item, index, '0')" @mouseout="showPhotoblack(item, index, '1')">
                        <img :src="item.url" class="avatar">
                        <div class="avatar-back" v-if="item.isBack" @click="deletePhoto">
                            <i class="el-icon-delete avatar-uploader-icon" style=""></i>
                        </div>
                    </div>
                </div>
            </el-form-item>
        
            <el-form-item label="参加培训" prop="course" class="form-item-size" size="small">
                <select-tag :propTagList="workerConfigList.course" v-model="workerForm.course" :isSingle="false"></select-tag>
            </el-form-item>

            <el-form-item label="技能证书" prop="certificate" class="form-item-size">
                <paper-component v-model="workerForm.certificate" ></paper-component>
            </el-form-item>

            <el-form-item label="技能证书标签" prop="paper" class="form-item-size">
                <select-tag :propTagList="workerConfigList.paper_category" v-model="workerForm.paper" :isSingle="false"></select-tag>
            </el-form-item>
        
            <el-form-item label="信息来源" prop="source" class="form-item-size" size="small">
                <select-tag :propTagList="workerConfigList.source" v-model="workerForm.source" :isSingle="true"></select-tag>
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

            <!-- <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">{{$route.query.id? '确认编辑' : '立即创建'}}</el-button>
                <el-button @click="goback">取消</el-button>
            </el-form-item> -->
        </el-form>
        <!-- <img class="qrcode" :src="qrcode" alt=""> -->
        <!-- <div ref="aaa" style="height:200px;width: 200px;background:#185">

        </div> -->
        <!-- <img :src="canvasImg" alt=""> -->
        <div class="control">
            <el-button type="primary" @click="onSubmit('form')">{{$route.query.id? '确认编辑' : '立即创建'}}</el-button>
            <el-button @click="goback">取消</el-button>
            <el-button @click="makeImage">创建图片</el-button>
        </div>
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
import {pictureDetailDialog} from '../../components/pictureDetailDialog.vue'


import qrcode from '../img/timg.gif'

import html2canvas from 'html2canvas';




export default {
    components: {
        tagsComponent,
        paperComponent,
        selectTag,
    },
    data() {
        let _this = this
        //表单验证
        const validator = {
            //姓名
            async nameValidate(rule, value, callback){
                if (value == '') {
                    _this.nameCheck = false
                    _this.nameCheckObject = {}
                    callback(new Error('请输入姓名'));
                } else {
                    try{
                        await hrService.checkStaffName(_this.workerForm.id, value).then((data) =>{
                            if(data.code == '0'){
                                callback()
                                _this.nameCheck = false
                                _this.nameCheckObject = {}
                            } else {
                                callback(new Error(data.message))
                            }
                        })
                    } catch(error){
                        _this.nameCheck = true
                        _this.nameCheckObject = error.data
                        callback(error.message)
                    }
                }
            },
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
            qrcode,
            canvasImg:'',
            icon_fileList: [],//头像数组
            photo_fileList: [],//照片数组
            //姓名检查
            nameCheck: false,
            nameCheckObject: {},//重复姓名列表
            //员工信息表单
            workerForm: {
                /**
                 * 逻辑字段
                 */
                id:null,//员工id
                staff_code:null,//员工号
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
                urgent_phone:'',//紧急联系人电话
                bank_card:'',//银行卡号
                icon:'',//照片&&头像
                photo: [],//照片
                course:[],//参加培训课程
                paper:[],//技能证书标签
                certificate: [],//技能证书
                source:0,//信息来源
                manager_id:0,//创建人id
                manager_name:this.$store.state.loginModule.user.username,//创建人姓名
            },
            //表单验证规则
            staffRules: {
                //登记日期
                register_at:[
                    { type:'date', required:true, message:'选择登记时间', trigger: ['blur', 'change']},
                ],
                //姓名
                name: [
                    { required:true,message:'请输入姓名',trigger: 'blur' },
                    { validator: validator.nameValidate,trigger: 'blur' },
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
                //银行卡号
                bank_card: [
                    {validator: validator.bankCardValidate, trigger: 'blur'}
                ],
            },
            workerConfigList:{
                authentication:[],
                course:[],
                paper_category:[],
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
            await this.$refs[formName].validate(async (valid, fileds) => {
                if (valid) {

                    //字段转换
                    this.workerForm.service_crowd = this.setCommitAttr(
                        this.workerForm.service_crowd,
                        this.workerConfigList.service_crowd,
                        'service_crowd_id'
                    );

                    this.workerForm.region = this.setCommitAttr(
                        this.workerForm.region,
                        this.workerConfigList.service_region,
                        'region_id'
                    );

                    this.workerForm.skill = this.setCommitAttr(
                        this.workerForm.skill,
                        this.workerConfigList.service_category,
                        'service_category_id'
                    );

                    this.workerForm.course = this.setCommitAttr(
                        this.workerForm.course,
                        this.workerConfigList.course,
                        'course_id'
                    );

                    this.workerForm.service_type = this.setCommitAttr(
                        this.workerForm.service_type,
                        this.workerConfigList.service_type,
                        'service_type_id'
                    );

                    this.workerForm.paper = this.setCommitAttr(
                        this.workerForm.paper,
                        this.workerConfigList.paper_category,
                        'paper_category_id'
                    );

                    try{
                        store.commit('setLoading',true)
                        await hrService.editStaff(this.workerForm).then(data =>{
                            if(data.code == '0'){
                                this.$message({
                                    type:"success",
                                    message: "修改成功"
                                })
                                store.commit('setLoading',false)
                                // this.$router.push('/worker/workerList')
                                this.goback()
                            }
                        }).catch(error =>{
                            this.$message({
                                type:'error',
                                message: error.message
                            })
                        }).finally(() =>{
                            store.commit('setLoading',false)
                        })
                    } catch(error){
                        this.$message({
                            type:'error',
                            message: error.message
                        }) 
                    }
                } else {
                    return false;
                }
            });
        },
        /**
         * 拼接service_crowd（服务人群）字段  
         */
        setCommitAttr(selectedArr, originArr, keyName){
            return originArr.reduce((arr, item, index)=>{
                var serviceItem = null

                selectedArr.forEach((it, index) =>{
                    if(it == item.id){
                        serviceItem = {}
                        serviceItem[keyName] = item.id;
                        serviceItem['name'] = item.name;
                    } 
                })
                return serviceItem == null ? arr : arr.concat(serviceItem)
            },[])
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
        //展示删除阴影
        showPhotoblack(item,index, state){
            if(state == '0'){
                this.photo_fileList[index].isBack = true
            } else {
                this.photo_fileList[index].isBack = false
            }
        },
        //删除照片
        async deletePhoto(index){
            let response = await this.$confirm(`确定删除该照片吗?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: `已取消删除`
                });
            });
            if(response == "confirm"){
                this.photo_fileList.splice(index,1)
                this.workerForm.photo.splice(index,1)
            }
        },
        //头像上传成功
        iconUploadSuccess(res, file) {
            this.workerForm.icon = res.data.path;

            this.icon_fileList =  [{
                url: `./resource/${this.workerForm.icon}`,
                name: 'head'
            }]
        },
        //照片上传成功
        photoUploadSuccess(res, file) {
            this.workerForm.photo.push(res.data);

            this.photo_fileList =  this.workerForm.photo.map((item, index) =>{
                return {
                    ...item,
                    url: `./resource/${item.path}`,
                    isBack: false,
                }
            })
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
        makeImage(){
            
        }
    },
    async mounted(){
        let _this = this;
        // await html2canvas(this.$refs.aaa).then(function(canvas){
        //     console.log(canvas.toDataURL("image/png"))
        //     _this.canvasImg = canvas.toDataURL("image/png");
        // });
        
        try{
            await store.commit('setLoading',true)
            //如果是编辑则请求接口
            if(this.$route.query.type == 1){
                await hrService.getStaff(this.$route.query.id).then(data =>{
                    if(data.code == "0"){
                        // debugger
                        var workerForm = data.data

                        //技能证书
                        workerForm.certificate.forEach((item, index) =>{
                            item.images.forEach((it, index) =>{
                                it.url = './resource/'+it.path
                            })
                        })
                        //技能证书标签
                        workerForm.paper = workerForm.paper.reduce((arr, item, index) =>{
                            return arr.concat(item.paper_category_id)
                        },[])
                        
                        workerForm.region = workerForm.region.reduce((arr, item, index) =>{
                            return arr.concat(item.region_id)
                        },[])
                        
                        workerForm.service_crowd = workerForm.service_crowd.reduce((arr, item, index) =>{
                            return arr.concat(item.service_crowd_id)
                        },[])

                        workerForm.skill = workerForm.skill.reduce((arr, item, index) =>{
                            return arr.concat(item.service_category_id)
                        },[])
                        
                        workerForm.course = workerForm.course.reduce((arr, item, index) =>{
                            return arr.concat(item.course_id)
                        },[])

                        workerForm.service_type = workerForm.service_type.reduce((arr, item, index) =>{
                            return arr.concat(item.service_type_id)
                        },[])

                        this.icon_fileList = workerForm.icon == ''? [] : [{
                            url: `./resource/${workerForm.icon}`,
                            name: 'head'
                        }]

                        this.photo_fileList =  workerForm.photo.map((item, index) =>{
                            return {
                                ...item,
                                url: `./resource/${item.path}`,
                                isBack: false,
                            }
                        })

                        this.workerForm = workerForm
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
            margin-bottom: 150px;
            & /deep/ .el-form-item{
                margin-bottom: 15px;
            }
            .form-item-size{
                width: 900px;
                & /deep/ .el-input{
                    min-width: 260px;
                }
                .picture-box{
                    border: 1px dashed #ccc;
                    padding: 0 10px 10px 10px;
                    display: flex;
                        .avatar-box{
                            margin: 10px 10px 0 0;
                            width:100px;
                            height: 100px;
                            position: relative;
                            .avatar {
                                width:100px;
                                height: 100px;
                                display: block;
                            }
                            .avatar-back{
                                position: absolute;
                                height: 100px;
                                width: 100px;
                                line-height: 100px;
                                text-align: center;
                                top: 0;
                                z-index: 4;
                                cursor: pointer;
                                background: rgba(0,0,0,.5);
                                .avatar-uploader-icon{
                                    color: #fff;font-size: 20px;
                                }
                            }
                        }
                }
            }
            .nameCheckBox{
                width: 900px;
                padding-left: 140px;
                margin-bottom: 20px;
                & p{
                    height: 30px;
                    line-height: 30px;
                    color: #f56c6c;
                }
                .nameBox{
                    padding: 10px;
                    border: 1px dashed #ccc;
                    display: flex;
                    flex-wrap: wrap;
                    .name-tag{
                        height: 24px;
                        line-height: 24px;
                        padding: 0 10px;
                        margin-right: 10px;

                    }
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
        .control{
            position: fixed;
            height: 100px;
            width: 100%;
            bottom: 0; 
            background: rgba(0,0,0,.2);
            // opacity: .1;
            z-index: 3;
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
.qrcode{
    height: 120px;
    width: 120px;
    position: absolute;
    right: 20px;
    top: 100px;
}
</style>



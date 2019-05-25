<template>
    <div class="staff-box">
        <el-form class="staff-form"  ref="form" :model="workerForm" :rules="staffRules" label-width="140px">
            <!-- 等同于更新时间 -->
            <el-form-item label="登记日期" prop="register_at" class="form-item-size" size="small">
                <el-date-picker v-model="workerForm.register_at" type="date" placeholder="请选择登记日期"></el-date-picker>
            </el-form-item>     
            
            <el-form-item label="认证状态" prop="authentication" class="form-item-size" size="small">
                <select-tag-component :propTagList="workerConfigList.authentication" v-model="workerForm.authentication" :isSingle="true"></select-tag-component>
            </el-form-item> 
            
            <el-form-item label="姓名" prop="name" class="form-item-size" size="small">
                <el-input v-model="workerForm.name" :maxlength="20" placeholder="请输入服务人员姓名"></el-input>
            </el-form-item>
            <!-- 判断是否重名 -->
            <div v-if="nameCheck" class="nameCheckBox">
                <p>{{`共有${nameCheckObject.count}个可能重名的人`}}</p>
                <div class="nameBox">
                    <div class="name-tag" v-for="(item, index) in nameCheckObject.names" :key="index">{{item.name}}</div>
                </div>
            </div>
            
            <el-form-item label="年龄" prop="age" class="form-item-size" size="small">
                <el-input v-model="workerForm.age" :maxlength="2" placeholder="请输入年龄"></el-input>
            </el-form-item>

            <el-form-item label="出生日期" prop="birthday" class="form-item-size" size="small">
                <el-date-picker v-model="workerForm.birthday" type="date" placeholder="请选择出生日期"></el-date-picker>
            </el-form-item>
            
            <el-form-item label="电话" prop="phone" class="form-item-size" size="small">
                <el-input v-model="workerForm.phone" :maxlength="11" placeholder="请输入手机号"></el-input>
            </el-form-item>           
            
            <el-form-item label="回访信息" prop="return_msg" class="form-item-size" size="small">
                <el-input v-model="workerForm.return_msg" :maxlength="200" placeholder="请输入回访信息"></el-input>
            </el-form-item>

            <el-form-item label="接单状态" prop="working_status" class="form-item-size" size="small">
                <select-tag-component :propTagList="workerConfigList.working_status" v-model="workerForm.working_status" :isSingle="true"></select-tag-component>
            </el-form-item> 

            <el-form-item label="备注（商家情况）" prop="remarks" class="form-item-size" size="small">
                <el-input v-model="workerForm.remarks" :maxlength="200" placeholder="请输入备注信息"></el-input>
            </el-form-item>

            <el-form-item label="职业类型" prop="skill" class="form-item-size" size="small">
                <select-tag-component :propTagList="workerConfigList.service_category" v-model="workerForm.skill" :isSingle="false"></select-tag-component>
            </el-form-item> 

            <el-form-item label="服务类型" prop="service_type" class="form-item-size" size="small">
                <select-tag-component :propTagList="workerConfigList.service_type" v-model="workerForm.service_type" :isSingle="false"></select-tag-component>
            </el-form-item> 

            <el-form-item label="可服务人群" prop="service_crowd" class="form-item-size" size="small">
                <select-tag-component :propTagList="workerConfigList.service_crowd" v-model="workerForm.service_crowd" :isSingle="false"></select-tag-component>
            </el-form-item> 

            <el-form-item label="工龄" prop="working_age" class="form-item-size" size="small">
                <select-tag-component :propTagList="workerConfigList.working_age" v-model="workerForm.working_age" :isSingle="true"></select-tag-component>
            </el-form-item> 

            <el-form-item label="工作经验（备注）" prop="working_experience" class="form-item-size" size="small">
                <el-input v-model="workerForm.working_experience" :maxlength="200" placeholder="请输入备注信息"></el-input>
            </el-form-item>

            <el-form-item label="民族" prop="nation" class="form-item-size" size="small">
                <select-tag-component :propTagList="workerConfigList.nation" v-model="workerForm.nation" :isSingle="true"></select-tag-component>
            </el-form-item>

            <el-form-item label="籍贯" prop="birthPlace" class="form-item-size" size="small">
                <el-input v-model="workerForm.birthPlace" :maxlength="20" placeholder="请输入籍贯信息"></el-input>
            </el-form-item>

            <el-form-item label="身份证号码" prop="identify" class="form-item-size" size="small">
                <el-input v-model="workerForm.identify" :maxlength="18" placeholder="请输入身份证号"></el-input>
            </el-form-item>

            <el-form-item label="证件照" class="form-item-size">
                <el-upload
                    accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
                    class="avatar-uploader"
                    action="/admin/common/uploadImage"
                    :show-file-list="false"
                    :on-success="idPhotoUploadSuccess"
                    :before-upload="beforeAvatarUpload"
                    :headers="uploadHeader">
                    <i  class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <div class="picture-box" v-if="id_photo_fileList.length">
                    <div v-for="(item,index) in id_photo_fileList" :key="index" class="avatar-box" @mouseover="showIdPhotoblack(item, index, '0')" @mouseout="showIdPhotoblack(item, index, '1')">
                        <img :src="item.url" class="avatar">
                        <div class="avatar-back" v-if="item.isBack" @click="deleteIdPhoto">
                            <i class="el-icon-delete avatar-uploader-icon" style=""></i>
                        </div>
                    </div>
                </div>
            </el-form-item>

            <el-form-item label="地址" prop="address" class="form-item-size" size="small">
                <el-input v-model="workerForm.address" :maxlength="50" placeholder="请输入备注"></el-input>
            </el-form-item>

            <el-form-item label="区域" prop="region" class="form-item-size" size="small">
                <select-tag-component :propTagList="workerConfigList.service_region" v-model="workerForm.region" :isSingle="false"></select-tag-component>
            </el-form-item>
        
            <el-form-item label="学历" prop="education" class="form-item-size" size="small">
                <select-tag-component :propTagList="$store.state.hrModule.educationList" v-model="workerForm.education" :isSingle="true"></select-tag-component>
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
                <select-tag-component :propTagList="workerConfigList.course" v-model="workerForm.course" :isSingle="false"></select-tag-component>
            </el-form-item>

            <el-form-item label="技能证书" prop="certificate" class="form-item-size">
                <paper-component v-model="workerForm.certificate" ></paper-component>
            </el-form-item>

            <el-form-item label="技能证书标签" prop="paper" class="form-item-size">
                <select-tag-component :propTagList="workerConfigList.paper_category" v-model="workerForm.paper" :isSingle="false"></select-tag-component>
            </el-form-item>
        
            <el-form-item label="信息来源" prop="source" class="form-item-size" size="small">
                <select-tag-component :propTagList="workerConfigList.source" v-model="workerForm.source" :isSingle="true"></select-tag-component>
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
        </el-form>
        <div class="control">
            <!-- 创建/编辑 -->
            <el-button type="primary" @click="editStaff('form')">{{editText}}</el-button>
            <el-button type="primary" @click="makeImage" v-if="isShowImageButton">生成名片</el-button>
            <!-- 导出回访 / 恢复 / 提交至信息库-->
            <el-button type="primary" @click="submitStaff" v-if="submitText != ''">{{submitText}}</el-button>
            <el-button @click="goback">返回</el-button>
        </div>
        <!-- 生成服务人员名片组件 -->
        <make-image-component
            :openMakeImageDialog="openMakeImageDialog"
            v-if="openMakeImageDialog"
            @closeMakeImageDialog="openMakeImageDialog = false"
            :openMakeImage="openMakeImage">
        </make-image-component>
    </div>
</template>

<script>

/**
 * type 0 新建  1 编辑
 */
import {hrService} from '../../../../common'

import {
    paperComponent,
    makeImageComponent} from './components'

import {
    pictureDetailDialog,
    selectTagComponent} from '@/pages/components'

export default {
    components: {
        paperComponent,
        selectTagComponent,
        makeImageComponent, //创建图片组件
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
            openMakeImageDialog:false,//是否打开创建图片弹窗
            openMakeImage: {},//创建图片传入的渲染字段
            editText: '',//编辑按钮文案
            submitText: '',//提交按钮文案
            isShowImageButton: false,//是否显示生成名片按钮
            icon_fileList: [],//头像数组
            photo_fileList: [],//照片数组
            id_photo_fileList: [],//证件照片数组
            //姓名检查
            nameCheck: false,
            nameCheckObject: {},//重复姓名列表
            //员工信息表单
            workerForm: {
                /************逻辑字段******************/
                id:null,//员工id
                staff_code:null,//员工号
                version:null,//操作版本号
                created_at:null,//创建时间
                type:null,//签约状态
                sex:1,//性别
                /************业务字段******************/
                register_at:null,//登记时间
                updated_at:null,//更新时间
                authentication:0,//认证状态
                name:'',//姓名
                age:null,//年龄
                birthday:null,//出生日期
                phone:'',//电话
                return_msg:'',//回访信息
                working_status:0,//接单状态
                remarks:'',//备注（商家情况）
                skill:[],//职业类型
                service_type:0,//服务类型
                service_crowd:[],//可服务人群
                working_age:0,//工龄
                working_experience:'',//工作经验（备注）
                nation:0,//民族
                birthPlace:'',//籍贯
                identify:'',//身份证号码
                id_photo: [],//证件照
                address:'',//地址
                region:[],//服务区域 
                education:0,//学历
                urgent_phone:'',//紧急联系人电话
                bank_card:'',//银行卡号
                photo: [],//照片
                icon:'',//头像
                course:[],//参加培训
                teacher_comment:'',//教师评语
                paper:[],//技能证书标签
                certificate: [],//技能证书图片
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
        //服务人员表单配置项
        workerConfigList(){
            return this.$store.state.hrModule.configForm
        }
    },
    methods: {
        /**
         * 提交表单
         */
        async editStaff(formName) {
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
         * 提交信息
         */
        async submitStaff(){
            let type = this.$route.query.type,
                module_type = '';
            if(type == 2){
                module_type = 'return'
            } else if(type == 3){
                module_type = 'warning'
            } else if(type == 4){
                module_type = 'apply'
            }

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
                await hrService.agreeStaffSingle(module_type, 'edit',this.workerForm).then(data =>{
                    if(data.code == '0'){
                        this.$message({
                            type:"success",
                            message: "提交成功"
                        })
                        store.commit('setLoading',false)

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
        //展示照片删除阴影
        showPhotoblack(item,index, state){
            if(state == '0'){
                this.photo_fileList[index].isBack = true
            } else {
                this.photo_fileList[index].isBack = false
            }
        },
        //展示证件照删除阴影
        showIdPhotoblack(item,index, state){
            if(state == '0'){
                this.id_photo_fileList[index].isBack = true
            } else {
                this.id_photo_fileList[index].isBack = false
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
        async deleteIdPhoto(index){
            let response = await this.$confirm(`确定删除该证件照片吗?`, '提示', {
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
                this.id_photo_fileList.splice(index,1)
                this.workerForm.id_photo.splice(index,1)
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
        //证件照片上传成功
        id_photoUploadSuccess(res, file) {
            this.workerForm.id_photo.push(res.data);

            this.id_photo_fileList =  this.workerForm.id_photo.map((item, index) =>{
                return {
                    ...item,
                    url: `./resource/${item.path}`,
                    isBack: false,
                }
            })
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
        //证件照片上传成功
        idPhotoUploadSuccess(res, file) {
            this.workerForm.id_photo.push(res.data);

            this.id_photo_fileList =  this.workerForm.id_photo.map((item, index) =>{
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
            let fromPage = this.$route.query.type
            if(fromPage == 0 || fromPage == 1){
                this.$router.push("/worker/workerList")
            } else if (fromPage == 2){
                this.$router.push("/worker/returnList")
            } else if (fromPage == 3){
                this.$router.push("/worker/errorWorkerList")
            } else if (fromPage == 4){
                this.$router.push("/worker/newWorkerList")
            }
            
        },
        /**
         * 生成图片
         */
        makeImage(){
            this.openMakeImageDialog = true
            this.openMakeImage = this.workerForm
        },
        /**
         * 控制编辑按钮文案
         */
        setEditButtonText(type){
            if(type == 0 ||type == 4){
                return '立即创建'
            } else if(type == 1 || type == 2 || type == 3){
                return '确认编辑'
            }
        },
        /**
         * 控制提交按钮文案
         */
        setSubmitButtonText(type){
            if(type == 2){
                return '导出回访'
            } else if(type == 3){
                return '恢复'
            } else if(type == 4){
                return '提交至信息库'
            } else {
                return ''
            }
        },
        /**
         * 控制生成图片按钮是否显示
         */
        setIsShowImageButton(type){
            if(type == 1){
                return true
            } else {
                return false
            }
        }
    },
    async mounted(){
        let _this = this;
        //按钮显示隐藏，文案
        this.editText = this.setEditButtonText(this.$route.query.type)
        this.submitText  = this.setSubmitButtonText(this.$route.query.type)
        this.isShowImageButton = this.setIsShowImageButton(this.$route.query.type)


        try{
            await store.commit('setLoading',true)
            //如果是编辑则请求接口
            if(this.$route.query.type != 0){
                await hrService.getStaff(this.$route.query.id).then(data =>{
                    if(data.code == "0"){

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
                        //服务地区
                        workerForm.region = workerForm.region.reduce((arr, item, index) =>{
                            return arr.concat(item.region_id)
                        },[])
                        //可服务人群
                        workerForm.service_crowd = workerForm.service_crowd.reduce((arr, item, index) =>{
                            return arr.concat(item.service_crowd_id)
                        },[])
                        // 职业类型
                        workerForm.skill = workerForm.skill.reduce((arr, item, index) =>{
                            return arr.concat(item.service_category_id)
                        },[])
                        // 参加培训
                        workerForm.course = workerForm.course.reduce((arr, item, index) =>{
                            return arr.concat(item.course_id)
                        },[])
                        // 服务类型
                        workerForm.service_type = workerForm.service_type.reduce((arr, item, index) =>{
                            return arr.concat(item.service_type_id)
                        },[])
                        //头像
                        this.icon_fileList = workerForm.icon == ''? [] : [{
                            url: `./resource/${workerForm.icon}`,
                            name: 'head'
                        }]
                        //照片
                        this.photo_fileList =  workerForm.photo.map((item, index) =>{
                            return {
                                ...item,
                                url: `./resource/${item.path}`,
                                isBack: false,
                            }
                        })
                        //证件照片
                        // this.id_photo_fileList =  workerForm.id_photo.map((item, index) =>{
                        //     return {
                        //         ...item,
                        //         url: `./resource/${item.path}`,
                        //         isBack: false,
                        //     }
                        // })
                        workerForm.id_photo = []
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
                    // 将表单配置数据存入 vuex 
                    this.$store.commit('setConfigForm',data.data)
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
            height: 60px;
            padding: 10px 0;
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

</style>



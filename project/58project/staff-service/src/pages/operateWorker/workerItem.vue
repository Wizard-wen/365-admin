<template>
    <page-edit-component
        v-loading="is_loading"
        :title="workerForm.name">

        <template slot="icon" >
            <icon-component
                :iconUrl="workerForm.icon"
                :height="140"
                :width="100"></icon-component>
        </template>
        
        <template slot="detail" >
            <div class="detail-left">
                <div class="detail-left-box">
                    <div class="detail-left-line">创建人：{{workerForm.manager_name}}</div>
                    <div class="detail-left-line">创建时间：{{workerForm.created_at | formDate}}</div>
                    <div class="detail-left-line">更新时间：{{workerForm.updated_at | formDate}}</div>
                    <div class="detail-left-line">上次回访时间：{{workerForm.return_at | formDate}}</div>
                </div>
            </div>
        </template>
        <template slot="statistic">
            <div class="detail-right">
                <div class="right-box">
                    <div class="title">
                        签约状态
                        <el-tooltip class="item" effect="dark" content="是否正在平台执行合同" placement="top-start">
                            <i class="el-icon-info"></i>
                        </el-tooltip>
                    </div>
                    <div class="value" :style="{color: workerForm.sign_status == 1? '#F56C6C': '#67C23A'}">
                        {{ workerForm.sign_status == 1? '未签约': '已签约'}}
                    </div>
                </div>
                <div class="right-box" >
                    <div class="title" >
                        是否启用
                        <el-tooltip class="item" effect="dark" content="平台是否对外展示该劳动者" placement="top-start">
                            <i class="el-icon-info"></i>
                        </el-tooltip>
                    </div>
                    <div class="value" :style="{color: workerForm.status == 1? '#67C23A': '#F56C6C'}">
                        {{ workerForm.status == 1? '启用': '停用'}}
                    </div>
                </div>
            </div>
        </template>
        <template slot="control">
            <div class="control-contains">
                <!-- 创建/编辑 -->
                <el-button size="mini" type="primary" @click="editWorker('form')">{{editText}}</el-button>
                <!-- <el-button size="mini" type="primary" @click="makeImage" v-if="isShowImageButton">生成名片</el-button> -->
                <make-image-btn :workerForm="workerForm"></make-image-btn>
                <!-- 导出回访 / 恢复 / 提交至信息库-->
                <el-button size="mini" type="primary" @click="submitStaff" v-if="submitText != ''">{{submitText}}</el-button>
                <el-button size="mini" @click="goback">返回</el-button>
            </div>
        </template>

        <!-- 生成服务人员名片组件 -->
        <!-- 生成服务人员名片组件 -->
        <!-- <template>
            <make-image-component
                :makeImageDialogVisible="makeImageDialogVisible"
                v-if="makeImageDialogVisible"
                @closeMakeImageDialog="makeImageDialogVisible = false"
                :width="800"
                :height="565">
                <template slot="pictureContains">
                    <worker-picture-component
                        :pictureForm="workerForm"></worker-picture-component>
                </template>
            </make-image-component>
        </template> -->

        
        
        <el-form class="worker-form" slot="form"  ref="form" :model="workerForm" :rules="staffRules" label-width="120px">
            
            <card-box-component 
                :title="'基本信息'">
                <div slot="contains" class="contains-form">
                    <el-form-item  label="姓名" prop="name" ref="name" class="form-item-3-size" size="small">
                        <el-input v-model="workerForm.name" :maxlength="20" placeholder="请输入服务人员姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" prop="phone" class="form-item-3-size" size="small">
                        <el-input v-model="workerForm.phone" :maxlength="11" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex" class="form-item-3-size">
                        <el-radio-group v-model="workerForm.sex">
                            <el-radio :label="1">男</el-radio>
                            <el-radio :label="2">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    
                    <el-form-item label="身份证号码" prop="identify" class="form-item-size form-item-3-size" size="small">
                        <el-input v-model="workerForm.identify" :maxlength="18" placeholder="请输入身份证号"></el-input>
                    </el-form-item>

                    <el-form-item prop="age" class="form-item-size form-item-3-size" size="small">
                        <el-tooltip slot="label" class="item" effect="dark" content="年龄根据身份证号确定" placement="top-start">
                            <span>年龄<i class="el-icon-info"></i></span>
                        </el-tooltip>
                        {{workerForm.age? workerForm.age: '暂无信息'}}
                    </el-form-item>

                    <el-form-item prop="birthday" class="form-item-size form-item-3-size" size="small">
                        <el-tooltip slot="label" class="item" effect="dark" content="出生日期根据身份证号确定" placement="top-start">
                            <span>出生日期<i class="el-icon-info"></i></span>
                        </el-tooltip>
                        {{workerForm.birthday? workerForm.birthday: '暂无信息'}}
                    </el-form-item>

                    <el-form-item label="民族" prop="nation" class="form-item-size form-item-3-size" size="small">
                        <el-select 
                            v-model="workerForm.nation" 
                            placeholder="请选择民族"
                            clearable
                            filterable>
                            <el-option
                                v-for="item in workerFormConfig.nation"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item label="学历" prop="education" class="form-item-size form-item-3-size" size="small">
                        <el-select 
                            v-model="workerForm.education" 
                            placeholder="请选择学历"
                            clearable
                            filterable>
                            <!-- <el-option></el-option> -->
                            <el-option
                                v-for="item in workerFormConfig.education"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <div class="form-item-size form-item-3-size"></div>

                    <el-form-item label="生肖" prop="zodiac_ign" class="form-item-size form-item-3-size" size="small">
                        <el-select 
                            v-model="workerForm.zodiac_ign" 
                            placeholder="请选择生肖"
                            clearable
                            filterable>
                            <el-option
                                v-for="item in zodiac_ignList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="身高" prop="body_height" class="form-item-size form-item-3-size" size="small">
                        <el-input v-model="workerForm.body_height" :maxlength="18" placeholder="请输入身高，cm"></el-input>
                    </el-form-item>

                    <el-form-item label="体重" prop="body_weight" class="form-item-size form-item-3-size" size="small">
                        <el-input v-model="workerForm.body_weight" :maxlength="18" placeholder="请输入体重，kg"></el-input>
                    </el-form-item>

                    <el-form-item prop="icon" class="form-item-size form-item-3-size" size="small">
                        <el-tooltip slot="label" class="item" effect="dark" content="比例为100*140" placement="top-start">
                            <span>头像<i class="el-icon-info"></i></span>
                        </el-tooltip>
                        <single-picture-upload
                            :uploadHeader="uploadHeader"
                            :height="140"
                            :width="100"
                            :initUrl="workerForm.icon?`./resource/${workerForm.icon}`:''"
                            @onSinglePictureSuccess="onIconPictureSuccess"></single-picture-upload>
                    </el-form-item>
                    
                    <el-form-item class="form-item-size form-item-23-size">
                        <el-tooltip slot="label" class="item" effect="dark" content="比例为150*237" placement="top-start">
                            <span>证件照<i class="el-icon-info"></i></span>
                        </el-tooltip>
                        <multiple-picture-upload
                            v-model="workerForm.id_photo"
                            :title="'证件照'"
                            :maxCount="2"
                            :height="150"
                            :width="237"></multiple-picture-upload>
                    </el-form-item>
                    <el-form-item label="现住址" prop="address" class="form-item-size form-item-1-size" size="small">
                        <el-input v-model="workerForm.address" :maxlength="50" placeholder="请输入现住址"></el-input>
                    </el-form-item>

                    <el-form-item label="紧急联系人" prop="urgent_phone" class="form-item-size form-item-1-size" size="small">
                        <el-input v-model="workerForm.urgent_phone" :maxlength="50" placeholder="请输入紧急联系人"></el-input>
                    </el-form-item>
                </div>
                
            </card-box-component>
            
            <card-box-component 
                :title="'技能信息'">
                <div slot="contains" class="contains-form">
                    <el-form-item label="职业类型" prop="skill" class="form-item-size form-item-2-size" size="small">
                        <el-cascader
                            v-model="workerForm.skill"
                            :props="{
                                label: 'name',
                                value: 'id',
                                multiple: true
                            }"
                            :options="workerFormConfig.skill"
                            :show-all-levels="false"></el-cascader>
                    </el-form-item>
                    <el-form-item label="参加工作年份" prop="worked_at" class="form-item-size form-item-2-size" size="small">
                        <el-date-picker
                            v-model="workerForm.worked_at"
                            type="year"
                            format="yyyy 年"
                            value-format="yyyy"
                            placeholder="选择参加工作年份"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="参加培训" prop="course" class="form-item-size form-item-2-size" size="small">
                        <el-cascader
                            v-model="workerForm.course"
                            :props="{
                                label: 'name',
                                value: 'id',
                                multiple: true
                            }"
                            placeholder="请选择培训项目"
                            :options="workerFormConfig.course"
                            :show-all-levels="false"></el-cascader>
                    </el-form-item>
                    <el-form-item slot="contains" label="技能证书标签" prop="paper" class="form-item-size form-item-2-size" size="small">
                        <el-select 
                            v-model="workerForm.paper" 
                            placeholder="请选择技能证书"
                            clearable
                            filterable
                            multiple>
                            <el-option
                                v-for="item in workerFormConfig.paper_category"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item prop="certificate" class="form-item-size form-item-1-size">
                        <el-tooltip slot="label" class="item" effect="dark" content="证书尺寸为150*237" placement="top-start">
                            <span>技能证书<i class="el-icon-info"></i></span>
                        </el-tooltip>
                        <paper-component 
                            v-model="workerForm.certificate" 
                            :heihgt="150"
                            :width="237"></paper-component>
                    </el-form-item>

                    <el-form-item class="form-item-size form-item-1-size">
                        <el-tooltip slot="label" class="item" effect="dark" content="有关服务人员的其他的图片，比例为150*237" placement="top-start">
                            <span>照片<i class="el-icon-info"></i></span>
                        </el-tooltip>
                        <multiple-picture-upload
                            v-model="workerForm.photo"
                            :title="'照片'"
                            :maxCount="10"
                            :height="150"
                            :width="237"></multiple-picture-upload>
                    </el-form-item>
                    
                </div>
                
            </card-box-component>
            <card-box-component 
                :title="'备注信息'">
                <el-form-item slot="contains" prop="remarks" class="form-item-size" size="small">
                    <el-tooltip slot="label" class="item" effect="dark" content="备注信息用于记录服务人员的其他相关信息。" placement="top-start">
                        <span>备注<i class="el-icon-info"></i></span>
                    </el-tooltip>
                    <el-input type="textarea" v-model="workerForm.remarks" :maxlength="200" placeholder="请输入备注信息"></el-input>
                </el-form-item>
            </card-box-component>
            <log-component :title="'日志'" :isEdit="false" :logList="workerForm.log"></log-component>

            <return-msg-component :return_msg="workerForm.log" @updateOrderConfig="getWorkerForm"></return-msg-component>

            
            <card-box-component 
                :title="'备注信息'">
                <el-form-item slot="contains" label="回访信息" prop="return_msg" class="form-item-size" size="small">
                    <el-tooltip slot="label" class="item" effect="dark" content="" placement="top-start">
                        <span>回访信息<i class="el-icon-info"></i></span>
                    </el-tooltip>
                    <el-input type="textarea" v-model="workerForm.return_msg" :maxlength="200" placeholder="请输入回访信息"></el-input>
                </el-form-item>
            </card-box-component>
            <el-form-item>
                <!-- 创建/编辑 -->
                <el-button size="mini" type="primary" @click="editWorker('form')">{{editText}}</el-button>
                <!-- <el-button size="mini" type="primary" @click="makeImage" v-if="isShowImageButton">生成名片</el-button> -->
                <make-image-btn :workerForm="workerForm"></make-image-btn>
                <!-- 导出回访 / 恢复 / 提交至信息库-->
                <el-button size="mini" type="primary" @click="submitStaff" v-if="submitText != ''">{{submitText}}</el-button>
                <el-button size="mini" @click="goback">返回</el-button>
            </el-form-item>
        </el-form>
    </page-edit-component>
</template>

<script>

import {
    operateService, 
    $utils
} from '@common/index.js'

//上传证书组件
import paperComponent from './workerItem/paperComponent.vue'

import workerPictureComponent from './workerItem/workerPictureComponent.vue'

import {operateWorkerService} from '@/service/operateWorker'

import {zodiac_ignList} from './workerList/IworkerList.ts'


import returnMsgComponent from './workerItem/returnMsgComponent.vue'
import makeImageBtn from '@/pages/operateWorker/workerList/workerTableComponent/control/makeImageBtn.vue'

export default {
    components: {
        paperComponent,//上传证书照片证书组件
        workerPictureComponent,//生成服务人员名片组件
        returnMsgComponent,
        makeImageBtn,
    },
    data() {
        let _this = this
        //表单验证
        const validator = {
            //手机号
            async phoneValidate(rule, value, callback){
                if (value == '') {
                    _this.phoneCheck = false
                    _this.phoneCheckObject = {}
                    callback(new Error('请输入手机号'));
                } else {
                    try{
                        await operateService.checkStaffPhone(_this.workerForm.id, value).then((data) =>{
                            if(data.code == '0'){
                                callback()
                                _this.phoneCheck = false
                                _this.phoneCheckObject = {}
                            } else {
                                callback(new Error(data.message))
                            }
                        })
                    } catch(error){
                        _this.phoneCheck = true
                        _this.phoneCheckObject = error.data
                        callback(error.message)
                    }
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
        }
        return {
            
            is_loading: false,//
            makeImageDialogVisible:false,//是否打开创建图片弹窗
            editText: '',//编辑按钮文案
            submitText: '',//提交按钮文案
            isShowImageButton: false,//是否显示生成名片按钮
            timeDefaultShow: '',//当前日期
            zodiac_ignList,//生肖数组
            //手机号重复检测
            phoneCheck: false,
            phoneCheckObject: {

            },
            //图片上传header
            uploadHeader:{
                accessToken: this.$store.state.loginModule.token.access_token
            },
            //员工信息表单
            workerForm: {
                /************逻辑字段******************/
                id:null,//员工id
                staff_code:null,//员工号
                version:null,//操作版本号
                status: null,//员工停用启用
                sex:1,//性别
                log: [],//日志
                /************业务字段******************/
                manager_id:0,//创建人id
                //创建人这块有bug
                manager_name:'',//创建人姓名
                created_at:null,//创建时间
                updated_at:null,//更新时间
                return_at:null,//上次回访时间
                name:'',//姓名
                age:null,//年龄
                birthday:null,//出生日期
                identify:'',//身份证号码
                phone:'',//电话
                skill:[1],//职业类型
                // service_type:[],//服务类型
                // service_crowd:[],//可服务人群
                zodiac_ign:[],
                body_weight: '',
                body_height: '',
                worked_at:'2015',//何时参加工作
                nation:0,//民族
                id_photo: [],//证件照
                address:'',//地址
                education:0,//学历
                urgent_phone:'',//紧急联系人电话
                photo: [],//照片
                icon:'',//头像
                course:[],//参加培训
                paper:[],//技能证书标签
                certificate: [],//技能证书图片
                remarks:'',//备注（商家情况）
                return_msg:'',//回访信息
                
                // type:null,//签约状态
                // register_at:null,//登记时间
                // source:0,//信息来源
                // source_name:'',//来源名称
                // bank_card:'',//银行卡号
                // teacher_comment:'',//教师评语
                // region:[],//服务区域
                // birthplace:'',//籍贯
                // working_experience:'',//工作经验（备注）
                // working_status:0,//接单状态
                // authentication:0,//认证状态
                // working_age:0,//工龄
            },
            workerFormConfig: {},
            //表单验证规则
            staffRules: {
                //姓名
                name: [
                    { required:true,message:'请输入姓名',trigger: 'blur' },
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
            },
            datePickerOption: {
                disabledDate(time) {
                    return time.getTime() > Date.now();//如果没有后面的-8.64e6就是不可以选择今天的
                }
            },
            isShowBlack: false,//头像阴影
            //图片上传header
            uploadHeader:{
                accessToken: this.$store.state.loginModule.token.access_token
            }
        }
    },
    filters: {
        formDate(timestamp){
            if(timestamp){
                return $utils.formatDate(new Date(timestamp), 'yyyy-MM-dd')
            } else {
                '-'
            }
        }
    },
    methods: {
        /**
         * 提交表单
         */
        async editWorker(formName) {
            let _this = this;
            await this.$refs[formName].validate(async (valid, fileds) => {
                if (valid) {
                    let workerFormSend = {
                        ...this.workerForm,
                    }

                    if(!workerFormSend.id){
                        workerFormSend.id = this.$store.state.loginModule.user.username
                    }

                    workerFormSend.skill = operateWorkerService.sendCascanderData(workerFormSend.skill) 

                    try{
                        this.is_loading = true
                        await operateWorkerService.editWorker(workerFormSend).then(data =>{
                            if(data.code == '0'){
                                this.$message({
                                    type:"success",
                                    message: data.message
                                })
                                this.is_loading = false

                                this.goback()
                            }
                        }).catch(error =>{
                            this.$message({
                                type:'error',
                                message: error.message
                            })
                            this.is_loading = false
                        }).finally(() =>{
                            this.is_loading = false
                        })
                    } catch(error){
                        this.$message({
                            type:'error',
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
            let workerFormSend = this.setFormItem()

            try{
                this.is_loading = true
                await operateService.agreeStaffSingle(module_type, 'edit',workerFormSend).then(data =>{
                    if(data.code == '0'){
                        this.$message({
                            type:"success",
                            message: "提交成功"
                        })
                        this.is_loading = false

                        this.goback()
                    }
                }).catch(error =>{
                    this.$message({
                        type:'error',
                        message: error.message
                    })
                }).finally(() =>{
                    this.is_loading = false
                })
            } catch(error){
                this.$message({
                    type:'error',
                    message: error.message
                })
            }
        },
        //头像上传成功
        onIconPictureSuccess(res){
            this.workerForm.icon = res.path
        },
        /**
         * 返回
         */
        goback(){
            let fromPage = this.$route.query.type
            if(fromPage == 0 || fromPage == 1){
                this.$router.push("/worker/workerList")
            } else if (fromPage == 2){
                this.$router.push("/worker/returnWorkerList")
            } else if (fromPage == 3){
                this.$router.push("/worker/errorWorkerList")
            } else if (fromPage == 4){
                this.$router.push("/worker/newWorkerList")
            }
        },
        /**
         * 生成图片
         */
        // makeImage(){
        //     this.makeImageDialogVisible = true
        // },
        /**
         * 控制编辑按钮文案
         */
        setEditButtonText(type){
            if(type == 0){
                return '立即创建'
            } else if(type == 1 || type == 2 || type == 3){
                return '确认编辑'
            } else if(type == 4){
                return '保存'
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
                return '保存并提交'
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
        },
        /**
         * 获取表单数据
         */
        async getWorkerForm(){
            try{
                this.is_loading = true

                await operateWorkerService.getWorkerFormConfig('edit').then((data) =>{
                    if(data.code == '0'){
                        this.workerFormConfig = data.data
                    }
                }).catch(error =>{
                    this.$message({
                        type:'error',
                        message: error.message
                    })
                })
                //如果是编辑则请求接口
                if(this.$route.query.type != 0){
                    await operateWorkerService.getWorker(this.$route.query.id,this.workerFormConfig).then(data =>{
                        this.workerForm = data
                    }).catch(error =>{
                        this.$message({
                            type:'error',
                            message: error.message
                        })
                    })
                }

                this.is_loading = false
            }catch(error){
                this.$message({
                    type:'error',
                    message: error.message
                })
                this.is_loading = false
            }
            this.is_loading = false
            
        }
    },
    async mounted(){
        let _this = this;
        // 设定日期选择器为当前日期
        this.timeDefaultShow = Date.parse(new Date());

        //按钮显示隐藏，文案
        this.editText = this.setEditButtonText(this.$route.query.type)
        this.submitText  = this.setSubmitButtonText(this.$route.query.type)
        this.isShowImageButton = this.setIsShowImageButton(this.$route.query.type)
        
        
        this.getWorkerForm()

    }
}
</script>
<style lang="scss" scoped>
.worker-form{
    width: 100%;
    margin-bottom: 60px;
    // display: flex;
    & /deep/ .el-form-item{
        margin-bottom: 15px;
    }
    .contains-form{
        display: flex;
        flex-wrap:wrap;
    }
    .form-item-3-size{
        width: 33%;
    }
    .form-item-23-size{
        width: 66%;
    }
    .form-item-1-size{
        width: 100%;
    }
    .form-item-2-size{
        width: 50%;
    }
    .form-item-size{
        max-width: 900px;
    }
    & /deep/ .el-form-item__content{

    }  

    & /deep/ .el-form-item__content{

    }      
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
// 日志
.log{
    padding: 24px;
    width: 300px;
    margin-left: 24px;
    background: #fff;
    & /deep/ .el-step__title{
        font-size: 12px;
        color: #333;
    }
}

</style>

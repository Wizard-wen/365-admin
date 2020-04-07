<template>
    <page-edit-component
        v-loading="is_loading"
        :title="workerForm.name">

        <template slot="icon" >
            <!-- <icon-component
                :iconUrl="workerForm.icon?`${workerForm.icon}`:''"
                :height="140"
                :width="100"></icon-component> -->
            <!-- <el-image 
                class="icon-box"
                :src="workerForm.icon" 
                :fit="'contain'"
                :preview-src-list="[workerForm.icon]">
                <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                </div>
            </el-image> -->
            
        </template>
        
        <template slot="detail" >
            <div class="detail-left">
                <div class="detail-left-box">
                    <!-- <div class="detail-left-line">创建人：{{workerForm.manager_name}}</div>
                    <div class="detail-left-line">创建时间：{{workerForm.created_at | timeToDayFomatter}}</div> -->
                    <!-- <div class="detail-left-line">更新时间：{{workerForm.updated_at | timeToDayFomatter}}</div>
                    <div class="detail-left-line">上次回访时间：{{workerForm.return_at | timeToDayFomatter}}</div> -->
                </div>
            </div>
        </template>
        <template slot="statistic">
            <!-- <worker-status
                v-if="$route.query.type !=0"
                :workerForm="workerForm"></worker-status> -->
        </template>
        <template slot="control">
            <div class="control-contains">
                <!-- 创建/编辑 -->
                <el-button size="mini" type="primary" @click="editWorker('form')">申请创建</el-button>
                
                <el-button size="mini" @click="goback">返回</el-button>
            </div>
        </template>

        
        
        <el-form class="worker-form" slot="form"  ref="form" :model="workerForm" :rules="staffRules" label-width="120px">
            
            <card-box-component 
                :title="'基本信息'">
                <div slot="contains" class="contains-form">
                    <el-form-item  prop="name" ref="name" class="form-item-3-size" size="small">
                        <el-tooltip slot="label" class="item" effect="dark" content="应当填写服务人员的真实姓名，一旦确定，不能更改。" placement="top-start">
                            <span>姓名<i class="el-icon-info"></i></span>
                        </el-tooltip>
                        <el-input v-model="workerForm.name" :maxlength="20" placeholder="请输入服务人员姓名"></el-input>
                    </el-form-item>
                    <el-form-item prop="phone" class="form-item-3-size" size="small">
                        <el-tooltip slot="label" class="item" effect="dark" content="手机号是服务人员的id，同一个手机号不能重复添加。手机号一旦确定，不能更改。" placement="top-start">
                            <span>电话<i class="el-icon-info"></i></span>
                        </el-tooltip>
                        <el-input v-model="workerForm.phone" :maxlength="11" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex" class="form-item-3-size">
                        <!-- <el-radio-group v-model="workerForm.sex">
                            <el-radio :label="1">男</el-radio>
                            <el-radio :label="2">女</el-radio>
                        </el-radio-group> -->
                        <el-tooltip slot="label" class="item" effect="dark" content="性别根据身份证号确定" placement="top-start">
                            <span>性别<i class="el-icon-info"></i></span>
                        </el-tooltip>
                        {{workerForm.sex | sexFilter}}
                    </el-form-item>

                    <el-form-item label="身份证号码" prop="identify" class="form-item-size form-item-3-size" size="small">
                        <el-input v-model="workerForm.identify" :maxlength="18" placeholder="请输入身份证号"></el-input>
                    </el-form-item>

                    <el-form-item prop="age" class="form-item-size form-item-3-size" size="small">
                        <el-tooltip slot="label" class="item" effect="dark" content="年龄根据身份证号确定" placement="top-start">
                            <span>年龄<i class="el-icon-info"></i></span>
                        </el-tooltip>
                        {{workerForm.age? workerForm.age: '-'}}
                    </el-form-item>

                    <el-form-item prop="birthday" class="form-item-size form-item-3-size" size="small">
                        <el-tooltip slot="label" class="item" effect="dark" content="出生日期根据身份证号确定" placement="top-start">
                            <span>出生日期<i class="el-icon-info"></i></span>
                        </el-tooltip>
                        {{ workerForm.birthday | timeToDayFomatter }}
                    </el-form-item>

                    <el-form-item label="民族" prop="nation" class="form-item-size form-item-3-size" size="small">
                        <el-select 
                            v-model="workerForm.nation" 
                            placeholder="请选择民族"
                            filterable>
                            <el-option
                                v-for="item in workerConfigForm.nation"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item label="学历" prop="education" class="form-item-size form-item-3-size" size="small">
                        <el-select 
                            v-model="workerForm.education" 
                            placeholder="请选择学历"
                            filterable>
                            <el-option
                                v-for="item in educationList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="婚姻状况" prop="is_married" class="form-item-3-size">
                        <el-radio-group v-model="workerForm.is_married">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="2">否</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="生肖" prop="zodiac_sign" class="form-item-size form-item-3-size" size="small">
                        <el-select 
                            v-model="workerForm.zodiac_sign" 
                            placeholder="请选择生肖"
                            filterable>
                            <el-option
                                v-for="item in zodiac_signList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item prop="body_height" class="form-item-size form-item-3-size" size="small">
                        <el-tooltip slot="label" class="item" effect="dark" content="单位为厘米（cm）" placement="top-start">
                            <span>身高<i class="el-icon-info"></i></span>
                        </el-tooltip>
                        <el-input v-model="workerForm.body_height" :maxlength="18" placeholder="请输入身高，cm"></el-input>
                    </el-form-item>

                    <el-form-item prop="body_weight" class="form-item-size form-item-3-size" size="small">
                        <el-tooltip slot="label" class="item" effect="dark" content="单位为公斤（kg）" placement="top-start">
                            <span>体重<i class="el-icon-info"></i></span>
                        </el-tooltip>
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
                            :initUrl="workerForm.icon?`${workerForm.icon}`:''"
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
                        <el-tooltip slot="label" class="item" effect="dark" content="请尽量保持精确" placement="top-start">
                            <span>现住址<i class="el-icon-info"></i></span>
                        </el-tooltip>
                        <el-input v-model="workerForm.address" :maxlength="50" placeholder="请输入现住址"></el-input>
                    </el-form-item>

                    <el-form-item label="紧急联系人" prop="urgent_phone" class="form-item-size form-item-1-size" size="small">
                        <el-tooltip slot="label" class="item" effect="dark" content="签约字段，请尽量保持信息准确完整。与劳动者关系+电话，如，爱人+135****2032" placement="top-start">
                            <span>紧急联系人<i class="el-icon-info"></i></span>
                        </el-tooltip>
                        <el-input v-model="workerForm.urgent_phone" :maxlength="50" placeholder="请输入紧急联系人，签约字段"></el-input>
                    </el-form-item>
                    <el-form-item prop="address_in_law" class="form-item-size form-item-1-size" size="small">
                        <el-tooltip slot="label" class="item" effect="dark" content="签约字段，请尽量保持信息准确完整。**省**市**区" placement="top-start">
                            <span>户籍地址<i class="el-icon-info"></i></span>
                        </el-tooltip>
                        <el-input v-model="workerForm.address_in_law" :maxlength="50" placeholder="请输入户籍地址，签约字段"></el-input>
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
                            :options="workerConfigForm.skill"
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
                            :options="workerConfigForm.course"
                            :show-all-levels="false"></el-cascader>
                    </el-form-item>
                    <el-form-item slot="contains"  prop="paper" class="form-item-size form-item-2-size" size="small">
                        <el-tooltip slot="label" class="item" effect="dark" content="注意和技能证书图片保持一致。" placement="top-start">
                            <span>技能证书标签<i class="el-icon-info"></i></span>
                        </el-tooltip>
                        <el-select 
                            v-model="workerForm.paper" 
                            placeholder="请选择技能证书"
                            filterable
                            multiple>
                            <el-option
                                v-for="item in workerConfigForm.paper_category"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item prop="certificate" class="form-item-size form-item-1-size">
                        <el-tooltip slot="label" class="item" effect="dark" content="证书尺寸为150*237。注意和技能证书标签保持一致。图片会展示给客户，请尽量保证图片质量。" placement="top-start">
                            <span>技能证书素材<i class="el-icon-info"></i></span>
                        </el-tooltip>
                        <paper-component 
                            v-model="workerForm.certificate" 
                            :heihgt="150"
                            :width="237"></paper-component>
                    </el-form-item>

                    <el-form-item class="form-item-size form-item-1-size">
                        <el-tooltip slot="label" class="item" effect="dark" content="有关服务人员的其他的图片，比例为150*237。这些图片会展示给客户，请尽量保证图片质量" placement="top-start">
                            <span>展示照片<i class="el-icon-info"></i></span>
                        </el-tooltip>
                        <multiple-picture-upload
                            v-model="workerForm.photo"
                            :title="'照片'"
                            :maxCount="10"
                            :height="150"
                            :width="237"></multiple-picture-upload>
                    </el-form-item>
                    <el-form-item prop="cus_working_exprience" class="form-item-size form-item-1-size" size="small">
                        <el-tooltip slot="label" class="item" effect="dark" content="这是给客户展示的工作经验，请注意措辞。" placement="top-start">
                            <span>展示工作经验<i class="el-icon-info"></i></span>
                        </el-tooltip>
                        <el-input v-model="workerForm.cus_working_exprience" :maxlength="50" placeholder="请输入工作经验，展示给客户的信息，请尽量保持精简。"></el-input>
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

            <card-box-component 
                v-if="$route.query.type == 4"
                :title="'新服务人员备注'">
                <el-form-item slot="contains" prop="seller_remarks" class="form-item-size" size="small">
                    <el-tooltip slot="label" class="item" effect="dark" content="由门店提出的新服务人员备注信息" placement="top-start">
                        <span>备注<i class="el-icon-info"></i></span>
                    </el-tooltip>
                    <el-input type="textarea" v-model="workerForm.seller_remarks"  disabled :maxlength="200" placeholder="请输入备注信息"></el-input>
                </el-form-item>
            </card-box-component>

            <!-- <log-component :title="'日志'" :isEdit="false" :logList="workerForm.log"></log-component> -->

            <!-- <return-msg-component 
                :isEdit="$route.query.type == 2? true :false" 
                :workerItem="workerForm"
                :return_msg="workerForm.return_log" 
                @updateOperateWorker="getWorkerForm"></return-msg-component> -->
            
            <el-form-item>

            </el-form-item>
        </el-form>
    </page-edit-component>
</template>

<script>

// import {
//     operateService, 
// } from '@common/index.js'




import {operateWorkerService} from '@/service/operateWorker'
// import {saleService} from '@/service/sale/'
import {publicModuleService} from '@/service/publicModule'
import {zodiac_signList} from '@/public/module/workerList/IworkerList.ts'
import {educationList} from '@/public/module/workerList/IworkerList.ts'

import {
    paperComponent,
    returnMsgComponent,
} from './saleApplyWorker/index.js'


import workerStatus from '@/public/module/workerShow/workerShowComponent/workerStatus.vue'


export default {
    components: {
        paperComponent,//上传证书照片证书组件
        returnMsgComponent,
        workerStatus,
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
                        let checkNewWorkerPhoneForm = {
                            id: _this.workerForm.id,
                            phone: value,
                        }
                        await publicModuleService.checkNewWorkerPhone(checkNewWorkerPhoneForm).then((data) =>{
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
            timeDefaultShow: '',//当前日期
            zodiac_signList,//生肖数组
            educationList,//学历数组
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
                id:0,//员工id
                staff_code:'',//员工号
                version:0,//操作版本号
                status: 1,//员工停用启用
                sex:1,//性别
                is_married:1,//婚姻状况
                /************业务字段******************/
                manager_id:0,//创建人id
                manager_name:'',//创建人姓名
                created_at:'',//创建时间
                updated_at:'',//更新时间
                return_at:'',//上次回访时间
                name:'',//姓名
                age:'',//年龄
                birthday:'',//出生日期
                identify:'',//身份证号码
                phone:'',//电话
                skill:[],//职业类型
                zodiac_sign:'',//生肖
                body_weight: '',//体重
                body_height: '',//身高
                worked_at:'',//何时参加工作
                nation:null,//民族
                id_photo: [],//证件照
                address:'',//地址
                address_in_law:'',//户籍地址
                cus_working_exprience:'',//工作经验（客户展示）
                education:null,//学历
                urgent_phone:'',//紧急联系人电话
                photo: [],//照片
                icon:'',//头像
                course:[],//参加培训
                paper:[],//技能证书标签
                certificate: [],//技能证书图片

                remarks:'',//备注
                // return_msg:[],//回访信息
                // log: [],//日志
            },
            //配置项
            workerConfigForm: {
                course: [],
                nation: [],
                paper_category: [],
                updated_type: [],
                manager: [],
                skill: [],
            },
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
        }
    },
    methods: {

        /**
         * 编辑、创建、保存服务人员
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

                    workerFormSend.skill = this.$utils.sendCascanderData(workerFormSend.skill) 
                    workerFormSend.course = this.$utils.sendCascanderData(workerFormSend.course) 

                    try{
                        this.is_loading = true
                        await publicModuleService.createWorkerBySeller(workerFormSend).then(data =>{
                            if(data.code == '0'){
                                this.$message({
                                    type:"success",
                                    message: data.message
                                })
                                this.is_loading = false

                                // 返回上一级列表
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
        //头像上传成功
        onIconPictureSuccess(res){
            this.workerForm.icon = res.path
        },
        /**
         * 获取表单数据
         */
        async getWorkerForm(){
            try{
                this.is_loading = true

                await publicModuleService.getWorkerConfigForm('edit').then((data) =>{
                    if(data.code == '0'){
                        this.workerConfigForm = data.data
                    }
                }).catch(error =>{
                    this.$message({
                        type:'error',
                        message: error.message
                    })
                })
                this.is_loading = false
            }catch(error){
                this.$message({
                    type:'error',
                    message: error.message
                })
                this.is_loading = false
            }
            this.is_loading = false
            
        },
        /**
         * 返回
         */
        goback(){
            this.$router.go(-1);
        },
    },
    filters: {
        sexFilter(val){
            if(val == ''){
                return '-'
            }
            if(val == 1){
                return '男'
            } else {
                return '女'
            }
        }
    },
    async mounted(){
        // 设定日期选择器为当前日期
        this.timeDefaultShow = Date.parse(new Date());
        
        await this.getWorkerForm()

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
.icon-box{
    height: 140px;
    width: 100px;
    /deep/ .image-slot{
        height: 140px;
        width: 100px;
        line-height: 140px;
        text-align: center;
        background: #f5f7fa;
    }
}

</style>

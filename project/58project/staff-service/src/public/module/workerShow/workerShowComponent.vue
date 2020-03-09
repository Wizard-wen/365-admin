<template>
    <page-edit-component
        v-loading="is_loading"
        :title="workerForm.name">

        <template slot="icon" >
            <icon-component
                :iconUrl="workerForm.icon?`./resource/${workerForm.icon}`:''"
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
                <make-image-btn 
                    :workerForm="workerForm" 
                    :workerConfigForm="workerConfigForm" 
                    :isShowImageButton="$route.query.type == 1 || $route.query.type ==  5"></make-image-btn>
                <el-button size="mini" @click="goback">返回</el-button>
            </div>
        </template>

        
          
            <card-box-component 
                :title="'基本信息'">
                <div slot="contains" class="contains-form">
                    <detail-form-component>
                        <detail-form-item-component
                            :label="'姓名'"
                            :size="3"
                            :value="workerForm.name"></detail-form-item-component>
                        <detail-form-item-component
                            :label="'电话'"
                            :size="3"
                            :value="workerForm.phone"></detail-form-item-component>
                        <detail-form-item-component
                            :type="'template'"
                            :label="'性别'"
                            :size="3"
                            :value="workerForm.sex">
                            <p slot="template">{{workerForm.sex == 1? '男' : '女'}}</p>
                        </detail-form-item-component>
                        <detail-form-item-component
                            :label="'身份证号'"
                            :size="3"
                            :value="workerForm.identify"></detail-form-item-component>
                        <detail-form-item-component
                            :label="'年龄'"
                            :size="3"
                            :value="workerForm.age"></detail-form-item-component>
                        <detail-form-item-component
                            :label="'出生日期'"
                            :size="3"
                            :value="workerForm.birthday"></detail-form-item-component>
                        <detail-form-item-component
                            :type="'template'"
                            :label="'民族'"
                            :size="3"
                            :value="workerForm.nation">
                            <table-tag-component 
                                slot="template"
                                v-if="workerConfigForm.nation" 
                                :propList="workerConfigForm.nation" 
                                :tableOriginData="workerForm.nation"></table-tag-component>
                        </detail-form-item-component>
                        <detail-form-item-component
                            :type="'template'"
                            :label="'学历'"
                            :size="3"
                            :value="workerForm.education">
                            <p slot="template">{{workerForm.education | educationFormat}}</p>
                        </detail-form-item-component>
                        <detail-form-item-component
                            :type="'template'"
                            :label="'婚姻状况'"
                            :size="3"
                            :value="workerForm.is_married">
                            <p slot="template">{{workerForm.is_married == 1? '是': '否'}}</p>
                        </detail-form-item-component>
                        <detail-form-item-component
                            :type="'template'"
                            :label="'生肖'"
                            :size="3"
                            :value="workerForm.zodiac_sign">
                            <p slot="template">{{workerForm.zodiac_sign |zodiac_signFormat}}</p>
                        </detail-form-item-component>
                        <detail-form-item-component
                            :label="'身高'"
                            :size="3"
                            :value="`${workerForm.body_height}cm`"></detail-form-item-component>
                        <detail-form-item-component
                            :label="'体重'"
                            :size="3"
                            :value="`${workerForm.body_weight}kg`"></detail-form-item-component>
                        <detail-form-item-component
                            :type="'template'"
                            :label="'证件照'"
                            :size="1"
                            :value="workerForm.id_photo">
                            <multiple-picture-upload
                                slot="template"
                                :isEdit="false"
                                v-model="workerForm.id_photo"
                                :title="'证件照'"
                                :height="150"
                                :width="237"></multiple-picture-upload>
                        </detail-form-item-component>
                        <detail-form-item-component
                            :label="'现住址'"
                            :size="1"
                            :value="workerForm.address"></detail-form-item-component>
                        <detail-form-item-component
                            :label="'紧急联系人'"
                            :size="1"
                            :value="workerForm.urgent_phone"></detail-form-item-component>
                    </detail-form-component>
                </div>
            </card-box-component>
            <card-box-component 
                :title="'基本信息'">
                <div slot="contains" class="contains-form">
                    <detail-form-component>
                        <detail-form-item-component
                            :type="'template'"
                            :label="'职业类型'"
                            :size="1"
                            :value="workerForm.skill">
                            <table-tag-component 
                                slot="template"
                                v-if="workerConfigForm.skill" 
                                :propList="workerConfigForm.skill" 
                                :tableOriginData="workerForm.skill"></table-tag-component>
                        </detail-form-item-component>
                        <detail-form-item-component
                            :type="'template'"
                            :label="'参加培训'"
                            :size="1"
                            :value="workerForm.course">
                            <table-tag-component 
                                slot="template"
                                v-if="workerConfigForm.course" 
                                :propList="workerConfigForm.course" 
                                :tableOriginData="workerForm.course"></table-tag-component>
                        </detail-form-item-component>
                        <detail-form-item-component
                            :type="'template'"
                            :label="'技能证书'"
                            :size="1"
                            :value="workerForm.paper">
                            <table-tag-component 
                                slot="template"
                                v-if="workerConfigForm.paper_category" 
                                :propList="workerConfigForm.paper_category" 
                                :tableOriginData="workerForm.paper"></table-tag-component>
                        </detail-form-item-component>
                        <detail-form-item-component
                            :label="'参加工作年份'"
                            :size="3"
                            :value="`${workerForm.worked_at}年`"></detail-form-item-component>
                        <detail-form-item-component
                            :type="'template'"
                            :label="'照片'"
                            :size="1"
                            :value="workerForm.photo">
                            <multiple-picture-upload
                                slot="template"
                                :isEdit="false"
                                v-model="workerForm.photo"
                                :title="'照片'"
                                :maxCount="10"
                                :height="150"
                                :width="237"></multiple-picture-upload>
                        </detail-form-item-component>
                    </detail-form-component>
                </div>
            </card-box-component>
        
            <log-component :title="'日志'" :isEdit="false" :logList="workerForm.log"></log-component>

            <return-msg-component 
                :isEdit="this.$route.query.type == 2? true :false" 
                :return_msg="workerForm.return_log" 
                @updateOrderConfig="getWorkerForm"></return-msg-component>
            
        
            <make-image-btn 
                :workerForm="workerForm" 
                :workerConfigForm="workerConfigForm" 
                :isShowImageButton="$route.query.type == 1 || $route.query.type ==  5"></make-image-btn>
            <el-button size="mini" @click="goback">返回</el-button>
    </page-edit-component>
</template>

<script>

import {
    operateService, 
    $utils
} from '@common/index.js'


import makeImageBtn from '@/pages/operateWorker/workerList/workerTableComponent/control/makeImageBtn.vue'
import workerPictureComponent from './workerShowComponent/workerPictureComponent.vue'

import {operateWorkerService} from '@/service/operateWorker'

import {zodiac_signList,educationList} from '@/pages/operateWorker/workerList/IworkerList.ts'
import returnMsgComponent from '@/pages/operateWorker/workerItem/returnMsgComponent.vue'
export default {
    components: {
        workerPictureComponent,//生成服务人员名片组件
        returnMsgComponent,
        makeImageBtn,
    },
    data() {

        return {
            is_loading: false,//
            makeImageDialogVisible:false,//是否打开创建图片弹窗
            editText: '',//编辑按钮文案
            submitText: '',//提交按钮文案
            isShowImageButton: false,//是否显示生成名片按钮
            timeDefaultShow: '',//当前日期
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
                zodiac_sign:[],
                body_weight: '',
                body_height: '',
                worked_at:0,//何时参加工作
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
                return_log:[],//回访信息
            },
            workerConfigForm: {},
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
        // nationFormat(target){
        //     return this.workerConfigForm.nation.find(item => item.id == target ).name
        // },
        educationFormat(target){
            return educationList.find(item => item.id == target ).name
        },
        zodiac_signFormat(target){
            return zodiac_signList.find(item => item.id == target ).name
        },
        formDate(timestamp){
            return $utils.formatDate(new Date(timestamp), 'yyyy-MM-dd')
        }
    },
    methods: {
        //头像上传成功
        onIconPictureSuccess(res){
            this.workerForm.icon = res.path
        },
        /**
         * 返回
         */
        goback(){
            let fromPage = this.$route.query.type
            if(fromPage == 1){
                this.$router.push("/worker/workerList")
            } else if (fromPage == 2){
                this.$router.push("/worker/returnWorkerList")
            } else if (fromPage == 3){
                this.$router.push("/worker/errorWorkerList")
            } else if (fromPage == 5){
                this.$router.push("/sale/saleWorkerList")
            } else if (fromPage == 6){
                this.$router.push({
                    path: "/sale/saleOrderConfig",
                    query: {
                        order_type: 2,
                        order_id: this.$route.query.order_id
                    }
                })
            } 
            // else if (fromPage == 4){
            //     this.$router.push("/worker/newWorkerList")
            // }
        },
        /**
         * 生成图片
         */
        makeImage(){
            this.makeImageDialogVisible = true
        },
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
                        this.workerConfigForm = data.data
                    }
                }).catch(error =>{
                    this.$message({
                        type:'error',
                        message: error.message
                    })
                })
                //如果是编辑则请求接口
                if(this.$route.query.type != 0){
                    await operateWorkerService.getWorker(this.$route.query.id,this.workerConfigForm).then(data =>{
                        let responseData = data
                        responseData.skill = operateWorkerService.sendCascanderData(responseData.skill)
                        responseData.course = operateWorkerService.sendCascanderData(responseData.course)
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

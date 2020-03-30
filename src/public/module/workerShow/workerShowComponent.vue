<template>
    <page-edit-component
        v-loading="is_loading"
        :title="workerForm.name">

        <template slot="icon" >
            <icon-component
                :iconUrl="workerForm.icon?workerForm.icon:''"
                :height="140" :width="100"></icon-component>
        </template>
        
        <template slot="detail" >
            <div class="detail-left">
                <div class="detail-left-box">
                    <div class="detail-left-line">创建人：{{workerForm.manager_name}}</div>
                    <div class="detail-left-line">创建时间：{{workerForm.created_at | timeToDayFomatter}}</div>
                    <div class="detail-left-line">更新时间：{{workerForm.updated_at | timeToDayFomatter}}</div>
                    <div class="detail-left-line">上次回访时间：{{workerForm.return_at | timeToDayFomatter}}</div>
                </div>
            </div>
        </template>
        <template slot="statistic">
            <!-- 服务人员状态 -->
            <worker-status :workerForm="workerForm"></worker-status>
        </template>
        <template slot="control">
            <div class="control-contains">
                <make-image-btn 
                    :workerForm="workerForm" 
                    :workerConfigForm="workerConfigForm" 
                    :isShowImageButton="$route.query.type == 1 || $route.query.type == 5 || $route.query.type == 6"></make-image-btn>
                <el-button size="mini" @click="goback">返回</el-button>
            </div>
        </template>
        <div slot="form">
            <!-- 基本信息 -->
            <worker-base-component :workerForm="workerForm" :workerConfigForm="workerConfigForm"></worker-base-component>
            <!-- 技能信息 -->
            <worker-skill-component :workerForm="workerForm" :workerConfigForm="workerConfigForm"></worker-skill-component>
            <!-- 服务人员日志 -->
            <log-component :title="'日志'" :isEdit="false" :logList="workerForm.log"></log-component>
            <!-- 回访信息 -->
            <return-msg-component 
                :isEdit="false" 
                :return_msg="workerForm.return_log" 
                @updateOrderConfig="getWorkerForm"></return-msg-component>
        </div>
            
    </page-edit-component>
</template>

<script>




import {publicModuleService} from '@/service/publicModule'

import returnMsgComponent from '@/pages/operateWorker/workerItem/returnMsgComponent.vue'
import makeImageBtn from './workerShowComponent/makeImageBtn.vue'
import workerStatus from './workerShowComponent/workerStatus.vue'
import workerBaseComponent from './workerShowComponent/workerBaseComponent.vue'
import workerSkillComponent from './workerShowComponent/workerSkillComponent.vue'
export default {
    components: {
        returnMsgComponent,
        makeImageBtn,
        workerStatus,
        workerBaseComponent,
        workerSkillComponent,
    },
    data() {
        return {
            is_loading: false,//
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
        }
    },
    methods: {
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
            } 
            else if (fromPage == 5){
                this.$router.push("/sale/saleWorkerList")
            } else if (fromPage == 6){
                this.$router.push({
                    path: "/sale/saleOrderConfig",
                    query: {
                        order_type: 2,
                        module: '',
                        order_id: this.$route.query.order_id
                    }
                })
            } else if (fromPage == 7){
                this.$router.push({
                    path: "/sale/salePublicOrderConfig",
                    query: {
                        order_type: 3,
                        module: 'public',
                        order_id: this.$route.query.order_id
                    }
                })
            } else if (fromPage == 8){
                this.$router.push({
                    path: "/operate/operateOrderConfig",
                    query: {
                        ...this.$route.query,
                        order_id: this.$route.query.order_id
                    }
                })
            } 
        },
        /**
         * 获取表单数据
         */
        async getWorkerForm(){
            try{
                this.is_loading = true

                await publicModuleService.getPublicWorkerConfigForm('edit').then((data) =>{
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
                    await publicModuleService.getPublicWorkerShow(this.$route.query.id,this.workerConfigForm).then(data =>{
                        let responseData = data
                        responseData.skill = this.$utils.sendCascanderData(responseData.skill)
                        responseData.course = this.$utils.sendCascanderData(responseData.course)
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
.control{
    justify-content: space-between;
    padding: 20px 20px 100px 20px;
}
</style>

<template>
    <div class="orderConfig" v-loading="isLoaded">
        <div class="order-header">
            <div class="order-name">
                <h4>合同编号：{{contractBase.contract_number}}</h4>
            </div>
            <div class="btn-group">
                <!-- 仅店长有此权限 -->
                <el-button type="primary" size="mini" 
                    v-if="contractBase.is_wage == 1 && contractBase.type == 2"
                    @click="openSettleWageDialog">结算工资</el-button>
                <el-button type="danger" size="mini" 
                    v-if="contractBase.type != 3"
                    @click="openDeterminateContractDialog">终止合同</el-button>
                <el-button size="mini" @click="goback">返回</el-button>
                <!-- 订单申请弹出框 -->
                <settle-wage-dialog
                    :contractObj="contractBase"
                    v-if="settleWageDialogVisible"
                    :settleWageDialogVisible="settleWageDialogVisible"
                    @closeSettleWageDialog="closeSettleWageDialog"></settle-wage-dialog>
                <terminate-contract-dialog
                    :contractObj="contractBase"
                    v-if="determinateContractDialogVisible"
                    :determinateContractDialogVisible="determinateContractDialogVisible"
                    @closeDeterminateContractDialog="closeDeterminateContractDialog"></terminate-contract-dialog>
            </div>
            <div class="order-detail">
                <div class="detail-left">
                    <div class="detail-left-box">
                        <div class="detail-left-line">合同流水号：{{contractBase.contract_code}}</div>
                        <div class="detail-left-line">签约时间：{{contractBase.sign_at | timeFomatter}}</div>
                        <div class="detail-left-line">签约经纪人：{{ contractBase.sign_manager_name }}</div>
                        <div class="detail-left-line">签约经纪门店：{{ contractBase.sign_store_name }}</div>
                    </div>
                </div>
                <div class="detail-right">
                    <div class="right-box">
                        <div class="title">合同状态</div>
                        <div class="value" :style="{color: contractType.color}">{{ contractType.name}}</div>
                    </div>
                    <div class="right-box" v-if="contractBase.type != 3">
                        <div class="title">是否发放首月工资</div>
                        <div class="value" :style="{color: contractBase.is_wage == 1? '#F56C6C' : '#67C23A'}">{{ contractBase.is_wage | isWagedFormatter}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="order-down">
            <div class="order-message">
                <div class="title">
                    <div class="title-contains">
                        <div class="left">合同详情</div>
                    </div>
                </div>
                <div class="order-list">
                    <div class="line-three-list">
                        服务内容：
                        <select-tag-component 
                            :isEdit="false" 
                            :propTagList="order_service_contains" 
                            v-model="contractBase.service_contains" 
                            :isSingle="true"></select-tag-component>
                    </div>
                    
                    <div class="line-three-list">
                        护理依赖程度： 
                        <select-tag-component 
                            :isEdit="false" 
                            :propTagList="order_service_level" 
                            v-model="contractBase.service_level" 
                            :isSingle="true"></select-tag-component>
                    </div>
                    <div class="line-three-list">
                        服务方式： 
                        <select-tag-component 
                            :isEdit="false" 
                            :propTagList="order_service_type" 
                            v-model="contractBase.service_level" 
                            :isSingle="true"></select-tag-component>
                    </div>
                    <div class="line-three-list">
                        服务人数：<span>{{contractBase.service_count}}</span> 
                    </div>
                    <div class="line-three-list">
                        服务期限：<span>{{contractBase.service_start | timeFomatter}} - {{contractBase.service_end | timeFomatter}}</span> 
                    </div>
                    <div class="line-list">
                        工作时间：<span>{{contractBase.service_time}}</span> 
                    </div>
                    <div class="line-list">
                        劳务报酬：<span>{{contractBase.staff_wage}}</span> 
                    </div>
                    <div class="line-list">
                        客户服务费：<span>{{contractBase.user_charge}}</span> 
                    </div>
                    <div class="line-list">
                        客户缴纳：<span>{{contractBase.user_pay}}</span> 
                    </div>
                    <div class="line-list">
                        劳动者押金：<span>{{contractBase.staff_deposit}}</span> 
                    </div>
                    <div class="line-list">
                        保险受益人：<span>{{contractBase.insurance_benefit}}</span> 
                    </div>
                    <div class="line-list">
                        保险期限：<span>{{contractBase.insurance_start | timeFomatter}} - {{contractBase.insurance_end | timeFomatter}}</span> 
                    </div>
                    <div class="line-list">
                        合同备注：<span>{{contractBase.remarks}}</span> 
                    </div>
                    <div class="line-list">
                        合同照片：<span>{{contractBase.accessory}}</span> 
                    </div>
                </div>
            </div>
            <div class="order-message">
                <div class="title">
                    <div class="title-contains">
                        <div class="left">签约服务人员信息</div>
                    </div>
                </div>
                <div class="order-list">
                    
                    <div class="line-two-list">
                        编号：<span>{{contractBase.sign_staff_code}}</span> 
                    </div>
                    <div class="line-two-list">
                        身份证号：<span>{{contractBase.sign_staff_identify}}</span> 
                    </div>
                    <div class="line-two-list">
                        姓名：<span>{{contractBase.sign_staff_name}}</span>
                    </div>
                    <div class="line-two-list">
                        电话：<span>{{contractBase.sign_staff_phone}}</span> 
                    </div>
                    <div class="line-list">
                        户籍地址：<span>{{contractBase.sign_staff_law_address}}</span> 
                    </div>
                    <div class="line-list">
                        现住址：<span>{{contractBase.sign_staff_cur_address}}</span> 
                    </div>
                    <div class="line-list">
                        紧急联系人：<span>{{contractBase.sign_staff_urgent}}</span> 
                    </div>
                </div>
            </div>
            <div class="order-message">
                <div class="title">
                    <div class="title-contains">
                        <div class="left">签约客户信息</div>
                    </div>
                </div>
                <div class="order-list">
                    <div class="line-two-list">
                        姓名：<span>{{contractBase.sign_user_name}}</span>
                    </div>
                    <div class="line-two-list">
                        电话：<span>{{contractBase.sign_user_phone}}</span> 
                    </div>
                    <div class="line-two-list">
                        身份证号：<span>{{contractBase.sign_user_identify}}</span> 
                    </div>
                </div>
            </div>
            <div class="order-message">
                <div class="title">
                    <div class="title-contains">
                        <div class="left">结算信息</div>
                    </div>
                </div>
                <div class="order-list" >
                    <div v-if="is_settle == 1">
                        <div class="line-list">
                            结算时间：<span>{{contractBase.account.created_at | timeFomatter}}</span>
                        </div>
                        <div class="line-list">
                            服务期限：
                            <span>
                                {{contractBase.account.service_start | timeFomatter}}- 
                                {{contractBase.account.service_end | timeFomatter}}
                            </span> 
                        </div>
                        <div class="line-list">
                            工作天数：<span>{{contractBase.account.service_days}}</span>
                        </div>
                        <div class="line-list">
                            日工资：<span>{{contractBase.account.daily_wage}}</span>
                        </div>
                        <div class="line-list">
                            首月工资合计：<span>{{contractBase.account.total_wage}}</span>
                        </div>
                        <div class="line-list">
                            服务费扣除：<span>{{contractBase.account.service_cost}}</span>
                        </div>
                        <div class="line-list">
                            其他扣除：<span>{{contractBase.account.other_cost}}</span>
                        </div>
                        <div class="line-list">
                            扣除事由：<span>{{contractBase.account.cost_reason}}</span>
                        </div>
                        <div class="line-list">
                            服务人员实发工资：<span>{{contractBase.account.real_wage}}</span>
                        </div>
                        <div class="line-list">
                            返还客户金额：<span>{{contractBase.account.return_wage}}</span>
                        </div>
                    </div>
                   
                </div>
            </div>
            <div class="order-message">
                <div class="title">
                    <div class="title-contains">
                        <div class="left">订单终止信息</div>
                    </div>
                </div>
                <div class="order-list">
                    <div v-if="is_settle == 2">
                        <div class="line-list">
                            终止事由：<span>{{contractBase.account.terminate_reason}}</span>
                        </div>
                        <div class="line-list">
                            服务期限：
                            <span>
                                {{contractBase.account.service_start | timeFomatter}} - 
                                {{contractBase.account.service_end | timeFomatter}}
                            </span> 
                        </div>
                        <div class="line-list">
                            工作天数：<span>{{contractBase.account.service_days}}</span>
                        </div>
                        <div class="line-list">
                            日工资：<span>{{contractBase.account.daily_wage}}</span>
                        </div>
                        <div class="line-list">
                            首月工资合计：<span>{{contractBase.account.total_wage}}</span>
                        </div>
                        <div class="line-list">
                            服务费扣除：<span>{{contractBase.account.service_cost}}</span>
                        </div>
                        <div class="line-list">
                            其他扣除：<span>{{contractBase.account.other_cost}}</span>
                        </div>
                        <div class="line-list">
                            扣除事由：<span>{{contractBase.account.cost_reason}}</span>
                        </div>
                        <div class="line-list">
                            服务人员实发工资：<span>{{contractBase.account.real_wage}}</span>
                        </div>
                        <div class="line-list">
                            返还客户金额：<span>{{contractBase.account.return_wage}}</span>
                        </div>
                    </div>
                </div>
            </div>
            
                     
        </div>
    </div>
</template>
<script>
    import {operateService, $utils, saleService} from '../../../common'
    import {
    selectTagComponent} from '@/pages/components'
    import {settleWageDialog,terminateContractDialog} from './contractItem/index.js'

export default {
    data(){
        return {
            isLoaded: false,//
            contractBase: {
                account: null,
                contract_code: "",
                contract_number: "",
                files: [],
                id: 0,
                insurance_benfit: "",
                insurance_end: '',
                insurance_start: '',
                is_wage: 0,
                order_id: 0,
                remarks: '',
                service_contains: '',
                service_count: "",
                service_end: '',
                service_level: 0,
                service_start: '',
                service_time: "",
                service_type: 0,
                sign_at: '',
                sign_manager_id: 0,
                sign_manager_name: "",
                sign_staff_code: "",
                sign_staff_cur_address: "",
                sign_staff_id: 0,
                sign_staff_identify: "",
                sign_staff_law_address: "",
                sign_staff_name: "",
                sign_staff_phone: "",
                sign_staff_urgent: "",
                sign_store_id: 0,
                sign_store_name: "",
                sign_user_id: 0,
                sign_user_identify: "",
                sign_user_name: "",
                sign_user_phone: "",
                staff_deposit: 0,
                staff_wage: 0,
                stop_at: 0,
                type: 0,
                user_charge: 0,
                user_pay: 0,
            },//合同信息
            settleWageDialogVisible: false,//结算工资弹窗显示隐藏
            determinateContractDialogVisible: false, //终止合同弹窗显示隐藏
        }
    },
    filters: {
        timeFomatter(value){
            if(value == 0){
                return '-'
            }
            return $utils.formatDate(new Date(value), 'yyyy-MM-dd')
        },
        isWagedFormatter(value){
            if(value == 1){
                return '否'
            } else {
                return '是'
            }
        }
    },
    components: {
        selectTagComponent,
        settleWageDialog,
        terminateContractDialog
    },
    computed:{
        /**
         * 当前用户信息
         */
        presentUser(){
            return this.$store.state.loginModule.user
        },
        //订单服务内容
        order_service_contains(){
            return this.$store.state.saleModule.order_service_contains
        },
        //订单护理依赖程度
        order_service_level(){
            return this.$store.state.saleModule.order_service_level
        },
        //订单服务方式
        order_service_type(){
            return this.$store.state.saleModule.order_service_type
        },
        //
        is_settle(){
            if(!this.contractBase.account){
                return 3
            } else {
                return this.contractBase.account.type
            }
        },
        //合同状态
        contractType(value){
            if(this.contractBase.type == 1){
                return {
                    name: '待执行',
                    color: '#E6A23C'
                }
            } else if (this.contractBase.type == 2){
                return {
                    name: '执行中',
                    color: '#67C23A'
                }
            } else {
                return {
                    name: '已终止',
                    color: '#F56C6C'
                }
            }
        },
    },
    methods: {
        /**
         * 获取订单信息
         */
        async getContract(){
            try{
                this.isLoaded = true
                await saleService.getContract(this.$route.query.id).then((data) =>{
                    this.contractBase = data.data
                    this.$set(this.contractBase, 'account', data.data.account) 
                }).catch(e =>{
                    this.$message({
                        type:'error',
                        message: e.message
                    })
                    this.isLoaded = false
                }).finally(() =>{
                    this.isLoaded = false
                })
            } catch(error){
                this.$message({
                    type:'error',
                    message: error.message
                })
                store.commit('setLoading',false)
            }
        },
        /**
         * 结算工资
         */
        openSettleWageDialog(){
            this.settleWageDialogVisible = true
        },
        /**
         * 关闭结算工资弹窗
         */
        async closeSettleWageDialog(){
            await this.getContract()
            this.settleWageDialogVisible = false
        },
        /**
         * 打开终止合同弹窗
         */
        async openDeterminateContractDialog(){
            //待执行状态合同终止
            if(this.contractBase.type == 1){
                await this.determinateContract()
            } else {
                /**
                 * is_wage 1 未发放工资 2 已发放工资
                 */
                if(this.contractBase.is_wage == 1){
                    this.determinateContractDialogVisible = true
                } else {
                    await this.determinateContract()
                }
            }

        },
        /**
         * 终止合同（已发放工资）
         */
        async determinateContract(){
            let response = await this.$confirm("确定终止该合同吗?此操作不可逆", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).catch(() => {
                this.$message({
                    type: "info",
                    message: "已放弃终止"
                });
            });
            if (response == "confirm") {
                this.isLoaded = true
                try {
                    let determinateContractObj = {
                        is_wage: this.contractBase.is_wage,
                        contract_id: this.contractBase.id,
                    }

                    await saleService.stopContract(determinateContractObj).then(async data => {
                        if (data.code == 0) {
                            this.$message({
                                type: "success",
                                message: data.message
                            });
                        }
                        await this.getContract()
                        
                    }).catch(error => {
                        this.$message({
                            type: "error",
                            message: error.message
                        });
                    }).finally(() =>{
                        this.isLoaded = false
                    })
                } catch (error) {
                    throw error;
                }
            }
        },
        /**
         * 关闭终止合同弹窗
         */
        async closeDeterminateContractDialog(){
            await this.getContract()
            this.determinateContractDialogVisible = false
        },
        /**
         * 返回
         */
        goback(){
            if(this.$route.query.from == 1){
                this.$router.push({
                    path: '/sale/orderConfig',
                    query: {
                        order_id: this.$route.query.fromId
                    }
                })
            } else {
                this.$router.push('/sale/contractList')
            }
        },
    },
    async mounted(){
        await this.getContract()
    }    
}
</script>
<style lang="scss" scoped>
    .orderConfig{
        width: 100%;
        min-height: calc(100vh - 50px);
        background:#f0f2f5;
        .order-header{
            background: #fff;
            padding: 30px 24px 24px 24px;
            position: relative;
            .order-name{
                line-height: 28px;
                font-size: 20px;
                font-weight: 700;
            }
            .btn-group{
                & /deep/ .el-button{
                    margin-left: 0px;
                }
                position: absolute;
                right: 24px;
                top: 20px;
            }
            .order-detail{
                padding-top: 12px;
                display: flex;
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
            }
        }
        .order-down{
            margin: 24px;
            .order-message{

                width: 100%;
                // height: 285px;
                background: #fff;
                margin-bottom: 24px; 
                .title{
                    min-height: 48px;
                    margin-bottom: -1px;
                    padding: 0 24px;
                    color: rgba(0,0,0,.85);
                    font-weight: 500;
                    font-size: 16px;
                    background: transparent;
                    border-bottom: 1px solid #e8e8e8;
                    border-radius: 2px 2px 0 0;
                    zoom: 1;
                    .title-contains{
                        display: flex;
                        align-items: center;
                        .left{
                            display: inline-block;
                            flex: 1 1;
                            padding: 16px 0;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                    }

                }
                .order-list{
                    box-sizing: border-box;
                    padding: 24px;
                    &:after{
                        content: '';
                        display: block;
                        clear: both;
                    }
                    .line-three-list{
                        float: left;
                        width: 33%;
                        line-height: 30px;
                    }
                    .line-two-list{
                        float: left;
                        width: 50%;
                        line-height: 30px;
                    }
                    .line-list{
                        float: left;
                        width: 100%;
                        line-height: 30px;
                    }
                    .change{
                        margin-left: 15px;
                        display: inline-block;
                        color: #1890ff;
                        line-height: 30px;
                        height: 30px;
                        font-size: 12px;
                        cursor: pointer;
                        & img{
                            height: 30px;
                            width: 30px;
                            vertical-align: middle;
                        }
                    }
                }
            }
        }
    }
</style>



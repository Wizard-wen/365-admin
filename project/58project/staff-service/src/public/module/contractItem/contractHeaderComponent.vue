<template>
<div class="order-header">
    <div class="order-name">
        <h4>合同编号：{{contractBase.contract_number}}</h4>
    </div>
    <div class="btn-group">


        <contract-back-btn></contract-back-btn>
        <terminate-contract-btn :currentContract="contractBase"></terminate-contract-btn>
        <settle-wage-btn :currentContract="contractBase"></settle-wage-btn>
        <!-- <el-button 
            type="primary" size="mini" 
            v-if="contractType == 2 && contractBase.is_wage == 1 && contractBase.type == 2"
            @click="openSettleWageDialog">结算工资</el-button>
        <el-button 
            type="danger" size="mini" 
            v-if="contractType == 2 && contractBase.type != 3"
            @click="openDeterminateContractDialog">终止合同</el-button>
        <el-button size="mini" @click="goback">返回</el-button> -->
        <!-- 订单申请弹出框 -->
        <!-- <settle-wage-dialog
            :contractObj="contractBase"
            v-if="settleWageDialogVisible"
            :settleWageDialogVisible="settleWageDialogVisible"
            @closeSettleWageDialog="closeSettleWageDialog"></settle-wage-dialog>
        <terminate-contract-dialog
            :contractObj="contractBase"
            v-if="determinateContractDialogVisible"
            :determinateContractDialogVisible="determinateContractDialogVisible"
            @closeDeterminateContractDialog="closeDeterminateContractDialog"></terminate-contract-dialog> -->
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
                <div class="value" :style="{color: contractTypeStyle.color}">{{ contractTypeStyle.name}}</div>
            </div>
            <div class="right-box" v-if="contractBase.type != 3">
                <div class="title">是否发放首月工资</div>
                <div class="value" :style="{color: contractBase.is_wage == 1? '#F56C6C' : '#67C23A'}">{{ contractBase.is_wage | isWagedFormatter}}</div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
// import {
//     settleWageDialog,
//     terminateContractDialog,
// } from './contractHeaderComponent/index.js'

import contractBackBtn from './contractHeaderComponent/control/contractBackBtn.vue'
import terminateContractBtn from './contractHeaderComponent/control/terminateContractBtn.vue'
import settleWageBtn from './contractHeaderComponent/control/settleWageBtn.vue'
import {
    $utils,
    saleService,
} from '@common/index.js'
export default {
    components: {
        // settleWageDialog,
        // terminateContractDialog,
        settleWageBtn,
        contractBackBtn,
        terminateContractBtn,
    },
    props: {
        /**
         * 合同基本信息
         */
        contractBase: {
            type: Object,
            default: function(){return {}}
        },
        /**
         * 合同来源
         * 1 运营 2 门店
         */
        contractType: {
            type: Number | String,
            default: 1
        },
        currentPage: {
            type: Number,
            default: 1,
        }
    },
    data(){
        return {
            // settleWageDialogVisible: false,//结算工资弹窗显示隐藏
            // determinateContractDialogVisible: false, //终止合同弹窗显示隐藏
        }
    },
    filters: {
        timeFomatter(value){
            if(value == 0){
                return '-'
            }
            return $utils.formatDate(new Date(value), 'yyyy-MM-dd hh:mm:ss')
        },
        isWagedFormatter(value){
            if(value == 1){
                return '否'
            } else {
                return '是'
            }
        }
    },
    computed:{
        //是否结算
        is_settle(){
            if(!this.contractBase.account){
                return 3
            } else {
                return this.contractBase.account.type
            }
        },
        //合同状态
        contractTypeStyle(value){
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
        //  * 打开结算工资弹窗
        //  */
        // openSettleWageDialog(){
        //     this.settleWageDialogVisible = true
        // },
        // /**
        //  * 关闭结算工资弹窗
        //  */
        // async closeSettleWageDialog(){
        //     this.$emit('updateContract')
        //     this.settleWageDialogVisible = false
        // },
        // /**
        //  * 打开终止合同弹窗
        //  */
        // async openDeterminateContractDialog(){
        //     //待执行状态合同终止
        //     if(this.contractBase.type == 1){
        //         await this.determinateContract()
        //     } else {
        //         /**
        //          * is_wage 1 未发放工资 2 已发放工资
        //          */
        //         if(this.contractBase.is_wage == 1){
        //             this.determinateContractDialogVisible = true
        //         } else {
        //             await this.determinateContract()
        //         }
        //     }
        // },
        // /**
        //  * 关闭终止合同弹窗
        //  */
        // async closeDeterminateContractDialog(){
        //     this.$emit('updateContract')
        //     this.determinateContractDialogVisible = false
        // },
        // /**
        //  * 终止合同（已发放工资/待执行状态）
        //  */
        // async determinateContract(){
        //     await this.$confirm("确定终止该合同吗?此操作不可逆", "提示", {
        //         confirmButtonText: "确定",
        //         cancelButtonText: "取消",
        //         type: "warning"
        //     }).then(async () =>{
        //         await this.stopContract()
        //         this.$emit('updateContract')
        //     }).catch(() => {
        //         this.$message({
        //             type: "info",
        //             message: "已放弃终止"
        //         });
        //     });
        // },
        // /**
        //  * 终止合同接口
        //  */
        // async stopContract(){
        //     try {
        //         this.is_loading = true

        //         let determinateContractObj = {
        //             is_wage: this.contractBase.is_wage,
        //             contract_id: this.contractBase.id,
        //         }

        //         await saleService.stopContract(determinateContractObj).then(data => {
        //             if (data.code == 0) {
        //                 this.$message({
        //                     type: "success",
        //                     message: data.message
        //                 });
        //                 this.is_loading = false
        //             }
        //         }).catch(error => {
        //             this.$message({
        //                 type: "error",
        //                 message: error.message
        //             });
        //             this.is_loading = false
        //         }).finally(() =>{
        //             this.is_loading = false
        //         })
        //     } catch (error) {
        //         this.$message({
        //             type: "error",
        //             message: error.message
        //         });
        //         this.is_loading = false
        //     }
        // },
        // /**
        //  * 返回
        //  */
        // goback(){
        //     if(this.contractType == 1){
        //         if(this.$route.query.from == 1){
        //             this.$router.push({
        //                 path: '/operate/operateOrderConfig',
        //                 query: {
        //                     order_id: this.$route.query.from_id
        //                 }
        //             })
        //         } else {
        //             this.$router.push('/sale/saleContractList')
        //         }
        //     } else {
        //         if(this.$route.query.from == 1){
        //             this.$router.push({
        //                 path: '/sale/saleOrderConfig',
        //                 query: {
        //                     order_id: this.$route.query.from_id
        //                 }
        //             })
        //         } else {
        //             this.$router.push('/operate/operateContractList')
        //         }
        //     }
            
        // },
    }
}
</script>

<style lang="scss" scoped>
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
</style>
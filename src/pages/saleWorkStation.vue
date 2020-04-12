<template>
    <div class="workstation" v-loading="is_loading">
        <div class="performance">
            <statistic-card-component
                :title="'订单转化率'" :statisticItem="order_transform_rate"></statistic-card-component>
            <statistic-card-component
                :title="'订单累计流水'" :statisticItem="sale_amount"></statistic-card-component>
            <statistic-card-component
                :title="'服务费（销售额）'" :statisticItem="sale_service_amount"></statistic-card-component>
            <statistic-card-component v-hide></statistic-card-component>
        </div>
        <div class="down-board">
            <div class="left-board">
                <processing-order :processing_order="saleWorkStation.processing_order"></processing-order>
                <dynamic-information  :dynamic_information="saleWorkStation.dynamic_information"></dynamic-information>
            </div>
            <div class="right-board">
                <card-box-component :title="'快速操作'" class="operate-card-box">
                    <template slot="contains">
                        <div class="operation-list">
                            <div class="control" @click="openOrderApplyDialog">申请订单</div>
                            <div class="control" @click="goSaleWorkerList">服务人员信息库</div>
                            <div class="control" @click="goSaleOrderList">我的订单</div>
                            <div class="control" @click="goSaleApplyWorker">申请创建服务人员</div>
                            <div class="control" @click="goContractList">我的合同</div>
                            <div class="control" @click="goPublicOrderList">公海订单</div>
                            <!-- <div class="control" @click="goSaleOwnWorkerList">我创建的服务人员</div> -->
                        </div>
                    </template>
                </card-box-component>
                <sale-rank-box :title="'门店业绩排行'" :dataList="saleWorkStation.rank"></sale-rank-box>
            </div>
        </div>
        <!-- 订单申请弹出框 -->
        <apply-order-dialog
            v-if="applyOrderDialogVisible"
            :applyOrderDialogVisible="applyOrderDialogVisible"
            @closeCreateStaffDialog="applyOrderDialogVisible=false"></apply-order-dialog>
    </div>
</template>
<script>
import {
    processingOrder,
    dynamicInformation,
} from './saleWorkStation/index.js'
import saleRankBox from './saleWorkStation/saleRankBox.vue'
import applyOrderDialog from '@/public/module/orderList/control/saleApplyOrderBtn/applyOrderDialog.vue'
import {
    statisticCardComponent,
} from './operateWorkStation/index'
import {saleWorkstationService} from '@/service/saleWorkStation'


export default {
    data(){
        return {
            is_loading: false,
            applyOrderDialogVisible: false,//订单申请弹窗显示隐藏
            saleWorkStation: {
                order_transform_rate: {},//订单转化率
                sale_amount: {},//流水
                sale_service_amount: {},//销售额
                rank: {
                    order_transform_rate: {},//订单转化率
                    sale_amount: {},//流水
                    sale_service_amount: {},//销售额
                },
                dynamic_information: [],//公海订单
                processing_order: [],//待处理订单
            },
        }
    },
    components: {
        applyOrderDialog,
        processingOrder,
        dynamicInformation,
        statisticCardComponent,
        saleRankBox,
    },
    computed: {
        /**
         * 当前用户信息
         */
        presentUser(){
            return this.$store.state.loginModule.user
        },
        order_transform_rate(){
            return {
                total: this.saleWorkStation.order_transform_rate.total *100 + '%',
                last_month: this.saleWorkStation.order_transform_rate.last_month * 100 + '%',
                rate: this.saleWorkStation.order_transform_rate.rate * 100,
                this_month: this.saleWorkStation.order_transform_rate.this_month * 100 +'%',
            }
        },
        sale_service_amount(){
            return {
                total: this.saleWorkStation.sale_service_amount.total + '元',
                last_month: this.saleWorkStation.sale_service_amount.last_month + '元',
                rate: this.saleWorkStation.sale_service_amount.rate,
                this_month: this.saleWorkStation.sale_service_amount.this_month +'元',
            }
        },
        sale_amount(){
            return {
                total: this.saleWorkStation.sale_amount.total + '元',
                last_month: this.saleWorkStation.sale_amount.last_month + '元',
                rate: this.saleWorkStation.sale_amount.rate,
                this_month: this.saleWorkStation.sale_amount.this_month +'元',
            }
        },
    },
    methods: {
        //打开订单申请弹窗
        openOrderApplyDialog(){
            if(this.presentUser.store_id == 0){
                this.$message({
                    message: '您不能创建订单申请',
                    type: 'error'
                })
                return;
            }
            this.applyOrderDialogVisible = true
        },
        //跳转至服务人员信息页
        goSaleWorkerList(){
            this.$router.push('/sale/saleWorkerList')
        },
        //跳转至订单页
        goSaleOrderList(){
            this.$router.push('/sale/saleOrderList')
        },
        //跳转至我的合同
        goContractList(){
            this.$router.push('/sale/saleContractList')
        },
        //跳转至公海订单列表
        goPublicOrderList(){
            this.$router.push('/sale/salePublicOrderList')
        },
        //跳转至由我创建的服务人员
        goSaleOwnWorkerList(){
            this.$router.push('/sale/saleOwnWorkerList')
        },
        /**
         * 跳转至公海订单详情
         */
        goPublicOrderPage(item){
            this.$router.push({
                path: `/sale/publicOrderConfig`,
                query: {
                    order_id: item.id
                }
            })
        },
        /**
         * 进入订单页面
         */
        goOrderDetailPage(item){
            this.$router.push({
                path: `/sale/saleOrderConfig`,
                query: {
                    order_id: item.id
                }
            })
        },
        /**
         * 进入申请创建服务人员页
         */
        goSaleApplyWorker(){
            this.$router.push({
                path: `/sale/saleApplyWorker`,
            })
        }

    },
    async mounted(){
        try{
            this.is_loading = true

            let getSaleWorkerStationForm = {
                store_id: this.presentUser.store_id,
                id: this.presentUser.is_store_manager == 2 ?this.presentUser.store_id :this.presentUser.id,
                get_for:this.presentUser.is_store_manager == 2? "store" : "personal"
            }

            await saleWorkstationService.getSaleWorkBench(getSaleWorkerStationForm).then(data =>{
                if(data.code == '0'){
                    //设置工作台数据
                    this.saleWorkStation = {
                        ...data.data,
                    }
                    this.is_loading = false
                }
            }).catch(error =>{
                this.$message({
                    message: error.message,
                    type: 'error'
                })
                this.is_loading = false
            }).finally(() =>{
                this.is_loading = false
            })
        } catch(error){
            this.$message({
                message: error.message,
                type: 'error'
            })
            this.is_loading = false
        }
        
    }
}
</script>
<style lang="scss" scoped>
.workstation{
    width: 100%;
    padding: 24px;
    background: #f0f2f5;
    .performance{
        width: 100%;
        display: flex;
        justify-content: space-between;
        .card{
            height: 180px;
            width: calc(25% - 20px);
            margin: 0 10px;
            background: #fff;
            padding: 20px 24px 8px;
            .title{
                height: 22px;
                line-height: 22px;
                font-size: 14px;
                color: rgba(0,0,0,0.45);
            }
            .number{
                margin-top: 7px;
                height: 35px;
                line-height: 35px;
                font-size: 30px;
                color:rgba(0,0,0,.85);
            }
            .statistic{
                display: flex;
                margin-top: 25px;
                margin-bottom: 8px;
                .left{
                    min-width: 100px;
                    margin-right: 20px;
                    height: 23px;
                    line-height: 23px;
                    color: rgba(0,0,0,.65);
                    font-size: 14px;
                    & span{
                        color: rgba(0,0,0,.85);
                        font-size: 14px;
                    }
                }
                .right{
                    min-width: 100px;
                    height: 23px;
                    line-height: 23px;
                    color: rgba(0,0,0,.65);
                    font-size: 14px;
                    & span{
                        color: rgba(0,0,0,.85);
                        font-size: 14px;
                    }
                    .down{
                        right: -20px; 
                        top: 0;
                        height: 20px;
                        width: 20px;
                    }
                    .up{
                        right: -20px; 
                        top: 0;
                        display: inline-block;
                        height: 20px;
                        width: 20px;
                        transform: rotate(180deg);
                    }
                }
            }
            .message{
                border-top: 1px solid rgb(232,232,232);
                padding-top: 9px;
                height: 22px;
                line-height: 22px;
                color: rgba(0,0,0,.65);
                font-size: 14px;
                & span{
                    color: rgba(0,0,0,.85);
                    font-size: 14px;
                }
            }
        }
    }
    .down-board{
        display: flex;
        margin-top: 24px;
        .left-board{
            width: 67%;
        }
        .right-board{
            box-sizing: border-box;
            width: 33%;
            padding: 0 10px;
            .operate-card-box /deep/ .contains{
                padding: 20px 0 8px 24px;
            }
            .operation-list{
                box-sizing: border-box;
                font-size: 0px;
                .control{
                    box-sizing: border-box;
                    display: inline-block;
                    margin-right: 10px;
                    margin-bottom: 13px;
                    color: rgba(0,0,0,.65);
                    font-size: 14px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    cursor: pointer;
                    &:hover{
                        color: $viColor;
                    }
                }
            }

            .rank-control{
                display: flex;
                line-height: 20px;
                .type{
                    margin-right: 12px;
                    font-size: 14px;
                    font-weight: normal;
                }
            }
        }
    }
}


</style>



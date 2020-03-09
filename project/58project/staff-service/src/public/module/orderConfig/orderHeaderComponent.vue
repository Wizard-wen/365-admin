<template>
<div class="order-header">
    <div class="order-name">
        <h4>订单号：{{currentOrder.order_code}}</h4>
    </div>
    <div class="btn-group">
        <!-- 门店分派订单 -->
        <sale-assign-order-btn
            v-if="isShowSaleAssignOrderBtn"
            :currentOrder="currentOrder"
            @refreshOrder="$emit('updateOrderConfig')"></sale-assign-order-btn>
        <!--  运营分派订单 -->
        <operate-assign-order-btn
            v-if="isShowOperateAssignOrderBtn"
            :currentOrder="currentOrder"
            @refreshOrder="$emit('updateOrderConfig')"></operate-assign-order-btn>
        
        <!-- <el-button 
            type="primary" size="mini"
            v-if="presentUser.is_store_manager != 1 || presentUser.department_id == 2"
            @click="openAssignOrderDialog">分派</el-button> -->
        
        <!-- <el-button 
            type="primary" size="mini" 
            v-if="currentOrder.type == 2 && presentUser.department_id == 4 && publicOrderType !=4" 
            @click="goSignOrderPage(1)">续约</el-button> -->
        <!-- 续签 -->
        <resign-btn 
            v-if="isShowResignBtn" 
            :currentOrder="currentOrder"></resign-btn>
        <!-- <el-button 
            type="danger" size="mini" 
            v-if="(currentOrder.type == 1 ||currentOrder.type ==  3) && presentUser.department_id == 4 && publicOrderType !=4" 
            @click="openDeterminateOrderDialog">终止订单</el-button> -->
        <!-- 终止订单 -->
        <terminate-order-btn 
            v-if="isShowTerminateOrderBtn" 
            :currentOrder="currentOrder"
            @refreshOrder="$emit('updateOrderConfig')"></terminate-order-btn>
        
        <!-- 返回订单列表 -->
        <back-order-list :publicOrderType="publicOrderType"></back-order-list>
    </div>
    <div class="order-detail">
        <div class="detail-left">
            <div class="detail-left-box">
                <div class="detail-left-line">订单经纪人：{{ currentOrder.agent_manager_name }}</div>
                <div class="detail-left-line">订单经纪门店：{{ currentOrder.agent_store_name }}</div>
                <div class="detail-left-line">订单创建人（运营）：{{ currentOrder.created_manager_name }}</div>
                <div class="detail-left-line">订单创建时间：{{currentOrder.created_at | timeFomatter}}</div>
                <div class="detail-left-line">来源门店：{{currentOrder.apply_store_name}}</div>
                <div class="detail-left-line">来源人：{{currentOrder.apply_manager_id == 0 ? '门店' : currentOrder.apply_manager_name}}</div>
                <div
                    v-if="currentOrder.type != 1 && publicOrderType !=4" 
                    class="detail-left-line">签约时间：{{currentOrder.sign_at | timeFomatter}}</div>
                <div
                    v-if="currentOrder.type != 1 && publicOrderType !=4" 
                    class="detail-left-line">服务周期：{{currentOrder.sign_service_start | timeFomatter}} - {{currentOrder.sign_service_end | timeFomatter}}</div>
            </div>
        </div>
        <div class="detail-right">
            <div class="right-box" v-if="currentOrder.type!= 1 && publicOrderType !=4">
                <div class="title">
                    账户余额
                    <el-tooltip class="item" effect="dark" content="账户余额不包含客户服务费！" placement="top-start">
                        <i class="el-icon-info"></i>
                    </el-tooltip>
                </div>
                <div class="value">{{ currentOrder.sign_user_account}}</div>
            </div>
            <div class="right-box" v-if="orderTypeStyle">
                <div class="title">订单状态</div>
                <div class="value" :style="{color: orderTypeStyle.color}">{{ orderTypeStyle.name}}</div>
            </div>
        </div>
    </div>
    <!-- 运营订单分派 -->
    <!-- <public-assign-order-component
        v-if="publicAssignOrderDialogVisible"
        :publicAssignOrderDialogVisible="publicAssignOrderDialogVisible"
        @closePublicAssignOrderDialog="closePublicAssignOrderDialog"
        @updatePublicAssignOrder="updatePublicAssignOrder"
        :publicOrderType="publicOrderType"></public-assign-order-component> -->
    <!-- 店内订单分派弹出框 -->
    <!-- <assign-order-in-store-dialog
        v-if="assignOrderInStoreDialogVisible"
        :assignOrderInStoreDialogVisible="assignOrderInStoreDialogVisible"
        @closeAssignOrderInStoreDialog="closeAssignOrderInStoreDialog"
        :orderObject="currentOrder"></assign-order-in-store-dialog> -->
    
    <!-- 终止订单弹出框 -->
    <!-- <terminate-order-dialog
        v-if="determinateOrderDialogVisible"
        :determinateOrderDialogVisible="determinateOrderDialogVisible"
        @closeDeterminateOrderDialog="closeDeterminateOrderDialog"
        :order_id="order_id"></terminate-order-dialog> -->
</div>
</template>

<script>

// import {
//     assignOrderInStoreDialog,
//     terminateOrderDialog
// } from './orderHeaderComponent/index.js'

import operateAssignOrderBtn from '@/public/module/orderConfig/orderHeaderComponent/control/operateAssignOrderBtn.vue'
import saleAssignOrderBtn from '@/public/module/orderConfig/orderHeaderComponent/control/saleAssignOrderBtn.vue'
import resignBtn from '@/public/module/orderConfig/orderHeaderComponent/control/resignBtn.vue'
import terminateOrderBtn from '@/public/module/orderConfig/orderHeaderComponent/control/terminateOrderBtn.vue'
import backOrderList from '@/public/module/orderConfig/orderHeaderComponent/control/backOrderList.vue'
import {order_typeList} from '@/public/module/orderList/IorderList.ts'
// import {
//     publicAssignOrderComponent,
// } from '@/public/module/orderPublic/index.js'

import { 
    $utils, 
    saleService,
} from '@common/index.js'

export default {
    components: {
        // assignOrderInStoreDialog,
        // terminateOrderDialog,
        // publicAssignOrderComponent,
        operateAssignOrderBtn,
        saleAssignOrderBtn,
        resignBtn,
        terminateOrderBtn,
        backOrderList,
    },
    props: {
        /**
         * 订单基本信息
         */
        currentOrder: {
            type: Object,
            default: function(){return {}}
        },
        /**
         * 订单类型
         */
        publicOrderType: {    
            type: Number | String,
            default: 1,
        },
        /**
         * 所属模块
         */
        orderModuleType: {
            type: String,
            default: 'operate'
        }
    },
    computed: {
        /**
         * 当前用户信息
         */
        presentUser(){
            return this.$store.state.loginModule.user
        },
        /**
         * 订单状态
         */
        orderTypeStyle(){
            return order_typeList.find(item => item.id == this.currentOrder.type)
        },
        /**
         * 是否显示续签按钮
         * 订单状态为已签约 && 处于门店订单配置页
         */
        isShowResignBtn(){
            // return  this.currentOrder.type == 2 && 
            //         this.presentUser.department_id == 4 && 
            //         this.publicOrderType !=4 
            return  this.currentOrder.type == 2 &&
                    this.orderModuleType == 'sale'
        },
        /**
         * 是否显示终止订单按钮
         * 订单状态为(匹配中 || 售后匹配中)  && 处于门店订单配置页
         */
        isShowTerminateOrderBtn(){
            // return (currentOrder.type == 1 ||currentOrder.type ==  3) && 
            // presentUser.department_id == 4 && 
            // publicOrderType !=4
            return  (this.currentOrder.type == 1 || this.currentOrder.type ==  3) &&
                    this.orderModuleType == 'sale'
        },
        /**
         * 是否显示门店订单分派按钮
         * 店长 && 处于门店订单配置页
         */
        isShowSaleAssignOrderBtn(){
            return  this.presentUser.is_store_manager != 1 && 
                    this.orderModuleType == 'sale'
        },
        /**
         * 是否显示运营订单分派按钮
         * 处于运营订单配置页
         */
        isShowOperateAssignOrderBtn(){
            return this.orderModuleType == 'operate'
        }
    },
    filters: {
        timeFomatter(value){
            if(value == 0){
                return '-'
            }
            return $utils.formatDate(new Date(value), 'yyyy-MM-dd')
        }
    },
    data(){
        return {
            //订单id
            // order_id: this.$route.query.order_id,
            //分配弹出框显示
            // assignOrderInStoreDialogVisible:false,
            // //终止订单弹窗显示隐藏
            // determinateOrderDialogVisible: false,
            // //分分派订单弹窗
            // publicAssignOrderDialogVisible: false,
        }
    },
    methods: {
        /**
         * 打开分派订单弹窗
         */
        // openAssignOrderDialog(){
        //     //运营可以任意分派，店长只能店内分派
        //     if(this.presentUser.department_id == 2){
        //         //运营部分，可以分派至各个门店
        //         this.publicAssignOrderDialogVisible = true
        //     } else {
        //         //店长只能分派至本门店员工
        //         this.assignOrderInStoreDialogVisible = true
        //     }
        // },
        /**
         * 关闭运营分派订单弹窗
         */
        // closePublicAssignOrderDialog(){
        //     this.publicAssignOrderDialogVisible = false
        //     this.$emit('updateOrderConfig')
        // },
        /**
         * 关闭店长分派订单弹窗
         */
        // closeAssignOrderInStoreDialog(){
        //     this.assignOrderInStoreDialogVisible = false
        //     this.$emit('updateOrderConfig')
        // },
        /**
         * 运营分派订单接口
         */
        // async updatePublicAssignOrder(param){
        //     let assignOrderForm = {
        //         ...param[0],
        //         order_id: this.currentOrder.id
        //     }
        //     await this.assignOrder(assignOrderForm)
        //     await this.closePublicAssignOrderDialog()
        // },
        /**
         * 分派订单接口
         */
        // async assignOrder(assignOrderForm){
        //     try{
        //         this.is_loading = true
        //         await saleService.assignOrder(assignOrderForm).then(data =>{
        //             if(data.code == '0'){
        //                 this.$message({
        //                     type:"success",
        //                     message: data.message
        //                 })
        //                 this.is_loading = false
        //             }
        //         }).catch(error =>{
        //             this.$message({
        //                 type:'error',
        //                 message: error.message
        //             })
        //             this.is_loading = false
        //         }).finally(() =>{
        //             this.is_loading = false
        //         })
        //     } catch(error){
        //         this.$message({
        //             type:'error',
        //             message: error.message
        //         })
        //         this.is_loading = false
        //     }
        // },
        /**
         * 打开终止订单弹窗
         */
        // async openDeterminateOrderDialog(){
        //     this.determinateOrderDialogVisible = true
        // },
        /**
         * 关闭终止订单弹窗
         */
        // closeDeterminateOrderDialog(){
        //     this.determinateOrderDialogVisible = false
        //     this.$emit('updateOrderConfig')
        // },
        /**
         * 续约跳转至签约页面
         */
        // goSignOrderPage(){
        //     this.$router.push({
        //         path: `/sale/saleSignPage`,
        //         query: {
        //             order_id: this.currentOrder.id,
        //             type: this.currentOrder.type,//订单状态
        //             sign_staff_id: this.currentOrder.sign_staff_id ,
        //             sign_staff_name: this.currentOrder.sign_staff_name,
        //             sign_user_name: this.currentOrder.sign_user_name,
        //             sign_user_id: this.currentOrder.sign_user_id,
        //             sign_user_identify: this.currentOrder.sign_user_identify,
        //         }
        //     })
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
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
        <!-- 续签 -->
        <resign-btn 
            v-if="isShowResignBtn" 
            :currentOrder="currentOrder"></resign-btn>
        <!-- 终止订单 -->
        <terminate-order-btn 
            v-if="isShowTerminateOrderBtn" 
            :currentOrder="currentOrder"
            @refreshOrder="$emit('updateOrderConfig')"></terminate-order-btn>  
        <!-- 返回订单列表 -->
        <back-order-list-btn :publicOrderType="publicOrderType"></back-order-list-btn>
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
</div>
</template>

<script>

// import operateAssignOrderBtn from '@/public/module/orderConfig/orderHeaderComponent/operateAssignOrderBtn.vue'
// import saleAssignOrderBtn from '@/public/module/orderConfig/orderHeaderComponent/saleAssignOrderBtn.vue'
// import resignBtn from '@/public/module/orderConfig/orderHeaderComponent/resignBtn.vue'
// import terminateOrderBtn from '@/public/module/orderConfig/orderHeaderComponent/terminateOrderBtn.vue'

// import backOrderListBtn from '@/public/module/orderConfigbackOrderListBtn.vue'
import {
    backOrderListBtn,
    terminateOrderBtn,
    resignBtn,
    saleAssignOrderBtn,
    operateAssignOrderBtn,
} from './orderHeaderComponent/index.js'

import {order_typeList} from '@/public/module/orderList/IorderList.ts'

import { 
    $utils, 
    saleService,
} from '@common/index.js'

export default {
    components: {
        operateAssignOrderBtn,
        saleAssignOrderBtn,
        resignBtn,
        terminateOrderBtn,
        backOrderListBtn,
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
            return  this.currentOrder.type == 2 &&
                    this.orderModuleType == 'sale'
        },
        /**
         * 是否显示终止订单按钮
         * 订单状态为(匹配中 || 售后匹配中)  && 处于门店订单配置页
         */
        isShowTerminateOrderBtn(){
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
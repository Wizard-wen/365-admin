<template>
<div class="order-header">
    <div class="order-name">
        <h4>订单号：{{orderBase.order_code}}</h4>
    </div>
    <div class="btn-group">
        <!-- 仅店长有此权限 -->
        <el-button 
            type="primary" size="mini"
            v-if="presentUser.is_store_manager != 1"
            @click="openAssignOrderDialog">分派</el-button>
        <el-button 
            type="primary" size="mini" 
            v-if="orderBase.type == 2" 
            @click="goSignOrderPage(1)">续约</el-button>
        <el-button 
            type="danger" size="mini" 
            v-if="orderBase.type == 1 || 3" 
            @click="openDeterminateOrderDialog">终止订单</el-button>
        <el-button 
            size="mini" 
            @click="goback">返回</el-button>
    </div>
    <div class="order-detail">
        <div class="detail-left">
            <div class="detail-left-box">
                <div class="detail-left-line">订单经纪人：{{ orderBase.agent_manager_name }}</div>
                <div class="detail-left-line">订单经纪门店：{{ orderBase.agent_store_name }}</div>
                <div class="detail-left-line">订单创建人（运营）：{{ orderBase.created_manager_name }}</div>
                <div class="detail-left-line">订单创建时间：{{orderBase.created_at | timeFomatter}}</div>
                <div class="detail-left-line">来源门店：{{orderBase.apply_store_name}}</div>
                <div class="detail-left-line">来源人：{{orderBase.apply_manager_id == 0 ? '门店' : orderBase.apply_manager_name}}</div>
                <div
                    v-if="orderBase.type != 1" 
                    class="detail-left-line">签约时间：{{orderBase.sign_at | timeFomatter}}</div>
                <div
                    v-if="orderBase.type != 1" 
                    class="detail-left-line">服务周期：{{orderBase.sign_service_start | timeFomatter}} - {{orderBase.sign_service_end | timeFomatter}}</div>
            </div>
        </div>
        <div class="detail-right">
            <div class="right-box" v-if="orderBase.type!= 1">
                <div class="title">
                    账户余额
                    <el-tooltip class="item" effect="dark" content="账户余额不包含客户服务费！" placement="top-start">
                        <i class="el-icon-info"></i>
                    </el-tooltip>
                </div>
                <div class="value">{{ orderBase.sign_user_account}}</div>
            </div>
            <div class="right-box" >
                <div class="title">订单状态</div>
                <div class="value" :style="{color: orderType.color}">{{ orderType.name}}</div>
            </div>
        </div>
    </div>
    <!-- 订单分派弹出框 -->
    <assign-dialog
        v-if="assignDialogVisible"
        :openAssignDialog="assignDialogVisible"
        @closeAssignDialog="closeAssignDialog"
        :order_id="order_id"></assign-dialog>
    <!-- 订单分派弹出框 -->
    <terminate-order-dialog
        v-if="determinateOrderDialogVisible"
        :determinateOrderDialogVisible="determinateOrderDialogVisible"
        @closeDeterminateOrderDialog="closeDeterminateOrderDialog"
        :order_id="order_id"></terminate-order-dialog>
</div>
</template>

<script>

import assignDialog from './assignDialog.vue'
import terminateOrderDialog from './terminateOrderDialog.vue'


import { 
    $utils, 
} from '@common/index.js'

export default {
    components: {
        assignDialog,
        terminateOrderDialog,
    },
    props: {

    },
    computed: {
        /**
         * 当前用户信息
         */
        presentUser(){
            return this.$store.state.loginModule.user
        },
        /**
         * 订单基本信息
         */
        orderBase(){
            return this.$store.state.saleModule.order
        },
        /**
         * 订单状态
         */
        orderType(){
            if(this.orderBase.type == 1){
                return {
                    name: '匹配中',
                    color: '#E6A23C'
                }
            } else if(this.orderBase.type == 2){
                return {
                    name: '已签约',
                    color: '#67C23A'
                }
            } else if(this.orderBase.type == 3){
                return {
                    name: '售后匹配中',
                    color: '#E6A23C'
                }
            } else if(this.orderBase.type == 4){
                return {
                    name: '已终止',
                    color: '#F56C6C'
                }
            } else {
                return {
                    name: '',
                    color: ''
                }
            }
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
            order_id: this.$route.query.order_id,
            //分配弹出框显示
            assignDialogVisible:false,
            //终止订单弹窗显示隐藏
            determinateOrderDialogVisible: false,
        }
    },
    methods: {
        /**
         * 打开分派订单弹窗
         */
        openAssignOrderDialog(){
            this.assignDialogVisible = true
        },
        /**
         * 关闭分派订单弹窗
         */
        closeAssignDialog(){
            this.assignDialogVisible = false
            this.$emit('updateOrderConfig')
        },
        /**
         * 返回
         */
        goback(){
            this.$router.push({
                path: '/sale/orderList',
            })
        },
        /**
         * 打开终止订单弹窗
         */
        async openDeterminateOrderDialog(){
            this.determinateOrderDialogVisible = true
        },
        /**
         * 关闭终止订单弹窗
         */
        closeDeterminateOrderDialog(){
            this.determinateOrderDialogVisible = false
            this.$emit('updateOrderConfig')
        },
        /**
         * 续约跳转至签约页面
         */
        goSignOrderPage(){
            this.$router.push({
                path: `/sale/saleSignPage`,
                query: {
                    order_id: this.order_id,
                    type: this.orderBase.type,//订单状态
                    sign_staff_id: this.orderBase.sign_staff_id ,
                    sign_staff_name: this.orderBase.sign_staff_name,
                    sign_user_name: this.orderBase.sign_user_name,
                    sign_user_id: this.orderBase.sign_user_id,
                    sign_user_identify: this.orderBase.sign_user_identify,
                }
            })
        },
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
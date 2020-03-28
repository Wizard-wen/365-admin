<template>
    <div style="display: inline-block">
        <el-button size="mini" type="success" @click="openPassOrderApplyDialog">通过</el-button>
        <public-assign-order-component
            v-if="publicAssignOrderDialogVisible"
            :orderItemObject="currentOrderApply"
            :publicAssignOrderDialogVisible="publicAssignOrderDialogVisible"
            @closePublicAssignOrderDialog="closePublicAssignOrderDialog"
            @updatePublicAssignOrder="updatePublicAssignOrder"
            :publicOrderType="1"></public-assign-order-component>
    </div>
</template>

<script>
import {publicModuleService} from '@/service/publicModule'

import {publicAssignOrderComponent} from '@/public/module/orderPublic/index.js'

export default {
    components: {
        publicAssignOrderComponent,
    },
    props: {
        // 当前订单申请信息
        currentOrderApply: {
            type: Object,
            default(){return {}}
        },
        // 订单申请所属模块
        orderApplyModuleType: {
            type: String,
            default: 'apply',
        },
    },
    data(){
        return {
            publicAssignOrderDialogVisible: false,
            is_loading: false,
        }
    },
    methods: {
        /**
         * 打开通过订单弹窗
         */
        openPassOrderApplyDialog(){
            if(
                this.currentOrderApply.user_name && 
                this.currentOrderApply.user_phone && 
                this.currentOrderApply.work_type && 
                this.currentOrderApply.wage && 
                this.currentOrderApply.service_duration && 
                this.currentOrderApply.order_details && 
                this.currentOrderApply.service_address
            ){
                this.orderApplyItemObject = this.currentOrderApply;
                this.publicAssignOrderDialogVisible = true
            } else {
                this.$message({
                    type: "error",
                    message: "请完善订单申请信息"
                });
            }
        },
        /**
         * 通过订单申请钩子函数
         */
        async updatePublicAssignOrder(param){ 

            let passApplyObject = {
                id: this.currentOrderApply.id,//订单申请id
                type: 3,//状态设定为通过
                version: this.currentOrderApply.version,//操作version
                ...param[0],
            }
            await this.dealApplication(passApplyObject)
            await this.closePublicAssignOrderDialog()
        },
        /**
         * 关闭通过订单申请弹窗
         */
        async closePublicAssignOrderDialog(){
            this.publicAssignOrderDialogVisible = false
            this.$emit('updateOrderApply')
        },
        /**
         * 改变订单申请状态为拒绝
         */
        async dealApplication(orderApplyObject){
            try {
                this.is_loading = true
                let response
                if(this.orderApplyModuleType == 'apply'){
                    response =  publicModuleService.dealStoreApplication(orderApplyObject)
                } else {
                    response =  publicModuleService.dealClientRequire(orderApplyObject)
                }
                await response.then(async data => {
                    if (data.code == 0) {
                        this.$message({
                            type: "success",
                            message: data.message
                        });
                        this.is_loading = false
                    }
                }).catch(error => {
                    this.$message({
                        type: "error",
                        message: error.message
                    });
                    this.is_loading = false
                }).finally(() =>{
                    this.is_loading = false
                })
            } catch (error) {
                this.$message({
                    type: "error",
                    message: error.message
                });
                this.is_loading = false
            }
        },
    }
}
</script>

<style>

</style>
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
import {operateService} from '@common/index.js'
import {operateOrderService} from '@/service/operateOrder.ts'
import {publicAssignOrderComponent} from '@/public/module/orderPublic/index.js'
export default {
    components: {
        publicAssignOrderComponent,
    },
    props: {
        currentOrderApply: {
            type: Object,
            default(){return {}}
        },
        orderApplyModuleType: {
            type: String,
            default: 'apply',
        }
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
            // let param = this.currentOrderApply
            let passApplyObject = {
                id: param[1].id,
                type: 3,//状态设定为通过
                ...param[0],
                version: param[1].version,
            }
            await this.dealApplication(passApplyObject)
            await this.closePublicAssignOrderDialog()
        },
        /**
         * 关闭通过订单申请弹窗
         */
        async closePublicAssignOrderDialog(){
            this.publicAssignOrderDialogVisible = false
            this.$emit('updateTable')
        },
        /**
         * 改变订单申请状态为拒绝
         */
        async dealApplication(orderApplyObject){
            try {
                this.is_loading = true
                let response
                if(this.orderApplyModuleType == 'apply'){
                    response =  operateOrderService.dealOrderApply(orderApplyObject)
                } else {
                    response =  operateOrderService.dealClientApply(orderApplyObject)
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
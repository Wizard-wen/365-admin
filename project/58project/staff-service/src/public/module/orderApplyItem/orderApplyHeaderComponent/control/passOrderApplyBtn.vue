<template>
    <div style="display: inline-block;">
        <el-button size="mini" type="success" @click="openPassOrderApplyDialog">通过</el-button>
        <public-assign-order-component
            v-if="publicAssignOrderDialogVisible"
            :orderItemObject="currentOrderApply"
            :publicAssignOrderDialogVisible="publicAssignOrderDialogVisible"
            @closePublicAssignOrderDialog="closePublicAssignOrderDialog"
            @updatePublicAssignOrder="updatePublicAssignOrder"
            :publicOrderType="publicOrderType"></public-assign-order-component>
    </div>
    
</template>

<script>
import {publicAssignOrderComponent} from '@/public/module/orderPublic/index.js'
import {
    $utils,
    operateService,
} from '@common/index.js'
export default {
    components: {
        publicAssignOrderComponent,
    },
    props: {
        // 是否可以通过订单
        couldSubmit: {
            type: Boolean,
            default: false,
        },
        // 当前订单申请
        currentOrderApply: {
            type: Object,
            default: function(){return {}}
        }
    },
    data(){
        return {
            publicAssignOrderDialogVisible: false,
        }
    },
    methods: {
        //打开通过订单申请弹窗
        openPassOrderApplyDialog(){
            //订单申请是否已经填写完整
            if(this.couldSubmit){
                this.publicAssignOrderDialogVisible = true
            } else {
                this.$message({
                    type: "error",
                    message: '请完善订单申请基本信息！'
                });
            }
        },
        /**
         * 关闭通过订单申请弹窗
         */
        async closePublicAssignOrderDialog(){
            this.publicAssignOrderDialogVisible = false
            this.$emit('updateOrderApply')
        },
        async updatePublicAssignOrder(param){

            let orderApplyObject = {
                id: param[1].id,
                type: 3,
                ...param[0],
                version: param[1].version,
            }
            if(this.publicOrderType == 1){
                await this.dealApplication(orderApplyObject)
            } else {
                await this.changeRequireType(orderApplyObject)
            }
        },
        /**
         * 处理订单申请接口
         */
        async dealApplication(orderApplyObject){
            try {
                await operateService.dealApplication(orderApplyObject).then(data => {
                    if (data.code == 0) {
                        this.$message({
                            type: "success",
                            message: data.message
                        });
                        this.publicAssignOrderDialogVisible = false
                        this.$emit('updateOrderApply')
                    }
                }).catch(error => {
                    this.$message({
                        type: "error",
                        message: error.message
                    });
                }).finally(() =>{

                })
            } catch (error) {
                this.$message({
                    type: "error",
                    message: error.message
                });
            }
        },
        /**
         * 处理客户需求接口
         */
        async changeRequireType(orderApplyObject){
            try {
                await operateService.changeRequireType(orderApplyObject).then(data => {
                    if (data.code == 0) {
                        this.$message({
                            type: "success",
                            message: data.message
                        });
                        this.publicAssignOrderDialogVisible = false
                        this.$emit('updateOrderApply')
                    }
                }).catch(error => {
                    this.$message({
                        type: "error",
                        message: error.message
                    });
                }).finally(() =>{

                })
            } catch (error) {
                this.$message({
                    type: "error",
                    message: error.message
                });
            }
        },
    }
}
</script>

<style>

</style>
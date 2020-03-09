<template>
    <el-button size="mini" type="danger" @click="refuseOrderApply">拒绝</el-button>
</template>

<script>
import {
    $utils,
    operateService,
} from '@common/index.js'
export default {
    props: {
        // 当前订单申请
        currentOrderApply: {
            type: Object,
            default(){return {}}
        },
        // 订单所属页面
        publicOrderType: {
            type: Number,
            default: 1,
        }
    },
    methods: {
        /**
         * 拒绝订单申请年轻
         */
        async refuseOrderApply(){
            await this.$confirm("确定拒绝该订单申请吗?此操作将会关闭订单申请", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(async () =>{
                //拒绝订单申请表单
                let orderApplyObject = {
                    id: this.currentOrderApply.id,
                    type: 2,
                    version: this.currentOrderApply.version,
                }
                if(this.publicOrderType == 1){
                    await this.dealApplication(orderApplyObject)
                } else {
                    await this.changeRequireType(orderApplyObject)
                }
                
            }).catch((error) => {
                this.$message({
                    type: "info",
                    message: error.message
                });
            });
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
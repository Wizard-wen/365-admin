<template>
    <el-button size="mini" type="danger" @click="refuseOrderApply">拒绝</el-button>
</template>

<script>
import {operateOrderService} from '@/service/operateOrder.ts'
export default {
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
            is_loading: false,
        }
    },
    methods: {
        /**
         * 拒绝订单申请年轻
         * @paramObj
         */
        async refuseOrderApply(){
            let paramObj = this.currentOrderApply
            await this.$confirm("确定拒绝该订单申请吗?此操作将会关闭订单申请", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(async () =>{
                //改变订单申请状态为拒绝
                let refuseOrderApplyObject = {
                    type: 2,//type == 2 为拒绝状态
                    version: paramObj.version,
                    id: paramObj.id,
                }
                await this.dealApplication(refuseOrderApplyObject)
                this.$emit('updateTable')
            }).catch(() => {
                this.$message({
                    type: "info",
                    message: "已放弃拒绝"
                });
            });
        },
        /**
         * 改变订单申请状态为拒绝
         */
        async dealApplication(orderApplyObject){
            try {
                this.is_loading = true

                let response

                if(this.orderApplyModuleType == 'apply'){
                    response = await operateOrderService.dealOrderApply(orderApplyObject)
                } else {
                    response = await operateOrderService.dealClientApply(orderApplyObject)
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
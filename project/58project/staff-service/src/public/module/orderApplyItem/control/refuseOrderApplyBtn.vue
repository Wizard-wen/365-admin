<template>
    <el-button size="mini" type="danger" @click="refuseOrderApply">拒绝</el-button>
</template>

<script>
import {publicModuleService} from '@/service/publicModule'
export default {
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
            await this.$confirm("确定拒绝该订单申请吗?此操作将会关闭订单申请", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(async () =>{
                //改变订单申请状态为拒绝
                let refuseOrderApplyObject = {
                    type: 2,//type == 2 为拒绝状态
                    version: this.currentOrderApply.version,
                    id: this.currentOrderApply.id,
                }
                await this.dealApplication(refuseOrderApplyObject)

                this.$emit('updateOrderApply')
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
                // 确定订单申请类型
                if(this.orderApplyModuleType == 'apply'){
                    response = publicModuleService.dealStoreApplication(orderApplyObject)
                } else {
                    response = publicModuleService.dealClientRequire(orderApplyObject)
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
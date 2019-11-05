<template>
    <log-component
        :order_logs="order_logs"
        :logDialogVisible="logDialogVisible"
        @openLogDialog="openLogDialog"
        @closeLogDialog="closeLogDialog"
        @submitLogDialog="submitLogDialog"></log-component>
</template>

<script>
export default {
    data(){
        return {
            //控制添加
            logDialogVisible:false,
        }
    },
    props: {
        /**
         * 订单日志
         */
        order_logs: {
            type: Array,
            default: function(){return []}
        },
    },
    methods: {
        /**
         * 打开日志弹窗
         */
        openLogDialog(){
            this.logDialogVisible = true
        },
        /**
         * 关闭订单弹窗
         */
        closeLogDialog(){
            this.logDialogVisible = false
            
            //更新订单配置数据
            this.$emit('updateOrderApply')
        },
        /**
         * 提交日志
         */
        async submitLogDialog(param){

            // try{
            //     await saleService.editOrder(this.orderApplyField).then(data =>{
            //         if(data.code == '0'){
            //             this.$message({
            //                 type:"success",
            //                 message: data.message
            //             })
            //             this.$emit('closeChangeDialog')
            //         }
            //     }).catch(error =>{
            //         this.$message({
            //             type:'error',
            //             message: error.message
            //         })
            //     })
            // } catch(error){
            //     this.$message({
            //         type:'error',
            //         message: error.message
            //     })
            // }
            
            //关闭弹窗
            this.logDialogVisible = false
            //更新订单配置数据
            this.$emit('updateOrderApply')
        }
    }
}
</script>

<style>

</style>
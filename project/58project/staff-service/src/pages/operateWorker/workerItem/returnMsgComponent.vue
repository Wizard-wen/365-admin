<template>
    <log-component
        :title="'回访'"
        :logList="return_msg"
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
         * 回访信息
         */
        return_msg: {
            type: Array,
            default(){return []}
        }
    },
    methods: {
        /**
         * 打开日志弹窗
         */
        openLogDialog(){
            this.logDialogVisible = true
        },
        /**
         * 关闭日志弹窗
         */
        closeLogDialog(){
            this.logDialogVisible = false
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
            this.$emit('updateOrderConfig')
        }
    }
}
</script>

<style>

</style>
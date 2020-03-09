<template>
    <log-component
        :logList="order_logs"
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
         * 订单类型
         * 1 门店订单申请 2 客户订单申请 3 门店订单 4 门店公海订单 5 运营订单
         */
        publicOrderType: {    
            type: Number | String,
            default: 1,
        },
    },
    computed: {
        /**
         * 订单日志
         */
        order_logs(){
            return this.$store.state.saleModule.order_logs
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
<template>
    <el-button size="mini" type="primary" @click="goContractPage">查看</el-button>
</template>

<script>
export default {
    props: {
        currentContract: {
            type: Object,
            default(){return {}}
        },
        contractModuleType: {
            type: String,
            default: 'operateContractList'
        },
        currentPage: {
            type: Number,
            default: 1,
        }
    },
    methods: {
        setContractType(){
            if(this.contractModuleType == 'operateContractList'){
                return {
                    hasOrderId: false, 
                    path: '/operate/operateContractItem'
                }
            } else if(this.contractModuleType == 'operateOrderConfig'){
                return {
                    hasOrderId: true, 
                    path: '/operate/operateContractItem'
                } 
            } else if(this.contractModuleType == 'saleOrderConfig'){
                return {
                    hasOrderId: true, 
                    path: '/sale/saleContractItem'
                } 
            } else if(this.contractModuleType == 'saleContractList'){
                return {
                    hasOrderId: false, 
                    path: '/sale/saleContractItem'
                } 
            } 
        },
        /**
         * 前往合同详情页
         */
        goContractPage(row){
            this.$router.push({
                path: this.setContractType().path,
                query: {
                    id: this.currentContract.id,
                    from: this.contractModuleType,
                    order_id: this.setContractType().hasOrderId? this.$route.query.order_id : 0,
                    currentPage: this.currentPage,
                }
            })
        },
    }
}
</script>

<style>

</style>
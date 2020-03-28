<template>
    <el-button size="mini" @click="goback">返回</el-button>
</template>

<script>
export default {
    props: {
        currentPage: {
            type: Number,
            default: 1,
        }
    },
    methods: {
        setPath(){
            if(this.$route.query.from == 'operateOrderConfig'){
                return {hasOrderId: true,path: '/operate/operateOrderConfig'}
            } else if(this.$route.query.from == 'operateContractList'){
                return {hasOrderId: false,path: '/operate/operateContractList'}
            } else if(this.$route.query.from == 'saleOrderConfig'){
                return {hasOrderId: true,path: '/sale/saleOrderConfig'}
            } else if(this.$route.query.from == 'saleContractList'){
                return {hasOrderId: false,path: '/sale/saleContractList'}
            }
        },
        goback(){
            this.$router.push({
                path: this.setPath().path,
                query: {
                    order_id: this.setPath().hasOrderId?this.$route.query.order_id:0,
                    currentPage: this.currentPage 
                }
            })
        },
    }
}
</script>

<style>

</style>
<template>
    <el-button size="mini" @click="goback">返回</el-button>
</template>

<script>
export default {
    props: {
        publicOrderType: {
            type: Number,
            default: 1,
        },
    },
    methods: {
        /**
         * 返回
         */
        goback(){
            if(this.publicOrderType == 3){
                this.$router.push({
                    path: '/sale/saleOrderList',
                    query: {
                        currentPage: this.$route.query.currentPage
                    }
                })
            } else if(this.publicOrderType == 4){
                this.$router.push({
                    path: '/sale/salePublicOrderList',
                    query: {
                        currentPage: this.$route.query.currentPage
                    }
                })
            } else if(this.publicOrderType == 5){
                this.$router.push({
                    path: '/operate/operateOrderList',
                    query: {
                        currentPage: this.$route.query.currentPage
                    }
                })  
            } 
        },
    }
}
</script>

<style>

</style>
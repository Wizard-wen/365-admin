<template>
    <el-button size="mini" @click="goback">返回</el-button>
</template>

<script>
export default {
    props: {
        /**
         * 通用订单类型
         */
        publicOrderType: {    
            type: Number | String,
            default: 1,
        },
    },
    methods: {
        /**
         * 返回上一级
         */
        goback(){
            if(this.publicOrderType == 1){
                this.$router.push({
                    path: '/operate/operateOrderApplyList',
                })
            } else {
                this.$router.push({
                    path: '/operate/clientRequireList',
                })
            }
            
        },
    }
}
</script>

<style>

</style>
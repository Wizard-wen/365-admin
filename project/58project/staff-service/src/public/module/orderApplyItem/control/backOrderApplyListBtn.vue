<template>
    <el-button size="mini" @click="goback">返回</el-button>
</template>

<script>
export default {
    methods: {
        /**
         * 返回上一级
         */
        goback(){
            if(this.$route.query.from == 'apply'){
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
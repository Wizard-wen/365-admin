<template>
    <el-button size="mini" @click="goback">返回</el-button>
</template>

<script>
export default {
    methods: {
        /**
         * 返回
         */
        goback(){
            let fromPage = this.$route.query.type
            if(fromPage == 0 || fromPage == 1){
                this.$router.push("/worker/workerList")
            } else if (fromPage == 2){
                this.$router.push("/worker/returnWorkerList")
            } else if (fromPage == 3){
                this.$router.push("/worker/errorWorkerList")
            } else if (fromPage == 4){
                this.$router.push("/worker/newWorkerList")
            }
        },
    }
}
</script>

<style>

</style>
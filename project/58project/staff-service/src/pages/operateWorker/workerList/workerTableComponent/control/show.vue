<template>
    <el-button size="mini" type="primary" @click="showWorker">查看</el-button>
</template>

<script>
export default {
    props: {
        /**
         * 当前操作的服务人员信息
         */
        currentWorkerItem: {
            type: Object,
            default: function(){return {}}
        }
    },
    methods: {
        /**
         * 查看服务人员详情
         */
        showWorker(){
            this.$router.push({
                path: "/worker/workerItemShow",
                query: {
                    id: this.currentWorkerItem.id,
                    from: 1,
                }
            })
        },
    }
}
</script>

<style>

</style>
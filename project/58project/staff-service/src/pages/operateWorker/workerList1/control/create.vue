<template>
    <el-button type="primary" @click="createWorker">创建服务人员</el-button>
</template>

<script>
export default {
    
    methods: {
        /**
         * 创建、编辑服务人员信息
         * des type字段在 创建，编辑，回访，处理异常，创建申请 都能用到
         * 运营人员创建 0
         * 运营人员编辑 1
         * 运营人员回访时编辑 2
         * 运营人员处理异常时编辑 3
         * 运营人员处理新建申请 4
         */
        createWorker(type){
            this.$router.push({
                path: "/worker/workerItem",
                query: {
                    type: 0, //编辑为1 创建为 0
                    id: 0
                }
            })
        },
    }
}
</script>

<style>

</style>
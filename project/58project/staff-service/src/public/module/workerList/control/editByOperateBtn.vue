<template>
    <el-button type="primary" size="mini" @click="editWorker">编辑</el-button>
</template>

<script>
export default {
    props: {
        /**
         * 当前服务人员
         */
        currentWorker: {
            type: Object,
            default: function(){return {}}
        },
        /**
         * 当前页
         */
        currentPage: {
            type: Number | String,
            default: 1,
        },
        workerListType: {
            type: String,
            default: 'total'
        }
    },
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
        setEditType(){
            if(this.workerListType == 'total'){
                return 1
            } else if(this.workerListType == 'return'){
                return 2
            } else if(this.workerListType == 'warning'){
                return 3
            } else if(this.workerListType == 'apply'){
                return 4
            }
        },
        editWorker(){
            this.$router.push({
                path: "/worker/workerItem",
                query: {
                    type: this.setEditType(), //编辑为1 
                    id: this.currentWorker.id,
                    currentPage: this.currentPage,
                }
            })
        },
    }
}
</script>

<style>

</style>
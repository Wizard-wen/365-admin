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
                return {
                    id: 1,
                    type: 'total',
                    from: 'workerList'
                }
            } else if(this.workerListType == 'return'){
                return {
                    id: 2,
                    type: 'return',
                    from: 'returnWorkerList'
                }
            } else if(this.workerListType == 'warning'){
                return {
                    id: 3,
                    type: 'warning',
                    from: 'errorWorkerList'
                }
            } else if(this.workerListType == 'apply'){
                return {
                    id: 4,
                    type: 'apply',
                    from: 'newWorkerList'
                }
            }
        },
        editWorker(){
            this.$router.push({
                path: "/worker/workerItem",
                query: {
                    type: this.setEditType().id, //编辑为1
                    from: this.setEditType().type, 
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
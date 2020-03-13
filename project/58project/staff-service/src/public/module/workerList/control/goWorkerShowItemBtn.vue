<template>
    <el-button size="mini" type="primary" @click="showWorker">查看</el-button>
</template>

<script>
export default {
    props: {
        /**
         * 当前操作的服务人员信息
         */
        currentWorker: {
            type: Object,
            default: function(){return {}}
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
        setShowType(){
            if(this.workerListType == 'total'){
                return {type: 1, from: 'total', path: '/worker/workerItemShow',}
            } else if(this.workerListType == 'return'){
                return {type: 2, from: 'return', path: '/worker/workerItemShow',}
            } else if(this.workerListType == 'warning'){
                return {type: 3, from: 'warning', path: '/worker/workerItemShow',}
            } 
            // else if(this.workerListType == 'apply'){
            //     return 4
            // } 
            else if(this.workerListType == 'seller'){
                return {type: 5, from: 'seller', path: '/sale/saleWorkerShow',}
            } else if(this.workerListType == 'match'){
                return {type: 6, from: 'match', path: '/sale/saleWorkerShow',}
            } else if(this.workerListType == 'publicMatch'){
                return {type: 7, from: 'publicMatch', path: '/sale/saleWorkerShow',}
            }
        },
        /**
         * 查看服务人员详情
         */
        showWorker(){
            this.$router.push({
                path: this.setShowType().path,
                query: {
                    id: this.currentWorker.id,
                    from:  this.setShowType().from,
                    type: this.setShowType().type,
                    order_id: (this.setShowType().type == 6 || this.setShowType().type == 7)? this.$route.query.order_id: 0
                }
            })
        },
    }
}
</script>

<style>

</style>
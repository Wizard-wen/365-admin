<template>
    <div>
        <el-button type="primary" @click="openCreateWorkerBySaleDialog">申请创建服务人员</el-button>
        <!-- 申请添加服务人员 -->
        <create-worker-dialog
            :workerConfigForm="workerConfigForm"
            v-if="createWorkerDialogVisible"
            :openCreateWorkerDialog="createWorkerDialogVisible"
            @closeCreateWorkerDialog="closeCreateWorkerDialog"></create-worker-dialog>
    </div>
    
</template>

<script>
import  createWorkerDialog from './createBySaleBtn/createWorkerDialog.vue'
export default {
    components: {
        createWorkerDialog,
    },
    props: {
        workerConfigForm: {
            type: Object,
            default(){return {}}
        }
    },
    data(){
        return {
            //控制申请创建服务人员弹出框显示异常
            createWorkerDialogVisible: false,
        }
    },
    methods: {
        /**
         * 申请创建服务人员
         * des 先创建服务人员，然后才能添加服务人员技能。
         */
        openCreateWorkerBySaleDialog(){
            this.createWorkerDialogVisible = true;
        },
        closeCreateWorkerDialog(){
            this.createWorkerDialogVisible=false       
            this.$emit('updataTable')     
        }
    }
}
</script>

<style>

</style>
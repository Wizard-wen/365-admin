<template>
    <div>
        <el-button type="primary" @click="openCreateWorkerBySaleDialog">申请创建服务人员</el-button>
        <!-- 申请添加服务人员 -->
        <create-worker-dialog
            v-if="createWorkerDialogVisible"
            :openCreateWorkerDialog="createWorkerDialogVisible"
            @closeCreateWorkeBySalerDialog="closeCreateWorkeBySalerDialog"></create-worker-dialog>
    </div>
    
</template>

<script>
import  createWorkerDialog from './createBySale/createWorkerDialog.vue'
export default {
    components: {
        createWorkerDialog,
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
        closeCreateWorkeBySalerDialog(){
            this.createWorkerDialogVisible=false            
        }
    }
}
</script>

<style>

</style>
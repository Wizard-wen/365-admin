<template>
    <div style="display: inline-block">
        <el-button 
            size="mini"  type="danger" 
            @click="openErrorWorkerDialog">提交异常信息</el-button>
        <!-- 提交服务人员异常信息 -->
        <error-worker-dialog
            v-if="errorWorkerDialogVisible"
            :errorWorkerDialogVisible="errorWorkerDialogVisible"
            @closeErrorWorkerDialog="closeErrorWorkerDialog"
            :workerForm="workerForm"></error-worker-dialog>
    </div>
</template>

<script>
import errorWorkerDialog from './errorBySaleBtn/errorWorkerDialog.vue'
export default {
    components: {
        errorWorkerDialog
    },
    props: {
        /**
         * 操作用户信息
         */
        workerForm: {
            default: function(){return {}},
            type: Object,
        },      
    },
    data(){
        return {
            //控制异常信息弹出框显示隐藏
            errorWorkerDialogVisible: false,
        }
    },
    methods: {
        /**
         * 异常服务人员申请
         */
        openErrorWorkerDialog(){
            this.errorWorkerDialogVisible = true;
        },
        closeErrorWorkerDialog(){
            this.errorWorkerDialogVisible = false;
            this.$emit('updataTable')
        }
    }
}
</script>

<style>

</style>
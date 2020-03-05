<template>
    <div>
        <el-button 
            size="mini" style="color:#f56c6c" type="text" 
            @click="sendErrorMessage(controler.scoper.row)">提交异常信息</el-button>
        <!-- 提交服务人员异常信息 -->
        <error-worker-dialog
            v-if="errorStaffDialogVisible"
            :openErrorStaffDialog="errorStaffDialogVisible"
            @closeErrorStaffDialog="closeErrorStaffDialog"
            :errorStaffWorkingStatus="errorStaffRow.working_status"
            :staffId="errorStaffId"></error-worker-dialog>
    </div>
</template>

<script>
import errorWorkerDialog from './errorBySale/errorWorkerDialog.vue'
export default {
    components: {
        errorWorkerDialog
    },
    props: {
        /**
         * 操作用户信息
         */
        workerItem: {
            default: function(){return {}},
            type: Object,
        },      
    },
    data(){
        return {
            //控制异常信息弹出框显示隐藏
            errorStaffDialogVisible: false,
            //异常服务人员id
            errorStaffId: 0,
            //异常服务人员信息
            errorStaffRow: null,
        }
    },
    methods: {
        /**
         * 异常服务人员申请
         */
        sendErrorMessage(row){
            this.errorStaffRow = row
            this.errorStaffId = row.id
            this.errorStaffDialogVisible = true;
        },
    }
}
</script>

<style>

</style>
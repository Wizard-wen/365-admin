<template>
    <div style="display: inline-block">
        <el-button 
            type="danger" size="mini" @click="openRefuseServiceDialog">拒绝</el-button>
        <refuse-service-dialog
            v-if="refuseServiceDialogVisible"
            :refuseServiceDialogVisible="refuseServiceDialogVisible"
            @closeRefuseDialog="closeRefuseDialog"
            :matched_staff="currentWorker"
            :order_id="currentOrder.id"></refuse-service-dialog>
    </div>
</template>

<script>
import refuseServiceDialog from './refuseMatchedWorkerBtn/refuseServiceDialog.vue'
export default {
    components: {
        refuseServiceDialog,
    },
    data(){
        return {
            refuseServiceDialogVisible: false,
        }
    },
    props: {
        currentWorker: {
            type: Object,
            default(){return {}}
        },
        currentOrder: {
            type: Object,
            default(){return {}}
        }
    },
    methods: {
        /**
         * 打开拒绝劳动者弹窗
         * @param paramObj 匹配服务人员信息对象
         */
        openRefuseServiceDialog(paramObj){
            this.matched_staff = paramObj
            this.refuseServiceDialogVisible = true
        },
        /**
         * 关闭拒绝劳动者弹窗
         */
        closeRefuseDialog(){
            this.refuseServiceDialogVisible = false
            this.$emit('updateOrderConfig')
        },
    }
}
</script>

<style>

</style>
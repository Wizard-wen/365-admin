<template>
    <div style="display: inline-block">
        <el-button type="danger" size="mini" @click="openDeterminateOrderDialog">终止订单</el-button>
        <!-- 终止订单弹出框 -->
        <terminate-order-dialog
            v-if="determinateOrderDialogVisible"
            :determinateOrderDialogVisible="determinateOrderDialogVisible"
            @closeDeterminateOrderDialog="closeDeterminateOrderDialog"
            :order_id="currentOrder.id"></terminate-order-dialog>
    </div>
</template>

<script>
import terminateOrderDialog from './terminateOrderBtn/terminateOrderDialog.vue'
export default {
    components: {
        terminateOrderDialog,
    },
    data(){
        return {
            determinateOrderDialogVisible: false,
        }
    },
    props: {
        currentOrder: {
            type: Object,
            default(){return {}}
        }
    },
    methods: {
        /**
         * 打开终止订单弹窗
         */
        async openDeterminateOrderDialog(){
            this.determinateOrderDialogVisible = true
        },
        /**
         * 关闭终止订单弹窗
         */
        closeDeterminateOrderDialog(){
            this.determinateOrderDialogVisible = false
            this.$emit('refreshOrder')
        },
    }
}
</script>

<style>

</style>
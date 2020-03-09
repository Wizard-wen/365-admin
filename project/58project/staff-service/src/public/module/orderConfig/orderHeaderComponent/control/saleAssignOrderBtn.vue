<template>
    <div style="display: inline-block">
        <el-button size="mini" type="primary" @click="openAssignOrderDialog">分派订单</el-button>
        <!-- 店内订单分派弹出框 -->
        <assign-order-in-store-dialog
            v-if="assignOrderInStoreDialogVisible"
            :assignOrderInStoreDialogVisible="assignOrderInStoreDialogVisible"
            @closeAssignOrderInStoreDialog="closeAssignOrderInStoreDialog"
            :currentOrder="currentOrder"></assign-order-in-store-dialog>
    </div>
    
</template>

<script>
import assignOrderInStoreDialog from './saleAssignOrderBtn/assignOrderInStoreDialog.vue'
export default {
    components: {
        assignOrderInStoreDialog,
    },
    props: {
        currentOrder: {
            type: Object,
            default(){return {}}
        },
    },
    data(){
        return {
            assignOrderInStoreDialogVisible: false,
        }
    },
    methods: {
        /**
         * 打开门店内分派订单弹窗
         */
        openAssignOrderDialog(){
            this.assignOrderInStoreDialogVisible = true
        },
        /**
         * 关闭店长分派订单弹窗
         */
        closeAssignOrderInStoreDialog(){
            this.assignOrderInStoreDialogVisible = false
            this.$emit('refreshOrder')
        },
    }
}
</script>

<style>

</style>
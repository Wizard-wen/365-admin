<template>
    <div style="display: inline-block">
        <el-button type="primary" @click="openOrderApplyDialog">订单申请</el-button>
        <!-- 订单申请弹出框 -->
        <apply-order-dialog
            v-if="applyOrderDialogVisible"
            :applyOrderDialogVisible="applyOrderDialogVisible"
            @closeCreateStaffDialog="closeCreateStaffDialog"></apply-order-dialog>
    </div>
    
</template>

<script>
import applyOrderDialog from './saleApplyOrderBtn/applyOrderDialog.vue'
export default {
    components: {
        applyOrderDialog,
    },
    data(){
        return {
            applyOrderDialogVisible: false,
        }
    },
    computed: {
        /**
         * 当前用户信息
         */
        presentUser(){
            return this.$store.state.loginModule.user
        },
    },
    methods: {
        openOrderApplyDialog(){
            if(this.presentUser.store_id == 0){
                this.$message({
                    message: '您还不是门店员工，暂时不能创建订单申请',
                    type: 'error'
                })
                return;
            }
            this.applyOrderDialogVisible = true
        },
        closeCreateStaffDialog(){
            this.applyOrderDialogVisible=false
            this.$emit('updateTable')
        }
    }
}
</script>

<style>

</style>
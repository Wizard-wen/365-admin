<template>
    <div style="display: inline-block">
        <el-button type="primary" size="mini" @click="openSettleWageDialog">结算工资</el-button>
        <!-- 订单申请弹出框 -->
        <settle-wage-dialog
            :contractObj="currentContract"
            v-if="settleWageDialogVisible"
            :settleWageDialogVisible="settleWageDialogVisible"
            @closeSettleWageDialog="closeSettleWageDialog"></settle-wage-dialog>
    </div>
    
</template>

<script>
import settleWageDialog from './settleWageBtn/settleWageDialog.vue'
export default {
    components: {
        settleWageDialog,
    },
    props: {
        currentContract: {
            type: Object,
            default(){return {}}
        }
    },
    data(){
        return {
            settleWageDialogVisible: false,
        }
    },
    methods: {
        /**
         * 打开结算工资弹窗
         */
        openSettleWageDialog(){
            this.settleWageDialogVisible = true
        },
        /**
         * 关闭结算工资弹窗
         */
        async closeSettleWageDialog(){
            this.settleWageDialogVisible = false
            this.$emit('updateContract')
        },
    }
}
</script>

<style>

</style>
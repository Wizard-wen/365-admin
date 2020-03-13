<template>
    <div style="display: inline-block">
        <el-button type="primary" size="mini"  @click="openAssignVoidContractDialog">分派</el-button>
        <assign-void-contract-dialog
            v-if="assignVoidContractDialogVisible"
            :assignVoidContractDialogVisible="assignVoidContractDialogVisible"
            @closeVoidContractAssignDialog="closeVoidContractAssignDialog"
            :voidContractId="currentVoidContract.id"></assign-void-contract-dialog>
    </div>
</template>

<script>
import assignVoidContractDialog from './assignVoidContractBtn/assignVoidContractDialog.vue'
export default {
    components: {
        assignVoidContractDialog,
    },
    data(){
        return {
            assignVoidContractDialogVisible: false,
        }
    },
    props: {
        currentVoidContract: {
            type: Object,
            default(){return {}}
        }
    },
    methods: {
        /**
         * 打开分派合同弹窗
         */
        openAssignVoidContractDialog(){
            this.assignVoidContractDialogVisible = true
        },
        /**
         *
         */
        closeVoidContractAssignDialog(){
            this.assignVoidContractDialogVisible = false
            this.$emit('updateTable')
        },
    }
}
</script>

<style>

</style>
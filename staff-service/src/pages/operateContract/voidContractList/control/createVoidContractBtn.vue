<template>
    <div style="display: inline-block">
        <el-button type="primary" size="mini" @click="openCreateVoidContractDialog">创建空合同</el-button>
        <create-void-contract-dialog
            v-if="createVoidContractDialogVisible"
            :createVoidContractDialogVisible="createVoidContractDialogVisible"
            @closeVoidContractCreateDialog="closeVoidContractCreateDialog"></create-void-contract-dialog>
    </div>
    
</template>

<script>
import createVoidContractDialog from './createVoidContractBtn/createVoidContractDialog.vue'

export default {
    components: {
        createVoidContractDialog,
    },
    data(){
        
        return {
            createVoidContractDialogVisible: false,
            
        }
    },
    methods: {
        /**
         * 打开创建空合同弹窗
         */
        openCreateVoidContractDialog(){
            this.createVoidContractDialogVisible = true
        },
        /**
         * 关闭创建空合同弹窗
         */
        async closeVoidContractCreateDialog(){
            this.createVoidContractDialogVisible = false
            this.$emit('updateTable')
        }
    }
}
</script>

<style>

</style>
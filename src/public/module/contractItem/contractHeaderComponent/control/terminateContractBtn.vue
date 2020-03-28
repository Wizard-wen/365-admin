<template>
    <div style="display: inline-block">
        <el-button type="danger" size="mini" @click="openDeterminateContractDialog">终止合同</el-button>
        <terminate-contract-dialog
            :contractObj="currentContract"
            v-if="determinateContractDialogVisible"
            :determinateContractDialogVisible="determinateContractDialogVisible"
            @closeDeterminateContractDialog="closeDeterminateContractDialog"></terminate-contract-dialog>
    </div>
</template>

<script>
import terminateContractDialog from'./terminateContractBtn/terminateContractDialog.vue'
import {publicModuleService} from '@/service/publicModule'
export default {
    components: {
        terminateContractDialog,
    }, 
    props: {
        currentContract: {
            type: Object,
            default(){return {}}
        },
    },
    data(){
        return {
            determinateContractDialogVisible: false,
            is_loading: false,
        }
    },
    methods: {
        /**
         * 打开终止合同弹窗
         */
        async openDeterminateContractDialog(){
            //待执行状态合同终止
            if(this.currentContract.type == 1){
                await this.determinateContract()
            } else {
                /**
                 * is_wage 1 未发放工资 2 已发放工资
                 */
                if(this.currentContract.is_wage == 1){
                    this.determinateContractDialogVisible = true
                } else {
                    await this.determinateContract()
                }
            }
        },
        /**
         * 关闭终止合同弹窗
         */
        async closeDeterminateContractDialog(){
            this.$emit('updateContract')
            this.determinateContractDialogVisible = false
        },
        /**
         * 终止合同（已发放工资/待执行状态）
         */
        async determinateContract(){
            await this.$confirm("确定终止该合同吗?此操作不可逆", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(async () =>{
                await this.stopContract()
                this.$emit('updateContract')
            }).catch(() => {
                this.$message({
                    type: "info",
                    message: "已放弃终止"
                });
            });
        },
        /**
         * 终止合同接口
         */
        async stopContract(){
            try {
                this.is_loading = true

                let determinateContractObj = {
                    is_wage: this.currentContract.is_wage,
                    contract_id: this.currentContract.id,
                }

                await publicModuleService.stopContract(determinateContractObj).then(data => {
                    if (data.code == 0) {
                        this.$message({
                            type: "success",
                            message: data.message
                        });
                        this.is_loading = false
                    }
                }).catch(error => {
                    this.$message({
                        type: "error",
                        message: error.message
                    });
                    this.is_loading = false
                }).finally(() =>{
                    this.is_loading = false
                })
            } catch (error) {
                this.$message({
                    type: "error",
                    message: error.message
                });
                this.is_loading = false
            }
        },
    }
}
</script>

<style>

</style>
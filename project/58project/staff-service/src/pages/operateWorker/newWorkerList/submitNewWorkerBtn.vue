<template>
    <el-button size="mini" type="success" @click="recoverNewWorker">提交</el-button>
</template>

<script>
import {publicModuleService} from '@/service/publicModule'
export default {
    props: {
        currentWorker: {
            type: Object,
            default(){return {}}
        },
        workerListType: {
            type: String,
            default: 'apply'
        },
    },
    methods: {

        async recoverNewWorker(){
            await this.$confirm(`确定提交该服务人员吗?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () =>{
                this.agreeStaffSingle()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: `已取消提交操作`
                });
            });
        },
        async agreeStaffSingle(){
            try{
                let changeWorkerTypeForm = {
                    module: this.workerListType,
                    from : 'list',
                    id: this.currentWorker.id
                }

                await publicModuleService.addNewWorkerToWorkerList(changeWorkerTypeForm).then(data =>{
                    if(data.code == '0'){
                        this.$message({
                            type:"success",
                            message: data.message
                        })

                        this.$emit('updateTable')
                    }
                }).catch(error =>{
                    this.$message({
                        type:'error',
                        message: error.message
                    })
                }).finally(() =>{
                })
            } catch(error){
                this.$message({
                    type:'error',
                    message: error.message
                })
            }
        }
    }
}
</script>

<style>

</style>
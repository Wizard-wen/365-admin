<template>
    <el-button size="mini" type="success" @click="recoverErrorWorker">恢复</el-button>
</template>

<script>
import {operateService} from '@common/index.js'
export default {
    props: {
        currentWorker: {
            type: Object,
            default(){return {}}
        },  
        workerListType: {
            type: String,
            default: 'warning'
        }
    },
    methods: {
        async recoverErrorWorker(){
            await this.$confirm(`确定恢复该服务人员吗?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () =>{
                this.agreeStaffSingle()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: `已取消恢复操作`
                });
            });
        },
        async agreeStaffSingle(){
            try{
                await operateService.agreeStaffSingle(this.workerListType, 'edit',this.currentWorker).then(data =>{
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
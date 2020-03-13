<template>
    <el-button type="danger" size="mini" @click="deleteMatchStaff">删除</el-button>
</template>

<script>
import {publicModuleService} from '@/service/publicModule.ts'
export default {
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
         * 删除备选服务人员
         */
        async deleteMatchStaff(){
            //要删除的备选劳动者
            let deleteStaffObj = {
                order_id: this.currentOrder.id,
                order_staff_id: this.currentWorker.id
            }
            await this.$confirm(`确定删除该备选服务人员吗?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () =>{
                await this.deleteOrderStaff(deleteStaffObj)
                this.$emit('updateOrderConfig')
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: `已取消删除`
                });
            });
        },
        /**
         * 删除备选劳动者接口
         * @param order_staff_id 候选人员信息id
         * @param order_id 订单id
         */
        async deleteOrderStaff(deleteStaffObj){
            try{
                this.is_loading = true
                await publicModuleService.deleteMatchedWorker(deleteStaffObj)
                    .then(async data =>{
                        if(data.code == "0"){
                            this.$message({
                                type:'success',
                                message: data.message
                            })
                            this.is_loading = false
                        }
                    }).catch(error =>{
                        this.$message({
                            type:'error',
                            message: error.message
                        })
                        this.is_loading = false
                    })
            } catch(error){
                this.$message({
                    type:'error',
                    message: error.message
                })
                this.is_loading = false
            }
        },
    }
}
</script>

<style>

</style>
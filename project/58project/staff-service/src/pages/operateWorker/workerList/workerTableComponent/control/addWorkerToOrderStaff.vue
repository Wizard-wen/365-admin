<template>
    <el-button 
        size="mini" type="primary" 
        @click="addMatchStaff">添加备选</el-button>
</template>

<script>
import {saleService} from '@common/index.js'
export default {
    props: {
        workerForm: {
            type: Object,
            default(){return {}}
        },
    },
    methods: {
        /**
         * 添加备选服务人员
         * @param staffObject 员工
         */
        async addMatchStaff(staffObject){
            let sendObj = {
                staff_id:this.workerForm.id ,
                order_id: this.$route.query.order_id,
            }
            this.$confirm('确定将该服务人员添加至备选服务人员吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async() => {
                //调用备选服务人员接口
                await this.createOrderStaff(sendObj)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        /**
         * 调用添加备选服务人员接口
         */
        async createOrderStaff(sendObj){
            try{
                this.is_loading = true
                await saleService.createOrderStaff(sendObj).then(data =>{
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
                }).finally(() =>{
                    this.is_loading = false

                    //刷新订单配置页面
                    this.$emit('updateTable')
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
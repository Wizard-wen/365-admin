<template>
    <el-button 
        size="mini" 
        :type="currentWorker.status == 1?'danger':'success'"
        @click="openChangeStaffStatus">{{currentWorker.status == 1?'停用':'启用'}}</el-button>
</template>

<script>
import {publicModuleService} from '@/service/publicModule'
export default {
    props: {
        /**
         * 当前服务人员
         */
        currentWorker: {
            type: Object,
            default: function(){return {}}
        },
    },
    data(){
        return {
            is_loading: false,
        }
    },
    methods: {
        /**
         * 切换停用启用
         */
        async openChangeStaffStatus(){

            let status = this.currentWorker.status == 1? '停用' : '启用'

            let response = await this.$confirm(`确定${status}该服务人员吗?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () =>{
                //请求改变服务人员状态接口
                await this.changeWorkerType()
                //请求列表数据
                await this.$emit('updateTable')
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: `已取消${status}`
                });
            });
        },
        /**
         * 改变服务人员停用启用状态
         * @param row
         */
        async changeWorkerType(){
            this.is_loading = true

            try{
                let changeWorkerStatusForm = {
                    version: this.currentWorker.version,
                    id: this.currentWorker.id
                }
                await publicModuleService.changeWorkerType(changeWorkerStatusForm).then(data =>{
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
                })
            } catch(error){
                this.$message({
                    type:'error',
                    message: error.message
                })
                this.is_loading = false
            }
        }
    }
}
</script>

<style>

</style>
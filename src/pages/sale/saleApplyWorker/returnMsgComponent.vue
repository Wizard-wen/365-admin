<template>
    <return-msg-list
        :title="'回访'"
        :logList="return_msg"
        :isEdit="isEdit"
        :logDialogVisible="logDialogVisible"
        @openLogDialog="openLogDialog"
        @closeLogDialog="closeLogDialog"
        @submitLogDialog="submitLogDialog"></return-msg-list>
</template>

<script>
import {operateWorkerService} from '@/service/operateWorker'
import returnMsgList from './returnMsgComponent/returnMsgList.vue'
export default {
    components: {
        returnMsgList,
    },
    data(){
        return {
            //控制添加
            logDialogVisible:false,
        }
    },
    props: {
        /**
         * 回访信息
         */
        return_msg: {
            type: Array,
            default(){return []}
        },
        isEdit: {
            type: Boolean,
            default: false,
        },
        workerItem: {
            type: Object,
            default(){return {}}
        }
    },
    methods: {
        /**
         * 打开日志弹窗
         */
        openLogDialog(){
            this.logDialogVisible = true
        },
        /**
         * 关闭日志弹窗
         */
        closeLogDialog(){
            this.logDialogVisible = false
        },
        /**
         * 提交回访信息
         */
        async submitLogDialog(param){

            try{
                let sendForm = {
                    ...param,
                    staff_id: this.workerItem.id,
                }
                await operateWorkerService.addWorkerReturnMessage(sendForm).then(data =>{
                    if(data.code == '0'){
                        this.$message({
                            type:"success",
                            message: data.message
                        })
                        this.$emit('closeChangeDialog')
                    }
                }).catch(error =>{
                    this.$message({
                        type:'error',
                        message: error.message
                    })
                })
            } catch(error){
                this.$message({
                    type:'error',
                    message: error.message
                })
            }
            
            //关闭弹窗
            this.logDialogVisible = false
            //更新订单配置数据
            this.$emit('updateOperateWorker')
        }
    }
}
</script>

<style>

</style>
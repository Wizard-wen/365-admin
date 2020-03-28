<template>
    <div class="worker-config-box" 
    v-loading="is_loading">
        <el-form class="worker-config-form" ref="form" :model="workerConfigForm" label-width="140px">
            <el-form-item label="证书" prop="paper_category" class="form-item-size" size="small">
                <config-tag-component 
                    @editTag="editTag"
                    :tagList="workerConfigForm.paper_category" 
                    :tagConfigKey="'paper_category'"></config-tag-component>
            </el-form-item>

            <el-form-item label="民族" prop="nation" class="form-item-size" size="small">
                <config-tag-component 
                    @editTag="editTag"
                    :tagList="workerConfigForm.nation" 
                    :tagConfigKey="'nation'"></config-tag-component>
            </el-form-item>
        </el-form>
        <config-tag-dialog
            :workerConfigForm="tagConfigForm"
            :openTagDialog="tagDialogVisible"
            @closeTagDialog="closeTagDialog"
            :tagDialogTitle="'修改标签'"></config-tag-dialog>
    </div>
    
</template>

<script>
import configTagDialog from './workerConfigForm/configTagDialog.vue'
import {operateWorkerService} from '@/service/operateWorker'

export default {
    components: {
        configTagDialog
    },
    data() {
        return {
            is_loading: false,
            //员工信息表单
            workerConfigForm: {
                paper_category: [],//证书标签
                nation:[],//民族
            },
            tagDialogVisible:false,
            tagConfigForm:{
                id: 0,
                table: '',
                status: 1,
                name:  '',
                version:  '',
            },
        }
    },
    methods: {
        /**
         * tag组件更改后通过reload方法刷新页面
         */
        async getWorkerConfigForm(){
            try{
                this.is_loading = true
                await operateWorkerService.getWorkerConfigForm('config').then(data =>{
                    if(data.code == "0"){
                        this.workerConfigForm = data.data
                    }
                    this.is_loading = false
                }).catch(error =>{
                    this.$message({
                        type:'error',
                        message: error.message
                    })
                    this.is_loading = false
                }).finally(() =>{
                    this.is_loading = false
                })
            }catch(error){
                this.$message({
                    type:'error',
                    message: error.message
                })
                this.is_loading = true
            }
        },
        /**
         * 新建&编辑标签弹窗
         */
        editTag(item){
            this.tagConfigForm = {}
            if(item){
                this.tagConfigForm = {
                    ...item
                }
            } 
            this.tagDialogVisible = true
        },
        closeTagDialog(){
            this.tagDialogVisible = false
            this.getWorkerConfigForm()
        }
    },
    async mounted(){
        await this.getWorkerConfigForm()
    }
}
</script>
<style lang="scss" scoped>
    .worker-config-box{
        width: 100%;
        padding-top: 30px;
        .worker-config-form{
            width: 100%;
            & /deep/ .el-form-item{
                margin-bottom: 15px;
            }
            .form-item-size{
                width: 900px;
                & /deep/ .el-input{
                    min-width: 260px;
                }
            }
        }
    }

</style>



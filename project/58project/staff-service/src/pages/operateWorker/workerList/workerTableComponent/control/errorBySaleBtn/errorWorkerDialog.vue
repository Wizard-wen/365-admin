<template>
    <el-dialog 
        v-loading="is_loading"
        :title="'修改服务人员信息'" 
        :visible.sync="errorWorkerDialogVisible"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form :model="errorWorkerForm" :label-width="'120px'" ref="errorWorkerForm" :rules="errorWorkerRules">
            <!-- <el-form-item label="接单状态" prop="working_status">
                <select-tag-component :maxWidth="'100%'" :propTagList="workConfigForm.working_status" v-model="errorWorkerForm.working_status" :isSingle="true"></select-tag-component>
            </el-form-item> -->
            
            <el-form-item label="备注" prop="warning_log">
                <el-input placeholder="请最多输入200字符" :maxlength="100" autosize v-model="errorWorkerForm.warning_log" type="textarea"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeErrorWorkerDialog">取 消</el-button>
            <el-button type="primary" @click="submitErrorMessage('errorWorkerForm')">提交</el-button>
        </div>
    </el-dialog>
</template>
<script>
import {saleService} from '@common/index.js'
export default {
    props: {
        //是否打弹出框
        errorWorkerDialogVisible: {
            type: Boolean,
            default: false,
        },
        //服务人员
        workerForm:{
            type: Number,
            default: 0,
        },
        workConfigForm: {
            type: Object,
            default(){return {}}
        }
    },
    computed:{
        /**
         * 服务人员配置数据
         */
        workConfigForm(){
            return this.$store.state.operateModule.workerConfigForm
        }
    },
    data(){
        return {
            is_loading: false,
            //申请创建劳动者信息
            errorWorkerForm : {
                // working_status: this.errorWorkerWorkingStatus,
                warning_log: '',//日志信息
                id: this.workerForm.id,//服务人员id
            },
            //申请创建劳动者表单验证
            errorWorkerRules: {
                remark: [
                    { required:true,message:'请输入备注信息',trigger: 'blur'},
                ]
            }
        }
    },
    methods: {
        /**
         * 提交异常服务人员信息
         */
        async submitErrorMessage(formName){  
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    
                    try{
                        this.is_loading = true
                        await saleService.changeWorkingStatus(this.errorWorkerForm).then(data =>{
                            if(data.code == "0"){
                                this.$message({
                                    type:'success',
                                    message: data.message
                                })
                            }
                            this.is_loading = false
                            //关闭日志弹出框
                            this.$emit('closeErrorWorkerDialog')
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
                } else {
                    return false;
                }
            });  
        },  
        //关闭日志弹框
        closeErrorWorkerDialog(){
            //关闭日志弹出框
            this.$emit('closeErrorWorkerDialog')
        }
    }
}
</script>
<style lang="scss" scoped>


</style>



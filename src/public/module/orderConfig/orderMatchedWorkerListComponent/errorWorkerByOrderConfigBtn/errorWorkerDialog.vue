<template>
    <el-dialog 
        v-loading="is_loading"
        :title="'修改服务人员信息'" 
        :visible.sync="errorWorkerDialogVisible"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form :model="errorWorkerForm" :label-width="'120px'" ref="errorWorkerForm" :rules="errorWorkerRules">
            
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
import {publicModuleService} from '@/service/publicModule'
export default {
    props: {
        //是否打弹出框
        errorWorkerDialogVisible: {
            type: Boolean,
            default: false,
        },
        //服务人员
        workerForm:{
            type: Object,
            default(){return {}},
        },
    },
    data(){
        return {
            is_loading: false,
            //申请创建劳动者信息
            errorWorkerForm : {
                warning_log: '',//日志信息
                id: this.workerForm.staff_id,//服务人员id
            },
            //申请创建劳动者表单验证
            errorWorkerRules: {
                warning_log: [
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
                        await publicModuleService.addWorkerToErrorWorkerList(this.errorWorkerForm).then(data =>{
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



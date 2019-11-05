<template>
    <el-dialog 
        :title="errorWorkerDialogTitle" 
        :visible.sync="openErrorWorkerDialog"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form :model="errorWorkerForm" :label-width="'120px'" ref="errorWorkerForm" :rules="errorWorkerRules">
            <el-form-item label="接单状态" prop="working_status">
                <select-tag-component :maxWidth="'100%'" :propTagList="workerConfigList.working_status" v-model="errorWorkerForm.working_status" :isSingle="true"></select-tag-component>
            </el-form-item>
            
            <el-form-item label="备注" prop="warning_log">
                <el-input placeholder="请最多输入200字符" :maxlength="100" autosize v-model="errorWorkerForm.warning_log" type="textarea"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeErrorWorkerDialog">取 消</el-button>
            <el-button type="primary" @click="commitLog('errorWorkerForm')">提交</el-button>
        </div>
    </el-dialog>
</template>
<script>
import {saleService} from '@common/index.js'
import {selectTagComponent} from '@/pages/components'
export default {
    props: {
        //是否打弹出框
        openErrorWorkerDialog: {
            type: Boolean,
            default: false,
        },
        //弹窗title
        errorWorkerDialogTitle: {
            type: String,
            default: "修改服务人员信息"
        },
        //原始接单状态
        errorWorkerWorkingStatus: {
            type: Number,
            default: 0
        },
        //服务人员id
        staffId:{
            type: Number,
            default: 0,
        }
    },
    components: {
        selectTagComponent
    },
    computed:{
        /**
         * 服务人员配置数据
         */
        workerConfigList(){
            return this.$store.state.operateModule.workerConfigForm
        }
    },
    data(){
        const remarksValidator = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请填写日志信息'));
            } else {
                callback();
            }
        };
        return {
            //申请创建劳动者信息
            errorWorkerForm : {
                working_status: this.errorWorkerWorkingStatus,
                warning_log: '',//日志信息
                id: this.staffId,//
            },
            //申请创建劳动者表单验证
            errorWorkerRules: {
                remark: [
                    { validator: remarksValidator, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        /**
         * 提交日志信息
         */
        async commitLog(formName){  
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    
                    store.commit('setLoading',true)
            
                    await saleService.changeWorkingStatus(this.errorWorkerForm) 
                        .then(data =>{
                            if(data.code == "0"){
                                this.$message({
                                    type:'success',
                                    message: data.message
                                })
                            }
                        })
                        .catch(e =>{
                            this.$message({
                                type:'error',
                                message: e.message
                            })
                        })

                    store.commit('setLoading',false)

                    //关闭日志弹出框
                    this.$emit('closeErrorWorkerDialog')
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



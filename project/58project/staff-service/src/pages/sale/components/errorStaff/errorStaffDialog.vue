<template>
    <el-dialog 
        :title="errorStaffDialogTitle" 
        :visible.sync="openErrorStaffDialog"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form :model="errorStaffForm" :label-width="'120px'" ref="errorStaffForm" :rules="errorStaffRules">
            <el-form-item label="接单状态" prop="working_status">
                <select-tag-component :maxWidth="'100%'" :propTagList="workerConfigList.working_status" v-model="errorStaffForm.working_status" :isSingle="true"></select-tag-component>
            </el-form-item>
            
            <el-form-item label="备注" prop="warning_log">
                <el-input placeholder="请最多输入200字符" :maxlength="100" autosize v-model="errorStaffForm.warning_log" type="textarea"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeErrorStaffDialog">取 消</el-button>
            <el-button type="primary" @click="commitLog('errorStaffForm')">提交</el-button>
        </div>
    </el-dialog>
</template>
<script>
import {orderService} from '../../../../../common'
import {selectTagComponent} from '@/pages/components'
export default {
    props: {
        //是否打弹出框
        openErrorStaffDialog: {
            type: Boolean,
            default: false,
        },
        //弹窗title
        errorStaffDialogTitle: {
            type: String,
            default: "修改服务人员信息"
        },
        //原始接单状态
        errorStaffWorkingStatus: {
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
            return this.$store.state.hrModule.configForm
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
            errorStaffForm : {
                working_status: this.errorStaffWorkingStatus,
                warning_log: '',//日志信息
                id: this.staffId,//
            },
            //申请创建劳动者表单验证
            errorStaffRules: {
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
            
                    await orderService.changeWorkingStatus(this.errorStaffForm) 
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
                    this.$emit('closeErrorStaffDialog')
                } else {
                    return false;
                }
            });
            
        },  
        //关闭日志弹框
        closeErrorStaffDialog(){
            //关闭日志弹出框
            this.$emit('closeErrorStaffDialog')
        }
    }
}
</script>
<style lang="scss" scoped>


</style>



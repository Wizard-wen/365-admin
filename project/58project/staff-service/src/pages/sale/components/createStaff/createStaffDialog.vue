<template>
    <el-dialog 
        :title="createStaffDialogTitle" 
        :visible.sync="openCreateStaffDialog"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form :model="createStaffForm" :label-width="'120px'" ref="createStaffForm" :rules="createStaffRules">
            <el-form-item label="服务人员姓名">
                <el-input v-model="createStaffForm.name"></el-input>
            </el-form-item>

            <el-form-item label="手机号">
                <el-input v-model="createStaffForm.phone"></el-input>
            </el-form-item>
            
            <el-form-item label="备注" prop="seller_remarks">
                <el-input placeholder="请最多输入200字符" :maxlength="100" autosize v-model="createStaffForm.seller_remarks" type="textarea"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeCreateStaffDialog">取 消</el-button>
            <el-button type="primary" @click="commitLog('createStaffForm')">提交</el-button>
        </div>
    </el-dialog>
</template>
<script>
import {orderService} from '../../../../../common'

export default {
    props: {
        //是否打弹出框
        openCreateStaffDialog: {
            type: Boolean,
            default: false,
        },
        //弹窗title
        createStaffDialogTitle: {
            type: String,
            default: "申请添加服务人员"
        },
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
            createStaffForm : {
                name: '',//服务人员姓名
                phone: '',//服务人员电话
                seller_remarks: '',//备注信息
            },
            //申请创建劳动者表单验证
            createStaffRules: {
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
            
                    await orderService.createStaffBySeller(this.createStaffForm) 
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
                    this.$emit('closeCreateStaffDialog')
                } else {
                    return false;
                }
            });
            
        },  
        //关闭日志弹框
        closeCreateStaffDialog(){
            //关闭日志弹出框
            this.$emit('closeCreateStaffDialog')
        }
    }
}
</script>
<style lang="scss" scoped>


</style>



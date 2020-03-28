<template>
    <el-dialog 
        :title="tagDialogTitle" 
        :visible.sync="openTagDialog"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form :model="tagworkerConfigForm" :label-width="'120px'" ref="tagworkerConfigForm" :rules="tagConfigRules">
            
            <el-form-item label="标签名" prop="name">
                <el-input v-model="tagworkerConfigForm.name"></el-input>
            </el-form-item>

            <el-form-item label="是否启用" prop="status">
                <el-radio-group v-model="tagworkerConfigForm.status">
                    <el-radio :label="1">启用</el-radio>
                    <el-radio :label="2">停用</el-radio>
                </el-radio-group>
            </el-form-item>
        
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeTagDialog">取 消</el-button>
            <el-button type="primary" @click="commitLog('tagworkerConfigForm')">提交</el-button>
        </div>
    </el-dialog>
</template>
<script>

import {publicModuleService} from '@/service/publicModule'

export default {
    props: {
        //是否打弹出框
        openTagDialog: {
            type: Boolean,
            default: false,
        },
        //弹窗title
        tagDialogTitle: {
            type: String,
            default: "标签配置"
        },
        //配置信息
        workerConfigForm: {
            type: Object,
            default: function(){
                return {
                    id: 0,
                    table: '',
                    status: 1,
                    name: '',
                    version:0,
                }
            }
        }
    },
    watch: {
        workerConfigForm(val){
            this.tagworkerConfigForm = {
                get_for: 'config',
                ...this.workerConfigForm
            }
        }
    },
    mounted() {
        console.log(1)
        
    },
    data(){
        return {
            //日志信息
            tagworkerConfigForm : {
                id: 0,
                table: '',
                status: 1,
                name: '',
                get_for: 'config',
                version:0,
            },
            //标签配置表单验证
            tagConfigRules: {
                name: [
                    { required: true,message:'请输入标签名', trigger: 'blur' }
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
                    try{
                        this.is_loading = true
                        await publicModuleService.editWorkerFormConfig(this.tagworkerConfigForm).then(data =>{
                            if(data.code == "0"){
                                this.$message({
                                    type:'success',
                                    message: data.message
                                })
                                this.is_loading = false
                                //关闭日志弹出框
                                this.$emit('closeTagDialog')
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
                    }catch(error){
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
        closeTagDialog(){
            //关闭日志弹出框
            this.$emit('closeTagDialog')
        }
    }
}
</script>
<style lang="scss" scoped>


</style>


s
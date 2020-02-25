<template>
    <el-dialog 
        v-loading="is_loading"
        :title="tagDialogTitle" 
        :visible.sync="tagDialogVisible"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form :model="tagworkerConfigForm" :label-width="'120px'" ref="tagworkerConfigForm" :rules="tagConfigRules">
            
            <el-form-item label="标签名" >
                <el-input v-model="tagworkerConfigForm.name"></el-input>
            </el-form-item>

            <el-form-item label="是否启用" >
                <el-switch v-model="tagworkerConfigForm.type" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-form-item>
        
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeTagDialog">取 消</el-button>
            <el-button type="primary" @click="commitLog('tagworkerConfigForm')">提交</el-button>
        </div>
    </el-dialog>
</template>
<script>

import {operateService} from '@common/index.js'

export default {
    props: {
        //是否打弹出框
        tagDialogVisible: {
            type: Boolean,
            default: false,
        },
        //弹窗title
        tagDialogTitle: {
            type: String,
            default: "标签配置"
        },
        //配置信息
        tagConfigForm: {
            type: Object,
            default: function(){
                return {}
            }
        }
    },
    watch: {

    },
    data(){
        return {
            is_loading: false,
            //日志信息
            tagworkerConfigForm : {
                id: this.tagConfigForm.id?this.tagConfigForm.id:'',
                table: this.tagConfigForm.table,
                type: this.tagConfigForm.type == 'enable' ? true : false,
                name: this.tagConfigForm.name? this.tagConfigForm.name : '',
                get_for: 'config',
                version: this.tagConfigForm.version?this.tagConfigForm.version: '',
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
                        if(this.tagworkerConfigForm.type){
                            this.tagworkerConfigForm.type = 'enable'
                        } else {
                            this.tagworkerConfigForm.type = 'disable'  
                        }
                        await operateService.editWorkerFormConfig(this.tagworkerConfigForm).then(data =>{
                            if(data.code == "0"){
                                this.$message({
                                    type:'success',
                                    message: data.message
                                })
                                this.is_loading = false
                            }
                            //关闭弹出框
                            this.$emit('closeTagDialog')
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



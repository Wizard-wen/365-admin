<template>
    <el-dialog 
        :title="tagDialogTitle" 
        :visible.sync="openTagDialog"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form :model="tagConfigForm" :label-width="'120px'" ref="tagConfigForm" :rules="tagConfigRules">
            
            <el-form-item label="标签名" >
                <el-input v-model="tagConfigForm.name"></el-input>
            </el-form-item>
        
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeTagDialog">取 消</el-button>
            <el-button type="primary" @click="commitLog('tagConfigForm')">提交</el-button>
        </div>
    </el-dialog>
</template>
<script>
import {hrService} from '../../../../../../common'

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
        configForm: {
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
            //日志信息
            tagConfigForm : {
                id: this.configForm.id?this.configForm.id:'',
                table: this.configForm.table,
                name: this.configForm.name? this.configForm.name : '',
                version: this.configForm.version?this.configForm.version: '',
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
                    
                    store.commit('setLoading',true)
            
                    await hrService.editFormConfig(this.tagConfigForm).then(data =>{
                        if(data.code == "0"){
                            this.$message({
                                type:'success',
                                message: data.message
                            })
                            //关闭日志弹出框
                            this.$emit('closeTagDialog')
                        }
                    }).catch(e =>{
                        this.$message({
                            type:'error',
                            message: e.message
                        })
                    }).finally(() =>{
                        store.commit('setLoading',false)
                    })

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



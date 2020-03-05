<template>
    <el-dialog 
        :title="`添加${title}`" 
        :visible.sync="logDialogVisible"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form :model="logForm" :label-width="'120px'" ref="logForm" :rules="logRules">
            <el-form-item :label="title" prop="message">
                <el-input placeholder="请最多输入200字符" :maxlength="100" autosize v-model="logForm.message" type="textarea"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeLogDialog">取 消</el-button>
            <el-button type="primary" @click="commitLog('logForm')">提交</el-button>
        </div>
    </el-dialog>
</template>
<script>

export default {
    props: {
        //弹出框显示隐藏
        logDialogVisible: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: '日志'
        }
    },
    data(){
        return {
            //日志信息
            logForm : {
                id: 0,//用户id
                message: '',//日志信息
            },
            //日志表单验证
            logRules: {
                message: [
                    { required: true, message: '日志信息不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        /**
         * 当前用户信息
         */
        presentUser(){
            return this.$store.state.loginModule.user
        }
    },  
    methods: {
        /**
         * 提交日志信息
         */
        async commitLog(formName){  
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    this.logForm.id = this.presentUser.id
                    //关闭日志弹出框
                    this.$emit('submitLogDialog',this.logForm)
                } else {
                    return false;
                }
            });
            
        },  
        //关闭日志弹框
        closeLogDialog(){
            //关闭日志弹出框
            this.$emit('closeLogDialog')
        }
    }
}
</script>
<style lang="scss" scoped>


</style>



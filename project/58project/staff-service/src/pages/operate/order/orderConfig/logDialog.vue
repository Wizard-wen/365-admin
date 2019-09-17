<template>
    <el-dialog 
        :title="logDialogTitle" 
        :visible.sync="openLogDialog"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form :model="logForm" :label-width="'120px'" ref="logForm" :rules="logRules">
            <el-form-item label="服务人员姓名" v-if="logType == 'refuse'">
                <el-input v-model="logForm.staff_name" disabled></el-input>
            </el-form-item>
            <el-form-item label="日志信息" prop="message">
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
import {saleService} from '../../../../../common'

export default {
    props: {
        //是否打弹出框
        openLogDialog: {
            type: Boolean,
            default: false,
        },
        //服务人员id
        staffId: {
            type: Number,
            default: 0,
        },
        //候选人员信息id
        order_staff_id: {
            type: Number,
            default: 0,
        },
        //服务人员姓名
        staffName: {
            type: String,
            default: ""
        },
        //弹窗title
        logDialogTitle: {
            type: String,
            default: "添加日志"
        },
        /**
         * 日志类型
         * normal 签约前日志、售后日志
         * refuse 拒绝日志
         */
        logType: {
            type: String,
            default: 'normal'
        }
    },
    data(){
        const messageValidator = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请填写日志信息'));
            } else {
                callback();
            }
        };
        return {
            //日志信息
            logForm : {
                order_id: this.$route.query.order_id,// 订单id
                order_staff_id: this.order_staff_id,//候选人员信息id
                staff_name: this.staffName,//服务人员姓名
                staff_id: this.staffId,// 服务人员id
                message: '',//日志信息
            },
            //日志表单验证
            logRules: {
                message: [
                    { validator: messageValidator, trigger: 'blur' }
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
            
                    await saleService.logCommit(this.logForm, this.logType) 
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
                    
                    await saleService.getOrder(this.$route.query.order_id)

                    store.commit('setLoading',false)

                    //关闭日志弹出框
                    this.$emit('closeLogDialog')
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



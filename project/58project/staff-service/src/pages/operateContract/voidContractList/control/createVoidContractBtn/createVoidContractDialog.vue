<template>

    <el-dialog
    v-loading="loading"
        title="创建空合同"
        :visible.sync="createVoidContractDialogVisible"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form ref="voidContractForm" class="assign-form" :model="voidContractForm" :rules="voidContractRules" label-width="120px">
            <el-form-item prop="contract_number">
                <el-tooltip slot="label" class="item" effect="dark" content="合同编号不可重复！" placement="top-start">
                    <span>合同编号<i class="el-icon-info"></i></span>
                </el-tooltip>
                <el-input v-model="voidContractForm.contract_number" placeholder="请输入合同编号"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeVoidContractCreateDialog">取 消</el-button>
            <el-button type="primary" @click="createVoidContract('voidContractForm')">创 建</el-button>
        </div>
    </el-dialog>

</template>
<script>

import {operateContractService} from '@/service/operateContract'
export default {
    props: {
        //是否打弹出框
        createVoidContractDialogVisible: {
            type: Boolean,
            default: false,
        },
    },
    data(){
        let _this = this
        const contractValidate = async (rule, value, callback) =>{
            // if (value == '') {
            //     _this.contractCheck = false
            //     _this.contractCheckObject = {}
            //     callback(new Error('请输入手机号'));
            // } else {
                try{
                    await operateContractService.checkVoidContract(_this.voidContractForm).then(data =>{
                        if(data.code == '0'){
                            callback()

                            _this.contractCheck = false
                            _this.contractCheckObject = {}

                        } else {
                            callback(new Error(data.message))
                        }
                    }).catch(error =>{
                        callback(new Error('请联系管理员'))
                    }).finally(() =>{

                    })
                } catch(error){
                    _this.contractCheck = true
                    _this.contractCheckObject = error.data
                    callback(error.message)
                }
            // }
        }
        return {
            voidContractForm: {
                contract_number: '',//空合同编号
            },
            //空合同重复检测
            contractCheck: false,
            contractCheckObject: {

            },
            voidContractRules: {
                contract_number: [
                    { required: true, message: '请选填写合同编号', trigger: 'blur'},
                    {validator:contractValidate,trigger:'blur'},
                ]
            },
            loading: false
        }
    },
    methods: {
        /**
         * 关闭弹窗
         */
        closeVoidContractCreateDialog(){
            //关闭弹出框
            this.$emit('closeVoidContractCreateDialog')
        },
        /**
         * 创建空合同
         */
        async createVoidContract(formName){
            let _this = this
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    try{
                        this.loading = true
                        await operateContractService.createVoidContract(this.voidContractForm).then((data) =>{
                            if(data.code == "0"){
                                this.$message({
                                    type:'success',
                                    message: data.message
                                })
                                //关闭签约弹出框
                                this.$emit('closeVoidContractCreateDialog')
                            }
                        }).catch(error =>{
                            this.$message({
                                type:'error',
                                message: error.message
                            })
                        }).finally(() =>{
                            this.loading = false
                        })
                    } catch(error){
                        this.$message({
                            type:'error',
                            message: error.message
                        })
                    }
                } else {
                    return false;
                }
            });
        },

    },
    async mounted(){

    }
}
</script>
<style lang="scss" scoped>

        .base-form-box{
            .base-line{
                float: left;
                display: flex;
                line-height: 40px;
                height:40px;
                .base-word{
                    display: flex;
                    .base-key{
                        width: 120px;
                        padding-right: 10px;
                        text-align: right;
                    }
                    .base-value{
                        flex: 1;
                    }
                }
            }
        }
        .assign-form{
            width:100%;
        }

</style>



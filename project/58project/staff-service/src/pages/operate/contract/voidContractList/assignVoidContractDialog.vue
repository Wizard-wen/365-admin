<template>
    <el-dialog
    v-loading="loading"
        title="分配空合同"
        :visible.sync="assignVoidContractDialogVisible"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form ref="assignVoidContractForm" class="assign-form" :model="assignVoidContractForm" :rules="assignVoidContractRules" label-width="120px">
            <el-form-item label="选择销售人员" prop="manager_id">
                <el-select v-model="assignVoidContractForm.manager_id" placeholder="销售人员">
                    <el-option
                        v-for="(item, index) in selectionList"
                        :key="index"
                        :label="item.real_name"
                        :value="item.manager_id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeVoidContractDialog">取 消</el-button>
            <el-button type="primary" @click="assignVoidContract('assignVoidContractForm')">分 配</el-button>
        </div>
    </el-dialog>
</template>
<script>

import {operateService, saleService, $utils} from '../../../../../common'
export default {
    props: {
        //是否打弹出框
        assignVoidContractDialogVisible: {
            type: Boolean,
            default: false,
        },
        //待分配空合同id
        voidContractId: {
            type: Number | String,
            default: 0
        }
    },
    data(){
        const managerNameValidator = function(rule, value, callback){
            if (value == 0) {
                callback(new Error('请选择销售人员'));
            } else {
                callback()
            }
        }
        return {
            assignVoidContractForm: {
                id: this.voidContractId,
                manager_id: 0,
            },
            selectionList: [],
            assignVoidContractRules: {
                manager_id: [
                    { validator: managerNameValidator, trigger: 'change'}
                ]
            },
            loading: false
        }
    },
    methods: {
        /**
         * 关闭弹窗
         */
        closeVoidContractDialog(){
            //关闭签约弹出框
            this.$emit('closeVoidContractAssignDialog')
        },
        /**
         * 分配订单
         */
        async assignVoidContract(formName){
            let _this = this
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    try{
                        this.loading = true
                        await operateService.assignVoidContract(this.assignVoidContractForm).then((data) =>{
                            if(data.code == "0"){
                                this.$message({
                                    type:'success',
                                    message: data.message
                                })
                                //关闭签约弹出框
                                this.$emit('closeVoidContractAssignDialog')
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
        /**
         * 获取全部销售人员
         */

    },
    async mounted(){
        try{
            this.loading = true
            await operateService.getDepartmentManagerSelection(4).then((data) =>{
                if(data.code == "0"){
                    this.selectionList = [
                        {real_name: '请选择', manager_id: 0},
                        ...data.data,
                    ]
                    this.loading = true
                }
            }).catch(error =>{
                this.$message({
                    type:'error',
                    message: error.message
                })
                this.loading = true
            }).finally(() =>{
                this.loading = false
            })
        } catch(error){
            this.$message({
                type:'error',
                message: error.message
            })
            this.loading = true
        }
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



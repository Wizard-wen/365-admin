<template>

    <el-dialog
        v-loading="loading"
        title="分配订单"
        :visible.sync="assignOrderInStoreDialogVisible"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form ref="assignOrderForm" class="assign-form" :model="assignOrderForm" :rules="assignOrderRules" label-width="120px">
            <el-form-item label="经纪人" prop="agent_manager_id">
                <el-select v-model="assignOrderForm.agent_manager_id" placeholder="请选择经纪人">
                    <el-option
                        v-for="(item, index) in selectionList"
                        :key="index"
                        :label="item.real_name"
                        :value="item.manager_id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">取 消</el-button>
            <el-button type="primary" @click="assignOrderInStore('assignOrderForm')">分 配</el-button>
        </div>
    </el-dialog>

</template>
<script>

import {operateService, saleService, $utils} from '@common/index.js'
export default {
    props: {
        //是否打弹出框
        assignOrderInStoreDialogVisible: {
            type: Boolean,
            default: false,
        },
        orderObject: {
            type: Object,
            default: function(){return {}}
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
            assignOrderForm: {
                order_id: this.orderObject.id,
                agent_store_id: this.orderObject.agent_store_id,
                agent_manager_id: 0,
                version: this.orderObject.version,
            },
            selectionList: [],
            assignOrderRules: {
                agent_manager_id: [
                    { validator: managerNameValidator, trigger: 'change'}
                ]
            },
            loading: false
        }
    },
    computed: {
        /**
         * 订单来源 from vuex
         */
        order_source(){
            return this.$store.state.saleModule.order_source
        },
    },
    methods: {
        /**
         * 关闭弹窗
         */
        closeDialog(){
            //关闭签约弹出框
            this.$emit('closeAssignOrderInStoreDialog')
        },
        /**
         * 分配订单
         */
        async assignOrderInStore(formName){
            let _this = this
            await this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    await this.assignOrder()
                } else {
                    return false;
                }
            });
        },
        async assignOrder(){
            try{
                this.loading = true
                await saleService.assignOrder(this.assignOrderForm).then((data) =>{
                    if(data.code == "0"){
                        this.$message({
                            type:'success',
                            message: data.message
                        })
                        this.$emit('closeAssignOrderInStoreDialog')
                        this.loading = false
                    }
                }).catch(error =>{
                    this.$message({
                        type:'error',
                        message: error.message
                    })
                    this.loading = false
                }).finally(() =>{
                    this.loading = false
                })
            } catch(error){
                this.$message({
                    type:'error',
                    message: error.message
                })
                this.loading = false
            }
        }
    },
    async mounted(){
        try{
            this.loading = true

            await Promise.all([
                operateService.getStoreManagerSelection(this.orderObject.agent_store_id),
            ]).then((data) =>{
                if(data[0].code == "0"){
                    this.selectionList = data[0].data
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



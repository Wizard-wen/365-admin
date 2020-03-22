<template>

    <el-dialog
        v-loading="is_loading"
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
            <el-button @click="closeAssignOrderInStoreDialog">取 消</el-button>
            <el-button type="primary" @click="assignOrderInStore('assignOrderForm')">分 配</el-button>
        </div>
    </el-dialog>

</template>
<script>

import {publicModuleService} from '@/service/publicModule'


export default {
    props: {
        //是否打弹出框
        assignOrderInStoreDialogVisible: {
            type: Boolean,
            default: false,
        },
        currentOrder: {
            type: Object,
            default: function(){return {}}
        }
    },
    data(){
        return {
            is_loading: false,
            // 分派订单表单
            assignOrderForm: {
                order_id: this.currentOrder.id,
                agent_store_id: this.currentOrder.agent_store_id,
                agent_manager_id: 0,
                version: this.currentOrder.version,
            },
            assignOrderRules: {
                agent_manager_id: [
                    { required: true, message: '请选择员工', trigger: 'change' }
                ],
            },
            // 门店员工列表
            selectionList: [],
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
        closeAssignOrderInStoreDialog(){
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
        /**
         * 分派订单
         */
        async assignOrder(){
            try{
                this.is_loading = true
                let assignOrderForm = {
                    ...this.assignOrderForm
                }
                await publicModuleService.assignOrderInStore(assignOrderForm).then((data) =>{
                    if(data.code == "0"){
                        this.$message({
                            type:'success',
                            message: data.message
                        })
                        this.$emit('closeAssignOrderInStoreDialog')
                        this.is_loading = false
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
            } catch(error){
                this.$message({
                    type:'error',
                    message: error.message
                })
                this.is_loading = false
            }
        }
    },
    async mounted(){
        try{
            this.is_loading = true

            await publicModuleService.getStoreManagerSelection(this.currentOrder.agent_store_id).then((data) =>{
                if(data.code == "0"){
                    this.selectionList = data.data
                    this.is_loading = false
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

        } catch(error){
            this.$message({
                type:'error',
                message: error.message
            })
            this.is_loading = false
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



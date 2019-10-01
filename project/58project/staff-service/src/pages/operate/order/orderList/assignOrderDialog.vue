<template>
    <!-- 订单申请 -->
    <el-dialog
        v-loading="is_loading"
        title="分派订单"
        :visible.sync="assignOrderDialogVisible"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form :model="assignOrderForm" label-width="120px" ref="assignOrderForm" :rules="assignOrderRules">
            <el-form-item label="经纪门店" prop="agent_store_id">
                <el-select @change="changeStoreManager" v-model="assignOrderForm.agent_store_id" placeholder="请选择经纪门店">
                    <el-option
                        v-for="item in store_list"
                        :key="item.store_id"
                        :label="item.store_name"
                        :value="item.store_id"
                        ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="经纪人" prop="agent_manager_id">
                <el-select v-model="assignOrderForm.agent_manager_id" placeholder="请选择经纪人">
                    <el-option
                        v-for="item in store_manager_list"
                        :key="item.manager_id"
                        :label="item.manager_name"
                        :value="item.manager_id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelAssignOrder">取 消</el-button>
            <el-button type="primary" @click="onSubmit('assignOrderForm')">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>

/**
 * type 0 新建  1 编辑
 */
import {operateService} from '../../../../../common'

export default {
    props:{
        /**
         * 控制组件的显示隐藏
         */
        assignOrderDialogVisible:{
            default:false,
            type: Boolean,
        },
        /**
         * 订单id
         */
        order_id: {
            type: Number,
            default: 0
        },
    },
    data() {
        return {
            is_loading :false,
            //分派订单字段
            assignOrderForm: {
                order_id: this.order_id,
                agent_store_id: 1,
                agent_manager_id: 0,
            },
            assignOrderRules: {
                agent_store_id: [
                    {required: true, message: '请选择经纪门店', trigger: 'change'}
                ],
                agent_manager_id: [
                    {required: true, message: '请选择经纪人', trigger: 'change' }
                ]
            },
            store_list: [],//全部门店信息列表
            store_manager_list: [],//门店全部员工列表
        }
    },
    methods: {
        cancelAssignOrder(){
            this.assignOrderForm.apply_manager_id = ''
            this.assignOrderForm.agent_store_id = ''
            this.$emit('closeAssignOrderDialog')
        },
        /**
         * 更换门店后重新请求员工数据
         * @param id 新更换的id
         */
        async changeStoreManager(id){
            try{
                this.is_loading = true
                await operateService.getStoreManagerSelection(id).then(data =>{
                    this.store_manager_list = data.data
                    this.assignOrderForm.agent_manager_id = 0
                    this.is_loading = false
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
        },
        async onSubmit(formName){
            await this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    //校验并提交
                    try{
                        this.is_loading = true
                        await operateService.editAppLySource(this.assignOrderForm).then(data =>{
                            if(data.code == '0'){
                                this.$message({
                                    type:"success",
                                    message: "更改成功"
                                })
                                this.is_loading = false
                                this.$emit('closeAssignOrderDialog')
                            }
                        }).catch(error =>{
                            this.$message({
                                type:'error',
                                message: error.message
                            })
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
            })

        }
    },
    async mounted(){
        /**
         * 页面初始化，请求门店，员工数据
         */
        try{
            this.is_loading = true
            await Promise.all([
                operateService.getStoreSelection(),
                operateService.getStoreManagerSelection(this.assignOrderForm.agent_store_id)
            ]).then((data) =>{
                this.store_list = data[0].data
                this.store_manager_list = data[1].data
                this.is_loading = false
            }).catch(error => {
                this.$message({
                    type:'error',
                    message: error.message
                })
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



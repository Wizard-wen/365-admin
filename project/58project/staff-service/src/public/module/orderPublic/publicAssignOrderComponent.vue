<template>
    <!-- 订单申请 -->
    <el-dialog
        v-loading="is_loading"
        :title="title"
        :visible.sync="publicAssignOrderDialogVisible"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form :model="assignOrderForm" label-width="120px" ref="assignOrderForm">
            <el-form-item label="经纪门店">
                <el-select v-model="assignOrderForm.agent_store_id" @change="changeStoreManager" placeholder="请选择经纪门店">
                    <el-option
                        v-for="item in storeList"
                        :key="item.store_id"
                        :label="item.store_name"
                        :value="item.store_id"
                        ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="经纪人">
                <el-select v-model="assignOrderForm.agent_manager_id" placeholder="请选择经纪人">
                    <el-option
                        v-for="item in apply_manager_list"
                        :key="item.manager_id"
                        :label="item.real_name"
                        :value="item.manager_id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelPassOrderApply">取 消</el-button>
            <el-button type="primary" @click="onSubmit('assignOrderForm')">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import {publicModuleService} from '@/service/publicModule'

export default {
    props:{
        /**
         * 订单字段
         */
        orderItemObject: {
            type: Object,
            default: function(){return {}}
        },
        /**
         * 控制组件的显示隐藏
         */
        publicAssignOrderDialogVisible:{
            default:false,
            type: Boolean,
        },
        /**
         * 订单申请类型
         * 1 门店订单申请 2 客户订单申请 3 门店订单（店长） 4 门店公海订单 5 运营订单
         */
        publicOrderType: {    
            type: Number | String,
            default: 1,
        },
    },
    computed: {
        title(){
            if(this.publicOrderType == (1 || 2)){
                return '通过订单申请'
            } else {
                return '分派订单'
            }
        }
    },
    data() {
        return {
            is_loading: false,
            //改变的字段内容
            assignOrderForm: {
                agent_manager_id: 0,//经纪人id
                agent_store_id: 1,//经纪门店id
            },
            //全部门店信息列表
            storeList: [],
            //门店全部员工列表
            apply_manager_list: [],
        }
    },
    methods: {
        //取消分配订单
        cancelPassOrderApply(){
            this.$emit('closePublicAssignOrderDialog')
        },
        /**
         * 门店变动触发店员数据重新请求
         */
        async changeStoreManager(id){
            try{
                this.is_loading = true
                await publicModuleService.getStoreManagerSelection(id).then(data =>{
                    this.apply_manager_list = data.data
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
            await this.$emit('updatePublicAssignOrder', [this.assignOrderForm, this.orderItemObject])
        },
    },
    async mounted(){
        /**
         * 页面初始化，请求门店，员工数据
         */
        try{
            this.is_loading = true
            await Promise.all([
                publicModuleService.getStoreSelection(),
                publicModuleService.getStoreManagerSelection(this.assignOrderForm.agent_store_id)
            ]).then((data) =>{
                this.storeList = data[0].data
                this.apply_manager_list = data[1].data
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



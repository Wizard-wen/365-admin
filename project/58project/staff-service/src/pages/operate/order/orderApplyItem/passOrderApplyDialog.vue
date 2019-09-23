<template>
    <!-- 订单申请 -->
    <el-dialog
        v-loading="is_loading"
        title="通过订单申请"
        :visible.sync="orderApplyPassVisible"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form :model="orderApplyForm" label-width="120px" ref="orderApplyForm">
            <el-form-item label="经纪门店">
                <el-select v-model="orderApplyForm.agent_store_id" @change="changeStoreManager" placeholder="请选择门店">
                    <el-option
                        v-for="item in storeList"
                        :key="item.store_id"
                        :label="item.store_name"
                        :value="item.store_id"
                        ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="经纪人">
                <el-select v-model="orderApplyForm.agent_manager_id" placeholder="请选择">
                    <el-option
                        v-for="item in apply_manager_list"
                        :key="item.manager_id"
                        :label="item.manager_name"
                        :value="item.manager_id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelApplyChange">取 消</el-button>
            <el-button type="primary" @click="onSubmit">确定</el-button>
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
        orderApplyPassVisible:{
            default:false,
            type: Boolean,
        },
        /**
         * 订单申请id
         */
        orderApplyId: {
            type: Number,
            default: 0
        },
        systemVersion: {
            type: Number | String,
            default: ''
        }
    },
    data() {
        return {
            is_loading: false,
            //改变的字段内容
            orderApplyForm: {
                id: this.orderApplyId,
                type: 3,//状态设定为通过
                agent_manager_id: 0,//经纪人id
                agent_store_id: 1,//经纪门店id
                version: this.systemVersion,
            },
            storeList: [],//全部门店信息列表
            apply_manager_list: [],//门店全部员工列表
        }
    },
    methods: {
        //取消分配订单
        cancelApplyChange(){
            this.orderApplyForm.agent_manager_id = ''
            this.orderApplyForm.agent_store_id = ''
            this.$emit('closeOrderApplyPassDialog')
        },
        /**
         * 门店变动触发店员数据重新请求
         */
        async changeStoreManager(id){
            await operateService.getStoreManagerSelection(id).then(data =>{
                this.apply_manager_list = data.data
                this.orderApplyForm.agent_manager_id = 0
            }).catch(error =>{
                this.$message({
                    type:'error',
                    message: error.message
                })
            })
        },
        async onSubmit(formName){
            //校验并提交
            try{
                this.is_loading = true
                await operateService.dealApplication(this.orderApplyForm).then(data =>{
                    if(data.code == '0'){
                        this.$message({
                            type:"success",
                            message: data.message
                        })
                        this.is_loading = false
                        this.$emit('closeOrderApplyPassDialog')
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
        /**
         * 页面初始化，请求门店，员工数据
         */
        try{
            this.is_loading = true
            await Promise.all([
                operateService.getStoreSelection(),
                operateService.getStoreManagerSelection(this.orderApplyForm.agent_store_id)
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



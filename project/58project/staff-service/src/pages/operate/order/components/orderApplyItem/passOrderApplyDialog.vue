<template>
    <!-- 订单申请 -->
    <el-dialog
        title="通过订单申请"
        :visible.sync="orderApplyVisible"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form :model="orderApplyForm" label-width="120px" ref="orderApplyForm">
            <el-form-item label="所属门店">
                <el-select v-model="orderApplyForm.store_id" placeholder="请选择门店">
                    <el-option
                        v-for="item in storeList"
                        :key="item.store_id"
                        :label="item.store_name"
                        :value="item.store_id"
                        @change="changeStoreManager"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所属人">
                <el-select v-model="orderApplyForm.hold_manager_id" placeholder="请选择">
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
import {operateService} from '../../../../../../common'

export default {
    props:{
        /**
         * 控制组件的显示隐藏
         */
        orderApplyVisible:{
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
            //改变的字段内容
            orderApplyForm: {
                id: this.$route.query.id,
                type: 'pass',//状态设定为通过
                hold_manager_id: 0,//所属人id
                store_id: 1,//所属门店id
                version: this.systemVersion,
            },
            storeList: [],//全部门店信息列表
            apply_manager_list: [],//门店全部员工列表
        }
    },
    methods: {
        //取消分配订单
        cancelApplyChange(){
            this.orderApplyForm.hold_manager_id = ''
            this.orderApplyForm.store_id = ''
            this.$emit('closeOrderApplyDialog')
        },
        changeStoreManager(id){
            console.log(id)
        },
        async onSubmit(formName){
            //校验并提交
            await operateService.dealApplication(this.orderApplyForm).then(data =>{
                        if(data.code == '0'){
                            this.$message({
                                type:"success",
                                message: "更改成功"
                            })
                            this.$emit('closeOrderApplyDialog')
                        }
                    }).catch(error =>{
                        this.$message({
                            type:'error',
                            message: error.message
                        })
                    })

        }
    },
    async mounted(){
        await Promise.all([
            operateService.getStoreSelection(),
            operateService.getStoreManagerSelection(this.orderApplyForm.store_id)
        ]).then((data) =>{
            this.storeList = data[0].data
            this.apply_manager_list = data[1].data
        })
    }
}
</script>



<template>
    <!-- 结算工资 -->
    <el-dialog
        title="终止订单"
        :visible.sync="determinateOrderDialogVisible"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form :model="determinateOrderForm" label-width="120px" :rules="determinateOrderRules" ref="determinateOrderForm">
            <el-form-item label="终止事由" prop="message">
                <span slot="label">
                    终止事由
                    <el-tooltip class="item" effect="dark" content="账户余额不包含客户服务费！" placement="top-start">
                        <i class="el-icon-info"></i>
                    </el-tooltip>
                </span>
                <el-input v-model="determinateOrderForm.message" type="textarea" placeholder="请输入终止事由"></el-input>
            </el-form-item>
            <el-form-item label="客户余额" prop="hasUserCost">
                <select-tag-component 
                    v-if="boolList"
                    :propTagList="boolList" 
                    v-model="determinateOrderForm.hasUserCost" 
                    :isSingle="true"></select-tag-component>
            </el-form-item>
            <el-form-item label="返还客户金额" prop="returnUserCost">
                <el-input v-model="determinateOrderForm.returnUserCost" placeholder="请输入返还客户金额"></el-input>
            </el-form-item>
            <el-form-item label="劳动者押金" prop="hasWorkerCost">
                <select-tag-component 
                    v-if="boolList"
                    :propTagList="boolList" 
                    v-model="determinateOrderForm.hasWorkerCost" 
                    :isSingle="true"></select-tag-component>
            </el-form-item>

            <el-form-item label="劳动者工资" prop="hasWorkerWage">
                <select-tag-component 
                    v-if="boolList"
                    :propTagList="boolList" 
                    v-model="determinateOrderForm.hasWorkerWage" 
                    :isSingle="true"></select-tag-component>
            </el-form-item>

            <el-form-item label="备注" prop="remarks">
                <el-input v-model="determinateOrderForm.remarks" type="textarea" placeholder="请输入备注信息"></el-input>
            </el-form-item>
            
        </el-form>
        
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelDeterminateOrder">取 消</el-button>
            <el-button type="primary" @click="onSubmit('determinateOrderForm')">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>

/**
 * type 0 新建  1 编辑
 */
import {
    saleService,
    operateService
} from '@common/index.js'

export default {
    props:{
        /**
         * 控制组件的显示隐藏
         */
        determinateOrderDialogVisible:{
            default:false,
            type: Boolean,
        },
        /**
         * 订单id
         */
        order_id: {
            default: 0,
            type: String | Number,
        },
    },
    data() {
        return {
            boolList: [{id: 1, name:'已平账'}, {id: 2, name: '未平账'}],
            determinateOrderForm: {
                order_id: this.$route.query.order_id,//订单id
                //账户余额是否已经平账
                hasUserCost: 1,
                //返还客户的金额
                returnUserCost: 0,
                //劳动者押金是否已经平账
                hasWorkerCost: 1,
                //劳动者工资是否已平账
                hasWorkerWage: 1,
                message: '',//终止事由
            },
            determinateOrderRules: {
                //工作天数
                message: [
                    {required: true, message: '请输入订单终止事由', trigger: 'blur'},
                ],
            }
        }
    },
    watch: {

    },
    methods: {
        /**
         * 取消终止订单
         */
        cancelDeterminateOrder(){
            this.$emit('closeDeterminateOrderDialog')
        },
        /**
         * 提交结算信息
         */
        async onSubmit(formName){
            //校验并提交
            await this.$refs[formName].validate((valid) => {
                if (valid) {
                    debugger
                    // saleService.settleWage(this.determinateOrderForm).then(data =>{
                    //     if(data.code == '0'){
                    //         this.$message({
                    //             type:"success",
                    //             message: data.message
                    //         })
                    //         this.$emit('closeDeterminateOrderDialog')
                    //     }
                    // }).catch(error =>{
                    //     this.$message({
                    //         type:'error',
                    //         message: error.message
                    //     })
                    // })
                } else {
                    return false;
                }
            });
        }
    },
    async mounted(){

    }
}
</script>



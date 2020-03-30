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
            <el-form-item label="当前客户余额"> 
                <span slot="label">
                    当前客户余额
                    <el-tooltip class="item" effect="dark" content="当前客户在公司的余额。" placement="top-start">
                        <i class="el-icon-info"></i>
                    </el-tooltip>
                </span>
                {{orderItem.sign_user_account?orderItem.sign_user_account:'未签约' }}
            </el-form-item>
            <el-form-item label="返还客户金额" prop="return_user_cost">
                <el-input v-model="determinateOrderForm.return_user_cost" :disabled="!orderItem.sign_user_account" placeholder="请输入返还客户金额"></el-input>
            </el-form-item>
            <el-form-item prop="has_user_cost">
                <span slot="label">
                    客户余额
                    <el-tooltip class="item" effect="dark" content="请确保信息准确！" placement="top-start">
                        <i class="el-icon-info"></i>
                    </el-tooltip>
                </span>
                <el-radio-group v-model="determinateOrderForm.has_user_cost" :disabled="!orderItem.sign_user_account">
                    <el-radio :label="1">已平账</el-radio>
                    <el-radio :label="2">未平账</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item prop="has_worker_cost">
                <span slot="label">
                    劳动者押金
                    <el-tooltip class="item" effect="dark" content="请确保信息准确！" placement="top-start">
                        <i class="el-icon-info"></i>
                    </el-tooltip>
                </span>
                <el-radio-group v-model="determinateOrderForm.has_worker_cost" :disabled="!orderItem.sign_user_account">
                    <el-radio :label="1">已返还</el-radio>
                    <el-radio :label="2">未返还</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item prop="has_worker_wage">
                <span slot="label">
                    劳动者工资
                    <el-tooltip class="item" effect="dark" content="请确保信息准确！" placement="top-start">
                        <i class="el-icon-info"></i>
                    </el-tooltip>
                </span>
                <el-radio-group v-model="determinateOrderForm.has_worker_wage" :disabled="!orderItem.sign_user_account">
                    <el-radio :label="1">已发放</el-radio>
                    <el-radio :label="2">未发放</el-radio>
                </el-radio-group>
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
    publicModuleService,
} from '@/service/publicModule'

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
        currentOrder: {
            type: Object,
            default(){return {}}
        }
    },
    computed: {
        orderItem(){
            return {
                ...this.currentOrder,
            }
        }
    },
    data() {
        let _this = this
        const validateReturnUserCost = (rule, value, callback) => {
            console.log(1)
            if(value > _this.currentOrder.sign_user_account){
                callback(new Error('返还金额不能大于当前客户余额'))
            } else {
                callback()
            }
        }
        return {
            is_loading: false,
            boolList: [{id: 1, name:'已平账'}, {id: 2, name: '未平账'}],
            determinateOrderForm: {
                order_id: this.$route.query.order_id,//订单id
                //账户余额是否已经平账
                has_user_cost: 1,
                //返还客户的金额
                return_user_cost: 0,
                //劳动者押金是否已经平账
                has_worker_cost: 1,
                //劳动者工资是否已平账
                has_worker_wage: 1,
                message: '',//终止事由
            },
            determinateOrderRules: {
                //工作天数
                message: [
                    {required: true, message: '请输入订单终止事由', trigger: 'blur'},
                ],
                return_user_cost:[
                    {validator: validateReturnUserCost,trigger:'blur'}
                ]
            }
        }
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
            await this.$refs[formName].validate(async valid => {
                if (valid) {
                    await this.cancelOrder()
                } else {
                    return false;
                }
            });
        },
        async cancelOrder(){
            try{
                this.is_loading = true
                await publicModuleService.terminateOrder(this.determinateOrderForm).then(data =>{
                    if(data.code == '0'){
                        this.$message({
                            type:"success",
                            message: data.message
                        })
                        this.is_loading = false
                        this.$emit('closeDeterminateOrderDialog')
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
}
</script>



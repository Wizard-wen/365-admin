<template>
    <!-- 结算工资 -->
    <el-dialog
        title="终止合同"
        :visible.sync="determinateContractDialogVisible"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form :model="determinateContractForm" label-width="120px" :rules="determinateContractRules" ref="determinateContractForm">
            <el-form-item label="终止事由" prop="terminate_reason">
                <el-input v-model="determinateContractForm.terminate_reason" type="textarea" placeholder="请输入终止事由"></el-input>
            </el-form-item>
            <el-form-item label="服务期限" prop="service_duration">
                <el-date-picker
                    v-model="determinateContractForm.service_duration"
                    value-format="timestamp"
                    @change="changeServiceDuration"
                    type="daterange"
                    :picker-options="pickerOptions"
                    range-separator="至"
                    start-placeholder="服务开始日期"
                    end-placeholder="服务结束日期"></el-date-picker>
            </el-form-item>

            <el-form-item label="工作天数" prop="service_days">
                <el-input v-model="determinateContractForm.service_days" placeholder="请输入工作天数"></el-input>
            </el-form-item>
            <el-form-item label="日工资" prop="daily_wage">
                <el-input v-model="determinateContractForm.daily_wage" placeholder="请输入日工资"></el-input>
            </el-form-item>
            <el-form-item label="首月工资合计" prop="total_wage">
                <el-input v-model="determinateContractForm.total_wage" placeholder="请输入首月工资合计"></el-input>
            </el-form-item>
            <el-form-item label="服务费扣除" prop="service_cost">
                <el-input v-model="determinateContractForm.service_cost" placeholder="请输入服务费合计"></el-input>
            </el-form-item>
            <el-form-item label="其他扣除" prop="other_cost">
                <el-input v-model="determinateContractForm.other_cost" placeholder="请输入其他扣除"></el-input>
            </el-form-item>
            <el-form-item label="扣除事由" prop="cost_reason">
                <el-input v-model="determinateContractForm.cost_reason" type="textarea" placeholder="请输入扣除事由"></el-input>
            </el-form-item>
            <el-form-item label="实发工资" prop="real_wage">
                <el-input v-model="determinateContractForm.real_wage" placeholder="请输入实发工资"></el-input>
            </el-form-item>
            <el-form-item label="返还客户金额" prop="return_wage">
                <el-input v-model="determinateContractForm.return_wage" placeholder="请输入返还客户金额"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelDeterminateContract">取 消</el-button>
            <el-button type="primary" @click="onSubmit('determinateContractForm')">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>

/**
 * type 0 新建  1 编辑
 */
import {saleService,operateService} from '../../../../common'

export default {
    props:{
        /**
         * 控制组件的显示隐藏
         */
        determinateContractDialogVisible:{
            default:false,
            type: Boolean,
        },
        /**
         * 合同信息
         */
        contractObj: {
            default: function(){
                return {}
            },
            type: Object,
        },
    },
    data() {
        const validator = {
            user_name(rule, value, callback){
                if (!value) {
                    callback(new Error('客户名不能为空'));
                } else if (!/^[a-zA-Z\u4e00-\u9fa5]+$/.test(value)){
                    callback(new Error('只能是中、英文及其组合'));
                } else {
                    callback()
                }
            },
        }
        return {
            determinateContractForm: {
                contract_id: this.contractObj.id,//合同id
                is_wage: this.contractObj.is_wage,//是否结算工资
                terminate_reason: '',//终止事由
                service_duration: [],//服务期限组件字段
                service_start:'',//服务起始日
                service_end:'',//服务终止日
                service_days:'',//工作天数
                daily_wage:'',//日工资
                total_wage:'',//首月工资合计
                service_cost:'',//服务费扣除
                other_cost:'',//其他扣除
                cost_reason:'',//扣除事由
                real_wage:'',//服务人员实发工资
                return_wage:'',//返还客户金额
            },
            determinateContractRules: {
                //终止事由
                terminate_reason:[
                    {required: true, message: '请输入终止事由', tigger: 'blur'}
                ],
                //服务期限
                service_duration: [
                    {required: true, message: '请选择服务期限', tigger: 'change'}
                ],
                //工作天数
                service_days: [
                    {required: true, message: '请输入工作天数', tigger: 'blur'},
                    { type: 'number',message:'工作天数只能是数字',trigger: 'blur'},
                ],
                //日工资
                daily_wage: [
                    {required: true, message: '请输入日工资金额', tigger: 'blur'},
                    { type: 'number',message:'日工资金额只能是数字',trigger: 'blur'},
                ],
                //工资合计
                total_wage: [
                    {required: true, message: '请输入工资合计金额', tigger: 'blur'},
                    { type: 'number',message:'工资合计金额只能是数字',trigger: 'blur'},
                ],
                //服务费扣除
                service_cost: [
                    {required: true, message: '请输入服务费扣除金额', tigger: 'blur'},
                    { type: 'number',message:'服务费扣除金额只能是数字',trigger: 'blur'},
                ],
                //其他扣除
                other_cost: [
                    {required: true, message: '请输入其他扣除金额', tigger: 'blur'},
                    { type: 'number',message:'其他扣除金额只能是数字',trigger: 'blur'},
                ],
                //扣除事由
                cost_reason: [
                    {required: true, message: '请输入其他扣除事由', tigger: 'blur'}
                ],
                //服务人员实发工资
                real_wage: [
                    {required: true, message: '请输入服务人员实发工资金额', tigger: 'blur'},
                    { type: 'number',message:'实发工资金额只能是数字',trigger: 'blur'},
                ],
                //返还客户金额
                return_wage: [
                    {required: true, message: '请输入返还客户金额', tigger: 'blur'},
                    { type: 'number',message:'返还客户金额只能是数字',trigger: 'blur'},
                ],
            },
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                },
            },
        }
    },
    watch: {

    },
    methods: {
        /**
         * 取消终止合同
         */
        cancelDeterminateContract(){
            this.$emit('closeDeterminateContractDialog')
        },
        /**
         * 服务期限时间转换
         */
        changeServiceDuration(value){
            this.determinateContractForm.service_start = value[0]
            this.determinateContractForm.service_end = value[1]
        },
        /**
         * 提交终止信息
         */
        async onSubmit(formName){
            //校验并提交
            await this.$refs[formName].validate((valid) => {
                if (valid) {
                    saleService.stopContract(this.determinateContractForm).then(data =>{
                        if(data.code == '0'){
                            this.$message({
                                type:"success",
                                message: data.message
                            })
                            this.$emit('closeDeterminateContractDialog')
                        }
                    }).catch(error =>{
                        this.$message({
                            type:'error',
                            message: error.message
                        })
                    })
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



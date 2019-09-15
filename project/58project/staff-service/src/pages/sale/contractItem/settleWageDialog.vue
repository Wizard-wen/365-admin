<template>
    <!-- 结算工资 -->
    <el-dialog
        title="结算工资"
        :visible.sync="settleWageDialogVisible"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form :model="settleWageForm" label-width="120px" :rules="settleWageRules" ref="settleWageForm">
            <el-form-item label="服务期限" prop="service_duration">
                <el-date-picker
                    v-model="settleWageForm.service_duration"
                    value-format="timestamp"
                    @change="changeServiceDuration"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="服务开始日期"
                    end-placeholder="服务结束日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="工作天数" prop="service_days">
                <el-input v-model="settleWageForm.service_days"></el-input>
            </el-form-item>
            <el-form-item label="日工资" prop="daily_wage">
                <el-input v-model="settleWageForm.daily_wage"></el-input>
            </el-form-item>
            <el-form-item label="首月工资合计" prop="total_wage">
                <el-input v-model="settleWageForm.total_wage"></el-input>
            </el-form-item>
            <el-form-item label="服务费扣除" prop="service_cost">
                <el-input v-model="settleWageForm.service_cost"></el-input>
            </el-form-item>
            <el-form-item label="其他扣除" prop="other_cost">
                <el-input v-model="settleWageForm.other_cost"></el-input>
            </el-form-item>
            <el-form-item label="扣除事由" prop="cost_reason">
                <el-input v-model="settleWageForm.cost_reason"></el-input>
            </el-form-item>
            <el-form-item label="实发工资" prop="real_wage">
                <el-input v-model="settleWageForm.real_wage"></el-input>
            </el-form-item>
            <el-form-item label="返还客户金额" prop="return_wage">
                <el-input v-model="settleWageForm.return_wage"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelSettleWage">取 消</el-button>
            <el-button type="primary" @click="onSubmit('settleWageForm')">确定</el-button>
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
        settleWageDialogVisible:{
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
            settleWageForm: {
                contract_id: this.contractObj.id,//合同id
                service_duration: [],
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
            settleWageRules: {
                
            }
        }
    },
    watch: {

    },
    methods: {
        /**
         * 取消结算工资
         */
        cancelSettleWage(){
            this.$emit('closeSettleWageDialog')
        },
        /**
         * 服务期限时间转换
         */
        changeServiceDuration(value){
            this.settleWageForm.service_start = value[0]
            this.settleWageForm.service_end = value[1]
        },
        /**
         * 提交结算信息
         */
        async onSubmit(formName){
            //校验并提交
            await this.$refs[formName].validate((valid) => {
                if (valid) {
                    saleService.settleWage(this.settleWageForm).then(data =>{
                        if(data.code == '0'){
                            this.$message({
                                type:"success",
                                message: "申请成功"
                            })
                            this.$emit('closeSettleWageDialog')
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



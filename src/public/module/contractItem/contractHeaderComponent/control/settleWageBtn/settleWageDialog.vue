<template>
    <!-- 结算工资 -->
    <el-dialog
        title="结算工资"
        :visible.sync="settleWageDialogVisible"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <div class="settle-box">
            <el-form :model="settleWageForm" label-width="120px" :rules="settleWageRules" ref="settleWageForm">
                <el-form-item label="客户余额" prop="user_account">
                    <el-input v-model.number="settleWageForm.user_account" :disabled="true" placeholder="请输入客户余额"></el-input>
                </el-form-item>
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
                    <el-input v-model.number="settleWageForm.service_days" placeholder="请输入工作天数"></el-input>
                </el-form-item>
                <el-form-item label="日工资" prop="daily_wage">
                    <el-input v-model.number="settleWageForm.daily_wage" placeholder="请输入日工资"></el-input>
                </el-form-item>
                <el-form-item label="首月工资合计" prop="total_wage">
                    <el-input v-model.number="settleWageForm.total_wage" :disabled="true" placeholder="请输入首月工资合计"></el-input>
                </el-form-item>
                <el-form-item label="服务费扣除" prop="service_cost">
                    <el-input v-model.number="settleWageForm.service_cost" placeholder="请输入服务费合计"></el-input>
                </el-form-item>
                <el-form-item label="其他扣除" prop="other_cost">
                    <el-input v-model.number="settleWageForm.other_cost" placeholder="请输入其他扣除"></el-input>
                </el-form-item>
                <el-form-item label="扣除事由" prop="cost_reason">
                    <el-input v-model="settleWageForm.cost_reason" type="textarea" placeholder="请输入扣除事由"></el-input>
                </el-form-item>
                <el-form-item label="实发工资" prop="real_wage">
                    <el-input v-model.number="settleWageForm.real_wage" :disabled="true" placeholder="请输入实发工资"></el-input>
                </el-form-item>
                <el-form-item label="当月客户支出" prop="user_cost">
                    <el-input v-model.number="settleWageForm.user_cost" :disabled="true" placeholder="请输入客户支出合计"></el-input>
                </el-form-item>
                <el-form-item label="返还客户金额" prop="return_wage">
                    <el-input v-model.number="settleWageForm.return_wage" placeholder="请输入返还客户金额"></el-input>
                </el-form-item>
                <!-- <el-form-item label="扣除后客户余额" prop="finally_user_account">
                    <el-input v-model.number="settleWageForm.finally_user_account" placeholder="请输入扣除后客户余额"></el-input>
                </el-form-item> -->
            </el-form>
            <div class="bell-list">
                <div class="">
                    
                    <div 
                        v-if="settleWageForm.service_days && settleWageForm.daily_wage">
                        工资合计：{{settleWageForm.service_days}} × {{settleWageForm.daily_wage}} = {{settleWageForm.total_wage}}元
                    </div>
                    <div v-if="settleWageForm.service_days">&nbsp;&nbsp;&nbsp;工作天数：{{settleWageForm.service_days}} 天</div>
                    <div v-if="settleWageForm.daily_wage">&nbsp;&nbsp;&nbsp;日工资：{{settleWageForm.daily_wage}} 元</div>
                    <div v-if="settleWageForm.service_cost">服务费扣除：{{settleWageForm.service_cost}} </div>
                    <div v-if="settleWageForm.other_cost">其他扣除扣除：{{settleWageForm.other_cost}} </div>

                    <div 
                        v-if="settleWageForm.service_days && settleWageForm.daily_wage">
                        客户当月支出：
                        {{settleWageForm.service_days}} × {{settleWageForm.daily_wage}} 
                        <span v-if="settleWageForm.other_cost"> - {{settleWageForm.other_cost}}</span>
                        = {{settleWageForm.user_cost}}元
                    </div>
                    <div 
                        v-if="settleWageForm.service_days && settleWageForm.daily_wage && settleWageForm.service_cost">
                        实发工资
                        {{settleWageForm.service_days}} × {{settleWageForm.daily_wage}} 
                        <span v-if="settleWageForm.service_cost"> - {{settleWageForm.service_cost}}</span>
                        <span v-if="settleWageForm.other_cost"> - {{settleWageForm.other_cost}}</span>
                        = {{settleWageForm.real_wage}}元
                    </div>
                </div>
            </div>
        </div>
        
        
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelSettleWage">取 消</el-button>
            <el-button type="primary" @click="onSubmit('settleWageForm')">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>

import {publicModuleService} from '@/service/publicModule'

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
                service_duration: [],//服务期限组件字段
                
                service_start:'',//服务起始日
                service_end:'',//服务终止日
                
                service_days:null,//工作天数
                daily_wage:'',//日工资
                total_wage:'',//首月工资合计
                
                service_cost:'',//服务费扣除
                other_cost:'',//其他扣除
                cost_reason:'',//扣除事由
                
                real_wage:'',//服务人员实发工资
                
                // user_account:'',//客户余额-----
                // user_cost: '',//客户支出金额-----
                
                return_wage:'',//返还客户金额
                
                // finally_user_account:'',//扣除后客户余额-----
            },
            settleWageRules: {
                //服务期限
                service_duration: [
                    {type: 'array', required: true, message: '请选择服务期限', trigger: 'change'}
                ],
                //工作天数
                service_days: [
                    {required: true, message: '请输入工作天数', trigger: 'blur'},
                    { type: 'number',message:'工作天数只能是数字',trigger: 'blur'},
                ],
                //日工资
                daily_wage: [
                    {required: true, message: '请输入日工资金额', trigger: 'blur'},
                    { type: 'number',message:'日工资金额只能是数字',trigger: 'blur'},
                ],
                //工资合计
                total_wage: [
                    {required: true, message: '请输入工资合计金额', trigger: 'blur'},
                    { type: 'number',message:'工资合计金额只能是数字',trigger: 'blur'},
                ],
                //服务费扣除
                service_cost: [
                    {required: true, message: '请输入服务费扣除金额', trigger: 'blur'},
                    { type: 'number',message:'服务费扣除金额只能是数字',trigger: 'blur'},
                ],
                //其他扣除
                other_cost: [
                    {required: true, message: '请输入其他扣除金额', trigger: 'blur'},
                    { type: 'number',message:'其他扣除金额只能是数字',trigger: 'blur'},
                ],
                //扣除事由
                cost_reason: [
                    {required: true, message: '请输入其他扣除事由', trigger: 'blur'}
                ],
                //服务人员实发工资
                real_wage: [
                    {required: true, message: '请输入服务人员实发工资金额', trigger: 'blur'},
                    { type: 'number',message:'实发工资金额只能是数字',trigger: 'blur'},
                ],
                //返还客户金额
                return_wage: [
                    {required: true, message: '请输入返还客户金额', trigger: 'blur'},
                    { type: 'number',message:'返还客户金额只能是数字',trigger: 'blur'},
                ],
            }
        }
    },
    watch: {
        //服务时间
        'settleWageForm.service_days': function(val, oldVal){
            let total = val * this.settleWageForm.daily_wage;
            let other_cost = this.settleWageForm.other_cost?parseInt(this.settleWageForm.other_cost) : 0;//其他扣除
            let service_cost = this.settleWageForm.service_cost?parseInt(this.settleWageForm.service_cost) : 0;//服务费用

            this.settleWageForm.total_wage = parseInt(total)//工资总计
            this.settleWageForm.user_cost = parseInt(total - other_cost);//客户支出
            this.settleWageForm.real_wage = parseInt(total - service_cost -other_cost);//实发工资
        },
        //日工资
        'settleWageForm.daily_wage': function(val){
            let total = val * this.settleWageForm.service_days
            let other_cost = this.settleWageForm.other_cost?parseInt(this.settleWageForm.other_cost) : 0;//其他扣除
            let service_cost = this.settleWageForm.service_cost?parseInt(this.settleWageForm.service_cost) : 0;//服务费用
            
            this.settleWageForm.total_wage = parseInt(total)//工资总计
            this.settleWageForm.user_cost = parseInt(total - other_cost);//客户支出
            this.settleWageForm.real_wage = parseInt(total - service_cost -other_cost);//实发工资
        },
        //其他扣除
        'settleWageForm.other_cost': function(val){
            let total = this.settleWageForm.daily_wage * this.settleWageForm.service_days 
            let other_cost = val?parseInt(val) : 0;//其他扣除
            let service_cost = this.settleWageForm.service_cost?parseInt(this.settleWageForm.service_cost) : 0;//服务费用

            this.settleWageForm.total_wage = parseInt(total)//工资总计
            this.settleWageForm.user_cost = parseInt(total - other_cost);//客户支出
            this.settleWageForm.real_wage = parseInt(total - service_cost -other_cost);//实发工资
        },
        //服务费用
        'settleWageForm.service_cost': function(val){
            let total = this.settleWageForm.daily_wage * this.settleWageForm.service_days 
            let other_cost = this.settleWageForm.other_cost?parseInt(this.settleWageForm.other_cost) : 0;//其他扣除
            let service_cost = val?parseInt(val) : 0;//服务费用
            
            this.settleWageForm.total_wage = parseInt(total)//工资总计
            this.settleWageForm.user_cost = parseInt(total - other_cost);//客户支出
            this.settleWageForm.real_wage = parseInt(total - service_cost -other_cost);//实发工资
        },

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
                    publicModuleService.settleWage(this.settleWageForm).then(data =>{
                        if(data.code == '0'){
                            this.$message({
                                type:"success",
                                message: data.message
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
<style lang="scss" lang="scss">
    .settle-box{    
        min-width: 900px;
        display: flex;
        .bell-list{
            width: 300px;
        }
    }
</style>



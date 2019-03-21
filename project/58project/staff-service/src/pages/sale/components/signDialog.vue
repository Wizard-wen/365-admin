<template>
    <el-dialog 
        title="签约" 
        :visible.sync="openSignDialog"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form :model="signForm" :rules="signRules" ref="signForm" :label-width="'120px'">
            <el-form-item label="服务周期单位" prop="unit">
                <el-select v-model="signForm.unit" placeholder="请选择活动区域">
                    <el-option label="全部" :value="0"></el-option>
                    <el-option label="按月" value="month"></el-option>
                    <el-option label="按日" value="day"></el-option>
                    <el-option label="按时" value="hour"></el-option>
                    <el-option label="按次" value="time"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="服务次数" prop="service_count">
                    <el-input-number v-model="signForm.service_count"></el-input-number>
            </el-form-item>

            <!-- <el-form-item label="服务期间" :label-width="'120px'">
                    <el-date-picker
                    v-model="service_period"
                    type="datetimerange"
                    @change="changeServicePeriod"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item> -->
            
            <el-form-item label="单价" prop="unit_price">
                <el-input v-model="signForm.unit_price" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="总价" >
                <el-input v-model="signForm.total_price" autocomplete="off" disabled=""></el-input>
            </el-form-item>

            <el-form-item label="是否代发工资" >
                <el-select v-model="signForm.pay_wage" placeholder="请选择活动区域">
                    <el-option label="是" :value="2"></el-option>
                    <el-option label="否" :value="1"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="代发工资周期" v-if="signForm.pay_wage == 2" prop="wage_count">
                <el-input-number v-model="signForm.wage_count" autocomplete="off"></el-input-number>
            </el-form-item>

            <el-form-item label="每期代发金额" v-if="signForm.pay_wage == 2" prop="wage_price">
                <el-input v-model="signForm.wage_price" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">取 消</el-button>
            <el-button type="primary" @click="signOrder('signForm')">签 约</el-button>
        </div>
    </el-dialog>
</template>
<script>
import {orderService} from '../../../../common'
export default {
    props: {
        //是否打弹出框
        openSignDialog: {
            type: Boolean,
            default: false,
        },
        //服务人员id
        staffId: {
            type: Number,
            default: 0,
        }
    },
    data(){
        var _this = this
        const validator = {
            //服务周期单位
            unit(rule, value, callback){
                if (value == '0') {
                    callback(new Error('请选择活动区域'));
                } else {
                    callback()
                }
            },
            //服务次数
            service_count(rule, value, callback){
                if (value == 0) {
                    callback(new Error('请输入服务周期'));
                } else {
                    callback()
                }
            },
            //单价
            unit_price(rule, value, callback){
                if (!value) {
                    callback(new Error('请输入单价'));
                } else if(!/^[0-9]*$/.test(value) && value != 0){
                    callback(new Error('请输入数字'));
                } else {
                    callback()
                }
            },
            //代发工资周期
            wage_count(rule, value, callback){
                if(_this.signForm.pay_wage == 2){
                    if (value == 0) {
                        callback(new Error('请输入代发工资周期'));
                    } else {
                        callback()
                    }
                } else {
                    callback()
                }
            },
            //每期代发金额
            wage_price(rule, value, callback){
                if(_this.signForm.pay_wage == 2){
                    if (value == 0) {
                        callback(new Error('请输入每期代发金额'));
                    } else {
                        callback()
                    }
                } else {
                    callback()
                }
            }
        }
        return {
            signRules: {
                //服务周期单位
                unit: [
                    { validator: validator.unit, trigger: 'change' }
                ],
                //服务次数
                service_count: [
                    { validator: validator.service_count, trigger: 'blur' }
                ],
                //单价
                unit_price: [
                    { validator: validator.unit_price, trigger: 'blur' }
                ],
                //代发工资周期
                wage_count: [
                    { validator: validator.wage_count, trigger: 'blur' }
                ],
                //每期代发金额
                wage_price: [
                    { validator: validator.wage_price, trigger: 'blur' }
                ],
            },
            //签约表单
            signForm: {
                id: this.$route.query.id,// 订单id
                staff_id: this.staffId,// 服务人员id
                unit: 0,// 服务周期单位
                service_count: 0,// 服务次数
                unit_price: 0,// 单价
                total_price: 0,// 总价
                pay_wage: 1,// 是否代发工资
                wage_count: 0,// 代发工资次数
                wage_price: 0,// 代发工资金额
                version: store.state.orderModule.order.version,
            },
            // service_period:[],//服务起止时间段
        }
    },
    computed:{
        total_price(){
            return Number(this.signForm.service_count) * Number(this.signForm.unit_price)
        }
    },
    watch: {
        total_price:function(val){
            this.signForm.total_price = val
        }
    },
    methods: {
        changeServicePeriod(){

        },
        /**
         * 提交签约表单
         */
        async signOrder(formName){
            this.$refs[formName].validate(async (valid) => {
                if (valid) {

                    store.commit('setLoading',true)

                    await orderService.sign(this.signForm) 
                        .then(data =>{
                            if(data.code == "0"){
                                this.$message({
                                    type:'success',
                                    message: `签约成功`
                                })
                            }
                        })
                        .catch(e =>{
                            this.$message({
                                type:'error',
                                message: e.message
                            })
                        })
                    
                    await orderService.getOrder(this.$route.query.id)
                    
                    store.commit('setLoading',false)

                    //关闭签约弹出框
                    this.$emit('closeSignDialog')
                
                } else {
                    return false;
                }
            });


        },
        /**
         * 关闭弹窗
         */
        closeDialog(){
            //关闭签约弹出框
            this.$emit('closeSignDialog')
        }
    }
}
</script>
<style lang="scss" scoped>

</style>



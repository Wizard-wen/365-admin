<template>
    <div class="signPage" v-loading="is_loading">
        <div class="sign-contains">
            <el-form :model="signForm" :rules="signRules" ref="signForm" :label-width="'140px'" >
                
                <card-box-component :title="'合同编号'">
                    <div slot="contains" class="contains-form">
                        <el-form-item prop="contract_number" class="form-item-3-size" size="small">
                            <form-item-label-tooltip-component
                                slot="label"
                                :label="'合同编号'"
                                :explain="''">
                                <div slot="content">
                                    <p>签约前，请向运营申请纸质合同。</p>
                                    <p>请务必按照已线下签约的实体合同的编号进行系统录入。</p>
                                </div>    
                            </form-item-label-tooltip-component>
                            <el-select v-model="signForm.contract_number" placeholder="请选择合同编号">
                                <el-option
                                    v-for="(item, index) in contract_numberList"
                                    :key="index"
                                    :label="item.contract_number"
                                    :value="item.contract_number"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </card-box-component>
                <card-box-component :title="'雇主信息'">
                    <div slot="contains" class="contains-form">
                        <el-form-item prop="sign_user_name" label="姓名" class="form-item-3-size" size="small">
                            <el-input v-model="signForm.sign_user_name" :disabled="true" placeholder="请输入雇主姓名"></el-input>
                        </el-form-item>
                        <el-form-item prop="sign_user_phone" class="form-item-3-size" size="small">
                            <form-item-label-tooltip-component
                                slot="label"
                                :label="'联系电话'"
                                :explain="''">
                                <div slot="content">
                                    <p>如果当前合同是首次签约，订单将归属于输入的客户手机号账户中；</p>
                                    <p>如果当前合同是二次匹配，订单将归属于第一次输入的手机号账户中，当前手机号只作为联系使用。</p>
                                    <p>另外，如果签约客户不是我们的注册用户，首次签约后，客户将自动成为我们的注册用户，并可以在小程序查看自己的订单详情。</p>
                                </div>    
                            </form-item-label-tooltip-component>
                            <el-input v-model.number="signForm.sign_user_phone" :disabled="true" placeholder="请输入雇主联系电话"></el-input>
                        </el-form-item>
                        <el-form-item label="身份证号" prop="sign_user_identify" class="form-item-3-size" size="small">
                            <el-input v-model="signForm.sign_user_identify" :disabled="publicOrderType == 3 || publicOrderType == 2" placeholder="请输入雇主身份证号"></el-input>
                        </el-form-item>
                    </div>
                </card-box-component>
                <card-box-component :title="'家政服务员信息'">
                    <div slot="contains" class="contains-form">
                        <el-form-item label="姓名" prop="sign_staff_name" class="form-item-3-size" size="small">
                            <el-input v-model="signForm.sign_staff_name" :disabled="true" placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item label="联系电话" prop="sign_staff_phone" class="form-item-3-size" size="small">
                            <el-input v-model="signForm.sign_staff_phone" :disabled="true" placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item label="身份证号" prop="sign_staff_identify" class="form-item-3-size" size="small">
                            <el-input v-model="signForm.sign_staff_identify" :disabled="true" placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item label="户籍地址" prop="sign_staff_law_address" class="form-item-size form-item-1-size" size="small">
                            <el-input v-model="signForm.sign_staff_law_address" :disabled="true" placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item label="现住址" prop="sign_staff_cur_address" class="form-item-size form-item-1-size" size="small">
                            <el-input v-model="signForm.sign_staff_cur_address" :disabled="true" placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item label="紧急联系人" prop="sign_staff_urgent" class="form-item-size form-item-1-size" size="small">
                            <el-input v-model="signForm.sign_staff_urgent" :disabled="true" placeholder=""></el-input>
                        </el-form-item>
                    </div>
                </card-box-component>
                <card-box-component :title="'服务内容'">
                    <div slot="contains" class="contains-form">
                        <el-form-item label="服务内容" prop="service_contains" class="form-item-size form-item-3-size" size="small">
                            <el-select 
                                v-model="signForm.service_contains" 
                                placeholder="请选择服务内容"
                                filterable>
                                <el-option
                                    v-for="item in sign_service_containsList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="护理依赖程度" prop="service_level" class="form-item-size form-item-3-size" size="small">
                            <el-radio-group v-model="signForm.service_level">
                                <el-radio :label="1">自理</el-radio>
                                <el-radio :label="2">不自理</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="服务方式" prop="service_type" class="form-item-size form-item-3-size" size="small">
                            <el-select 
                                v-model="signForm.service_type" 
                                placeholder="请选择服务方式"
                                filterable>
                                <el-option
                                    v-for="item in sign_service_typeList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                         <el-form-item label="服务对象人数" prop="service_count" class="form-item-size form-item-3-size" size="small">
                            <el-input-number v-model="signForm.service_count" :min="1" :max="20"></el-input-number>
                        </el-form-item>
                        
                        <el-form-item label="服务期限" prop="service_duration" class="form-item-size form-item-23-size" size="small">
                            <el-date-picker
                                v-model="signForm.service_duration"
                                value-format="timestamp"
                                @change="changeServiceDuration"
                                :picker-options="pickerOptions"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="服务开始日期"
                                end-placeholder="服务结束日期"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="服务地址" prop="service_address" class="form-item-size form-item-1-size" size="small">
                            <el-input v-model="signForm.service_address"  placeholder="请输入服务地址"></el-input>
                        </el-form-item>
                       
                        <el-form-item label="工作时间" prop="service_time" class="form-item-size form-item-1-size" size="small">
                            <el-input v-model="signForm.service_time"  placeholder="请输入劳动者日常工作时间"></el-input>
                        </el-form-item>
                        <el-form-item label="工种" prop="work_type" class="form-item-size form-item-1-size" size="small">
                            <el-cascader
                                :disabled="true"
                                v-model="signForm.work_type"
                                :props="{
                                    label: 'name',
                                    value: 'id',
                                }"
                                :options="workerConfigForm.skill"
                                :show-all-levels="false"></el-cascader>
                        </el-form-item>
                        
                    </div>
                </card-box-component>
                <card-box-component :title="'报酬及服务费用'">
                    <div slot="contains" class="contains-form">
                        <el-form-item prop="staff_wage" class="form-item-size form-item-3-size" size="small">
                            <form-item-label-tooltip-component
                                slot="label"
                                :label="'劳务报酬/月'"
                                :explain="'劳务报酬是指的双方约定的，服务人员服务一个月应得的报酬。'"></form-item-label-tooltip-component>
                            <el-input v-model.number="signForm.staff_wage" placeholder="请输入劳动者劳务报酬"></el-input>
                        </el-form-item>
                        <el-form-item prop="staff_charge" ref="staff_charge" class="form-item-size form-item-3-size" size="small">
                            <form-item-label-tooltip-component
                                slot="label"
                                :label="'劳动者服务费'"
                                :explain="''">
                                <div slot="content">
                                    <p>劳动者服务费是劳动者上户，并度过试用期后，后应当固定支付给公司的费用。</p>
                                    <p>劳动者服务费 = 劳务报酬/月 ✖ 10%</p>
                                </div>    
                            </form-item-label-tooltip-component>
                            <el-input :disabled="!isCostomize" v-model.number="signForm.staff_charge" placeholder="请输入劳动者服务费"></el-input>
                        </el-form-item>
                        <el-form-item prop="user_charge" ref="user_charge" class="form-item-size form-item-3-size" size="small">
                            <form-item-label-tooltip-component
                                slot="label"
                                :label="'客户服务费'"
                                :explain="''">
                                <div slot="content">
                                    <p>客户服务费是指公司为客户在一定期限内提供家政中介服务所产生的费用。</p>
                                    <p>劳动者服务费 = 劳务报酬/月 ✖ 20%</p>
                                </div>    
                            </form-item-label-tooltip-component>
                            <el-input :disabled="!isCostomize" v-model.number="signForm.user_charge" placeholder="请输入客户服务费"></el-input>
                        </el-form-item>
                        <el-form-item prop="user_pay" ref="user_pay" class="form-item-size form-item-3-size" size="small">
                            <form-item-label-tooltip-component
                                slot="label"
                                :label="'客户缴纳金额'"
                                :explain="''">
                                <div slot="content">
                                    <p>劳动者服务费 = 劳务报酬/月 + （客户服务费）- 客户余额</p>
                                    <p>其中，只有首次签约才会产生客户服务费。</p>
                                </div>    
                            </form-item-label-tooltip-component>
                            <el-input :disabled="!isCostomize" v-model.number="signForm.user_pay" placeholder="请输入客户缴纳金额"></el-input>
                        </el-form-item>
                        <el-form-item prop="staff_deposit" ref="staff_deposit" class="form-item-size form-item-3-size" size="small">
                            <form-item-label-tooltip-component
                                slot="label"
                                :label="'劳动者押金'"
                                :explain="''">
                                <div slot="content">
                                    <p>劳动者押金通常为200元</p>
                                </div>    
                            </form-item-label-tooltip-component>
                            <el-input :disabled="!isCostomize" v-model.number="signForm.staff_deposit" placeholder="请输入劳动者押金"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" size="mini" :disabled="isCostomize" @click="customizeCharge">自定义金额</el-button>
                            <!-- <el-button type="primary" size="mini" :disabled="true" @click="customizeCharge">自定义金额</el-button> -->
                        </el-form-item>
                    </div>
                </card-box-component>
                <card-box-component :title="'服务人员保险'">
                    <div slot="contains" class="contains-form">
                        <el-form-item label="保险受益人" prop="insurance_benefit" class="form-item-size form-item-3-size" size="small">
                            <el-input v-model="signForm.insurance_benefit" :disabled="true" placeholder="请输入保险受益人"></el-input>
                        </el-form-item>
                        <el-form-item label="保险期限" prop="insurance_duration" class="form-item-size form-item-23-size" size="small">
                            <el-date-picker
                                v-model="signForm.insurance_duration"
                                value-format="timestamp"
                                @change="changeInsuranceDuration"
                                :picker-options="pickerOptions"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="保险开始日期"
                                end-placeholder="保险结束日期"></el-date-picker>
                        </el-form-item>
                    </div>
                </card-box-component>

                <card-box-component :title="'合同文本及备注'">
                    <div slot="contains" class="contains-form">
                        <el-form-item label="备注" prop="remarks" class="form-item-size form-item-1-size" size="small">
                            <el-input type="textarea" v-model="signForm.remarks" placeholder="请输入合同备注信息"></el-input>
                        </el-form-item>
                        <el-form-item label="合同附件" prop="accessory" ref="accessory" class="form-item-size form-item-1-size" size="small">
                            <multiple-picture-upload
                                v-model="signForm.accessory"
                                :title="'合同附件'"
                                :height="212"
                                :width="150"></multiple-picture-upload>
                        </el-form-item>
                    </div>
                </card-box-component>

                <el-form-item>
                    <el-button type="primary" @click="signOrder('signForm')">立即签约</el-button>
                    <el-button @click="goback">取消</el-button>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>
<script>
    import {
        // sign_service_typeList,
        sign_service_levelList,
        sign_service_typeList,
        sign_service_containsList,
        // order_service_typeList,
    } from './saleSignPage/IsaleSignItem'

    
    import {saleService} from '@/service/sale.ts'
export default {
    data(){
        var _this = this
        const validator = {
            //手机号
            phoneValidate(rule, value, callback){
                if (value === '') {
                    callback(new Error('请输入手机号'));
                } else {
                    if (!(/^1[0-9]{10}$/.test(value))) {
                        callback(new Error('请输入正确格式的手机号'));
                    }
                    callback();
                }
            },
            //身份证号
            identifyValidate(rule, value, callback){
                if (value != '') {
                    if (!(value.length == 18) || !(/(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value))) {
                        callback(new Error('请输入18位有效身份证号'));
                    }
                    callback();
                } else {
                    callback()
                }
            },
        }
        return {
            is_loading: false,
            //可签约空合同列表
            contract_numberList: [{
                id: 0,
                contract_number: '请选择'
            }],
            //订单状态
            publicOrderType: this.$route.query.type,
            isCostomize:false,//是否自定义订单金额
            signRules: {
                //合同编号
                contract_number: [
                    { required:true,message:'请选择合同编号',trigger: 'change'},
                ],
                //雇主姓名
                sign_user_name: [
                    { required:true,message:'请输入雇主姓名',trigger: 'blur'},
                ],
                //雇主手机号
                sign_user_phone: [
                    { required:true,message:'请输入雇主手机号',trigger: 'blur'},
                    { validator:validator.phoneValidate,trigger: 'blur'},
                ],
                //雇主身份证号
                sign_user_identify: [
                    { required:true,message:'请输入雇主身份证号',trigger: 'blur'},
                    { validator:validator.identifyValidate,trigger: 'blur'},
                ],
                //签约服务人员姓名
                sign_staff_name: [
                    { required:true,message:'缺少签约服务人员姓名，不能签约，请联系运营中心更改！',trigger: 'blur'},
                ],
                //签约服务人员手机号
                sign_staff_phone: [
                    { required:true,message:'缺少签约服务人员手机号，不能签约，请联系运营中心更改！',trigger: 'blur'},
                    {validator: validator.phoneValidate, trigger: 'blur'}
                ],
                //签约服务人员身份证号
                sign_staff_identify: [
                    { required:true,message:'缺少签约身份证号，不能签约，请联系运营中心更改！',trigger: 'blur'},
                    {validator: validator.identifyValidate, trigger: 'blur'}
                ],
                //签约服务人员户籍地址
                sign_staff_law_address: [
                    { required:true,message:'缺少签约服务人员户籍地址，不能签约，请联系运营中心更改！',trigger: 'blur'},
                ],
                //签约服务人员现住址
                sign_staff_cur_address: [
                    { required:true,message:'缺少签约服务人员现住址，不能签约，请联系运营中心更改！',trigger: 'blur'},
                ],
                //签约服务人员紧急联系人
                sign_staff_urgent: [
                    { required:true,message:'缺少签约服务人员紧急联系人，不能签约，请联系运营中心更改！',trigger: 'blur'},
                ],

                //服务内容
                service_contains: [
                    { required:true,message:'请选择服务内容',trigger: 'change'},
                ],
                //服务地址
                service_address: [
                    { required:true,message:'请输入服务地址',trigger: 'blur'},
                ],
                //服务对象人数
                service_count: [
                    { required:true,message:'请输入服务对象人数',trigger: 'change'},
                ],
                //护理依赖程度
                service_level: [
                    { required:true,message:'请输入护理依赖程度',trigger: 'change'},
                ],
                //服务方式
                service_type: [
                    { required:true,message:'请输入服务方式',trigger: 'change'},
                ],
                //服务期限
                service_duration: [
                    { required:true,message:'请输入服务期限',trigger: 'change'},
                ],
                //工作时间
                service_time: [
                    { required:true,message:'请输入工作时间',trigger: 'blur'},
                ],

                //劳务报酬
                staff_wage: [
                    { required:true,message:'请输入劳务报酬',trigger: 'blur'},
                    { type: 'number',message:'劳务报酬只能是数字',trigger: 'blur'},
                ],
                //劳动者服务费
                staff_charge: [
                    { required:true,message:'请输入劳动者服务费',trigger: 'blur'},
                    { type: 'number',message:'劳动者服务费金额只能是数字',trigger: 'blur'},
                ],
                //客户服务费
                user_charge: [
                    { required:true,message:'请输入客户服务费',trigger: 'blur'},
                    { type: 'number',message:'客户服务费只能是数字',trigger: 'blur'},
                ],
                //客户缴纳金额
                user_pay: [
                    { required:true,message:'请输入客户缴纳金额',trigger: 'blur'},
                    { type: 'number',message:'客户缴纳金额只能是数字',trigger: 'blur'},
                ],
                
                //劳动者押金
                staff_deposit: [
                    { required:true,message:'请输入劳动者押金',trigger: 'blur'},
                    { type: 'number',message:'劳动者押金只能是数字',trigger: 'blur'},
                ],
                //保险受益人
                insurance_benefit: [
                    { required:true,message:'请输入保险受益人',trigger: 'blur'},
                ],
                //保险期限
                insurance_duration: [
                    { required:true,message:'请输入保险期限',trigger: 'change'},
                ],
                //合同附件
                accessory: [
                    { required:true,message:'请上传合同图片',trigger: 'change'},
                ],
            },
            //签约表单
            signForm: {
                order_id: this.$route.query.order_id,
                
                contract_number: '',//合同编号
                sign_user_name:this.$route.query.type == 3 || 2?this.$route.query.sign_user_name : '' ,// 雇主姓名
                sign_user_id:this.$route.query.type == 3 || 2?this.$route.query.sign_user_id : '' ,// 雇主id
                sign_user_phone:this.$route.query.type == 3 || 2?this.$route.query.sign_user_phone : '',// 雇主联系电话
                sign_user_identify:this.$route.query.type == 3 || 2?this.$route.query.sign_user_identify : '',// 雇主身份证号
                
                sign_staff_name:'',// 签约家政服务员
                sign_staff_id: '',//签约家政服务员id
                sign_staff_phone:'',// 签约家政服务员电话
                sign_staff_identify:'',// 签约家政服务员身份证号
                sign_staff_law_address:'',// 签约家政服务员户籍地址
                sign_staff_cur_address:'',// 签约家政服务员现住址
                sign_staff_urgent:'',// 签约家政服务员紧急联系方式
                
                service_contains:'',// 服务内容
                service_count:'',// 服务对象人数
                service_level:1,// 护理依赖程度
                service_type:'',// 服务方式
    
                service_duration: [],
                service_start:'',// 服务期限起始
                service_end: '',//服务期限截止
                service_time:'',// 工作时间
                work_type: 0, //工种
                service_address: '',

                staff_wage:'',// 劳务报酬
                user_charge:'',// 客户服务费
                user_pay:'',// 客户缴纳
                staff_charge:'',//劳动者服务费
                staff_deposit:200,// 劳动者押金
                insurance_benefit:'',// 保险受益人
                
                insurance_duration:[],
                insurance_start:'',// 保险起始日
                insurance_end:'',//保险终止日
                accessory:[],// 上传附件
                remarks:'',//备注
            },
            sign_service_typeList,
            sign_service_containsList,
            sign_service_levelList,
            workerConfigForm: {},
            workerItem: {},
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                },
            },
            // service_duration:[],// 服务期限展示字段
            // insurance_duration:[],// 保险期限
            //图片上传header
            uploadHeader:{
                accessToken: this.$store.state.loginModule.token.access_token
            }
        }
    },
    watch: {
        // 是否自定义工资
        'signForm.staff_wage': function(val, oldVal){
            if(this.isCostomize){
                return
            }
            this.signForm.user_charge = parseInt(val * 0.2)
            this.signForm.user_pay = parseInt(val * 1.2)
            this.signForm.staff_charge = parseInt(val * 0.1)
            this.$refs.user_charge.clearValidate()
            this.$refs.user_pay.clearValidate()
            this.$refs.staff_charge.clearValidate()
        },
        'signForm.accessory': function(val, oldVal){
            if(val.length){
                this.$refs.accessory.clearValidate()
            }
        }
    },
    methods: {
        goback(){
            this.$router.go(-1)
        },
        customizeCharge(){
            this.isCostomize = true
        },
        /**
         * 提交签约表单
         */
        async signOrder(formName){
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    await this.confirmSign()
                } else {
                    return false;
                }
            });
        },
        /**
         * 二次确认签约
         */
        async confirmSign(){
            await this.$confirm("此操作不可逆，请务必保证签约信息准确完整！", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(async () =>{
                await this.sign()
            }).catch(() => {
                this.$message({
                    type: "info",
                    message: "已放弃签约"
                });
            });
        },
        /**
         * 签约接口
         */
        async sign(){
            try{
                this.is_loading = true;
                let signForm = {
                    ...this.signForm,
                }
                signForm.work_type = this.$utils.sendCascanderData(signForm.work_type)[0]
                await saleService.sign(signForm).then(data =>{
                    if(data.code == "0"){
                        this.$message({
                            type:'success',
                            message: data.message
                        })
                        this.is_loading = false;
                        //跳转回订单配置页
                        this.goOrderConfigPage()
                    }
                    
                }).catch(error =>{
                    this.$message({
                        type:'error',
                        message: error.message
                    })
                    this.is_loading = false;
                }).finally(() =>{
                    this.is_loading = false;
                })
            } catch(error){
                this.$message({
                    type:'error',
                    message: error.message
                })
                this.is_loading = false;
            }
        },
        /**
         * 返回订单配置页
         */
        goOrderConfigPage(){
            this.$router.push({
                path: '/sale/saleOrderConfig',
                query: {
                    order_id: this.$route.query.order_id,
                }
            })
        },
        /**
         * 保险期限时间转化
         */
        changeInsuranceDuration(value){
            this.signForm.insurance_start = value[0]
            this.signForm.insurance_end = value[1]
        },
        /**
         * 服务期限时间转换
         */
        changeServiceDuration(value){
            this.signForm.service_start = value[0]
            this.signForm.service_end = value[1]
        },
    },
    async mounted(){
        /**
         * 获取可签约合同列表
         */
        try{
            this.is_loading = true
            Promise.all([
                saleService.getManagerVoidContractSelection(),
                saleService.getWorker(this.$route.query.worker_id),
                saleService.getWorkerFormConfig('edit')
            ]).then(data => {
                this.contract_numberList = data[0].data

                this.workerConfigForm = data[2].data

                let skillTree = this.workerConfigForm.skill
                let work_type = this.$route.query.work_type

                this.workerItem = data[1].data
                // 初始化签约服务人员数据
                this.signForm.sign_staff_name = this.workerItem.name// 签约家政服务员
                this.signForm.sign_staff_id =  this.workerItem.id//签约家政服务员id
                this.signForm.sign_staff_phone = this.workerItem.phone// 签约家政服务员电话
                this.signForm.sign_staff_identify = this.workerItem.identify// 签约家政服务员身份证号
                this.signForm.sign_staff_cur_address = this.workerItem.address// 签约家政服务员现住址
                this.signForm.sign_staff_urgent = this.workerItem.urgent_phone// 签约家政服务员紧急联系方式
                this.signForm.sign_staff_law_address = this.workerItem.address_in_law//签约家政服务员户籍地址
                this.signForm.work_type = this.$utils.setTreeArray(work_type,skillTree)

                // this.signForm.service_address = this.$route.query.service_address
                // this.signForm.service_time = this.$route.query.service_duration

                this.signForm.insurance_benefit = this.workerItem.name

                
                this.is_loading = false
                
                if(this.contract_numberList.length == 0){
                    this.$message({
                        type: 'error',
                        message: '您目前没有可签约的合同，请及时联系运营申请！'
                    })
                }
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
<style lang="scss" scoped>
    .signPage{
        width: 100%;
        min-height: calc(100vh - 50px);
        background:#f0f2f5;
        .contains-form{
            display: flex;
            flex-wrap:wrap;
        }
        .sign-contains{
            padding: 24px;
        }
    }
            // .order-message{

            //     width: 100%;
            //     // height: 285px;
            //     background: #fff;
            //     margin-bottom: 24px; 
            //     .title{
            //         min-height: 48px;
            //         margin-bottom: -1px;
            //         padding: 0 24px;
            //         color: rgba(0,0,0,.85);
            //         font-weight: 500;
            //         font-size: 16px;
            //         background: transparent;
            //         border-bottom: 1px solid #e8e8e8;
            //         border-radius: 2px 2px 0 0;
            //         zoom: 1;
            //         .title-contains{
            //             display: flex;
            //             align-items: center;
            //             .left{
            //                 display: inline-block;
            //                 flex: 1 1;
            //                 padding: 16px 0;
            //                 overflow: hidden;
            //                 white-space: nowrap;
            //                 text-overflow: ellipsis;
            //             }
            //         }

            //     }
            //     .order-list{
            //         box-sizing: border-box;
            //         padding: 24px;
            //         width: 880px;
            //         &:after{
            //             content: '';
            //             display: block;
            //             clear: both;
            //         }
            //     }
            // }


.form-item-3-size{
    width: 33%;
}
.form-item-23-size{
    width: 66%;
}
.form-item-1-size{
    width: 100%;
}
.form-item-2-size{
    width: 50%;
}
.form-item-size{
    max-width: 900px;
}
</style>



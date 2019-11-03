<template>
    <div class="signPage" v-loading="is_loading">
        <div class="sign-contains">
            <el-form :model="signForm" :rules="signRules" ref="signForm" :label-width="'120px'" >
                <div class="order-message">
                    <div class="title">
                        <div class="title-contains">
                            <div class="left">合同编号</div>
                        </div>
                    </div>
                    <div class="order-list">
                        <el-form-item label="合同编号" prop="contract_number">
                            <el-select v-model="signForm.contract_number" placeholder="请选择合同编号">
                                <el-option
                                    v-for="(item, index) in contract_numberList"
                                    :key="index"
                                    :label="item.contract_number"
                                    :value="item.contract_number"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </div>
                <div class="order-message">
                    <div class="title">
                        <div class="title-contains">
                            <div class="left">雇主信息</div>
                        </div>
                    </div>
                    <div class="order-list" >
                        <el-form-item prop="sign_user_name" label="姓名">
                            <el-input v-model="signForm.sign_user_name" :disabled="orderType == 3 || orderType == 2" placeholder="请输入雇主姓名"></el-input>
                            <!-- <el-tooltip effect="dark" content="Top Left 提示文字" placement="top-start">
                                <i class="el-icon-info"></i>
                            </el-tooltip> -->
                        </el-form-item>
                        <el-form-item label="联系电话" prop="sign_user_phone">
                            <el-input v-model.number="signForm.sign_user_phone" placeholder="请输入雇主联系电话"></el-input>
                        </el-form-item>
                        <el-form-item label="身份证号" prop="sign_user_identify">
                            <el-input v-model="signForm.sign_user_identify" :disabled="orderType == 3 || orderType == 2" placeholder="请输入雇主身份证号"></el-input>
                        </el-form-item>
                    </div>
                </div>

                <div class="order-message">
                    <div class="title">
                        <div class="title-contains">
                            <div class="left">家政服务员信息</div>
                        </div>
                    </div>
                    <div class="order-list">
                        <el-form-item label="姓名" prop="sign_staff_name">
                            <el-input v-model="signForm.sign_staff_name" :disabled="true" placeholder="请输入家政服务员姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="联系电话" prop="sign_staff_phone">
                            <el-input v-model="signForm.sign_staff_phone" placeholder="请输入家政服务员联系电话"></el-input>
                        </el-form-item>
                        <el-form-item label="身份证号" prop="sign_staff_identify">
                            <el-input v-model="signForm.sign_staff_identify" placeholder="请输入家政服务员身份证号"></el-input>
                        </el-form-item>
                        <el-form-item label="户籍地址" prop="sign_staff_law_address">
                            <el-input v-model="signForm.sign_staff_law_address" placeholder="请输入家政服务员户籍地址"></el-input>
                        </el-form-item>
                        <el-form-item label="现住址" prop="sign_staff_cur_address">
                            <el-input v-model="signForm.sign_staff_cur_address" placeholder="请输入家政服务员现住址"></el-input>
                        </el-form-item>
                        <el-form-item label="紧急联系人" prop="sign_staff_urgent">
                            <el-input v-model="signForm.sign_staff_urgent" placeholder="请输入家政服务员紧急联系人"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="order-message">
                    <div class="title">
                        <div class="title-contains">
                            <div class="left">服务内容</div>
                        </div>
                    </div>
                    <div class="order-list">
                        <el-form-item label="服务内容" prop="service_contains">
                            <select-tag-component
                                :propTagList="orderConfigList.order_service_contains"
                                v-model="signForm.service_contains"
                                :isSingle="true"></select-tag-component>
                        </el-form-item>
                        <el-form-item label="服务地址" prop="service_address">
                            <el-input v-model="signForm.service_address" placeholder="请输入服务地址"></el-input>
                        </el-form-item>
                        <el-form-item label="服务对象人数" prop="service_count">
                            <el-input-number v-model="signForm.service_count" :min="1" :max="20"></el-input-number>
                        </el-form-item>
                        <el-form-item label="护理依赖程度" prop="service_level">
                            <select-tag-component
                                :propTagList="orderConfigList.order_service_level"
                                v-model="signForm.service_level"
                                :isSingle="true"></select-tag-component>
                        </el-form-item>
                        <el-form-item label="服务方式" prop="service_type">
                            <select-tag-component
                                :propTagList="orderConfigList.order_service_type"
                                v-model="signForm.service_type"
                                :isSingle="true"></select-tag-component>
                        </el-form-item>
                        <el-form-item label="服务期限" prop="service_duration">
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
                        <el-form-item label="工作时间" prop="service_time">
                            <el-input v-model="signForm.service_time" placeholder="请输入劳动者日常工作时间"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="order-message">
                    <div class="title">
                        <div class="title-contains">
                            <div class="left">报酬及服务费用</div>
                        </div>
                    </div>
                    <div class="order-list">
                        <el-form-item label="劳务报酬" prop="staff_wage">
                            <el-input v-model.number="signForm.staff_wage" placeholder="请输入劳动者劳务报酬"></el-input>
                        </el-form-item>
                        <el-form-item label="劳动者服务费" prop="staff_charge">
                            <el-input v-model.number="signForm.staff_charge" placeholder="请输入劳动者服务费"></el-input>
                        </el-form-item>
                        <el-form-item label="客户服务费" prop="user_charge">
                            <el-input v-model.number="signForm.user_charge" placeholder="请输入客户服务费"></el-input>
                        </el-form-item>
                        <el-form-item label="客户缴纳金额" prop="user_pay">
                            <el-input v-model.number="signForm.user_pay" placeholder="请输入客户缴纳金额"></el-input>
                        </el-form-item>
                        <el-form-item label="劳动者押金" prop="staff_deposit">
                            <el-input v-model.number="signForm.staff_deposit" placeholder="请输入劳动者押金"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="order-message">
                    <div class="title">
                        <div class="title-contains">
                            <div class="left">服务人员保险</div>
                        </div>
                    </div>
                    <div class="order-list">
                        <el-form-item label="保险受益人" prop="insurance_benefit">
                            <el-input v-model="signForm.insurance_benefit" :disabled="true" placeholder="请输入保险受益人"></el-input>
                        </el-form-item>
                        <el-form-item label="保险期限" prop="insurance_duration">
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
                </div>
                <div class="order-message">
                    <div class="title">
                        <div class="title-contains">
                            <div class="left">合同附件及备注</div>
                        </div>
                    </div>
                    <div class="order-list">
                        <el-form-item label="备注" prop="remarks">
                            <el-input type="textarea" v-model="signForm.remarks" placeholder="请输入合同备注信息"></el-input>
                        </el-form-item>
                        <el-form-item label="合同附件" prop="accessory" ref="accessory">
                            <!-- <el-upload
                                accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
                                action="/admin/common/uploadImage"
                                :on-success="uploadSuccess"
                                :on-remove="removePic"
                                :file-list="signForm.accessory"
                                list-type="picture-card"
                                :headers="uploadHeader">
                                <i class="el-icon-plus"></i>
                            </el-upload> -->
                            <photo-component
                                :pictureUrlArrtibute="'path'"
                                :isEdit="true"
                                :width="'210px'"
                                :height="'297px'"
                                v-model="signForm.accessory"
                                :title="'合同附件'"></photo-component>
                        </el-form-item>
                    </div>
                </div>
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
    selectTagComponent,} from '@/pages/components'
    import {saleService, operateService} from '../../../common'
    import {photoComponent} from '../operate/worker/workerItem/index.js'
export default {
    components: {
        selectTagComponent,
        photoComponent,
    },
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
            orderType: this.$route.query.type,
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
                    { required:true,message:'请输入签约服务人员姓名',trigger: 'blur'},
                ],
                //签约服务人员手机号
                sign_staff_phone: [
                    { required:true,message:'请输入签约服务人员手机号',trigger: 'blur'},
                    {validator: validator.phoneValidate, trigger: 'blur'}
                ],
                //签约服务人员身份证号
                sign_staff_identify: [
                    { required:true,message:'请输入签约身份证号',trigger: 'blur'},
                    {validator: validator.identifyValidate, trigger: 'blur'}
                ],
                //签约服务人员户籍地址
                sign_staff_law_address: [
                    { required:true,message:'请输入签约服务人员户籍地址',trigger: 'blur'},
                ],
                //签约服务人员现住址
                sign_staff_cur_address: [
                    { required:true,message:'请输入签约服务人员现住址',trigger: 'blur'},
                ],
                //签约服务人员紧急联系人
                sign_staff_urgent: [
                    { required:true,message:'请输入签约服务人员紧急联系人',trigger: 'blur'},
                ],

                //服务内容
                service_contains: [
                    { required:true,message:'请输入劳务报酬',trigger: 'change'},
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
                sign_user_name:this.$route.query.type == 3 || 2?this.$route.query.sign_user_name : '' ,// 雇主
                sign_user_id:this.$route.query.type == 3 || 2?this.$route.query.sign_user_id : '' ,// 雇主
                sign_user_phone:'',// 雇主联系电话
                sign_user_identify:this.$route.query.type == 3 || 2?this.$route.query.sign_user_identify : '',// 雇主身份证号
                
                sign_staff_name:this.$route.query.sign_staff_name,// 签约家政服务员
                sign_staff_id: this.$route.query.sign_staff_id,//签约家政服务员id
                sign_staff_phone:'',// 签约家政服务员电话
                sign_staff_identify:'',// 签约家政服务员身份证号
                sign_staff_law_address:'',// 签约家政服务员户籍地址
                sign_staff_cur_address:'',// 签约家政服务员现住址
                sign_staff_urgent:'',// 签约家政服务员紧急联系方式
                
                service_contains:'',// 服务内容
                service_count:'',// 服务对象人数
                service_level:'',// 护理依赖程度
                service_type:'',// 服务方式
                service_duration:[],// 服务期限展示字段
                service_start:'',// 服务期限起始
                service_end: '',//服务期限截止
                service_start: '',//服务期限起始
                service_end: '',//服务期限截止
                service_time:'',// 工作时间

                staff_wage:'',// 劳务报酬
                user_charge:'',// 客户服务费
                user_pay:'',// 客户缴纳
                staff_deposit:'',// 劳动者押金
                insurance_benefit:this.$route.query.sign_staff_name,// 保险受益人
                insurance_duration:[],// 保险期限
                insurance_start:'',// 保险起始日
                insurance_end:'',//保险终止日
                insurance_start: '',//保险起始日
                insurance_end: '',//保险终止日
                accessory:[],// 上传附件
                remarks:'',//备注
            },
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                },
            },
            service_period:[],//服务起止时间段
            //图片上传header
            uploadHeader:{
                accessToken: this.$store.state.loginModule.token.access_token
            }
        }
    },

    computed:{
        /**
         * 订单签约字段
         */
        orderConfigList(){
            return this.$store.state.saleModule
        }
    },
    methods: {
        goback(){
            this.$router.go(-1)
        },
        /**
         * 上传成功后，接收图片数据，送入图片回显数组
         */
        uploadSuccess(response, file, fileList) {
            let picItem = {
                path: response.data.path,
                url: './resource/'+response.data.path,
                name: response.data.name
            }
            this.signForm.accessory.push(picItem)
            //消除表单验证
            if(this.signForm.accessory.length){
                this.$refs.accessory.clearValidate()
            }
        },
        /**
         * 移出图片
         */
        removePic(file, fileList){
            this.signForm.accessory.forEach((item, index) =>{
                if(item.name == file.name){
                    this.signForm.accessory.splice(index,1)
                }
            })
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

                await saleService.sign(this.signForm).then(data =>{
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
                path: '/sale/orderConfig',
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
        }
    },
    async mounted(){
        /**
         * 获取可签约合同列表
         */
        try{
            await operateService.getManagerVoidContractSelection().then(data =>{
                if(data.code == '0'){
                    this.contract_numberList = data.data
                    if(this.contract_numberList.length == 0){
                        this.$message({
                            type: 'error',
                            message: '您目前没有可签约的合同，请及时联系运营申请！'
                        })
                    }
                }
                
            }).catch(error => {
                this.$message({
                    type:'error',
                    message: error.message
                }) 
            })
        } catch(error){
            this.$message({
                type:'error',
                message: error.message
            }) 
        }
        
    }
}
</script>
<style lang="scss" scoped>
    .signPage{
        width: 100%;
        min-height: calc(100vh - 50px);
        background:#f0f2f5;
        .sign-contains{
            padding: 24px;
        }
    }
            .order-message{

                width: 100%;
                // height: 285px;
                background: #fff;
                margin-bottom: 24px; 
                .title{
                    min-height: 48px;
                    margin-bottom: -1px;
                    padding: 0 24px;
                    color: rgba(0,0,0,.85);
                    font-weight: 500;
                    font-size: 16px;
                    background: transparent;
                    border-bottom: 1px solid #e8e8e8;
                    border-radius: 2px 2px 0 0;
                    zoom: 1;
                    .title-contains{
                        display: flex;
                        align-items: center;
                        .left{
                            display: inline-block;
                            flex: 1 1;
                            padding: 16px 0;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                    }

                }
                .order-list{
                    box-sizing: border-box;
                    padding: 24px;
                    width: 880px;
                    &:after{
                        content: '';
                        display: block;
                        clear: both;
                    }
                }
            }
</style>



<template>
    <div class="signPage">
        <div class="sign-contains">
            <el-form :model="signForm" :rules="signRules" ref="signForm" :label-width="'120px'">
                <div class="order-message">
                    <div class="title">
                        <div class="title-contains">
                            <div class="left">雇主信息</div>
                        </div>
                    </div>
                    <div class="order-list">
                        <el-form-item label="姓名" prop="sign_user">
                            <el-input v-model="signForm.sign_user"></el-input>
                        </el-form-item>
                        <el-form-item label="联系电话" prop="sign_user_phone">
                            <el-input v-model="signForm.sign_user_phone"></el-input>
                        </el-form-item>
                        <el-form-item label="身份证号" prop="sign_user_identify">
                            <el-input v-model="signForm.sign_user_identify"></el-input>
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
                        <el-form-item label="姓名" prop="sign_service">
                            <el-input v-model="signForm.sign_service"></el-input>
                        </el-form-item>
                        <el-form-item label="联系电话" prop="sign_service_phone">
                            <el-input v-model="signForm.sign_service_phone"></el-input>
                        </el-form-item>
                        <el-form-item label="身份证号" prop="sign_service_identify">
                            <el-input v-model="signForm.sign_service_identify"></el-input>
                        </el-form-item>
                        <el-form-item label="户籍地址" prop="sign_service_law_add">
                            <el-input v-model="signForm.sign_service_law_add"></el-input>
                        </el-form-item>
                        <el-form-item label="现住址" prop="sign_service_cur_add">
                            <el-input v-model="signForm.sign_service_cur_add"></el-input>
                        </el-form-item>
                        <el-form-item label="紧急联系人" prop="sign_service_urgent">
                            <el-input v-model="signForm.sign_service_urgent"></el-input>
                        </el-form-item>
                        <!-- <el-form-item label="服务周期单位" prop="unit">
                            <el-select v-model="signForm.unit" placeholder="请选择活动区域">
                                <el-option label="请选择" :value="0"></el-option>
                                <el-option label="按月" value="month"></el-option>
                                <el-option label="按日" value="day"></el-option>
                                <el-option label="按时" value="hour"></el-option>
                                <el-option label="按次" value="time"></el-option>
                            </el-select>
                        </el-form-item> -->
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
                            <el-input v-model="signForm.service_contains"></el-input>
                        </el-form-item>
                        <el-form-item label="服务对象人数" prop="service_count">
                            <el-input v-model="signForm.service_count"></el-input>
                        </el-form-item>
                        <el-form-item label="护理依赖程度" prop="service_level">
                            <el-input v-model="signForm.service_level"></el-input>
                        </el-form-item>
                        <el-form-item label="服务方式" prop="service_type">
                            <el-input v-model="signForm.service_type"></el-input>
                        </el-form-item>
                        <el-form-item label="服务期限" prop="service_duration">
                            <!-- <el-input v-model="signForm.service_duration"></el-input> -->
                            <el-date-picker
                                v-model="signForm.service_duration"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="服务开始日期"
                                end-placeholder="服务结束日期"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="工作时间" prop="service_time">
                            <el-input v-model="signForm.service_time"></el-input>
                        </el-form-item>
                        <!-- <el-form-item label="服务周期单位" prop="unit">
                            <el-select v-model="signForm.unit" placeholder="请选择活动区域">
                                <el-option label="请选择" :value="0"></el-option>
                                <el-option label="按月" value="month"></el-option>
                                <el-option label="按日" value="day"></el-option>
                                <el-option label="按时" value="hour"></el-option>
                                <el-option label="按次" value="time"></el-option>
                            </el-select>
                        </el-form-item> -->
                    </div>
                </div>
                <div class="order-message">
                    <div class="title">
                        <div class="title-contains">
                            <div class="left">报酬及服务费用</div>
                        </div>
                    </div>
                    <div class="order-list">
                        <el-form-item label="劳务报酬" prop="service_staff_wage">
                            <el-input v-model="signForm.service_staff_wage"></el-input>
                        </el-form-item>
                        <el-form-item label="客户服务费" prop="service_user_charge">
                            <el-input v-model="signForm.service_user_charge"></el-input>
                        </el-form-item>
                        <el-form-item label="客户缴纳" prop="user_pay">
                            <el-input v-model="signForm.user_pay"></el-input>
                        </el-form-item>
                        <el-form-item label="劳动者押金" prop="staff_cash_pledge">
                            <el-input v-model="signForm.staff_cash_pledge"></el-input>
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
                        <el-form-item label="保险受益人" prop="insurance_beneficiary">
                            <el-input v-model="signForm.insurance_beneficiary"></el-input>
                        </el-form-item>
                        <el-form-item label="保险期限" prop="insurance_duration">
                            <el-date-picker
                                v-model="signForm.insurance_duration"
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
                            <el-input type="textarea" v-model="signForm.remarks"></el-input>
                        </el-form-item>
                        <el-form-item label="合同附件" prop="accessory" ref="accessory">
                            <el-upload
                                accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
                                action="/admin/common/uploadImage"
                                :on-success="uploadSuccess"
                                :on-remove="removePic"
                                :file-list="signForm.accessory"
                                list-type="picture-card"
                                :headers="uploadHeader">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                        </el-form-item>
                    </div>
                </div>
                <el-form-item>
                    <el-button type="primary">立即签约</el-button>
                    <el-button @click="goback">取消</el-button>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>
<script>
export default {
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
                } else if(!/^\d+(\.\d+)?$/.test(value) && value != 0){
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
            },
            //合同图片
            paper(rule, value, callback){
                if (value.length == 0) {
                    callback(new Error('请上传合同照片'));
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
                    { validator: validator.service_count, trigger: ['blur', 'change'] }
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
                //合同照片
                paper: [
                    { validator: validator.paper, trigger: 'change' }
                ],
            },
            //签约表单
            signForm: {
                sign_user:'',// 雇主
                sign_user_phone:'',// 雇主联系电话
                sign_user_identify:'',// 雇主身份证号
                
                sign_service:'',// 签约家政服务员
                sign_service_phone:'',// 签约家政服务员电话
                sign_service_identify:'',// 签约家政服务员身份证号
                sign_service_law_add:'',// 签约家政服务员户籍地址
                sign_service_cur_add:'',// 签约家政服务员现住址
                sign_service_urgent:'',// 签约家政服务员紧急联系方式
                
                service_contains:'',// 服务内容
                service_count:'',// 服务对象人数
                service_level:'',// 护理依赖程度
                service_type:'',// 服务方式
                service_duration:[],// 服务期限
                service_time:'',// 工作时间


                service_staff_wage:'',// 劳务报酬
                service_user_charge:'',// 客户服务费
                user_pay:'',// 客户缴纳
                staff_cash_pledge:'',// 劳动者押金
                insurance_beneficiary:'',// 保险受益人
                insurance_duration:[],// 保险期限
                accessory:[],// 上传附件
                remarks:'',
            },
            service_period:[],//服务起止时间段
            //图片上传header
            uploadHeader:{
                accessToken: this.$store.state.loginModule.token.access_token
            }
        }
    },
    computed:{
        total_price(){
            return parseFloat((Number(this.signForm.service_count) * Number(this.signForm.unit_price)).toFixed(10))
        }
    },
    watch: {
        total_price:function(val){
            this.signForm.total_price = val
        }
    },
    methods: {
        goback(){
            this.$router.push('/sale/orderConfig')
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
            this.signForm.paper.push(picItem)
            //消除表单验证
            if(this.signForm.paper.length){
                this.$refs.paper.clearValidate()
            }
        },
        /**
         * 移出图片
         */
        removePic(file, fileList){
            this.signForm.paper.forEach((item, index) =>{
                if(item.name == file.name){
                    this.signForm.paper.splice(index,1)
                }
            })
        },
        /**
         * 提交签约表单
         */
        async signOrder(formName){
            this.$refs[formName].validate(async (valid) => {
                if (valid) {

                    // store.commit('setLoading',true)

                    // await saleService.sign(this.signForm).then(data =>{
                    //         if(data.code == "0"){
                    //             this.$message({
                    //                 type:'success',
                    //                 message: `签约成功`
                    //             })
                    //         //关闭签约弹出框
                    //         this.$emit('closeSignDialog')
                    //         }
                    //     }).catch(e =>{
                    //         this.$message({
                    //             type:'error',
                    //             message: e.message
                    //         })
                    //     }).finally(async () =>{
                    //         await saleService.getOrder(this.$route.query.order_id)

                    //         store.commit('setLoading',false)
                    //     })
                } else {
                    return false;
                }
            });
        },
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
                    &:after{
                        content: '';
                        display: block;
                        clear: both;
                    }
                }
            }
</style>



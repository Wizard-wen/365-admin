<template>
    <!-- 订单申请 -->
    <el-dialog
        :title="`更改${changeOrderApplyField.fieldName}`"
        :visible.sync="changeOrderApplyFieldDialogVisible"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form :model="orderApplyFieldForm" :rules="orderApplyFieldRules" label-width="120px" ref="orderApplyFieldForm">
            <el-form-item :label="changeOrderApplyField.fieldName" :prop="changeOrderApplyField.field">
                <el-input 
                    v-model="orderApplyFieldForm[changeOrderApplyField.field]"
                    :type="changeOrderApplyField.field == 'order_details'? 'textarea':'text'"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelChangeField">取 消</el-button>
            <el-button type="primary" @click="onSubmit('orderApplyFieldForm')">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>
/**
 * type 0 新建  1 编辑
 */
import {operateService} from '@common/index.js'

export default {
    props:{
        /**
         * 控制组件的显示隐藏
         */
        changeOrderApplyFieldDialogVisible:{
            default:false,
            type: Boolean,
        },
        /**
         * 订单申请字段
         */
        orderApplyItemObject: {
            type: Object,
            default: function(){return {}}
        },
        /**
         * 订单申请类型
         * 门店订单申请 1
         * 客户需求申请 2
         */
        orderApplyType: {
            type: Number | String,
            default: 1,
        },
        /**
         * 更改的字段
         */
        changeOrderApplyField: {
            default: function(){return {}},
            type: Object,
        },
    },
    watch: {
        /**
         * 订单申请字段配置
         */
        'changeOrderApplyField': {
            immediate: true,
            handler: function (val, oldVal) { 
                this.orderApplyFieldForm[val.field] = val.value
            },
            deep: true
        }
    },
    data() {
        var checkPhone = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('手机号不能为空'));
            } else {
                const reg = /^1[0-9][0-9]\d{8}$/
                if (reg.test(value)) {
                    callback();
                } else {
                    return callback(new Error('请输入正确的手机号'));
                }
            }
        }
        return {
            //改变的字段内容
            orderApplyFieldForm: {
                id: this.orderApplyItemObject.id,//订单申请id
                field: this.changeOrderApplyField.field,//字段key
                fieldName: this.changeOrderApplyField.fieldName,//字端名
                // value: '',//字段值
                work_type: '',
                wage: '',
                service_duration: '',
                order_details: '',
                service_address: '',
                user_phone: '',
                user_name: '',
            },
            orderApplyFieldRules: {
                user_name: [
                    {required: true, message: '请填写客户姓名',trigger: 'blur',},
                    { max: 10, message: '只能输入少于10个字符', trigger: 'blur' }
                ],
                user_phone: [
                    {required: true, message: '请填写有效的客户电话',trigger: 'blur',},
                    {validator: checkPhone},
                ],
                wage: [
                    {required: true, message: '请填写工资',trigger: 'blur',},
                    { max: 10, message: '只能输入少于10个字符', trigger: 'blur' }
                ],
                work_type: [
                    {required: true, message: '请填写工种',trigger: 'blur',},
                    { max: 10, message: '只能输入少于10个字符', trigger: 'blur' }
                ],
                service_duration: [
                    {required: true, message: '请填写工作时间',trigger: 'blur',},
                    { max: 20, message: '只能输入少于10个字符', trigger: 'blur' }
                ],
                order_details: [
                    {required: true, message: '请填写订单详情',trigger: 'blur',}
                ],
                service_address: [
                    {required: true, message: '请填写服务地址',trigger: 'blur',}
                ],
            }
        }
    },
    methods: {
        cancelChangeField(){
            this.$emit('closeChangeOrderApplyFieldDialog')
        },
        async onSubmit(formName){
            //校验并提交
            await this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    /**
                     * post字段
                     */
                    let sendOrderApplyField = {
                        id: this.$route.query.id,
                        field: this.orderApplyFieldForm.field,//字段key
                        fieldName: this.orderApplyFieldForm.fieldName,//字端名
                        value: this.orderApplyFieldForm[this.orderApplyFieldForm.field],//属性值
                    }
                    if(this.orderApplyType == 1){
                        await this.editApplication(sendOrderApplyField)
                    } else {
                        await this.editRequire(sendOrderApplyField)
                    }
                } else {
                    return false;
                }
            })
        },
        /**
         * 更改客户需求字段接口
         */
        async editRequire(sendOrderApplyField){
            try{
                await operateService.editRequire(sendOrderApplyField).then(data =>{
                    if(data.code == '0'){
                        this.$message({
                            type:"success",
                            message: data.message
                        })
                        this.$emit('closeChangeOrderApplyFieldDialog')
                    }
                }).catch(error =>{
                    this.$message({
                        type:'error',
                        message: error.message
                    })
                }).finally(() =>{

                })
            } catch(error){
                this.$message({
                    type:'error',
                    message: error.message
                })
            }
        },
        /**
         * 更改订单申请字段接口
         */
        async editApplication(sendOrderApplyField){
            try{
                await operateService.editApplication(sendOrderApplyField).then(data =>{
                    if(data.code == '0'){
                        this.$message({
                            type:"success",
                            message: data.message
                        })
                        this.$emit('closeChangeOrderApplyFieldDialog')
                    }
                }).catch(error =>{
                    this.$message({
                        type:'error',
                        message: error.message
                    })
                }).finally(() =>{

                })
            } catch(error){
                this.$message({
                    type:'error',
                    message: error.message
                })
            }
        }
    },
}
</script>



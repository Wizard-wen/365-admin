<template>
    <!-- 订单申请 -->
    <el-dialog
        :title="`更改${changeOrderBaseField.fieldName}`"
        :visible.sync="changeOrderBaseFieldDialogVisible"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form :model="orderBaseFieldForm" :rules="orderApplyFieldRules" label-width="120px" ref="orderBaseFieldForm">
            <el-form-item :label="changeOrderBaseField.fieldName" :prop="changeOrderBaseField.field">
                <el-input 
                    v-model="orderBaseFieldForm[changeOrderBaseField.field]"
                    :type="changeOrderBaseField.field == 'order_details'? 'textarea':'text'"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelChangeField">取 消</el-button>
            <el-button type="primary" @click="onSubmit('orderBaseFieldForm')">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>
/**
 * type 0 新建  1 编辑
 */
import {
    operateService, 
    saleService
} from '@common/index.js'

export default {
    props:{
        /**
         * 控制组件的显示隐藏
         */
        changeOrderBaseFieldDialogVisible:{
            default:false,
            type: Boolean,
        },
        /**
         * 订单字段对象
         */
        orderItemObject: {
            type: Object,
            default: function(){return {}}
        },
        /**
         * 订单类型
         * 1 门店订单申请 2 客户订单申请 3 门店订单 4 公海订单 5 运营订单
         */
        publicOrderType: {    
            type: Number | String,
            default: 1,
        },
        /**
         * 更改的字段
         */
        changeOrderBaseField: {
            default: function(){return {}},
            type: Object,
        },
    },
    watch: {
        /**
         * 订单申请字段配置
         */
        'changeOrderBaseField': {
            immediate: true,
            handler: function (val, oldVal) { 
                this.orderBaseFieldForm[val.field] = val.value
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
            orderBaseFieldForm: {
                id: this.orderItemObject.order_id,//订单申请id
                field: this.changeOrderBaseField.field,//字段key
                fieldName: this.changeOrderBaseField.fieldName,//字端名
                // value: '',//字段值
                work_type: '',
                wage: '',
                service_duration: '',
                order_details: '',
                service_address: '',
                user_phone: '',
                user_name: '',
                order_user_phone: '',
                order_user_name: '',
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
                order_user_name: [
                    {required: true, message: '请填写客户姓名',trigger: 'blur',},
                    { max: 10, message: '只能输入少于10个字符', trigger: 'blur' }
                ],
                order_user_phone: [
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
            this.$emit('closeChangeOrderFieldDialog')
        },
        async onSubmit(formName){
            //校验并提交
            await this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    /**
                     * post字段
                     */
                    let sendOrderBaseField = {}

                    if(this.publicOrderType == 1 || this.publicOrderType == 2){
                        sendOrderBaseField = {
                            id: this.$route.query.id,
                            field: this.orderBaseFieldForm.field,//字段key
                            fieldName: this.orderBaseFieldForm.fieldName,//字端名
                            value: this.orderBaseFieldForm[this.orderBaseFieldForm.field],//属性值
                        }
                    } else {
                        sendOrderBaseField = {
                            order_id: this.$route.query.order_id,
                            field: this.orderBaseFieldForm.field,//字段key
                            fieldName: this.orderBaseFieldForm.fieldName,//字端名
                            value: this.orderBaseFieldForm[this.orderBaseFieldForm.field],//属性值
                        }
                    }
                    
                    if(this.publicOrderType == 1){
                        await this.editApplication(sendOrderBaseField)
                    } else if(this.publicOrderType == 2) {
                        await this.editRequire(sendOrderBaseField)
                    } else if(this.publicOrderType == 3){
                        await this.editOrder(sendOrderBaseField)
                    } else {
                        return
                    }

                } else {
                    return false;
                }
            })
        },
        /**
         * 更改客户需求字段接口
         */
        async editRequire(sendOrderBaseField){
            try{
                await operateService.editRequire(sendOrderBaseField).then(data =>{
                    if(data.code == '0'){
                        this.$message({
                            type:"success",
                            message: data.message
                        })
                        this.$emit('closeChangeOrderFieldDialog')
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
         * 编辑订单申请字段接口
         */
        async editApplication(sendOrderBaseField){
            try{
                await operateService.editApplication(sendOrderBaseField).then(data =>{
                    if(data.code == '0'){
                        this.$message({
                            type:"success",
                            message: data.message
                        })
                        this.$emit('closeChangeOrderFieldDialog')
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
         * 编辑门店订单字段接口
         */
        async editOrder(sendOrderBaseField){
            try{
                await saleService.editOrder(sendOrderBaseField).then(data =>{
                    if(data.code == '0'){
                        this.$message({
                            type:"success",
                            message: data.message
                        })
                        this.$emit('closeChangeOrderFieldDialog')
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



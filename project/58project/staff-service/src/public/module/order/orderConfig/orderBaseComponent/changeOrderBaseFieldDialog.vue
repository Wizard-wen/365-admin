<template>
    <!-- 订单字段 -->
    <el-dialog
        title="更改订单字段"
        :visible.sync="orderFieldVisible"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form :model="orderBaseFieldForm" label-width="120px" :rules="orderBaseFieldRules" ref="orderBaseFieldForm">
            <el-form-item :label="changeOrderField.fieldName" prop="value">
                <el-input v-model="orderBaseFieldForm.value" :placeholder="`请填写${changeOrderField.fieldName}信息`"></el-input>
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
import {saleService} from '@common/index.js'

export default {
    props:{
        /**
         * 控制组件的显示隐藏
         */
        orderFieldVisible:{
            default:false,
            type: Boolean,
        },
        /**
         * 订单id
         */
        order_id: {
            type: Number,
            default: 0
        },
        /**
         * 更改的字段
         */
        changeOrderField: {
            default: function(){
                return {
                    field: '', 
                    fieldName: '',
                    value: '',
                }
            },
            type: Object,
        },
    },
    data() {
        return {
            //改变的字段内容
            orderBaseFieldForm: {
                order_id: this.order_id,
                field: this.changeOrderField.field, //订单字段key名
                fieldName: this.changeOrderField.value,//订单字段名
                value: this.changeOrderField.value,//订单字段value值
            },
            orderBaseFieldRules: {
                value: [
                    {required: true, message: '请填写字段', trigger: 'blur'},
                ]
            }
        }
    },
    methods: {
        cancelChangeField(){
            this.orderBaseFieldForm.field = ''
            this.orderBaseFieldForm.fieldName = ''
            this.orderBaseFieldForm.value = ''
            this.$emit('closeChangeDialog')
        },
        async onSubmit(formName){
            //校验并提交
            await this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    //校验并提交
                    try{
                        await saleService.editOrder(this.orderBaseFieldForm).then(data =>{
                            if(data.code == '0'){
                                this.$message({
                                    type:"success",
                                    message: data.message
                                })
                                this.$emit('closeChangeDialog')
                            }
                        }).catch(error =>{
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
                } else {
                    return false;
                }
            });
            
        }
    },
}
</script>



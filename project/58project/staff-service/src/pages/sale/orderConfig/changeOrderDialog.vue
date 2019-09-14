<template>
    <!-- 订单字段 -->
    <el-dialog
        title="更改订单字段"
        :visible.sync="orderFieldVisible"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form :model="orderApplyField" label-width="120px" ref="orderApplyField">
            <div>
                <el-form-item :label="changeOrderField.fieldName">
                    <el-input v-model="orderApplyField.value"></el-input>
                </el-form-item>
            </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelChangeField">取 消</el-button>
            <el-button type="primary" @click="onSubmit">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>
/**
 * type 0 新建  1 编辑
 */
import {saleService} from '../../../../common'

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
        orderId: {
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
            orderApplyField: {
                id: this.$route.query.id,
                ...this.changeOrderField,
            },
        }
    },
    methods: {
        cancelChangeField(){
            this.orderApplyField.field = ''
            this.orderApplyField.fieldName = ''
            this.orderApplyField.value = ''
            this.$emit('closeChangeDialog')
        },
        async onSubmit(formName){
            //校验并提交
            await saleService.editOrder(this.orderApplyField).then(data =>{
                    if(data.code == '0'){
                        this.$message({
                            type:"success",
                            message: "更改成功"
                        })
                        this.$emit('closeChangeDialog')
                    }
                }).catch(error =>{
                    this.$message({
                        type:'error',
                        message: error.message
                    })
                })

        }
    },
    async mounted(){
    }
}
</script>



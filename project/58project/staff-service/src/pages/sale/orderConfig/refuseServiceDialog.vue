<template>
    <!-- 订单申请 -->
    <el-dialog
        title="拒绝服务人员"
        :visible.sync="refuseServiceDialogVisible"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form :model="refuseServiceForm" label-width="120px" ref="refuseServiceForm">
            <p>
                您将拒绝服务人员-
                <strong>{{serviceObj.staff_name}}(工号{{serviceObj.staff_code}})</strong>
                ，请填写拒绝事由。
            </p>
            <el-form-item label="拒绝事由">
                <el-input v-model="refuseServiceForm.reason" type="textarea"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelRefuseDialog">取 消</el-button>
            <el-button type="primary" @click="onSubmit">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>

import {saleService} from '../../../../common'

export default {
    props:{
        /**
         * 控制组件的显示隐藏
         */
        refuseServiceDialogVisible:{
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
         * 服务人员字段
         */
        matched_staff: {
            default: function(){
                return {}
            },
            type: Object,
        },
    },
    data() {
        return {
            //改变的字段内容
            refuseServiceForm: {
                order_id: this.order_id,
                order_staff_id: this.matched_staff.staff_id,
                reason: '',//事由
            },
        }
    },
    computed: {
        /**
         * 服务人员信息对象
         */
        serviceObj(){
            return this.matched_staff
        }
    },
    methods: {
        cancelRefuseDialog(){
            this.refuseServiceForm.reason = ''
            this.$emit('claseRefuseDialog')
        },
        async onSubmit(formName){
            //校验并提交
            await saleService.refuse(this.refuseServiceForm).then(data =>{
                    if(data.code == '0'){
                        this.$message({
                            type:"success",
                            message: data.message,
                        })
                        this.$emit('claseRefuseDialog')
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



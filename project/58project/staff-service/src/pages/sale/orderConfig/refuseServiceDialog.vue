<template>
    <!-- 订单申请 -->
    <el-dialog
        title="拒绝服务人员"
        :visible.sync="refuseServiceDialogVisible"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form :model="refuseServiceForm" label-width="120px" ref="refuseServiceForm">
            <p>您将拒绝{{serviceObj.staff_name}}劳动者，请填写拒绝事由。</p>
            <el-form-item label="拒绝事由">
                <el-input v-model="refuseServiceForm.reason"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelRefuseDialog">取 消</el-button>
            <el-button type="primary" @click="onSubmit">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>

/**
 * type 0 新建  1 编辑
 */
import {operateService} from '../../../../common'

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
         * 订单申请id
         */
        order_id: {
            type: Number,
            default: 0
        },
        /**
         * 服务人员字段
         */
        service_staff: {
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
                id: this.$route.query.id,
                reason: '',//事由
            },
        }
    },
    computed: {
        serviceObj(){
            return this.service_staff
        }
    },
    methods: {
        cancelRefuseDialog(){
            this.refuseServiceForm.reason = ''
            this.$emit('claseRefuseDialog')
        },
        async onSubmit(formName){
            //校验并提交
            // await operateService.editApplication(this.refuseServiceForm).then(data =>{
            //             if(data.code == '0'){
            //                 this.$message({
            //                     type:"success",
            //                     message: "更改成功"
            //                 })
            //                 this.$emit('claseRefuseDialog')
            //             }
            //         }).catch(error =>{
            //             this.$message({
            //                 type:'error',
            //                 message: error.message
            //             })
            //         })

        }
    },
    async mounted(){

    }
}
</script>



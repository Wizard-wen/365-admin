<template>
    <!-- 订单申请 -->
    <el-dialog
        title="拒绝服务人员"
        :visible.sync="refuseServiceDialogVisible"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        
        <el-form :model="refuseServiceForm" :rules="refuseServiceRules" label-width="120px" ref="refuseServiceForm">
            <el-form-item label="警告">
                <p style="text-align:left">您将拒绝服务人员
                    <strong style="color:#E6A23C;">{{serviceObj.staff_name}}(工号{{serviceObj.staff_code}})</strong>
                    接单，请填写拒绝事由。
                </p>
            </el-form-item>
            <el-form-item label="拒绝事由" prop="message">
                <el-input v-model="refuseServiceForm.message" type="textarea"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelRefuseDialog">取 消</el-button>
            <el-button type="primary" @click="onSubmit('refuseServiceForm')">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>

import {publicModuleService} from '@/service/publicModule'

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
            type: Number | String,
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
                order_staff_id: this.matched_staff.id,
                message: '',//事由
            },
            refuseServiceRules: {
                message: [
                    {required: true, message: '请填写拒绝事由', trigger: 'blur'}
                ]
            }
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
            this.refuseServiceForm.message = ''
            this.$emit('closeRefuseDialog')
        },
        async onSubmit(formName){
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    try{
                        //校验并提交
                        await publicModuleService.refuseMatchedWorker(this.refuseServiceForm).then(data =>{
                            if(data.code == '0'){
                                this.$message({
                                    type:"success",
                                    message: data.message,
                                })
                                this.$emit('closeRefuseDialog')
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
                } else {
                    return 
                }
            })
            
            

        }
    },
    async mounted(){

    }
}
</script>



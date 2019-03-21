<template>
    <el-dialog 
        title="拒签" 
        :visible.sync="openRefuseDialog"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form :model="refuseForm" :label-width="'120px'" ref="refuseForm" :rules="refuseRules">
            <el-form-item label="服务人员姓名" >
                <el-input v-model="refuseForm.staff_name" disabled></el-input>
            </el-form-item>
            <el-form-item label="拒签事由" prop="message">
                <el-input v-model="refuseForm.message" type="textarea"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeRefuseDialog">取 消</el-button>
            <el-button type="primary" @click="refuseStaff('refuseForm')">提交</el-button>
        </div>
    </el-dialog>
</template>
<script>
import {orderService} from '../../../../common'

export default {
    props: {
        //是否打弹出框
        openRefuseDialog: {
            type: Boolean,
            default: false,
        },
        //服务人员id
        staffId: {
            type: Number,
            default: 0,
        },
        //服务人员姓名
        staffName: {
            type: String,
            default: ""
        }
    },
    data(){
        const messageValidator = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请填写拒绝事由'));
            } else {
                callback();
            }
        };
        return {
            //拒绝表单
            refuseForm : {
                order_id: this.$route.query.id,// 订单id
                staff_id: this.staffId,// 服务人员id
                staff_name: this.staffName,//服务人员姓名
                message: '',//拒签日志
            },
            refuseRules: {
                message: [
                     { validator: messageValidator, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        /**
         * 提交拒绝日志
         */
        async refuseStaff(formName){  
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    
                    store.commit('setLoading',true)
            
                    await orderService.refuse(this.refuseForm) 
                        .then(data =>{
                            if(data.code == "0"){
                                this.$message({
                                    type:'success',
                                    message: data.message
                                })
                            }
                        })
                        .catch(e =>{
                            this.$message({
                                type:'error',
                                message: e.message
                            })
                        })
                    
                    await orderService.getOrder(this.$route.query.id)

                    store.commit('setLoading',false)

                    //关闭拒绝弹出框
                    this.$emit('closeRefuseDialog')
                } else {
                    return false;
                }
            });
            
        },  
        //关闭拒绝日志
        closeRefuseDialog(){
            //关闭拒绝弹出框
            this.$emit('closeRefuseDialog')
        }
    }
}
</script>
<style lang="scss" scoped>


</style>



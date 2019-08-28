<template>
    <!-- 订单申请 -->
    <el-dialog
        title="订单申请"
        :visible.sync="applyOrderDialogVisible"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form :model="applyOrderForm" label-width="120px" :rules="applyOrderRules" ref="applyOrderForm">

            <el-form-item label="工种" prop="work_type" ref="work_type" style="margin-bottom:30px;">
                <el-input v-model="applyOrderForm.work_type"></el-input>
            </el-form-item>

            <el-form-item label="地址" prop="service_address" ref="service_address">
                <el-input v-model="applyOrderForm.service_address"></el-input>
            </el-form-item>

            <el-form-item label="工作时间" prop="service_duration" ref="service_duration">
                <el-input v-model="applyOrderForm.service_duration"></el-input>
            </el-form-item>

            <el-form-item label="工资" prop="wage" ref="wage">
                <el-input v-model="applyOrderForm.wage"></el-input>
            </el-form-item>

            <el-form-item label="订单详情" prop="order_details" ref="order_details">
                <el-input v-model="applyOrderForm.order_details"></el-input>
            </el-form-item>

            <el-form-item label="客户联系电话" prop="user_phone" ref="user_phone">
                <el-input v-model="applyOrderForm.user_phone"></el-input>
            </el-form-item>

            <el-form-item label="客户姓名" prop="user_name" ref="user_name">
                <el-input v-model="applyOrderForm.user_name"></el-input>
            </el-form-item>

            <el-form-item label="来源门店" prop="store_id" ref="store_id">
                <el-select v-model="applyOrderForm.store_id" disabled placeholder="请选择来源门店">
                    <el-option
                    :key="'1'"
                    :label="'365总店'"
                    :value="'1'">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="来源人" prop="apply_manager_id" ref="apply_manager_id">
                <el-select v-model="applyOrderForm.apply_manager_id" placeholder="请选择来源人">
                    <el-option
                    :key="'1'"
                    :label="'365总店'"
                    :value="'1'">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelApplyOrder">取 消</el-button>
            <el-button type="primary" @click="onSubmit('applyOrderForm')">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>

/**
 * type 0 新建  1 编辑
 */
import {saleService,operateService} from '../../../../common'

export default {
    props:{
        /**
         * 控制组件的显示隐藏
         */
        applyOrderDialogVisible:{
            default:false,
            type: Boolean,
        },
        /**
         * 传入的证书数据
         * 若是编辑则为全部数据，若为新建则为空
         */
        paperProps: {
            type: Object,
            default: function(){ return {} }
        },
    },
    data() {
        const validator = {
            user_name(rule, value, callback){
                if (!value) {
                    callback(new Error('客户名不能为空'));
                } else if (!/^[a-zA-Z\u4e00-\u9fa5]+$/.test(value)){
                    callback(new Error('只能是中、英文及其组合'));
                } else {
                    callback()
                }
            },
        }
        return {
            applyOrderForm: {
                work_type: '', //工种
                service_address: '',//地址
                service_duration: '',//工作时间
                wage: '',//工资
                order_details: '',//订单详情
                user_phone: '',//客户联系电话
                user_name: '',//客户姓名
                store_id: '1',//门店id
                apply_manager_id: '',//申请人
            },
            applyOrderRules: {
                
            }
        }
    },
    watch: {

    },
    computed: {
        /**
         * 所属门店id
         */
        store_id(){
            return this.$store.state.loginModule.store_id
        }
    },
    methods: {
        cancelApplyOrder(){
            this.$emit('closeCreateStaffDialog')
        },
        async onSubmit(formName){
            //校验并提交
            await this.$refs[formName].validate((valid) => {
                if (valid) {
                    saleService.applyOrder(this.applyOrderForm).then(data =>{
                        if(data.code == '0'){
                            this.$message({
                                type:"success",
                                message: "申请成功"
                            })
                            this.$emit('closeCreateStaffDialog')
                        }
                    }).catch(error =>{
                        this.$message({
                            type:'error',
                            message: error.message
                        })
                    })
                } else {
                    return false;
                }
            });
        }
    },
    async mounted(){
        // if(this.store_id){
            try{
                await operateService.getStoreManagerSelection(1).then((data) =>{
                    console.log(data)
                })
            } catch(error){

            }
            
        // } else {

        // }
    }
}
</script>



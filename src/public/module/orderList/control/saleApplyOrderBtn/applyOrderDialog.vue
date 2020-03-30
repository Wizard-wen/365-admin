<template>
    <!-- 订单申请 -->
    <el-dialog
        v-loading="is_loading"
        title="订单申请"
        :visible.sync="applyOrderDialogVisible"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form :model="applyOrderForm" label-width="120px" :rules="applyOrderRules" ref="applyOrderForm">

            <el-form-item prop="work_type" ref="work_type" style="margin-bottom:30px;">
                <el-tooltip slot="label" class="item" effect="dark" content="若没有符合的工种，请选择最相近的工种。" placement="top-start">
                    <span>工种<i class="el-icon-info"></i></span>
                </el-tooltip>
                <el-cascader
                    v-model="applyOrderForm.work_type"
                    :props="{
                        label: 'name',
                        value: 'id',
                    }"
                    :options="workerConfigForm.skill"
                    :show-all-levels="false"></el-cascader>
            </el-form-item>
            <el-form-item label="服务地址" prop="service_address" ref="service_address">
                <el-input v-model="applyOrderForm.service_address" placeholder="请填写服务地址，尽量精确到门牌号。"></el-input>
            </el-form-item>

            <el-form-item label="工作时间" prop="service_duration" ref="service_duration">
                <el-input v-model="applyOrderForm.service_duration" placeholder="请填写工作时间，尽量精简，如，早八晚五。"></el-input>
            </el-form-item>

            <el-form-item label="工资" prop="wage" ref="wage">
                <el-input v-model="applyOrderForm.wage" placeholder="请填写工资信息，尽量精简，如，月薪3000"></el-input>
            </el-form-item>

            <el-form-item label="订单详情" prop="order_details" ref="order_details">
                <el-input v-model="applyOrderForm.order_details" placeholder="请填写订单详情，尽量精确，重点突出。如，会做辅食，会催乳，要求住家。"></el-input>
            </el-form-item>

            <el-form-item label="客户联系电话" prop="user_phone" ref="user_phone">
                <el-input v-model="applyOrderForm.user_phone" placeholder="请填写客户联系电话，务必准确！"></el-input>
            </el-form-item>

            <el-form-item label="客户姓名" prop="user_name" ref="user_name">
                <el-input v-model="applyOrderForm.user_name" placeholder="请填写客户姓名，务必准确！"></el-input>
            </el-form-item>

            <el-form-item  prop="apply_store_id" ref="apply_store_id">
                <el-tooltip slot="label" class="item" effect="dark" content="若订单通过自己、本门店资源获得，请选择本门店；若通过平台公共资源获得，请选择365总店-门店" placement="top-start">
                    <span>来源门店<i class="el-icon-info"></i></span>
                </el-tooltip>
                <el-select v-model="applyOrderForm.apply_store_id" @change="changeStoreList" placeholder="请选择来源门店">
                    <el-option
                        v-for="item in storeList"
                        :key="item.store_id"
                        :label="item.store_name"
                        :value="item.store_id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="来源人" prop="apply_manager_id" ref="apply_manager_id">
                <el-tooltip slot="label" class="item" effect="dark" content="若订单通过自己资源获得，选择自己；若是通过门店资源获得，请选择本门店；若通过平台公共资源获得，请选择365总店-门店" placement="top-start">
                    <span>来源门店<i class="el-icon-info"></i></span>
                </el-tooltip>
                <el-select v-model="applyOrderForm.apply_manager_id" placeholder="请选择来源人">
                    <el-option
                        v-for="item in storeManagerList"
                        :key="item.manager_id"
                        :label="item.real_name"
                        :value="item.manager_id"></el-option>
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

import {publicModuleService} from '@/service/publicModule'

export default {
    props:{
        /**
         * 控制组件的显示隐藏
         */
        applyOrderDialogVisible:{
            default:false,
            type: Boolean,
        },
    },
    data() {
        return {
            is_loading: false,
            storeList: [],//门店列表
            storeManagerList: [],//门店员工列表
            applyOrderForm: {
                work_type: 0, //工种
                service_address: '',//地址
                service_duration: '',//工作时间
                wage: '',//工资
                order_details: '',//订单详情

                
                user_phone: '',//客户联系电话
                user_name: '',//客户姓名
                apply_store_id: 1,//来源门店id
                apply_manager_id: 0,//来源人id
            },
            applyOrderRules: {
                work_type: [
                    { required: true, message: '请填写工种', trigger: 'change' }
                ],
                service_address: [
                    { required: true, message: '请填写服务地址', trigger: 'blur' }
                ],
                service_duration: [
                    { required: true, message: '请填写工作时间', trigger: 'blur' },
                    {  max: 10, message: '至多输入10个字符', trigger: 'blur' }
                ],
                wage: [
                    { required: true, message: '请填写工资', trigger: 'blur' },
                    {  max: 10, message: '至多输入10个字符', trigger: 'blur' }
                ],
                order_details: [
                    { required: true, message: '请填写订单详情', trigger: 'blur' }
                ],
                user_phone: [
                    { required: true, message: '请填写客户联系电话', trigger: 'blur' }
                ],
                user_name: [
                    { required: true, message: '请填写客户姓名', trigger: 'blur' }
                ],
 
            },
            workerConfigForm: {}
        }
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
        /**
         * 关闭申请弹窗
         */
        cancelApplyOrder(){
            this.$emit('closeCreateStaffDialog')
        },
        /**
         * 改变二级联动
         */
        async changeStoreList(value){
            try{
                this.is_loading = true
                await publicModuleService.getStoreManagerSelection(value).then(data =>{
                    if(data.code == '0'){
                        this.storeManagerList = data.data
                    }
                    this.is_loading = false
                }).catch(error =>{
                    this.$message({
                        type:'error',
                        message: error.message
                    })
                    this.is_loading = false
                })
            } catch(error){
                this.$message({
                    type:'error',
                    message: error.message
                })
                this.is_loading = false
            }
            
        },
        async onSubmit(formName){
            //校验并提交
            await this.$refs[formName].validate(async(valid) => {
                if (valid) {
                    try{
                        this.is_loading = true
                        let applyOrderForm = {
                            ...this.applyOrderForm
                        }
                        applyOrderForm.work_type = this.$utils.sendCascanderData(applyOrderForm.work_type)[0]

                        await publicModuleService.saleApplyOrder(applyOrderForm).then(data =>{
                            if(data.code == '0'){
                                this.$message({
                                    type:"success",
                                    message: data.message
                                })
                                this.is_loading = false
                                this.$emit('closeCreateStaffDialog')
                            }
                        }).catch(error =>{
                            this.$message({
                                type:'error',
                                message: error.message
                            })
                            this.is_loading = false
                        }).finally(() =>{
                            this.is_loading = false
                        })
                    } catch(error){
                        this.$message({
                            type:'error',
                            message: error.message
                        })
                        this.is_loading = false
                    }
                } else {
                    return false;
                }
            });
        }
    },
    async mounted(){
            try{
                this.is_loading = true
                await Promise.all([
                    publicModuleService.getStoreSelection(),
                    publicModuleService.getStoreManagerSelection(1),
                    publicModuleService.getPublicWorkerConfigForm('edit'),
                ]).then((data) =>{
                    this.storeList = data[0].data
                    this.storeManagerList = data[1].data
                    this.workerConfigForm = data[2].data
                    this.is_loading = false
                }).catch((error) =>{
                    this.$message({
                        type:'error',
                        message: error.message
                    })
                    this.is_loading = false
                })
            } catch(error){
                this.$message({
                    type:'error',
                    message: error.message
                })
                this.is_loading = false
            }
    }
}
</script>



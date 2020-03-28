<template>
    <div class="createOrder">
        <div class="layout-content">
            <div class="createOrderBox">
                <el-form  :model="createOrderForm" class="createOrderForm" label-width="120px" :rules="createOrderRules" ref="createOrderForm">

                    <el-form-item label="工种" prop="work_type" ref="work_type" style="margin-bottom:30px;">
                        <!-- <el-input v-model="createOrderForm.work_type" placeholder="请输入工种"></el-input> -->
                        <el-cascader
                            v-model="createOrderForm.work_type"
                            :props="{
                                label: 'name',
                                value: 'id',
                            }"
                            :options="workerConfigForm.skill"
                            :show-all-levels="false"></el-cascader>
                    </el-form-item>

                    <el-form-item label="服务地址" prop="service_address" ref="service_address">
                        <el-input v-model="createOrderForm.service_address" placeholder="请输入服务地址"></el-input>
                    </el-form-item>

                    <el-form-item label="工作时间" prop="service_duration" ref="service_duration">
                        <el-input v-model="createOrderForm.service_duration" placeholder="请输入工作时间"></el-input>
                    </el-form-item>

                    <el-form-item label="工资" prop="wage" ref="wage">
                        <el-input v-model="createOrderForm.wage" placeholder="请输入工资"></el-input>
                    </el-form-item>

                    <el-form-item label="订单详情" prop="order_details" ref="order_details">
                        <el-input v-model="createOrderForm.order_details" type="textarea" placeholder="请输入订单详情"></el-input>
                    </el-form-item>

                    <el-form-item label="客户联系电话" prop="order_user_phone" ref="order_user_phone">
                        <el-input v-model="createOrderForm.order_user_phone" placeholder="请输入客户联系电话"></el-input>
                    </el-form-item>

                    <el-form-item label="客户姓名" prop="order_user_name" ref="order_user_name">
                        <el-input v-model="createOrderForm.order_user_name" placeholder="请输入客户姓名"></el-input>
                    </el-form-item>

                    <el-form-item label="来源门店" prop="apply_store_id" ref="apply_store_id">
                        <el-select v-model="createOrderForm.apply_store_id" @change="changeStoreList('apply_store')" placeholder="请选择来源门店">
                            <el-option
                                v-for="item in storeList"
                                :key="item.store_id"
                                :label="item.store_name"
                                :value="item.store_id"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="来源人" prop="apply_manager_id" ref="apply_manager_id">
                        <el-select v-model="createOrderForm.apply_manager_id" placeholder="请选择来源人">
                            <el-option
                                v-for="item in applyStoreManagerList"
                                :key="item.manager_id"
                                :label="item.real_name"
                                :value="item.manager_id"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="经纪门店" prop="agent_store_id" ref="agent_store_id">
                        <el-select v-model="createOrderForm.agent_store_id" @change="changeStoreList('agent_store')" placeholder="请选择经纪门店">
                            <el-option
                                v-for="item in storeList"
                                :key="item.store_id"
                                :label="item.store_name"
                                :value="item.store_id"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="经纪人" prop="agent_manager_id" ref="agent_manager_id">
                        <el-select v-model="createOrderForm.agent_manager_id" placeholder="请选择经纪人">
                            <el-option
                                v-for="item in agentStoreManagerList"
                                :key="item.manager_id"
                                :label="item.real_name"
                                :value="item.manager_id"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="onSubmit('createOrderForm')">确定</el-button>
                        <el-button @click="goback">取 消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        
    </div>
    
    
</template>

<script>
// import {operateService} from '@common/index.js'
import {operateOrderService} from '@/service/operateOrder' 
export default {
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
            is_loading: false,
            storeList: [],//门店列表
            agentStoreManagerList: [],//门店经纪人列表
            applyStoreManagerList: [],//
            
            createOrderForm: {
                work_type: [], //工种
                service_address: '',//地址
                service_duration: '',//工作时间
                wage: '',//工资
                order_details: '',//订单详情

                order_user_phone: '',//客户联系电话
                order_user_name: '',//客户姓名
                
                apply_store_id: 1,//来源门店id
                apply_manager_id: 0,//来源人id
                agent_store_id: 1,//经纪门店id
                agent_manager_id: 0,//经纪人id

            },
            createOrderRules: {
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
                    {required: true, message: '请选择工种',trigger: 'change',},
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
            },
            workerConfigForm:{},
        }
    },
    methods: {
        /**
         * 改变二级联动
         */
        async changeStoreList(value){
            
            if(value == 'agent_store'){
                await this.getStoreManagerSelection(this.createOrderForm.agent_store_id).then(data =>{
                    this.agentStoreManagerList = data
                    this.createOrderForm.agent_manager_id = 0
                })
            } else {
                await this.getStoreManagerSelection(this.createOrderForm.apply_store_id).then(data =>{
                    this.applyStoreManagerList = data
                    this.createOrderForm.apply_manager_id = 0
                })
            }
        },
        /**
         * 获取门店员工
         */
        async getStoreManagerSelection(value){
            try{
                this.is_loading = true
                return operateOrderService.getStoreManagerSelection(value).then(data =>{
                    if(data.code == '0'){
                        return data.data
                        this.is_loading = false
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
        },
        async onSubmit(formName){
            //校验并提交
            await this.$refs[formName].validate(async(valid) => {
                if (valid) {
                    try{
                        this.is_loading = true
                        let createOrderForm = {
                            ...this.createOrderForm
                        }
                        createOrderForm.work_type =  this.$utils.sendCascanderData(createOrderForm.work_type)[0]
                        await operateOrderService.operateCreateOrder(createOrderForm).then(data =>{
                            if(data.code == '0'){
                                this.$message({
                                    type:"success",
                                    message: data.message
                                })
                                this.is_loading = false
                                this.goback()
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
        },
        /**
         * 初始化门店数据
         */
        async initSelectionData(){
            try{
                this.is_loading = true
                await Promise.all([
                    operateOrderService.getStoreSelection(),
                    operateOrderService.getStoreManagerSelection(1),
                    operateOrderService.getWorkerFormConfig()
                ]).then((data) =>{
                    this.storeList = data[0].data
                    this.agentStoreManagerList = data[1].data
                    this.applyStoreManagerList = data[1].data
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
        },
        goback(){
            this.$router.push('/operate/operateOrderList')
        }
    },
    async mounted(){
        this.initSelectionData()
    }
}
</script>

<style scoped lang="scss">
.createOrder{
    background: #f0f2f5;
	min-height: calc(100vh - 50px);
    width: 100%;
    padding: 24px;
    .layout-content{
        background: #fff;
        .createOrderBox{
            padding: 24px 0;
            width: 760px;
            margin: 0 auto;
        }
	}
}


</style>
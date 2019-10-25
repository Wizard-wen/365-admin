<template>
    <el-form :model="createOrderForm" class="createOrderForm" label-width="120px" :rules="createOrderRules" ref="createOrderForm">

        <el-form-item label="工种" prop="work_type" ref="work_type" style="margin-bottom:30px;">
            <el-input v-model="createOrderForm.work_type"></el-input>
        </el-form-item>

        <el-form-item label="服务地址" prop="service_address" ref="service_address">
            <el-input v-model="createOrderForm.service_address"></el-input>
        </el-form-item>

        <el-form-item label="工作时间" prop="service_duration" ref="service_duration">
            <el-input v-model="createOrderForm.service_duration"></el-input>
        </el-form-item>

        <el-form-item label="工资" prop="wage" ref="wage">
            <el-input v-model="createOrderForm.wage"></el-input>
        </el-form-item>

        <el-form-item label="订单详情" prop="order_details" ref="order_details">
            <el-input v-model="createOrderForm.order_details"></el-input>
        </el-form-item>

        <el-form-item label="客户联系电话" prop="user_phone" ref="user_phone">
            <el-input v-model="createOrderForm.user_phone"></el-input>
        </el-form-item>

        <el-form-item label="客户姓名" prop="user_name" ref="user_name">
            <el-input v-model="createOrderForm.user_name"></el-input>
        </el-form-item>

        <el-form-item label="来源门店" prop="apply_store_id" ref="apply_store_id">
            <el-select v-model="createOrderForm.apply_store_id" @change="changeStoreList" placeholder="请选择来源门店">
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
                    v-for="item in storeManagerList"
                    :key="item.manager_id"
                    :label="item.manager_name"
                    :value="item.manager_id"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="经纪门店" prop="agent_store_id" ref="agent_store_id">
            <el-select v-model="createOrderForm.agent_store_id" @change="changeStoreList" placeholder="请选择经纪门店">
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
                    v-for="item in storeManagerList"
                    :key="item.manager_id"
                    :label="item.manager_name"
                    :value="item.manager_id"></el-option>
            </el-select>
        </el-form-item>

        <el-form>
            <el-button @click="goback">取 消</el-button>
            <el-button type="primary" @click="onSubmit('createOrderForm')">确定</el-button>
        </el-form>
    </el-form>
</template>

<script>
import {operateService} from '../../../../common'
export default {
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
            is_loading: false,
            storeList: [],//门店列表
            storeManagerList: [],//门店员工列表
            createOrderForm: {
                work_type: '', //工种
                service_address: '',//地址
                service_duration: '',//工作时间
                wage: '',//工资
                order_details: '',//订单详情
                user_phone: '',//客户联系电话
                user_name: '',//客户姓名
                apply_store_id: 1,//来源门店id
                apply_manager_id: 0,//来源人id
                agent_store_id: 1,//经纪门店id
                agent_manager_id: 0,//经纪人id

            },
            createOrderRules: {
                work_type: [
                    { required: true, message: '请填写工种', trigger: 'blur' }
                ],
                service_address: [
                    { required: true, message: '请填写服务地址', trigger: 'blur' }
                ],
                service_duration: [
                    { required: true, message: '请填写工作时间', trigger: 'blur' }
                ],
                wage: [
                    { required: true, message: '请填写工资', trigger: 'blur' }
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
 
            }
        }
    },
    methods: {
        /**
         * 改变二级联动
         */
        async changeStoreList(value){
            await operateService.getStoreManagerSelection(value).then(data =>{
                this.storeManagerList = data.data
            })
        },
        async onSubmit(formName){
            //校验并提交
            await this.$refs[formName].validate(async(valid) => {
                if (valid) {
                    try{
                        this.is_loading = true
                        await operateService.applyOrder(this.createOrderForm).then(data =>{
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
        goback(){
            this.$router.push('/operate/operateOrderList')
        }
    },
    async mounted(){
        try{
            this.is_loading = true
            await Promise.all([
                operateService.getStoreSelection(),
                operateService.getStoreManagerSelection(1)
            ]).then((data) =>{
                this.storeList = data[0].data
                this.storeManagerList = data[1].data
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

<style>

</style>
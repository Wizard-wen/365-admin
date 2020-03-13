<template>
    <div class="search-box">
        <el-form :inline="true" size="mini" ref="localQueryedForm" label-width="140px" :model="localQueryedForm" class="account-form">
            <el-form-item label="订单编号" prop="order_code">
                <el-input class="input" style="width: 173px" v-model="localQueryedForm.order_code" placeholder="请输入订单编号" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="订单状态" prop="type">
                <el-select 
                    v-model="localQueryedForm.type" 
                    placeholder="请选择订单状态"
                    filterable
                    clearable>
                    <el-option 
                        v-for="(item, index) in order_typeList" 
                        :key="index" 
                        :label="item.name" 
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item >
            <el-form-item label="客户下单时间" prop="order_at">
                <el-select 
                    v-model="localQueryedForm.order_at" 
                    placeholder="请选择客户下单时间"
                    filterable
                    clearable>
                    <el-option 
                        v-for="(item, index) in created_atList" 
                        :key="index" 
                        :label="item.name" 
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item >
            <el-form-item label="下单客户电话" prop="order_user_phone">
                <el-input class="input" style="width: 173px" v-model="localQueryedForm.order_user_phone" placeholder="请输入下单客户电话" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="下单客户" prop="order_user_name">
                <el-input class="input" style="width: 173px" v-model="localQueryedForm.order_user_name" placeholder="请输入下单客户" :maxlength="20"></el-input>
            </el-form-item>

            <el-form-item label="来源人" prop="apply_manager_id">
                <el-select 
                    v-model="localQueryedForm.apply_manager_id" 
                    placeholder="请选择来源人"
                    filterable
                    clearable>
                    <el-option 
                        v-for="(item, index) in queryForm.apply_manager_id" 
                        :key="index" 
                        :label="item.name" 
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item >
            <el-form-item label="来源门店" prop="apply_store_id"> 
                <el-select 
                    v-model="localQueryedForm.apply_store_id" 
                    placeholder="请选择来源门店"
                    filterable
                    clearable>
                    <el-option 
                        v-for="(item, index) in queryForm.apply_store_id" 
                        :key="index" 
                        :label="item.name" 
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item >
            <el-form-item label="签约客户" prop="sign_user_name">
                <el-input class="input" style="width: 173px" v-model="localQueryedForm.sign_user_name" placeholder="请输入签约客户" :maxlength="20"></el-input>
            </el-form-item>

            <el-form-item label="签约客户电话" prop="sign_user_phone">
                <el-input class="input" style="width: 173px" v-model="localQueryedForm.sign_user_phone" placeholder="请输入签约客户电话" :maxlength="20"></el-input>
            </el-form-item>

            <el-form-item label="签约服务人员姓名" prop="sign_staff_name">
                <el-input class="input" style="width: 173px" v-model="localQueryedForm.sign_staff_name" placeholder="请输入签约服务人员姓名" :maxlength="20"></el-input>
            </el-form-item>

            <el-form-item label="签约服务人员电话" prop="sign_staff_phone">
                <el-input class="input" style="width: 173px" v-model="localQueryedForm.sign_staff_phone" placeholder="请输入签约服务人员电话" :maxlength="20"></el-input>
            </el-form-item>

            <el-form-item label="签约服务人员编号" prop="sign_staff_code">
                <el-input class="input" style="width: 173px" v-model="localQueryedForm.sign_staff_code" placeholder="请输入签约服务人员编号" :maxlength="20"></el-input>
            </el-form-item>

            <el-form-item label="订单创建时间" prop="created_at">
                <el-select 
                    v-model="localQueryedForm.created_at" 
                    placeholder="请选择订单创建时间"
                    filterable
                    clearable>
                    <el-option 
                        v-for="(item, index) in created_atList" 
                        :key="index" 
                        :label="item.name" 
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item >

            <el-form-item label="订单创建人" prop="created_manager_id">
                <el-select 
                    v-model="localQueryedForm.created_manager_id" 
                    placeholder="请选择订单创建人"
                    filterable
                    clearable>
                    <el-option 
                        v-for="(item, index) in queryForm.apply_manager_id" 
                        :key="index" 
                        :label="item.name" 
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item >


            <el-form-item label="订单经纪人" prop="agent_manager_id" v-if="presentUser.is_store_manager != 1">
                <el-select 
                    v-model="localQueryedForm.agent_manager_id" 
                    placeholder="请选择订单经纪人"
                    filterable
                    clearable>
                    <el-option 
                        v-for="(item, index) in queryForm.apply_manager_id" 
                        :key="index" 
                        :label="item.name" 
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item >
            <el-form-item >
                <div style="width: 263px;display: flex;justify-content: flex-end">
                    <el-button type="primary" @click="searchForm">查询</el-button>
                    <el-button @click="resetForm('localQueryedForm')">重置</el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

import {
    created_atList,
    order_typeList
} from '@/public/module/orderList/IorderList.ts'
export default {
    data(){
        return {
            created_atList,
            order_typeList,
            localQueryedForm: {
                order_code: '', //订单编号
                order_at: [],//客户下单时间

                agent_manager_id: [],//订单经纪人
                agent_store_id: [],//订单经纪门店
                
                type: [],//订单状态
                order_user_phone:'',//下单客户电话
                order_user_name: '',//下单客户姓名
                apply_store_id: [],//来源门店
                apply_manager_id: [],//来源人
                sign_user_name: '',//签约客户名
                sign_user_phone: '',//签约客户电话
                sign_staff_name: '',//签约服务人员姓名
                sign_staff_code: '',//签约服务人员编号
                sign_staff_phone: '',//签约服务人员电话
                created_at: [],//订单创建时间
                created_manager_id: [],//订单创建人
            }
        }
    },
    computed: {
        /**
         * 当前用户信息
         */
        presentUser(){
            return this.$store.state.loginModule.user
        },
    },
    props: {
        /**
         * 待选择的数据
         */
        queryForm: {
            type: Object,
            default: function(){
                return {}
            }
        },
    },
    methods: {
        /**
         * 搜索
         */
        searchForm(){
            let sendForm = {
                ...this.localQueryedForm,
            }
            sendForm.order_at = sendForm.order_at? [sendForm.order_at]: []
            sendForm.agent_manager_id = sendForm.agent_manager_id? [sendForm.agent_manager_id]: []
            sendForm.agent_store_id = sendForm.agent_store_id? [sendForm.agent_store_id]: []
            sendForm.type = sendForm.type? [sendForm.type]: []
            sendForm.apply_store_id = sendForm.apply_store_id? [sendForm.apply_store_id]: []
            sendForm.apply_manager_id = sendForm.apply_manager_id? [sendForm.apply_manager_id]: []
            sendForm.created_at = sendForm.created_at? [sendForm.created_at]: []
            sendForm.created_manager_id = sendForm.created_manager_id? [sendForm.created_manager_id]: []
            this.$emit('changeQueryedForm', sendForm)
        },
        /**
         * 重置
         */
        resetForm(formName) {
            this.$refs[formName].resetFields();

            this.searchForm()
        }
    }
}
</script>

<style lang="scss" scoped>
    .search-box{
        background: #fff;
        padding: 18px 30px 18px 30px;
        margin-bottom: 18px;
        .account-form{
            background: #fff;
        }
    }
</style>
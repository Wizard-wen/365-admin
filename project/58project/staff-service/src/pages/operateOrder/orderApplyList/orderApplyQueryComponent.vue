<template>
    <div class="search-box">
        <el-form :inline="true" size="mini" ref="localQueryedForm" label-width="140px" :model="localQueryedForm" class="account-form">
            <el-form-item label="订单编号" prop="apply_code">
                <el-input class="input" style="width: 173px" v-model="localQueryedForm.apply_code" placeholder="请输入订单编号" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="订单申请状态" prop="type">
                <el-select 
                    v-model="localQueryedForm.type" 
                    placeholder="请选择订单申请状态"
                    filterable
                    clearable>
                    <el-option 
                        v-for="(item, index) in order_typeList" 
                        :key="index" 
                        :label="item.name" 
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item >
            <el-form-item label="申请订单时间" prop="created_at">
                <el-select 
                    v-model="localQueryedForm.created_at" 
                    placeholder="请选择申请订单时间"
                    filterable
                    clearable>
                    <el-option 
                        v-for="(item, index) in created_atList" 
                        :key="index" 
                        :label="item.name" 
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item >
            <el-form-item label="申请订单创建人" prop="created_manager_id">
                <el-select 
                    v-model="localQueryedForm.created_manager_id" 
                    placeholder="请选择申请订单创建人"
                    filterable
                    clearable>
                    <el-option 
                        v-for="(item, index) in queryForm.apply_manager_id" 
                        :key="index" 
                        :label="item.name" 
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item >
            <el-form-item label="客户电话" prop="user_phone">
                <el-input class="input" style="width: 173px" v-model="localQueryedForm.order_user_phone" placeholder="请输入下单客户电话" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="客户姓名" prop="user_name">
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
                type: [],//订单申请类型
                apply_manager_id:[],//来源人id
                apply_store_id: [],//来源门店id
                apply_code: '',//订单申请编号
                created_manager_id: [],//申请创建人id
                user_phone: '',//客户电话
                user_name: '',//客户姓名
                created_at: [],//创建时间
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

            this.setSearchForm()
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
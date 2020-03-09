<template>
    <div class="search-box">
        <el-form :inline="true" size="mini" ref="localQueryedForm" label-width="120px" :model="localQueryedForm" class="account-form">
            <el-form-item label="订单编号" prop="order_code">
                <el-input class="input" style="width: 173px" v-model="localQueryedForm.order_code" placeholder="请输入订单编号" :maxlength="20"></el-input>
            </el-form-item>
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
            <el-form-item label="订单经纪人" prop="agent_manager_id">
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
            <el-form-item label="订单经纪门店" prop="agent_store_id">
                <el-select 
                    v-model="localQueryedForm.agent_store_id" 
                    placeholder="请选择订单经纪门店"
                    filterable
                    clearable>
                    <el-option 
                        v-for="(item, index) in queryForm.apply_store_id" 
                        :key="index" 
                        :label="item.name" 
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>
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

import {created_atList} from '@/public/module/orderList/IorderList.ts'
export default {
    data(){
        return {
            created_atList,
            localQueryedForm: {
                order_code: '', //订单编号
                order_at: [],//客户下单时间
                agent_manager_id: [],//订单经纪人
                agent_store_id: [],//订单经纪门店
            }
        }
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
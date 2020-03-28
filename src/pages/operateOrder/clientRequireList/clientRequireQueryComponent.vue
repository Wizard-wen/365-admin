<template>
    <div class="search-box">
        <el-form :inline="true" size="mini" ref="localQueryedForm" label-width="140px" :model="localQueryedForm" class="account-form">
            <el-form-item label="订单编号" prop="require_code">
                <el-input class="input" style="width: 173px" v-model="localQueryedForm.require_code" placeholder="请输入订单编号" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="订单申请状态" prop="type">
                <el-select 
                    v-model="localQueryedForm.type" 
                    placeholder="请选择订单申请状态"
                    filterable
                    clearable>
                    <el-option 
                        v-for="(item, index) in order_apply_typeList" 
                        :key="index" :label="item.name" :value="item.id"></el-option>
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
                        :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item >
            <el-form-item label="客户电话" prop="user_phone">
                <el-input class="input" style="width: 173px" v-model="localQueryedForm.user_phone" placeholder="请输入下单客户电话" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="客户姓名" prop="user_name">
                <el-input class="input" style="width: 173px" v-model="localQueryedForm.user_name" placeholder="请输入下单客户" :maxlength="20"></el-input>
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

import {
    created_atList
} from '@/public/module/orderList/IorderList.ts'

import {order_apply_typeList} from '@/public/module/orderApplyList/IorderApplyList.ts'

export default {
    data(){
        return {
            created_atList,
            order_apply_typeList,
            localQueryedForm: {
                type: [],//订单申请类型
                require_code: '',//订单申请编号
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
            sendForm.created_at = sendForm.created_at? [sendForm.created_at]: []
            
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
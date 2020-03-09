<template>
    <div class="search-box">
        <el-form :inline="true" size="mini" ref="localQueryedForm" label-width="140px" :model="localQueryedForm" class="account-form">
            <el-form-item label="合同流水号" prop="contract_code">
                <el-input class="input" style="width: 173px" v-model="localQueryedForm.contract_code" placeholder="请输入合同流水号" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="合同编号" prop="contract_number">
                <el-input class="input" style="width: 173px" v-model="localQueryedForm.contract_number" placeholder="请输入合同编号" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="签约时间" prop="sign_at">
                <el-select 
                    v-model="localQueryedForm.sign_at" 
                    placeholder="请选择签约时间"
                    filterable
                    clearable>
                    <el-option 
                        v-for="(item, index) in created_atList" 
                        :key="index" 
                        :label="item.name" 
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item >
            <el-form-item label="经纪人" prop="sign_manager_id">
                <el-select 
                    v-model="localQueryedForm.sign_manager_id" 
                    placeholder="请选择经纪人"
                    filterable
                    clearable>
                    <el-option 
                        v-for="(item, index) in contract_typeList" 
                        :key="index" 
                        :label="item.name" 
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item >
            <el-form-item label="合同状态" prop="status">
                <el-select 
                    v-model="localQueryedForm.status" 
                    placeholder="请选择合同状态"
                    filterable
                    clearable>
                    <el-option 
                        v-for="(item, index) in contract_typeList" 
                        :key="index" 
                        :label="item.name" 
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item >

            <el-form-item label="雇主姓名" prop="sign_user_name">
                <el-input class="input" style="width: 173px" v-model="localQueryedForm.sign_user_name" placeholder="请输入订单编号" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="雇主电话" prop="sign_user_phone">
                <el-input class="input" style="width: 173px" v-model="localQueryedForm.sign_user_phone" placeholder="请输入订单编号" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="服务人员姓名" prop="sign_staff_name">
                <el-input class="input" style="width: 173px" v-model="localQueryedForm.sign_staff_name" placeholder="请输入订单编号" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="服务人员工号" prop="sign_staff_code">
                <el-input class="input" style="width: 173px" v-model="localQueryedForm.sign_staff_code" placeholder="请输入订单编号" :maxlength="20"></el-input>
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
    created_atList,
} from '@/public/module/orderList/IorderList.ts'
import{
    contract_typeList,
}  from '@/public/module/contractList/IcontractList.ts'
export default {
    data(){
        return {
            created_atList,
            contract_typeList,
            localQueryedForm: {
                contract_code: '',//合同流水号
                contract_number: '',//合同编号
                sign_at: [],//签约时间
                sign_manager_id: [],//经纪人
                status: [],//合同状态
                sign_user_name: '',//雇主姓名
                sign_user_phone: '',//雇主电话
                sign_staff_name: '',//服务人员姓名
                sign_staff_code: '',//服务人员工号
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
            this.$emit('changeQueryedForm', sendForm)
        },
        /**
         * 重置
         */
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.$emit('changeQueryedForm', this.localQueryedForm)
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
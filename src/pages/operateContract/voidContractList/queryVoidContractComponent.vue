<template>
    <div class="search-box">
        <el-form :inline="true" size="mini" ref="localQueryedForm" label-width="140px" :model="localQueryedForm" class="account-form">
            <el-form-item label="空合同编号" prop="contract_number">
                <el-input class="input" style="width: 173px" v-model="localQueryedForm.contract_number" placeholder="请输入空合同编号" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="创建时间" prop="created_at">
                <el-select 
                    v-model="localQueryedForm.created_at" 
                    placeholder="请选择创建时间"
                    filterable
                    clearable>
                    <el-option 
                        v-for="(item, index) in created_atList" 
                        :key="index" 
                        :label="item.name" 
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item >
            <el-form-item label="分派时间" prop="assign_at">
                <el-select 
                    v-model="localQueryedForm.assign_at" 
                    placeholder="请选择分派时间"
                    filterable
                    clearable>
                    <el-option 
                        v-for="(item, index) in created_atList" 
                        :key="index" 
                        :label="item.name" 
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item >
            <el-form-item label="空合同状态" prop="type">
                <el-select 
                    v-model="localQueryedForm.type" 
                    placeholder="请选择空合同状态"
                    filterable
                    clearable>
                    <el-option 
                        v-for="(item, index) in voidContractTypeList" 
                        :key="index" 
                        :label="item.name" 
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item >
            <el-form-item label="所属经纪人" prop="manager_id">
                <el-select 
                    v-model="localQueryedForm.manager_id" 
                    placeholder="请选择经纪人"
                    filterable
                    clearable>
                    <el-option 
                        v-for="(item, index) in queryForm.storeManagerList" 
                        :key="index" 
                        :label="item.real_name" 
                        :value="item.manager_id"></el-option>
                </el-select>
            </el-form-item >
            
            <el-form-item >
                <div style="width: 263px;display: flex;justify-content: flex-end">
                    <el-button type="primary" @click="searchForm">查询</el-button>
                    <el-button @click="resetForm('localQueryedForm')">重置</el-button>
                </div>
            </el-form-item>
        </el-form>
        <!-- <el-form :model="localQueryedForm1">
            <el-form-item label="空合同状态" prop="" v-if="localQueryedForm.assign_at == 1">
                <el-select 
                    v-model="localQueryedForm1.type1" 
                    placeholder="请选择空合同状态"
                    multiple
                    filterable
                    clearable>
                    <el-option 
                        v-for="(item, index) in voidContractTypeList" 
                        :key="index" 
                        :label="item.name" 
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item >
        </el-form> -->
    </div>
</template>

<script>

import {created_atList} from '@/public/module/orderList/IorderList.ts'

import {voidContractTypeList} from '@/pages/operateContract/voidContractList/IvoidContractList.ts'

export default {
    data(){
        return {
            created_atList,
            // contract_typeList,
            voidContractTypeList,
            localQueryedForm: {
                contract_number:'',
                created_at: [],
                assign_at: [],
                type: [],
                manager_id: [],
            },
            // localQueryedForm1: {
            //     type1: [],
            // }
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
            sendForm.created_at = sendForm.created_at? [sendForm.created_at]: []
            sendForm.assign_at = sendForm.assign_at? [sendForm.assign_at]: []
            sendForm.manager_id = sendForm.manager_id? [sendForm.manager_id]: []
            sendForm.type = sendForm.type? [sendForm.type]: []
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
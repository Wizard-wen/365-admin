<template>
    <div class="search-box">
        <el-form :inline="true" size="mini" ref="localQueryedForm" label-width="90px" :model="localQueryedForm" class="account-form">
            <el-form-item label="门店名" prop="name">
                <el-input class="input" style="width: 173px" v-model="localQueryedForm.name" placeholder="请输入服务人员姓名" :maxlength="20"></el-input>
            </el-form-item>

            <el-form-item label="店长" prop="store_manager_name">
                <el-input class="input" style="width: 173px" v-model="localQueryedForm.store_manager_name" placeholder="请输入店长姓名" :maxlength="20"></el-input>
            </el-form-item>

            <el-form-item label="门店编号" prop="store_code">
                <el-input class="input" style="width: 173px" v-model="localQueryedForm.store_code" placeholder="请输入门店编号" :maxlength="20"></el-input>
            </el-form-item>

            <el-form-item label="门店类型" prop="is_third">
                <el-select v-model="localQueryedForm.is_third" placeholder="请选择接单状态" clearable multiple>
                    <el-option 
                        v-for="(item, index) in is_thirdList" 
                        :key="index" 
                        :label="item.name" 
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="经营状态" prop="type">
                <el-select v-model="localQueryedForm.type" placeholder="请选择经营状态" clearable multiple>
                    <el-option 
                        v-for="(item, index) in runTypeList" 
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

import {is_thirdList,runTypeList} from '../IStoreList'
export default {
    data(){
        return {
            is_thirdList,
            runTypeList,
            localQueryedForm: {
                is_third: [],
                type: [],
                name: '',
                store_manager_name: '',
                store_code: '',
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
            this.$emit('changeQueryedForm', this.localQueryedForm)
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
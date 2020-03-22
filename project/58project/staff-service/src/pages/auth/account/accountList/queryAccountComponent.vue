<template>
<div class="search-box">
    <el-form :inline="true" size="mini" ref="localQueryedForm" label-width="90px" :model="localQueryedForm" class="account-form">
        <el-form-item label="姓名" prop="name">
            <el-input class="input" v-model="localQueryedForm.name" placeholder="请输入管理员名" :maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="department_id">
            <el-select 
                v-model="localQueryedForm.department_id" 
                placeholder="请选择部门"
                filterable
                clearable>
                <el-option 
                    v-for="(item, index) in tableConfigForm.departmentList" 
                    :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="门店" prop="store_id">
            <el-select 
                v-model="localQueryedForm.store_id" 
                placeholder="请选择门店"
                filterable
                clearable>
                <el-option 
                    v-for="(item, index) in tableConfigForm.store_selection" 
                    :key="index" :label="item.name" :value="item.id"></el-option>
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
export default {
    data(){
        return {
            cascaderProps: {
                label:'name',
                value:'id'
            },
            localQueryedForm: {
                name: '', //姓名
                department_id: 0,
                store_id: 0,
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
        tableConfigForm: {
            type: Object,
            default: function(){
                return {}
            }
        }
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
            this.searchForm()
        }
    },
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
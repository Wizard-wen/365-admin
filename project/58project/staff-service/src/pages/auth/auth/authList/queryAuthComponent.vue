<template>
<div class="search-box">
    <el-form :inline="true" size="mini" ref="localQueryedForm" label-width="90px" :model="localQueryedForm" class="account-form">
        <el-form-item label="权限名" prop="title">
            <el-input class="input" v-model="localQueryedForm.title" placeholder="请输入权限名" :maxlength="20"></el-input>
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
            localQueryedForm: {
                title: '', //角色名
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
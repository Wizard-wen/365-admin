<template>
    <div class="search-box">
        <el-form :inline="true" size="mini" ref="localQueryedForm" label-width="90px" :model="localQueryedForm" class="account-form">
            <el-form-item label="姓名" prop="name">
                <el-input placeholder="请输入姓名" v-model="localQueryedForm.name" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
                <el-input placeholder="请输入电话号" v-model="localQueryedForm.phone" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item >
                <div style="width: 263px;display: flex;justify-content: flex-end">
                    <el-button type="primary" @click="searchForm">查询</el-button>
                    <el-button type="primary" @click="resetForm('localQueryedForm')">重置</el-button>
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
                phone: '',
                name: '',
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
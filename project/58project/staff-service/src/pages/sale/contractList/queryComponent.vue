<template>
    <div class="queryBox">
        <query-search-input
            @updateTable="updateTable"
            :queryKey="'contract_code'"
            :queryName="'合同流水号'"></query-search-input>
        <query-search-input
            @updateTable="updateTable"
            :queryKey="'contract_number'"
            :queryName="'合同编号'"></query-search-input>
        <query-search-list
            @updateTable="updateTable"
            :queryKey="'sign_at'"
            :queryName="'签约时间'"
            :queryList="saleContractConfigForm.sign_at"
            :isSingleQuery="true"></query-search-list>
        <query-search-list
            @updateTable="updateTable"
            :queryKey="'sign_manager_id'"
            :queryName="'经纪人'"
            :queryList="saleContractConfigForm.sign_manager_id"
            :isSingleQuery="true"></query-search-list>
        <query-search-list
            @updateTable="updateTable"
            :queryKey="'sign_store_id'"
            :queryName="'经纪门店'"
            :queryList="saleContractConfigForm.sign_store_id"
            :isSingleQuery="true"></query-search-list>
        <query-search-list
            @updateTable="updateTable"
            :queryKey="'type'"
            :queryName="'合同状态'"
            :queryList="saleContractConfigForm.type"
            :isSingleQuery="true"></query-search-list>
        <query-search-input
            @updateTable="updateTable"
            :queryKey="'sign_user_name'"
            :queryName="'雇主姓名'"></query-search-input>
        <query-search-input
            @updateTable="updateTable"
            :queryKey="'sign_user_phone'"
            :queryName="'雇主电话'"></query-search-input>
        <query-search-input
            @updateTable="updateTable"
            :queryKey="'sign_staff_name'"
            :queryName="'服务人员姓名'"></query-search-input>
        <query-search-input
            @updateTable="updateTable"
            :queryKey="'sign_staff_code'"
            :queryName="'服务人员工号'"></query-search-input>
    </div>
</template>
<script>
import {
    querySearchList,
    querySearchInput,
} from './queryComponent/index.js'
export default {
    data(){
        return {
            setWorkerConfigForm: [],//本地接收的搜索config字段
        }
    },
    components: {
        querySearchList,
        querySearchInput,
    },
    computed:{
        /**
         * 合同筛选字段
         */
        saleContractConfigForm(){
            return this.$store.state.saleModule.saleContractConfigForm
        },
    },
    methods: {
        // 更新表格数据
        updateTable(){
            this.$emit('updateTable')
        }
    },
}
</script>
<style lang="scss" scoped>

</style>



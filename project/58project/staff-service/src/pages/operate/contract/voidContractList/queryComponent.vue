<template>
    <div class="queryBox">
        <query-search-input
            @updateTable="updateTable"
            :queryKey="'contract_number'"
            :queryName="'空合同编号'"></query-search-input>
        <query-search-list
            @updateTable="updateTable"
            :queryKey="'created_at'"
            :queryName="'创建时间'"
            :queryList="voidContractConfigForm.created_at"
            :isSingleQuery="true"></query-search-list>
        <query-search-list
            @updateTable="updateTable"
            :queryKey="'assign_at'"
            :queryName="'分派时间'"
            :queryList="voidContractConfigForm.assign_at"
            :isSingleQuery="true"></query-search-list>
        <query-search-list
            @updateTable="updateTable"
            :queryKey="'type'"
            :queryName="'空合同状态'"
            :queryList="voidContractConfigForm.type"
            :isSingleQuery="true"></query-search-list>
        <query-search-list
            @updateTable="updateTable"
            :queryKey="'manager_id'"
            :queryName="'经纪人'"
            :queryList="voidContractConfigForm.manager_id"
            :isSingleQuery="true"></query-search-list>
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
         * 订单筛选字段
         */
        voidContractConfigForm(){
            return this.$store.state.operateModule.voidContractConfigForm
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



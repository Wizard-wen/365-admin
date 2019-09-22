<template>
    <div class="">
        <query-search-list
            @updateTable="updateTable"
            :queryKey="'type'"
            :queryName="'订单申请状态'"
            :queryList="clientRequireConfig.type"
            :isSingleQuery="true"></query-search-list>
        <query-search-input
            @updateTable="updateTable"
            :queryKey="'apply_code'"
            :queryName="'订单申请编号'"></query-search-input>
        <query-search-input
            @updateTable="updateTable"
            :queryKey="'user_phone'"
            :queryName="'客户联系电话'"></query-search-input>
        <query-search-input
            @updateTable="updateTable"
            :queryKey="'user_name'"
            :queryName="'客户姓名'"></query-search-input>
        <query-search-list
            @updateTable="updateTable"
            :queryKey="'created_at'"
            :queryName="'下单时间'"
            :queryList="clientRequireConfig.created_at"
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
        clientRequireConfig(){
            return this.$store.state.operateModule.clientRequireConfig
        }
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



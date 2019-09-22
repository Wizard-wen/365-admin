<template>
    <div class="queryBox">
        <query-search-input
            @updateTable="updateTable"
            :queryKey="'name'"
            :queryName="'门店名'"></query-search-input>
        <query-search-input
            @updateTable="updateTable"
            :queryKey="'store_manager_name'"
            :queryName="'店员名'"></query-search-input>
        <query-search-input
            @updateTable="updateTable"
            :queryKey="'store_code'"
            :queryName="'门店编号'"></query-search-input>
        <query-search-list
            @updateTable="updateTable"
            :queryKey="'is_third'"
            :queryName="'门店类型'"
            :queryList="storeFormConfig.is_third"
            :isSingleQuery="true"></query-search-list>
        <query-search-list
            @updateTable="updateTable"
            :queryKey="'type'"
            :queryName="'经营状态'"
            :queryList="storeFormConfig.type"
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
         * 合同筛选字段
         */
        storeFormConfig(){
            return this.$store.state.storeModule.storeFormConfig
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



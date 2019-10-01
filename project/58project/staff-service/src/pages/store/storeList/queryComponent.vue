<template>
    <div class="queryBox">
        <query-search-input
            @updateSearchInput="updateSearchInput"
            :queryKey="'name'"
            :queryName="'门店名'"
            :selectedText="queryStoreList.name"></query-search-input>
        <query-search-input
            @updateSearchInput="updateSearchInput"
            :queryKey="'store_manager_name'"
            :queryName="'店员名'"
            :selectedText="queryStoreList.store_manager_name"></query-search-input>
        <query-search-input
            @updateSearchInput="updateSearchInput"
            :queryKey="'store_code'"
            :queryName="'门店编号'"
            :selectedText="queryStoreList.store_code"></query-search-input>
        <query-search-list
            @updateSearchList="updateSearchList"
            :queryKey="'is_third'"
            :queryName="'门店类型'"
            :queryList="storeFormConfig.is_third"
            :selectedList="queryStoreList.is_third"
            :isSingleQuery="true"></query-search-list>
        <query-search-list
            @updateSearchList="updateSearchList"
            :queryKey="'type'"
            :queryName="'经营状态'"
            :queryList="storeFormConfig.type"
            :selectedList="queryStoreList.type"
            :isSingleQuery="true"></query-search-list>
    </div>
</template>
<script>
import {
    querySearchList,
    querySearchInput,
} from '@/pages/components/index.js'

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
        queryStoreList(){
            return this.$store.state.storeModule.storeList
        }
    },
    methods: {
        // 
        updateSearchInput(queryObject){
            this.$store.commit('setStoreList', {
                queryKey: queryObject[0], 
                queryedList: queryObject[1]
            })
            this.$emit('updateTable')
        },
        updateSearchList(queryObject){
            this.$store.commit('setStoreList', {
                queryKey: queryObject[0], 
                queryedList: queryObject[1]
            })
            this.$emit('updateTable')
        }
    },
}
</script>
<style lang="scss" scoped>

</style>



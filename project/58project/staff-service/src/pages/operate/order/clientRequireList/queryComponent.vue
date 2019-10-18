<template>
    <div class="">
        <query-search-list
            @updateSearchList="updateSearchList"
            :selectedList="queryedClientRequire.type"
            :queryKey="'type'"
            :queryName="'订单申请状态'"
            :queryList="clientRequireConfig.type"
            :isSingleQuery="true"></query-search-list>
        <query-search-input
            @updateSearchInput="updateSearchInput"
            :selectedText="queryedClientRequire.require_code"
            :queryKey="'require_code'"
            :queryName="'订单申请编号'"></query-search-input>
        <query-search-input
            @updateSearchInput="updateSearchInput"
            :selectedText="queryedClientRequire.user_phone"
            :queryKey="'user_phone'"
            :queryName="'客户联系电话'"></query-search-input>
        <query-search-input
            @updateSearchInput="updateSearchInput"
            :selectedText="queryedClientRequire.user_name"
            :queryKey="'user_name'"
            :queryName="'客户姓名'"></query-search-input>
        <query-search-list
            @updateSearchList="updateSearchList"
            :selectedList="queryedClientRequire.created_at"
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
		 * 订单申请筛选字段
		 */
		clientRequireConfig(){
			return this.$store.state.operateModule.clientRequireConfig
		},
		queryedClientRequire(){
			return this.$store.state.operateModule.clientRequire
		}
    },
    methods: {
        updateSearchInput(queryObject){
            this.$store.commit('setClientRequire', {
                queryKey: queryObject[0], 
                queryedList: queryObject[1]
            })
            this.$emit('updateTable')
        },
        updateSearchList(queryObject){
            this.$store.commit('setClientRequire', {
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



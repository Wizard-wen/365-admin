<template>
    <div class="">
        <query-search-list
            @updateSearchList="updateSearchList"
            :selectedList="orderApplyQueryedList.type"
            :queryKey="'type'" 
            :queryName="'订单申请状态'" 
            :queryList="orderApplyFormConfig.type"
            :isSingleQuery="true"></query-search-list>
        <query-search-list
            @updateSearchList="updateSearchList"
            :selectedList="orderApplyQueryedList.apply_store_id"
            :queryKey="'apply_store_id'" 
            :queryName="'来源门店'" 
            :queryList="orderApplyFormConfig.apply_store_id"
            :isSingleQuery="true"></query-search-list>
        <query-search-list
            @updateSearchList="updateSearchList"
            :selectedList="orderApplyQueryedList.apply_manager_id"
            :queryKey="'apply_manager_id'" 
            :queryName="'来源人'" 
            :queryList="orderApplyFormConfig.apply_manager_id"
            :isSingleQuery="true"></query-search-list>
        <query-search-input
            @updateSearchInput="updateSearchInput"
            :selectedText="orderApplyQueryedList.apply_code"
            :queryKey="'apply_code'" 
            :queryName="'订单申请编号'"></query-search-input>   
        <query-search-list
            @updateSearchList="updateSearchList"
            :selectedList="orderApplyQueryedList.created_manager_id"
            :queryKey="'created_manager_id'" 
            :queryName="'申请创建人'" 
            :queryList="orderApplyFormConfig.created_manager_id"
            :isSingleQuery="true"></query-search-list>
        <query-search-input
            @updateSearchInput="updateSearchInput"
            :selectedText="orderApplyQueryedList.user_phone"
            :queryKey="'user_phone'" 
            :queryName="'客户联系电话'"></query-search-input> 
        <query-search-input
            @updateSearchInput="updateSearchInput"
            :selectedText="orderApplyQueryedList.user_name"
            :queryKey="'user_name'" 
            :queryName="'客户姓名'"></query-search-input>   
        <query-search-list
            @updateSearchList="updateSearchList"
            :selectedList="orderApplyQueryedList.created_at"
            :queryKey="'created_at'" 
            :queryName="'创建时间'" 
            :queryList="orderApplyFormConfig.created_at"
            :isSingleQuery="true"></query-search-list>
    </div>
</template>
<script>
export default {
    data(){
        return {
            setWorkerConfigForm: [],//本地接收的搜索config字段
        }
    },
    computed:{
        orderApplyFormConfig(){
            return this.$store.state.operateModule.orderApplyFormConfig
        },
        orderApplyQueryedList(){
            return this.$store.state.operateModule.orderApplyList
        }
    },
    methods: {
        updateSearchInput(queryObject){
            this.$store.commit('setOrderApplyList', {
                queryKey: queryObject[0], 
                queryedList: queryObject[1]
            })
            this.$emit('updateTable')
        },
        updateSearchList(queryObject){
            this.$store.commit('setOrderApplyList', {
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



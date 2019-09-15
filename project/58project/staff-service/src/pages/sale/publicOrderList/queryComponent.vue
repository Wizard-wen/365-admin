<template>
    <div class="queryBox">
        <query-search-input
            @updateTable="updateTable"
            :queryKey="'order_code'"
            :queryName="'订单编号'"></query-search-input>
        <query-search-list
            @updateTable="updateTable" 
            :queryKey="'order_at'" 
            :queryName="'客户下单时间'" 
            :isSingleQuery="true"
            :queryList="orderFormConfig.order_at"></query-search-list>
        <query-search-list
            @updateTable="updateTable" 
            :queryKey="'agent_manager_id'" 
            :queryName="'订单经纪人'" 
            :isSingleQuery="true"
            :queryList="orderFormConfig.agent_manager_id"></query-search-list>
        <query-search-list
            @updateTable="updateTable" 
            :queryKey="'agent_store_id'" 
            :queryName="'订单经纪门店'" 
            :isSingleQuery="true"
            :queryList="orderFormConfig.agent_store_id"></query-search-list>
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
        orderFormConfig(){
            return this.$store.state.operateModule.orderFormConfig
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



<template>
    <div class="queryBox">
       <query-search-input
            @updateSearchInput="updateSearchInput"
            :selectedText="queryOrderList.order_code"
            :queryKey="'order_code'"
            :queryName="'订单编号'"></query-search-input>
        <query-search-list
            @updateSearchList="updateSearchList"
            :selectedList="queryOrderList.order_at"
            :queryKey="'order_at'" 
            :queryName="'客户下单时间'" 
            :isSingleQuery="true"
            :queryList="orderFormConfig.order_at"></query-search-list>
        <query-search-list
            @updateSearchList="updateSearchList"
            :selectedList="queryOrderList.agent_manager_id"
            :queryKey="'agent_manager_id'" 
            :queryName="'订单经纪人'" 
            :isSingleQuery="true"
            :queryList="storeManagerList"></query-search-list>
        <query-search-list
            @updateSearchList="updateSearchList"
            :selectedList="queryOrderList.agent_store_id"
            :queryKey="'agent_store_id'" 
            :queryName="'订单经纪门店'" 
            :isSingleQuery="true"
            :queryList="orderFormConfig.agent_store_id"></query-search-list>
    </div>
</template>
<script>
import {
    operateService,
} from '@common/index.js'
export default {
    data(){
        return {
            setWorkerConfigForm: [],//本地接收的搜索config字段
            storeManagerList: [],
        }
    },
    computed:{
        /**
         * 订单筛选字段
         */
        orderFormConfig(){
            return this.$store.state.operateModule.orderFormConfig
        },
        queryOrderList(){
            return this.$store.state.saleModule.publicOrderList
        }
    },
    methods: {
        updateSearchInput(queryObject){
            this.$store.commit('saleSetPublicOrderList', {
                queryKey: queryObject[0], 
                queryedList: queryObject[1]
            })
            this.$emit('updateTable')
        },
        updateSearchList(queryObject){
            this.$store.commit('saleSetPublicOrderList', {
                queryKey: queryObject[0], 
                queryedList: queryObject[1]
            })
            this.$emit('updateTable')
        }
    },
    async mounted(){
        /**
         * 
         */
        try{
            await operateService.getDepartmentManagerSelection(4).then(data =>{
                this.storeManagerList = data.data.reduce((arr, item, index) =>{
                    if(item.manager_id == 0){
                        return arr
                    }
                    return [
                        ...arr,
                        {
                            id: item.manager_id,
                            name: item.real_name
                        }
                    ]
                },[])
            }).catch(error =>{
                throw error
            }).finally(() =>{

            })
        } catch(error){
            throw error
        }
        
    }
}
</script>
<style lang="scss" scoped>

</style>



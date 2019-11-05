<template>
    <div class="queryBox">
        <query-search-input
            @updateSearchInput="updateSearchInput"
            :selectedText="queryOrderList.order_code"
            :queryKey="'order_code'"
            :queryName="'订单编号'"></query-search-input>
        <query-search-list
            @updateSearchList="updateSearchList"
            :selectedList="queryOrderList.type"
            :queryKey="'type'" 
            :queryName="'订单状态'" 
            :isSingleQuery="true"
            :queryList="orderFormConfig.type"></query-search-list>
        <query-search-list
            @updateSearchList="updateSearchList"
            :selectedList="queryOrderList.order_at"
            :queryKey="'order_at'" 
            :queryName="'客户下单时间'" 
            :isSingleQuery="true"
            :queryList="orderFormConfig.order_at"></query-search-list>
        <query-search-input
            @updateSearchInput="updateSearchInput"
            :selectedText="queryOrderList.order_user_phone"
            :queryKey="'order_user_phone'"
            :queryName="'下单客户电话'"></query-search-input>
        <query-search-input
            @updateSearchInput="updateSearchInput"
            :selectedText="queryOrderList.order_user_name"
            :queryKey="'order_user_name'"
            :queryName="'下单客户'"></query-search-input>
        <query-search-list
            @updateSearchList="updateSearchList"
            :selectedList="queryOrderList.apply_manager_id"
            :queryKey="'apply_manager_id'" 
            :queryName="'来源人'" 
            :isSingleQuery="true"
            :queryList="storeManagerList"></query-search-list>
        <query-search-list
            @updateSearchList="updateSearchList"
            :selectedList="queryOrderList.apply_store_id"
            :queryKey="'apply_store_id'" 
            :queryName="'来源门店'" 
            :isSingleQuery="true"
            :queryList="orderFormConfig.apply_store_id"></query-search-list>
        <query-search-input
            @updateSearchInput="updateSearchInput"
            :selectedText="queryOrderList.sign_user_name"
            :queryKey="'sign_user_name'"
            :queryName="'签约客户'"></query-search-input>
        <query-search-input
            @updateSearchInput="updateSearchInput"
            :selectedText="queryOrderList.sign_user_phone"
            :queryKey="'sign_user_phone'"
            :queryName="'签约客户电话'"></query-search-input>
        <query-search-input
            @updateSearchInput="updateSearchInput"
            :selectedText="queryOrderList.sign_staff_name"
            :queryKey="'sign_staff_name'"
            :queryName="'签约服务人员姓名'"></query-search-input>
        <query-search-input
            @updateSearchInput="updateSearchInput"
            :selectedText="queryOrderList.sign_staff_phone"
            :queryKey="'sign_staff_phone'"
            :queryName="'签约服务人员电话'"></query-search-input>
        <query-search-input
            @updateSearchInput="updateSearchInput"
            :selectedText="queryOrderList.sign_staff_code"
            :queryKey="'sign_staff_code'"
            :queryName="'签约服务人员编号'"></query-search-input>
        <query-search-list
            @updateSearchList="updateSearchList"
            :selectedList="queryOrderList.created_at"
            :queryKey="'created_at'" 
            :queryName="'订单创建时间'" 
            :isSingleQuery="true"
            :queryList="orderFormConfig.created_at"></query-search-list>
        <query-search-list
            @updateSearchList="updateSearchList"
            :selectedList="queryOrderList.created_manager_id"
            :queryKey="'created_manager_id'" 
            :queryName="'订单创建人'" 
            :isSingleQuery="true"
            :queryList="operateManagerList"></query-search-list>
        <query-search-list
            v-if="presentUser.is_store_manager == 2"
            @updateSearchList="updateSearchList"
            :selectedList="queryOrderList.agent_manager_id"
            :queryKey="'agent_manager_id'" 
            :queryName="'订单经纪人'" 
            :isSingleQuery="true"
            :queryList="currentStoreManagerList"></query-search-list>
        <!-- <query-search-list

            @updateSearchList="updateSearchList"
            :selectedList="queryOrderList.agent_store_id"
            :queryKey="'agent_store_id'" 
            :queryName="'订单经纪门店'" 
            :isSingleQuery="true"
            :queryList="orderFormConfig.agent_store_id"></query-search-list> -->
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
            operateManagerList: [],
            currentStoreManagerList: [],
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
            return this.$store.state.saleModule.saleOrderList
        },
        /**
         * 当前用户信息
         */
        presentUser(){
            return this.$store.state.loginModule.user
        }
    },
    methods: {
        updateSearchInput(queryObject){
            this.$store.commit('saleSetOrderList', {
                queryKey: queryObject[0], 
                queryedList: queryObject[1]
            })
            this.$emit('updateTable')
        },
        updateSearchList(queryObject){
            this.$store.commit('saleSetOrderList', {
                queryKey: queryObject[0], 
                queryedList: queryObject[1]
            })
            this.$emit('updateTable')
        }
    },
    async mounted(){
        try{
            await Promise.all([
                operateService.getDepartmentManagerSelection(4),//销售
                operateService.getDepartmentManagerSelection(2),//运营
                operateService.getStoreManagerSelection(this.presentUser.store_id),//当前门店员工
            ]
            ).then(data =>{
                this.storeManagerList = data[0].data.reduce((arr, item, index) =>{
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
                this.operateManagerList = data[1].data.reduce((arr, item, index) =>{
                    return [
                        ...arr,
                        {
                            id: item.manager_id,
                            name: item.real_name
                        }
                    ]
                },[])
                this.currentStoreManagerList = data[2].data.reduce((arr, item, index) =>{
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



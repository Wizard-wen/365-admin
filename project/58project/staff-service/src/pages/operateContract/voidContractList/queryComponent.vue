<template>
    <div class="queryBox">
        <query-search-input
            @updateSearchInput="updateSearchInput"
            :selectedText="queryedVoidContractList.contract_number"
            :queryKey="'contract_number'"
            :queryName="'空合同编号'"></query-search-input>
        <query-search-list
            @updateSearchList="updateSearchList"
            :selectedList="queryedVoidContractList.created_at"
            :queryKey="'created_at'"
            :queryName="'创建时间'"
            :queryList="voidContractConfigForm.created_at"
            :isSingleQuery="true"></query-search-list>
        <query-search-list
            @updateSearchList="updateSearchList"
            :selectedList="queryedVoidContractList.assign_at"
            :queryKey="'assign_at'"
            :queryName="'分派时间'"
            :queryList="voidContractConfigForm.assign_at"
            :isSingleQuery="true"></query-search-list>
        <query-search-list
            @updateSearchList="updateSearchList"
            :selectedList="queryedVoidContractList.type"
            :queryKey="'type'"
            :queryName="'空合同状态'"
            :queryList="voidContractConfigForm.type"
            :isSingleQuery="true"></query-search-list>
        <query-search-list
            @updateSearchList="updateSearchList"
            :selectedList="queryedVoidContractList.manager_id"
            :queryKey="'manager_id'"
            :queryName="'经纪人'"
            :queryList="storeManagerList"
            :isSingleQuery="true"></query-search-list>
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
        voidContractConfigForm(){
            return this.$store.state.operateModule.voidContractConfigForm
        },
        queryedVoidContractList(){
            return this.$store.state.operateModule.voidContractList
        },
    },
    methods: {
        updateSearchInput(queryObject){
            this.$store.commit('setVoidContractList', {
                queryKey: queryObject[0], 
                queryedList: queryObject[1]
            })
            this.$emit('updateTable')
        },
        updateSearchList(queryObject){
            this.$store.commit('setVoidContractList', {
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



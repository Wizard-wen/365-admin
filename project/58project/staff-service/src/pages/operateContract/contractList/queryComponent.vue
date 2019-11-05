<template>
    <div class="queryBox">
        <query-search-input
            @updateSearchInput="updateSearchInput"
            :selectedText="queryedContractList.contract_code"
            :queryKey="'contract_code'"
            :queryName="'合同流水号'"></query-search-input>
        <query-search-input
            @updateSearchInput="updateSearchInput"
            :selectedText="queryedContractList.contract_number"
            :queryKey="'contract_number'"
            :queryName="'合同编号'"></query-search-input>
        <query-search-list
            @updateSearchList="updateSearchList"
            :selectedList="queryedContractList.sign_at"
            :queryKey="'sign_at'"
            :queryName="'签约时间'"
            :queryList="contractConfigForm.sign_at"
            :isSingleQuery="true"></query-search-list>
        <query-search-list
            @updateSearchList="updateSearchList"
            :selectedList="queryedContractList.sign_manager_id"
            :queryKey="'sign_manager_id'"
            :queryName="'经纪人'"
            :queryList="storeManagerList"
            :isSingleQuery="true"></query-search-list>
        <query-search-list
            @updateSearchList="updateSearchList"
            :selectedList="queryedContractList.sign_store_id"
            :queryKey="'sign_store_id'"
            :queryName="'经纪门店'"
            :queryList="contractConfigForm.sign_store_id"
            :isSingleQuery="true"></query-search-list>
        <query-search-list
            @updateSearchList="updateSearchList"
            :selectedList="queryedContractList.type"
            :queryKey="'type'"
            :queryName="'合同状态'"
            :queryList="contractConfigForm.type"
            :isSingleQuery="true"></query-search-list>
        <query-search-input
            @updateSearchInput="updateSearchInput"
            :selectedText="queryedContractList.sign_user_name"
            :queryKey="'sign_user_name'"
            :queryName="'雇主姓名'"></query-search-input>
        <query-search-input
            @updateSearchInput="updateSearchInput"
            :selectedText="queryedContractList.sign_user_phone"
            :queryKey="'sign_user_phone'"
            :queryName="'雇主电话'"></query-search-input>
        <query-search-input
            @updateSearchInput="updateSearchInput"
            :selectedText="queryedContractList.sign_staff_name"
            :queryKey="'sign_staff_name'"
            :queryName="'服务人员姓名'"></query-search-input>
        <query-search-input
            @updateSearchInput="updateSearchInput"
            :selectedText="queryedContractList.sign_staff_code"
            :queryKey="'sign_staff_code'"
            :queryName="'服务人员工号'"></query-search-input>
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
         * 合同筛选字段
         */
        contractConfigForm(){
            return this.$store.state.operateModule.contractConfigForm
        },
        queryedContractList(){
            return this.$store.state.operateModule.contractList
        }
    },
    methods: {
        updateSearchInput(queryObject){
            this.$store.commit('setContractList', {
                queryKey: queryObject[0], 
                queryedList: queryObject[1]
            })
            this.$emit('updateTable')
        },
        updateSearchList(queryObject){
            this.$store.commit('setContractList', {
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



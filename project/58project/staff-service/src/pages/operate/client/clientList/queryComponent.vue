<template>
    <div class="">
        <!-- <query-search-list
            @updateSearchList="updateSearchList"
            :selectedList="queryedClientList.authentication"
            :queryKey="'authentication'" 
            :queryName="'认证状态'" 
            :queryList="clientConfigForm.authentication"></query-search-list> -->
        <query-search-input
            @updateSearchInput="updateSearchInput"
            :selectedText="queryedClientList.name"
            :queryKey="'name'" 
            :queryName="'姓名'"></query-search-input>
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
        }
    },
    components: {
        querySearchList,
        querySearchInput,
    },
    computed:{
        clientConfigForm(){
            return this.$store.state.operateModule.clientConfigForm
        },
        queryedClientList(){
            return this.$store.state.operateModule.clientList
        }
    },
    methods: {
        updateSearchInput(queryObject){
            this.$store.commit('setClientList', {
                queryKey: queryObject[0], 
                queryedList: queryObject[1]
            })
            this.$emit('updateTable')
        },
        updateSearchList(queryObject){
            this.$store.commit('setClientList', {
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



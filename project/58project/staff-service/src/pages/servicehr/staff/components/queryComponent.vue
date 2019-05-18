<template>
    <div class="">
        <search-list :queryName="'认证状态'" :queryList="configForm.authentication"></search-list>
        <search-list :queryName="'参加培训'" :queryList="configForm.course"></search-list>
        <search-list :queryName="'民族'" :queryList="configForm.nation"></search-list>
        <search-list :queryName="'技能证书标签'" :queryList="configForm.paper_category"></search-list>
        <search-list :queryName="'职业类型'" :queryList="configForm.service_category"></search-list>
        <search-list :queryName="'可服务人群'" :queryList="configForm.service_crowd"></search-list>
        <search-list :queryName="'区域'" :queryList="configForm.service_region"></search-list>
        <search-list :queryName="'服务类型'" :queryList="configForm.service_type"></search-list>        <search-list @changeQuery="changeAuthentication" :queryName="'职业类型'" :queryList="configForm.service_category"></search-list>
        <search-list :queryName="'信息来源'" :queryList="configForm.source"></search-list>
        <search-list :queryName="'工龄'" :queryList="configForm.working_age"></search-list>
        <search-list :queryName="'接单状态'" :queryList="configForm.working_status"></search-list>
    </div>
</template>
<script>
import searchList from './query/searchList.vue'
export default {
    data(){
        return {
            setConfigForm: [],//本地接收的搜索config字段
        }
    },
    components: {
        searchList
    },
    computed:{
        configForm(){
            return this.$store.state.hrModule.configForm
        }
    },
    watch:{
        
    },
    methods: {
        changeAuthentication(){
            
        }
    },
    mounted(){

    }
}
</script>
<style lang="scss" scoped>

</style>



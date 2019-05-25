<template>
    <div class="">
        <search-list
            @updateTable="updateTable" 
            :queryKey="'authentication_ids'" 
            :queryName="'认证状态'" 
            :queryList="configForm.authentication"></search-list>
        <search-list
            @updateTable="updateTable" 
            :queryKey="'course_ids'" 
            :queryName="'参加培训'" 
            :queryList="configForm.course"></search-list>
        <search-list
            @updateTable="updateTable" 
            :queryKey="'nation_ids'" 
            :queryName="'民族'" 
            :queryList="configForm.nation"></search-list>
        <search-list
            @updateTable="updateTable" 
            :queryKey="'paper_category_ids'" 
            :queryName="'技能证书标签'" 
            :queryList="configForm.paper_category"></search-list>
        <search-list
            @updateTable="updateTable" 
            :queryKey="'service_category_ids'" 
            :queryName="'职业类型'" 
            :queryList="configForm.service_category"></search-list>
        <search-list
            @updateTable="updateTable" 
            :queryKey="'service_crowd_ids'" 
            :queryName="'可服务人群'" 
            :queryList="configForm.service_crowd"></search-list>
        <search-list
            @updateTable="updateTable" 
            :queryKey="'service_region_ids'" 
            :queryName="'区域'" 
            :queryList="configForm.service_region"></search-list>
        <search-list
            @updateTable="updateTable" 
            :queryKey="'service_type_ids'" 
            :queryName="'服务类型'" 
            :queryList="configForm.service_type"></search-list>        
        <search-list
            @updateTable="updateTable" 
            :queryKey="'source_ids'" 
            :queryName="'信息来源'" 
            :queryList="configForm.source"></search-list>
        <search-list
            @updateTable="updateTable" 
            :queryKey="'working_age_ids'" 
            :queryName="'工龄'" 
            :queryList="configForm.working_age"></search-list>
        <search-list
            @updateTable="updateTable" 
            :queryKey="'working_status_ids'" 
            :queryName="'接单状态'" 
            :queryList="configForm.working_status"></search-list>
        <search-input
            :queryKey="'name'" 
            :queryName="'姓名'"></search-input>
        <search-input
            :queryKey="'phone'" 
            :queryName="'电话'"></search-input>
        <search-input
            :queryKey="'return_msg'" 
            :queryName="'回访信息'"></search-input>
        <search-input
            :queryKey="'return_msg'" 
            :queryName="'回访信息'"></search-input>
        <search-input
            :queryKey="'return_msg'" 
            :queryName="'回访信息'"></search-input>
        <search-input
            :queryKey="'return_msg'" 
            :queryName="'回访信息'"></search-input>
    </div>
</template>
<script>
import searchList from './query/searchList.vue'
import searchInput from './query/searchInput.vue'
export default {
    data(){
        return {
            setConfigForm: [],//本地接收的搜索config字段
        }
    },
    components: {
        searchList,
        searchInput,
    },
    computed:{
        configForm(){
            return this.$store.state.hrModule.configForm
        }
    },
    watch:{
        
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



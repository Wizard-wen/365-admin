<template>
    <div class="">
        <search-list
            :queryFrom="queryFrom"
            @updateTable="updateTable" 
            :queryKey="'authentication_ids'" 
            :queryName="'认证状态'" 
            :queryList="configForm.authentication"></search-list>
        <search-input
            :queryFrom="queryFrom"
            @updateTable="updateTable"
            :queryKey="'name'" 
            :queryName="'姓名'"></search-input>
        <search-input
            :queryFrom="queryFrom"
            @updateTable="updateTable"
            :queryKey="'phone'" 
            :queryName="'电话'"></search-input>
        <search-input
            :queryFrom="queryFrom"
            @updateTable="updateTable"
            :queryKey="'return_msg'" 
            :queryName="'回访信息'"></search-input>
        <search-list
            :queryFrom="queryFrom"
            @updateTable="updateTable" 
            :queryKey="'working_status_ids'" 
            :queryName="'接单状态'" 
            :queryList="configForm.working_status"></search-list>
        <search-input
            :queryFrom="queryFrom"
            @updateTable="updateTable"
            :queryKey="'remarks'" 
            :queryName="'备注（商家情况）'"></search-input>
        <search-list
            :queryFrom="queryFrom"
            @updateTable="updateTable" 
            :queryKey="'service_category_ids'" 
            :queryName="'职业类型'" 
            :queryList="configForm.service_category"></search-list>
        <search-list
            :queryFrom="queryFrom"
            @updateTable="updateTable" 
            :queryKey="'service_type_ids'" 
            :queryName="'服务类型'" 
            :queryList="configForm.service_type"></search-list>     
        <search-list
            :queryFrom="queryFrom"
            @updateTable="updateTable" 
            :queryKey="'service_crowd_ids'" 
            :queryName="'可服务人群'" 
            :queryList="configForm.service_crowd"></search-list>
        <search-list
            :queryFrom="queryFrom"
            @updateTable="updateTable" 
            :queryKey="'working_age_ids'" 
            :queryName="'工龄'" 
            :queryList="configForm.working_age"></search-list>
        <search-input
            :queryFrom="queryFrom"
            @updateTable="updateTable"
            :queryKey="'working_experience'" 
            :queryName="'工作经验'"></search-input>
        <search-list
            :queryFrom="queryFrom"
            @updateTable="updateTable" 
            :queryKey="'nation_ids'" 
            :queryName="'民族'" 
            :queryList="configForm.nation"></search-list>
        <search-input
            :queryFrom="queryFrom"
            @updateTable="updateTable"
            :queryKey="'birthplace'" 
            :queryName="'籍贯'"></search-input>
        <search-input
            :queryFrom="queryFrom"
            @updateTable="updateTable"
            :queryKey="'identify'" 
            :queryName="'身份证号'"></search-input>
        <search-input
            :queryFrom="queryFrom"
            @updateTable="updateTable"
            :queryKey="'address'" 
            :queryName="'地址'"></search-input>
        <search-list
            :queryFrom="queryFrom"
            @updateTable="updateTable" 
            :queryKey="'service_region_ids'" 
            :queryName="'服务地区'" 
            :queryList="configForm.service_region"></search-list>
        <search-list
            :queryFrom="queryFrom"
            @updateTable="updateTable" 
            :queryKey="'education_ids'" 
            :queryName="'教育程度'" 
            :queryList="configForm.education"></search-list>
        <search-input
            :queryFrom="queryFrom"
            @updateTable="updateTable"
            :queryKey="'urgent_phone'" 
            :queryName="'紧急联系人电话'"></search-input>
        <search-input
            :queryFrom="queryFrom"
            @updateTable="updateTable"
            :queryKey="'bank_card'" 
            :queryName="'银行卡号'"></search-input>
        <search-list
            :queryFrom="queryFrom"
            @updateTable="updateTable" 
            :queryKey="'course_ids'" 
            :queryName="'参加培训'" 
            :queryList="configForm.course"></search-list>
        <search-input
            :queryFrom="queryFrom"
            @updateTable="updateTable"
            :queryKey="'teacher_comment'" 
            :queryName="'教师评语'"></search-input>
        <search-list
            :queryFrom="queryFrom"
            @updateTable="updateTable" 
            :queryKey="'paper_category_ids'" 
            :queryName="'技能证书标签'" 
            :queryList="configForm.paper_category"></search-list>
        <search-list
            :queryFrom="queryFrom"
            @updateTable="updateTable" 
            :queryKey="'source_ids'" 
            :queryName="'信息来源'" 
            :queryList="configForm.source"></search-list>
        <search-input
            :queryFrom="queryFrom"
            @updateTable="updateTable"
            :queryKey="'source_name'" 
            :queryName="'来源名称'"></search-input>
        <search-list
            :queryFrom="queryFrom"
            @updateTable="updateTable" 
            :queryKey="'manager_ids'" 
            :queryName="'创建人'" 
            :queryList="configForm.manager"></search-list>
        <search-list
            :queryFrom="queryFrom"
            @updateTable="updateTable" 
            :isSingleQuery="true"
            :queryKey="'updated_ids'" 
            :queryName="'更新时间'" 
            :queryList="queryUpdated_at"></search-list>








    </div>
</template>
<script>
import searchList from './query/searchList.vue'
import searchInput from './query/searchInput.vue'
import {queryUpdated_at} from '../interface/query.js'
export default {
    data(){
        return {
            setConfigForm: [],//本地接收的搜索config字段
            queryUpdated_at,
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
    props: {
        /**
         * 查询来源
         */
        queryFrom: {
            default: 'staff',
            type: String,
        }
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



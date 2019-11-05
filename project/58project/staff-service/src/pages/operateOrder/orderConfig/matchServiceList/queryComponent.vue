<template>
    <div class="">
        <query-search-list
            @updateTable="updateTable" 
            :queryKey="'authentication'" 
            :queryName="'认证状态'" 
            :queryList="workerConfigForm.authentication"></query-search-list>
        <query-search-input
            @updateTable="updateTable"
            :queryKey="'name'" 
            :queryName="'姓名'"></query-search-input>
        <query-search-input
            @updateTable="updateTable"
            :queryKey="'phone'" 
            :queryName="'电话'"></query-search-input>
        <query-search-input
            @updateTable="updateTable"
            :queryKey="'return_msg'" 
            :queryName="'回访信息'"></query-search-input>
        <query-search-list
            @updateTable="updateTable" 
            :queryKey="'working_status'" 
            :queryName="'接单状态'" 
            :queryList="workerConfigForm.working_status"></query-search-list>
        <query-search-input
            @updateTable="updateTable"
            :queryKey="'remarks'" 
            :queryName="'备注（商家情况）'"></query-search-input>
        <query-search-list
            @updateTable="updateTable" 
            :queryKey="'service_category'" 
            :queryName="'职业类型'" 
            :queryList="workerConfigForm.service_category"></query-search-list>
        <query-search-list
            @updateTable="updateTable" 
            :queryKey="'service_type'" 
            :queryName="'服务类型'" 
            :queryList="workerConfigForm.service_type"></query-search-list>     
        <query-search-list
            @updateTable="updateTable" 
            :queryKey="'service_crowd'" 
            :queryName="'可服务人群'" 
            :queryList="workerConfigForm.service_crowd"></query-search-list>
        <query-search-list
            @updateTable="updateTable" 
            :queryKey="'working_age'" 
            :queryName="'工龄'" 
            :queryList="workerConfigForm.working_age"></query-search-list>
        <query-search-input
            @updateTable="updateTable"
            :queryKey="'working_experience'" 
            :queryName="'工作经验'"></query-search-input>
        <query-search-list
            @updateTable="updateTable" 
            :queryKey="'nation'" 
            :queryName="'民族'" 
            :queryList="workerConfigForm.nation"></query-search-list>
        <query-search-input
            @updateTable="updateTable"
            :queryKey="'birthplace'" 
            :queryName="'籍贯'"></query-search-input>
        <query-search-input
            @updateTable="updateTable"
            :queryKey="'identify'" 
            :queryName="'身份证号'"></query-search-input>
        <query-search-input
            @updateTable="updateTable"
            :queryKey="'address'" 
            :queryName="'地址'"></query-search-input>
        <query-search-list
            @updateTable="updateTable" 
            :queryKey="'service_region'" 
            :queryName="'服务地区'" 
            :queryList="workerConfigForm.service_region"></query-search-list>
        <query-search-list
            @updateTable="updateTable" 
            :queryKey="'education'" 
            :queryName="'教育程度'" 
            :queryList="workerConfigForm.education"></query-search-list>
        <query-search-input
            @updateTable="updateTable"
            :queryKey="'urgent_phone'" 
            :queryName="'紧急联系人电话'"></query-search-input>
        <query-search-input
            @updateTable="updateTable"
            :queryKey="'bank_card'" 
            :queryName="'银行卡号'"></query-search-input>
        <query-search-list
            @updateTable="updateTable" 
            :queryKey="'course'" 
            :queryName="'参加培训'" 
            :queryList="workerConfigForm.course"></query-search-list>
        <query-search-input
            @updateTable="updateTable"
            :queryKey="'teacher_comment'" 
            :queryName="'教师评语'"></query-search-input>
        <query-search-list
            @updateTable="updateTable" 
            :queryKey="'paper_category'" 
            :queryName="'技能证书标签'" 
            :queryList="workerConfigForm.paper_category"></query-search-list>
        <query-search-list
            @updateTable="updateTable" 
            :queryKey="'source'" 
            :queryName="'信息来源'" 
            :queryList="workerConfigForm.source"></query-search-list>
        <query-search-input
            @updateTable="updateTable"
            :queryKey="'source_name'" 
            :queryName="'来源名称'"></query-search-input>
        <query-search-list
            @updateTable="updateTable" 
            :queryKey="'manager'" 
            :queryName="'创建人'" 
            :queryList="workerConfigForm.manager"></query-search-list>
        <query-search-list
            @updateTable="updateTable" 
            :isSingleQuery="true"
            :queryKey="'updated_type'" 
            :queryName="'更新时间'" 
            :queryList="workerConfigForm.updated_type"></query-search-list>
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
        workerConfigForm(){
            return this.$store.state.operateModule.workerConfigForm
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



<template>
    <div class="">
        <query-search-list
            @updateSearchList="updateSearchList"
            :selectedList="querySaleWorkerList.authentication"
            :queryKey="'authentication'" 
            :queryName="'认证状态'" 
            :queryList="workerConfigForm.authentication"></query-search-list>
        <query-search-input
            @updateSearchInput="updateSearchInput"
            :selectedText="querySaleWorkerList.name"
            :queryKey="'name'" 
            :queryName="'姓名'"></query-search-input>
        <query-search-input
            @updateSearchInput="updateSearchInput"
            :selectedText="querySaleWorkerList.phone"
            :queryKey="'phone'" 
            :queryName="'电话'"></query-search-input>
        <query-search-input
            @updateSearchInput="updateSearchInput"
            :selectedText="querySaleWorkerList.return_msg"
            :queryKey="'return_msg'" 
            :queryName="'回访信息'"></query-search-input>
        <query-search-list
            @updateSearchList="updateSearchList"
            :selectedList="querySaleWorkerList.working_status"
            :queryKey="'working_status'" 
            :queryName="'接单状态'" 
            :queryList="workerConfigForm.working_status"></query-search-list>
        <query-search-input
            @updateSearchInput="updateSearchInput"
            :selectedText="querySaleWorkerList.remarks"
            :queryKey="'remarks'" 
            :queryName="'备注（商家情况）'"></query-search-input>
        <query-search-list
            @updateSearchList="updateSearchList"
            :selectedList="querySaleWorkerList.service_category"
            :queryKey="'service_category'" 
            :queryName="'职业类型'" 
            :queryList="workerConfigForm.service_category"></query-search-list>
        <query-search-list
            @updateSearchList="updateSearchList"
            :selectedList="querySaleWorkerList.service_type"
            :queryKey="'service_type'" 
            :queryName="'服务类型'" 
            :queryList="workerConfigForm.service_type"></query-search-list>     
        <query-search-list
            @updateSearchList="updateSearchList" 
            :selectedList="querySaleWorkerList.service_crowd"
            :queryKey="'service_crowd'" 
            :queryName="'可服务人群'" 
            :queryList="workerConfigForm.service_crowd"></query-search-list>
        <query-search-list
            @updateSearchList="updateSearchList"
            :selectedList="querySaleWorkerList.working_age"
            :queryKey="'working_age'" 
            :queryName="'工龄'" 
            :queryList="workerConfigForm.working_age"></query-search-list>
        <query-search-input
            @updateSearchInput="updateSearchInput"
            :selectedText="querySaleWorkerList.working_experience"
            :queryKey="'working_experience'" 
            :queryName="'工作经验'"></query-search-input>
        <query-search-list
            @updateSearchList="updateSearchList"
            :selectedList="querySaleWorkerList.nation"
            :queryKey="'nation'" 
            :queryName="'民族'" 
            :queryList="workerConfigForm.nation"></query-search-list>
        <query-search-input
            @updateSearchInput="updateSearchInput"
            :selectedText="querySaleWorkerList.birthplace"
            :queryKey="'birthplace'" 
            :queryName="'籍贯'"></query-search-input>
        <query-search-input
            @updateSearchInput="updateSearchInput"
            :selectedText="querySaleWorkerList.identify"
            :queryKey="'identify'" 
            :queryName="'身份证号'"></query-search-input>
        <query-search-input
            @updateSearchInput="updateSearchInput"
            :selectedText="querySaleWorkerList.address"
            :queryKey="'address'" 
            :queryName="'地址'"></query-search-input>
        <query-search-list
            @updateSearchList="updateSearchList"
            :selectedList="querySaleWorkerList.service_region"
            :queryKey="'service_region'" 
            :queryName="'服务地区'" 
            :queryList="workerConfigForm.service_region"></query-search-list>
        <query-search-list
            @updateSearchList="updateSearchList"
            :selectedList="querySaleWorkerList.education"
            :queryKey="'education'" 
            :queryName="'教育程度'" 
            :queryList="workerConfigForm.education"></query-search-list>
        <query-search-input
            @updateSearchInput="updateSearchInput"
            :selectedText="querySaleWorkerList.urgent_phone"
            :queryKey="'urgent_phone'" 
            :queryName="'紧急联系人电话'"></query-search-input>
        <query-search-input
            @updateSearchInput="updateSearchInput"
            :selectedText="querySaleWorkerList.bank_card"
            :queryKey="'bank_card'" 
            :queryName="'银行卡号'"></query-search-input>
        <query-search-list
            @updateSearchList="updateSearchList"
            :selectedList="querySaleWorkerList.course"
            :queryKey="'course'" 
            :queryName="'参加培训'" 
            :queryList="workerConfigForm.course"></query-search-list>
        <query-search-input
            @updateSearchInput="updateSearchInput"
            :selectedText="querySaleWorkerList.teacher_comment"
            :queryKey="'teacher_comment'" 
            :queryName="'教师评语'"></query-search-input>
        <query-search-list
            @updateSearchList="updateSearchList"
            :selectedList="querySaleWorkerList.paper_category"
            :queryKey="'paper_category'" 
            :queryName="'技能证书标签'" 
            :queryList="workerConfigForm.paper_category"></query-search-list>
        <query-search-list
            @updateSearchList="updateSearchList"
            :selectedList="querySaleWorkerList.source"
            :queryKey="'source'" 
            :queryName="'信息来源'" 
            :queryList="workerConfigForm.source"></query-search-list>
        <query-search-input
            @updateSearchInput="updateSearchInput"
            :selectedText="querySaleWorkerList.source_name"
            :queryKey="'source_name'" 
            :queryName="'来源名称'"></query-search-input>
        <query-search-list
            @updateSearchList="updateSearchList"
            :selectedList="querySaleWorkerList.manager"
            :queryKey="'manager'" 
            :queryName="'创建人'" 
            :queryList="workerConfigForm.manager"></query-search-list>
        <query-search-list
            @updateSearchList="updateSearchList"
            :selectedList="querySaleWorkerList.updated_type"
            :isSingleQuery="true"
            :queryKey="'updated_type'" 
            :queryName="'更新时间'" 
            :queryList="workerConfigForm.updated_type"></query-search-list>
    </div>
</template>
<script>


export default {
    data(){
        return {
            setWorkerConfigForm: [],//本地接收的搜索config字段       
        }
    },
    computed:{
        workerConfigForm(){
            return this.$store.state.operateModule.workerConfigForm
        },
        querySaleWorkerList(){
            return this.$store.state.saleModule.saleWorkerList
        }
    },
    methods: {
        updateSearchInput(queryObject){
            this.$store.commit('saleSetWorkerList', {
                queryKey: queryObject[0], 
                queryedList: queryObject[1]
            })
            this.$emit('updateTable')
        },
        updateSearchList(queryObject){
            this.$store.commit('saleSetWorkerList', {
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



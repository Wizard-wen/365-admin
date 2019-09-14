<template>
    <div class="queryBox">
        <!-- <search-list
            @updateTable="updateTable" 
            :queryKey="'type'" 
            :queryName="'订单状态'" 
            :isSingleQuery="true"
            :queryList="saleModule.order_status"></search-list> -->
        <search-input
            @updateTable="updateTable"
            :queryKey="'order_code'"
            :queryName="'订单编号'"></search-input>
    </div>
</template>
<script>
import searchList from './query/searchList.vue'
import searchInput from './query/searchInput.vue'
// import {queryUpdated_at} from '../interface/query.js'
export default {
    data(){
        return {
            setWorkerConfigForm: [],//本地接收的搜索config字段
            // queryUpdated_at,
        }
    },
    components: {
        searchList,
        searchInput,
    },
    computed:{
        /**
         * 订单状态
         */
        saleModule(){
            return this.$store.state.saleModule
        },
        workerConfigForm(){
            return this.$store.state.operateModule.workerConfigForm
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



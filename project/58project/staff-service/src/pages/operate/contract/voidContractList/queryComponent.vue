<template>
    <div class="queryBox">
        <query-search-input
            @updateTable="updateTable"
            :queryKey="'contract_number'"
            :queryName="'空合同编号'"></query-search-input>
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
        /**
         * 订单筛选字段
         */
        orderFormConfig(){
            return this.$store.state.operateModule.orderFormConfig
        },
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



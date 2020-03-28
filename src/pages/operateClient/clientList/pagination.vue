<template>
    <div style="padding: 5px;">
        <el-pagination
            background
            @current-change="handleCurrentPage"
            @prev-click="prevAndNextClick"
            @next-click="prevAndNextClick"
            :current-page.sync="pagination.currentPage"
            :page-size="pagination.pageNumber"
            layout="prev, pager, next, jumper"
            :total="pagination.total"></el-pagination>
    </div>
    
</template>

<script>
export default {
    props: {
        pagination: {
            type: Object,
            default: function(){
                return {
                    total: 0,
                    currentPage: 1,
                    pageNumber: 20,
                }
            }
        },
    },
    methods: {
        /**
         * 前进后退
         */
        prevAndNextClick(val){
            this.$emit('changePage', val)
        },
        /**
         * 切换页码
         */
        handleCurrentPage(val){
            this.$emit('changePage', val)
        },
    }
}
</script>

<style>

</style>
<template>
     <custom-ad-table-component
        v-loading="is_loading"
        :staffTable="customAdList">

        <!-- <template slot="searchList">
            <div class="search-list">
                <query-component @updateTable="updateTable"></query-component>
            </div>
        </template>

        <template slot="searchForm">
            <query-tag-component @updateTable="updateTable"></query-tag-component>
        </template> -->

        <template slot="control" slot-scope="controler">
            <el-button size="mini" type="text" @click="goAdDetailPage(controler.scoper.row)">查看</el-button>
        </template>

        <template slot="pagination">
            <el-pagination
                class="pagination"
                @current-change="handleCurrentPage"
                @prev-click="prevAndNextClick"
                @next-click="prevAndNextClick"
                :current-page.sync="pagination.currentPage"
                :page-size="pagination.pageNumber"
                layout="prev, pager, next, jumper"
                :total="pagination.total"></el-pagination>
        </template>
    </custom-ad-table-component>
</template>

<script>
import {customService} from '../../../../common'
import {customAdTableComponent} from './customAdList/index.js'
export default {
    components: {
        customAdTableComponent,
    },
    data(){
        return {
            is_loading: false,
            //客户端广告位列表
            customAdList: [],
            /**
             * 分页信息
             */
            pagination: {
                total: 0,
                currentPage: 1,
                pageNumber: 20,
            },
        }
    },
    methods: {
        /**
         * 请求表格数据
         */
        async getTableList(){
            try{

                this.is_loading = true

                await customService.getAdPositionList().then((data) =>{

                    this.customAdList = data.data.data
                    //分页信息
                    this.pagination.currentPage = data.data.current_page //当前页码
                    this.pagination.total = data.data.total //列表总条数

                    this.is_loading = false
                }).catch(error =>{
                    this.$message({
                        type:'error',
                        message: error.message
                    })
                    this.is_loading = false
                }).finally(() =>{
                    this.is_loading = false
                })

            } catch(error){
                this.$message({
                    type:'error',
                    message: error.message
                })
                this.is_loading = false
            }
        },
        // 由查询组件触发的更新表格事件
        async updateTable(){
            await this.getTableList()
        },
        prevAndNextClick(val){

        },
        /**
         * 切换页码
         */
        async handleCurrentPage(val){

            await this.getTableList()
        },
        /**
         * 进入广告位详情页
         */
        goAdDetailPage(row){
            this.$router.push({
                path: '/operate/adPositionItem',
                query: {
                    from: 1,
                    position_id: row.id
                }
            })
        }
    },
    async mounted(){
        await this.getTableList()
    }
}
</script>

<style lang="scss" scoped>

</style>
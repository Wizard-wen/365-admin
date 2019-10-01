<template>
    <div class="worker" v-loading="is_loading">
        <order-table-component
            :staffTable="orderTable"
            :controlScopeLength="170">
            <template slot="searchList">
                <div class="search-list">
                    <query-component @updateTable="updateTable"></query-component>
                </div>
            </template>
            <template slot="searchForm">
                <query-tag-component @updateTable="updateTable"></query-tag-component>
            </template>

            <template slot="control" slot-scope="controler">
                <el-button size="mini" type="text" @click="goDealOrderPage(controler.scoper.row)">处理订单</el-button>
                <el-button size="mini" type="text" @click="openAssignOrderDialog(controler.scoper.row)">分派订单</el-button>
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
        </order-table-component>
        <!-- 订单分派弹出框 -->
        <assign-order-dialog
            v-if="assignOrderDialogVisible"
            :assignOrderDialogVisible="assignOrderDialogVisible"
            @closeAssignOrderDialog="closeAssignOrderDialog"
            :order_id="assignOrderId"></assign-order-dialog>
    </div>
</template>
<script>
    import {saleService, operateService} from '../../../../common'

    import {
        orderTableComponent,
        queryTagComponent,
        queryComponent,
        assignOrderDialog
    } from './orderList/index.js'

    export default {
        components: {
            orderTableComponent,
            queryTagComponent,
            queryComponent,
            assignOrderDialog,
        },
        data(){
            return {
                //员工信息列表
                orderTable: [],
                is_loading:false,
                /**
                 * 分页信息
                 */
                pagination: {
                    total: 0,
                    currentPage: 1,
                    pageNumber: 20,
                },
                //待分配订单id
                assignOrderId: 0,
                //订单分派弹窗显示隐藏
                assignOrderDialogVisible: false,
            }
        },
        methods: {
             /**
             * 请求表格数据
             */
            async getOrderList(){
                try{

                    this.is_loading = true

                    await Promise.all([
                        saleService.getOrderList(), //
                        operateService.getOrderFormConfig()
                    ]).then((data) =>{

                        this.orderTable = data[0].data.data
                        //分页信息
                        this.pagination.currentPage = data[0].data.current_page //当前页码
                        this.pagination.total = data[0].data.total //列表总条数

                        //配置订单相关标签
                        this.$store.commit('setOrderConfigForm',data[1].data)

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
                await this.getOrderList()
            },
            prevAndNextClick(val){
                //设置page查询参数
                this.$store.commit('setOrderList', {
                    queryKey: 'page',
                    queryedList: val
                })
            },
            /**
             * 切换页码
             */
            async handleCurrentPage(val){
                //设置page查询参数
                this.$store.commit('setOrderList', {
                    queryKey: 'page',
                    queryedList: val
                })
                await this.getOrderList()
            },
            /**
             * 前往订单处理页
             * @param paramObj 列表参数对象
             */
            goDealOrderPage(paramObj){
                this.$router.push({
                    path: `/operate/operateOrderConfig`,
                    query: {
                        order_id: paramObj.id
                    }
                })
            },
            /**
             * 打开分派订单弹窗
             */
            openAssignOrderDialog(paramObj){
                this.assignOrderId = paramObj.id
                this.assignOrderDialogVisible = true
            },
            /**
             * 关闭分派订单弹窗
             */
            async closeAssignOrderDialog(){
                this.assignOrderDialogVisible = false
                await this.getOrderList()
            }
        },
        async mounted(){
            await this.getOrderList()
        }
    }
</script>
<style lang="scss" scoped>
</style>

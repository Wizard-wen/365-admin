<template>
    <div class="worker" v-loading="isLoaded">
        <order-table-component
            :staffTable="orderApplyTable"
            :maxLength="maxLength"
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
                <el-button size="mini" type="text" @click="dealOrder(controler.scoper.row)">处理订单</el-button>
                <el-button size="mini" type="text" @click="assignOrder(controler.scoper.row)">分派订单</el-button>
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
        <assign-dialog
            v-if="assignDialogVisible"
            :openAssignDialog="assignDialogVisible"
            @closeAssignDialog="assignDialogVisible=false"
            :assignOrderId="assignOrderId"></assign-dialog>
    </div>
</template>
<script>
    import {saleService, operateService} from '../../../../common'

    import {
        orderTableComponent,
        queryTagComponent,
        queryComponent
    } from './orderList/index.js'

    import {assignDialog} from '@/pages/sale/orderConfig/index.js'

    export default {
        components: {
            orderTableComponent,
            queryTagComponent,
            queryComponent,
            assignDialog,
        },
        data(){
            return {
                //员工信息列表
                orderApplyTable: [],
                isLoaded:false,
                /**
                 * 分页信息
                 */
                pagination: {
                    total: 0,
                    currentPage: 1,
                    pageNumber: 20,
                },
                //计算列表每一列的最大宽度
                maxLength: {
                    authentication: 80, //认证状态
                    working_status: 80,//接单状态
                    skill_ids: 80,// 职业类型
                    service_type: 80,//服务类型
                    service_crowd: 100,//可服务人群
                    working_age: 80,// 工龄
                    nation: 80,// 民族
                    region_ids:80,//服务地区
                    course: 80,//参加培训
                    paper_ids: 80, //技能证书
                    source: 80,//信息来源
                },
                //分配弹出框显示
                assignDialogVisible:false,
                //待分配订单id
                assignOrderId: 0,
                applyOrderDialogVisible: false,//订单申请弹窗显示隐藏
            }
        },
        methods: {
             /**
             * 请求表格数据
             */
            async getTableList(){
                try{

                    this.isLoaded = true

                    await Promise.all([
                        saleService.getOrderList(), //
                        operateService.getOrderFormConfig()
                    ]).then((data) =>{

                        this.orderApplyTable = data[0].data.data
                        //分页信息
                        this.pagination.currentPage = data[0].data.current_page //当前页码
                        this.pagination.total = data[0].data.total //列表总条数

                        //配置订单相关标签
                        this.$store.commit('setOrderConfigForm',data[1].data)
                    }).catch(error =>{
                        this.$message({
                            type:'error',
                            message: error.message
                        })
                    }).finally(() =>{
                        this.isLoaded = false
                    })

                } catch(error){
                    this.$message({
                        type:'error',
                        message: error.message
                    })
                }
            },
            // 由查询组件触发的更新表格事件
            async updateTable(){
                await this.getTableList()
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
                await this.getTableList()
            },
            /**
             * 处理订单
             * @param paramObj 列表参数对象
             */
            dealOrder(paramObj){
                this.$router.push(`/operate/operateOrderConfig?id=${paramObj.id}`)
            },
            /**
             * 分派订单
             */
            assignOrder(){
                this.assignDialogVisible = true
            },
        },
        async mounted(){
            await this.getTableList()
        }
    }
</script>
<style lang="scss" scoped>
</style>

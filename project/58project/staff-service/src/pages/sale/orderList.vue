<template>
    <div class="order" v-loading="is_loading">
        <sale-order-table-component
            :tableData="orderApplyTable"
            :maxLength="maxLength"
            :controlScopeLength="presentUser.is_store_manager == 1? 100:170 ">

            <template slot="searchList">
                <div class="left-search-module">
                    <query-component @updateTable="updateTable"></query-component>
                </div>
            </template>
            <template slot="searchForm">
                <query-tag-component 
                    :queryFormConfig="orderFormConfig"
                    :queryedList="queryOrderList"
                    @updateTable="updateTagTable"></query-tag-component>
                <el-button type="primary" @click="openOrderApplyDialog">订单申请</el-button>
            </template>

            <template slot="control" slot-scope="controler">
                <el-button size="mini" type="text" @click="dealOrder(controler.scoper.row)">处理订单</el-button>
                <el-button size="mini" type="text" 
                    @click="assignOrder(controler.scoper.row)"
                    v-if="presentUser.is_store_manager != 1">分派订单</el-button>
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
        </sale-order-table-component>
        <!-- 订单分派弹出框 -->
        <assign-dialog
            v-if="assignDialogVisible"
            :openAssignDialog="assignDialogVisible"
            @closeAssignDialog="assignDialogVisible=false"
            :order_id="assignOrderId"></assign-dialog>
        <!-- 订单申请弹出框 -->
        <apply-order-dialog
            v-if="applyOrderDialogVisible"
            :applyOrderDialogVisible="applyOrderDialogVisible"
            @closeCreateStaffDialog="applyOrderDialogVisible=false"
            :order_id="assignOrderId"></apply-order-dialog>
    </div>
</template>
<script>
    import {saleService, operateService} from '@common/index.js'
    // import {queryTagComponent} from '@/pages/components/index.js'
    import {
        saleOrderTableComponent,
        queryComponent
    } from './orderList/index.js'

    import {assignDialog} from './orderConfig/orderHeaderComponent/index.js'

    import {applyOrderDialog} from './saleWorkStation/index.js'

    export default {
        components: {
            saleOrderTableComponent,
            // queryTagComponent,
            queryComponent,
            assignDialog,
            applyOrderDialog
        },
        data(){
            return {
                //员工信息列表
                orderApplyTable: [],
                is_loading:false,
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
                returnStaffDialofVisible: false,//添加回访数据显示隐藏
                //分配弹出框显示
                assignDialogVisible:false,
                //待分配订单id
                assignOrderId: 0,
                applyOrderDialogVisible: false,//订单申请弹窗显示隐藏
            }
        },
        computed: {
            /**
             * 当前用户信息
             */
            presentUser(){
                return this.$store.state.loginModule.user
            },
            /**
             * 订单筛选字段
             */
            orderFormConfig(){
                return this.$store.state.operateModule.orderFormConfig
            },
            queryOrderList(){
                return this.$store.state.saleModule.saleOrderList
            }
        },
        methods: {
             /**
             * 请求表格数据
             */
            async getTableList(){
                try{

                    this.is_loading = true
                    //订单默认查询参数
                    let orderDeafultQueryObject = {}
                    //如果当前不是店长
                    if(this.presentUser.is_store_manager == 1){
                        orderDeafultQueryObject.agent_store_id = [this.presentUser.store_id]
                        orderDeafultQueryObject.agent_manager_id = [this.presentUser.id]

                    } else {
                        orderDeafultQueryObject.agent_store_id = [this.presentUser.store_id]
                    }

                    
                    await Promise.all([
                        saleService.getOrderList(3,orderDeafultQueryObject), //
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
                        this.is_loading = false
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
            async updateTagTable(param){
                //将查询组件数据变化存入vuex
                await this.$store.commit('saleSetOrderList', {
                    queryKey: param[0],
                    queryedList: param[1]
                })
                await this.updateTable()
            },
            prevAndNextClick(val){
              //设置page查询参数
              this.$store.commit('saleSetOrderList', {
                  queryKey: 'page',
                  queryedList: val
              })
            },
            /**
             * 切换页码
             */
            async handleCurrentPage(val){
                //设置page查询参数
                this.$store.commit('saleSetOrderList', {
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
                this.$router.push({
                    path: `/sale/orderConfig`,
                    query: {
                        order_id: paramObj.id,
                        order_type: 2,//2代表来源于订单
                    }
                })
            },
            /**
             * 分派订单
             */
            assignOrder(row){
                this.assignOrderId = row.id
                this.assignDialogVisible = true
            },
            //打开订单申请弹窗
            openOrderApplyDialog(){
                if(this.presentUser.store_id == 0){
                    this.$message({
                        message: '您不能创建订单申请',
                        type: 'error'
                    })
                    return;
                }
                this.applyOrderDialogVisible = true
            },
        },
        async mounted(){
            await this.getTableList()
        }
    }
</script>
<style lang="scss" scoped>
</style>

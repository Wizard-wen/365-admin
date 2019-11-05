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
                <query-tag-component 
                    :queryFormConfig="orderFormConfig"
                    :queryedList="queryOrderList"
                    @updateTable="updateTagTable"></query-tag-component>
                    <el-button type="primary" @click="goCreateOrderPage">创建订单</el-button>
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

        <!-- 运营订单分派 -->
        <public-assign-order-component
            v-if="publicAssignOrderDialogVisible"
            :orderItemObject="assignOrderObject"
            :publicAssignOrderDialogVisible="publicAssignOrderDialogVisible"
            @closePublicAssignOrderDialog="closePublicAssignOrderDialog"
            @updatePublicAssignOrder="updatePublicAssignOrder"
            :publicOrderType="5"></public-assign-order-component>
    </div>
</template>
<script>
    import {saleService, operateService} from '@common/index.js'
    import {
        orderTableComponent,
        queryComponent,
    } from './orderList/index.js'
    import {
        publicAssignOrderComponent,
    } from '@/public/module/common/index.js'

    export default {
        components: {
            orderTableComponent,
            queryComponent,
            publicAssignOrderComponent,
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
                assignOrderObject: {},
                //订单分派弹窗显示隐藏
                publicAssignOrderDialogVisible: false,
            }
        },
        computed:{
            /**
             * 订单筛选字段
             */
            orderFormConfig(){
                return this.$store.state.operateModule.orderFormConfig
            },
            queryOrderList(){
                return this.$store.state.operateModule.orderList
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
                        saleService.getOrderList(1), //
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
            async updateTagTable(param){
                //将查询组件数据变化存入vuex
                await this.$store.commit('setOrderList', {
                    queryKey: param[0],
                    queryedList: param[1]
                })
                await this.updateTable()
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
            goCreateOrderPage(){
                this.$router.push({
                    path: '/operate/operateCreateOrderPage'
                })
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
                this.assignOrderObject = paramObj;
                this.publicAssignOrderDialogVisible = true
            },
            async updatePublicAssignOrder(param){
                let assignOrderObject = {
                    ...param[0],
                    order_id: param[1].id,
                }
                await this.assignOrder(assignOrderObject)
                await this.closePublicAssignOrderDialog()
            },
            /**
             * 关闭分派订单弹窗
             */
            async closePublicAssignOrderDialog(){
                this.publicAssignOrderDialogVisible = false
                await this.getOrderList()
            },
            /**
             * 分派订单接口
             */
            async assignOrder(assignOrderObject){
                try{
                    this.is_loading = true
                    await saleService.assignOrder(assignOrderObject).then(data =>{
                        if(data.code == '0'){
                            this.$message({
                                type:"success",
                                message: data.message
                            })
                            this.is_loading = false
                        }
                    }).catch(error =>{
                        this.$message({
                            type:'error',
                            message: error.message
                        })
                        this.is_loading = false
                    })
                } catch(error){
                    this.$message({
                        type:'error',
                        message: error.message
                    })
                    this.is_loading = false
                }
            }
        },
        async mounted(){
            await this.getOrderList()
        }
    }
</script>
<style lang="scss" scoped>
</style>

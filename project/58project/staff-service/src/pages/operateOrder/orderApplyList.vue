<template>
    <div class="worker" v-loading="is_loading">
        <order-apply-table-component
            :staffTable="orderApplyTable"
            :maxLength="maxLength"
            :controlScopeLength="170">

            <template slot="searchList">
                <div class="search-list">
                    <query-component @updateTable="updateTable"></query-component>
                </div>
            </template>

            <template slot="searchForm">
                <div class="search-tag-list">
                    <query-tag-component 
                        :queryFormConfig="orderApplyFormConfig"
                        :queryedList="orderApplyQueryedList"
                        @updateTable="updateTagTable"></query-tag-component>
                </div>
            </template>

            <template slot="control" slot-scope="controler">
                <el-button v-if="controler.scoper.row.type == 1" size="mini" type="text" @click="editOrderApply(1, controler.scoper.row)">编辑</el-button>
                <el-button v-if="controler.scoper.row.type != 1" size="mini" type="text" @click="editOrderApply(1, controler.scoper.row)">查看</el-button>
                <el-button size="mini" type="text" style="color:#f56c6c"
                    v-if="controler.scoper.row.type == 1"
                    @click="refuseOrderApply(controler.scoper.row)">拒绝</el-button>
                <el-button size="mini" type="text" style="color:#67c23a"
                    v-if="controler.scoper.row.type == 1"
                    @click="openPassOrderApply(controler.scoper.row)">通过</el-button>
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
        </order-apply-table-component>
        <!-- 通过订单申请弹窗 -->
        <public-assign-order-component
            v-if="publicAssignOrderDialogVisible"
            :orderItemObject="orderApplyItemObject"
            :publicAssignOrderDialogVisible="publicAssignOrderDialogVisible"
            @closePublicAssignOrderDialog="closePublicAssignOrderDialog"
            @updatePublicAssignOrder="updatePublicAssignOrder"
            :publicOrderType="1"></public-assign-order-component>
    </div>
</template>
<script>
    import {operateService} from '@common/index.js'

    import {
        orderApplyTableComponent,
        queryComponent,
    } from './orderApplyList/index.js'

 import {
    publicAssignOrderComponent,
} from '@/public/module/common/index.js'

    export default {
        components: {
            orderApplyTableComponent,
            publicAssignOrderComponent,
            queryComponent,
        },
        data(){
            return {
                //订单申请列表
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
                    type: 100, //订单申请状态
                },
                orderApplyItemObject: {},
                publicAssignOrderDialogVisible: false,//控制订单通过弹窗显示隐藏
            }
        },
        computed:{
            orderApplyFormConfig(){
                return this.$store.state.operateModule.orderApplyFormConfig
            },
            orderApplyQueryedList(){
                return this.$store.state.operateModule.orderApplyList
            }
        },
        methods: {
             /**
             * 请求表格数据
             */
            async getTableList(){
                try{
                    this.is_loading = true

                    await Promise.all([
                        operateService.getApplicationList(), //订单申请列表
                        operateService.getApplyFormConfig(), //订单申请相关配置标签
                    ]).then((data) =>{

                        this.orderApplyTable = data[0].data.data

                        //分页信息
                        this.pagination.currentPage = data[0].data.current_page //当前页码
                        this.pagination.total = data[0].data.total //列表总条数

                        //配置订单相关标签
                        this.$store.commit('setOrderApplyConfigForm',data[1].data)
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
                await this.$store.commit('setOrderApplyList', {
                    queryKey: param[0],
                    queryedList: param[1]
                })
                await this.updateTable()
            },
            prevAndNextClick(val){
                //设置page查询参数
                this.$store.commit('setOrderApplyList', {
                    queryKey: 'page',
                    queryedList: val
                })
            },
            /**
             * 切换页码
             */
            async handleCurrentPage(val){
                //设置page查询参数
                this.$store.commit('setOrderApplyList', {
                    queryKey: 'page',
                    queryedList: val
                })
                await this.getTableList()
            },
            /**
             * 打开通过订单弹窗
             * @param paramObj 订单字段对象
             */
            openPassOrderApply(paramObj){
                if(
                    paramObj.user_name && 
                    paramObj.user_phone && 
                    paramObj.work_type && 
                    paramObj.wage && 
                    paramObj.service_duration && 
                    paramObj.order_details && 
                    paramObj.service_address
                ){
                    this.orderApplyItemObject = paramObj;
                    this.publicAssignOrderDialogVisible = true
                } else {
                    this.$message({
                        type: "error",
                        message: "请完善订单申请信息"
                    });
                }
            },
            /**
             * 通过订单申请钩子函数
             */
            async updatePublicAssignOrder(param){
                let passApplyObject = {
                    id: param[1].id,
                    type: 3,//状态设定为通过
                    ...param[0],
                    version: param[1].version,
                }
                await this.dealApplication(passApplyObject)
                await this.closePublicAssignOrderDialog()
            },
            /**
             * 关闭通过订单申请弹窗
             */
            async closePublicAssignOrderDialog(){
                await this.getTableList()
                this.publicAssignOrderDialogVisible = false
            },
            /**
             * 拒绝订单申请年轻
             * @paramObj
             */
            async refuseOrderApply(paramObj){
                await this.$confirm("确定拒绝该订单申请吗?此操作将会关闭订单申请", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(async () =>{
                    //改变订单申请状态为拒绝
                    let refuseOrderApplyObject = {
                        type: 2,//type == 2 为拒绝状态
                        version: paramObj.version,
                        id: paramObj.id,
                    }
                    await this.dealApplication(refuseOrderApplyObject)
                    await this.getTableList()
                }).catch(() => {
                    this.$message({
                        type: "info",
                        message: "已放弃拒绝"
                    });
                });
            },
            /**
             * 改变订单申请状态为拒绝
             */
            async dealApplication(orderApplyObject){
                try {
                    this.is_loading = true

                    await operateService.dealApplication(orderApplyObject).then(async data => {
                        if (data.code == 0) {
                            this.$message({
                                type: "success",
                                message: data.message
                            });
                            this.is_loading = false
                        }
                    }).catch(error => {
                        this.$message({
                            type: "error",
                            message: error.message
                        });
                        this.is_loading = false
                    }).finally(() =>{
                        this.is_loading = false
                    })
                } catch (error) {
                    this.$message({
                        type: "error",
                        message: error.message
                    });
                    this.is_loading = false
                }
            },
            /**
             * 编辑订单申请
             */
            editOrderApply(type, row){
                this.$router.push({
                    path: "/operate/operateOrderApplyItem",
                    query: {
                        type: type, //编辑为1 创建为 0
                        id: type == 1? row.id : 0
                    }
                })
            },
        },
        async mounted(){
            await this.getTableList()
        }
    }
</script>
<style lang="scss" scoped>
</style>

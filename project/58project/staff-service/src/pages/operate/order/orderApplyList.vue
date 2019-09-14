<template>
    <div class="staff" v-loading="isLoaded">
        <order-apply-table-component
            :staffTable="orderApplyTable"
            :maxLength="maxLength"
            :controlScopeLength="170">

            <template slot="control" slot-scope="controler">
                <el-button size="mini" type="text" @click="editOrderApply(1, controler.scoper.row)">编辑</el-button>
                <el-button size="mini" v-if="controler.scoper.row.type == ''" type="text" style="color:#f56c6c" @click="refuseOrderApply(controler.scoper.row)">拒绝</el-button>
                <el-button size="mini" v-if="controler.scoper.row.type == ''" type="text" style="color:#67c23a" @click="passOrderApply(controler.scoper.row)">通过</el-button>
            </template>

            <template slot="pagination">
                <el-pagination
                    class="pagination"
                    @current-change="handleCurrentPage"
                    @prev-click="handleCurrentPage"
                    @next-click="handleCurrentPage"
                    :current-page.sync="pagination.currentPage"
                    :page-size="pagination.pageNumber"
                    layout="prev, pager, next, jumper"
                    :total="pagination.total"></el-pagination>
            </template>
        </order-apply-table-component>
        <pass-order-apply-dialog
            v-if="orderApplyVisible"
            :orderApplyId="orderApplyId"
            @closeOrderApplyDialog="orderApplyVisible = false"
            :orderApplyVisible="orderApplyVisible"
            :systemVersion="systemVersion"></pass-order-apply-dialog>
    </div>
</template>
<script>
    import {operateService} from '../../../../common/'

    import {
        orderApplyTableComponent,
    } from './orderApplyList/index.js'

    import {passOrderApplyDialog} from './orderApplyItem/index.js'
    export default {
        components: {
            orderApplyTableComponent,
            passOrderApplyDialog,
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
                    service_type_ids: 80,//服务类型
                    service_crowd_ids: 100,//可服务人群
                    working_age: 80,// 工龄
                    nation: 80,// 民族
                    region_ids:80,//服务地区
                    course_ids: 80,//参加培训
                    paper_ids: 80, //技能证书
                    source: 80,//信息来源
                },
                systemVersion: '',//系统版本号
                orderApplyId:'',//当前订单id
                orderApplyVisible: false,//控制订单通过弹窗显示隐藏
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
                        operateService.getApplicationList(), //
                    ]).then((data) =>{
                        this.orderApplyTable = data[0].data.data
                        //分页信息
                        this.pagination.currentPage = data[0].data.current_page //当前页码
                        this.pagination.total = data[0].data.total //列表总条数
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
            /**
             * 切换页码
             */
            async handleCurrentPage(val){
                // this.pagination.currentPage = val
                //设置page查询参数
                this.$store.commit('setWorkerList', {
                    queryKey: 'page',
                    queryedList: val
                })
                await this.getTableList()
            },
            /**
             * 打开通过订单弹窗
             * @param paramObj 订单字段对象
             */
            passOrderApply(paramObj){
                this.orderApplyId = paramObj.id
                this.systemVersion = paramObj.version //系统版本号
                this.orderApplyVisible = true
            },
            /**
             * 拒绝订单申请年轻
             */
            async refuseOrderApply(){
                let response = await this.$confirm("确定拒绝该订单申请吗?此操作将会关闭订单申请", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).catch(() => {
                    this.$message({
                        type: "info",
                        message: "已放弃拒绝"
                    });
                });
                if (response == "confirm") {
                    store.commit("setLoading", 1);
                    try {
                        this.refuseOrderApplyObject.version = this.orderApplyDetail.version
                        await operateService.dealApplication(this.refuseOrderApplyObject).then(data => {
                            if (data.code == 0) {
                                this.$message({
                                    type: "success",
                                    message: data.message
                                });
                            }
                        }).catch(error => {
                            this.$message({
                                type: "error",
                                message: e.message
                            });
                        }).finally(() =>{
                            store.commit("setLoading", false);
                        })
                    } catch (e) {
                        throw error;
                    }
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

<template>
    <div class="staff" v-loading="isLoaded">
        <sale-order-table-component
            :staffTable="orderApplyTable"
            :maxLength="maxLength"
            :controlScopeLength="170">
            <template slot="searchList">
                <div class="search-list">
                    <!-- <query-component @updateTable="updateTable"></query-component> -->
                </div>
            </template>
            <template slot="control" slot-scope="controler">
                <el-button size="mini" type="text" @click="editOrderApply(1, controler.scoper.row)">编辑</el-button>
                <el-button size="mini" type="text" style="color:#f56c6c" @click="refuseOrderApply(controler.scoper.row)">拒绝</el-button>
                <el-button size="mini" type="text" style="color:#67c23a" @click="exportReturnStaff(0, controler.scoper.row)">通过</el-button>
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
        </sale-order-table-component>
    </div>
</template>
<script>
    import {operateService} from '../../../common'

    import {
        saleOrderTableComponent,
    } from './orderList/index.js'
    export default {
        components: {
            saleOrderTableComponent,
        },
        data(){
            return {
                //员工信息列表
                orderApplyTable: [],
                //表单搜索项
                staffSearch: {
                    name: '', //姓名
                    phone:'',//手机号
                },
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
                returnStaffDialofVisible: false,//添加回访数据显示隐藏
            }
        },
        computed:{

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
                this.$store.commit('setQueryList', {
                    queryKey: 'page',
                    queryedList: val
                })
                await this.getTableList()
            },
            /**
             * 导入回访服务人员
             * @param type 是全部导出还是单个导出 全部导出 1 单个导出 0
             */
            async exportReturnStaff(type, row){
                if(type == 0){
                    let _this= this;

                    let response = await this.$confirm(`确定将该服务人员导入回访列表吗?`, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: `已取消导入`
                        });
                    });

                    if(response == "confirm"){
                        store.commit('setLoading',true)

                        try{
                            await operateService.addReturnStaffSingle(row.id)
                                .then(data =>{
                                    if(data.code == "0"){
                                        this.$message({
                                            type:'success',
                                            message: `导入成功`
                                        })
                                    }
                                }).catch(e =>{
                                    this.$message({
                                        type:'error',
                                        message: e.message
                                    })
                                })
                        } catch(error){
                            this.$message({
                                type:'error',
                                message: error.message
                            })
                        }

                        await _this.getTableList()
                        store.commit('setLoading',false)
                    }
                } else{
                    this.returnStaffDialofVisible = true
                }
            },
            /**
             * 创建、编辑服务人员信息
             * des type字段在 创建，编辑，回访，处理异常，创建申请 都能用到
             * 运营人员创建 0
             * 运营人员编辑 1
             * 运营人员回访时编辑 2
             * 运营人员处理异常时编辑 3
             * 运营人员处理新建申请 4
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
            /**
             * 切换停用启用
             */
            async refuseOrderApply(row){
                let _this= this;

                let response = await this.$confirm(`确定拒绝该订单申请吗?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: `已取消`
                    });
                });

                if(response == "confirm"){
                    store.commit('setLoading',true)

                    try{
                        await operateService.changeStaffType(row.id, row.version)
                            .then(data =>{
                                if(data.code == "0"){
                                    this.$message({
                                        type:'success',
                                        message: `拒绝成功`
                                    })
                                }
                            }).catch(e =>{
                                this.$message({
                                    type:'error',
                                    message: e.message
                                })
                            })
                    } catch(error){
                        this.$message({
                            type:'error',
                            message: error.message
                        })
                    }

                    await _this.getTableList()
                    store.commit('setLoading',false)
                }
            },
        },
        async mounted(){
            await this.getTableList()
        }
    }
</script>
<style lang="scss" scoped>
</style>

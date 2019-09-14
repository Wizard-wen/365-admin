<template>
    <div class="staff" v-loading="isLoaded">
        <sale-pub-order-table-component
            :staffTable="orderApplyTable"
            :maxLength="maxLength"
            :controlScopeLength="170">
            <template slot="searchList">
                <div class="search-list">
                    <!-- <query-component @updateTable="updateTable"></query-component> -->
                </div>
            </template>
            <template slot="control" slot-scope="controler">
                <el-button size="mini" type="text" @click="dealPublicOrder(1, controler.scoper.row)">处理公海订单</el-button>
                <!-- <el-button size="mini" type="text" style="color:#f56c6c" @click="refuseOrderApply(controler.scoper.row)">拒绝</el-button>
                <el-button size="mini" type="text" style="color:#67c23a" @click="exportReturnStaff(0, controler.scoper.row)">通过</el-button> -->
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
        </sale-pub-order-table-component>
    </div>
</template>
<script>
    import {saleService} from '../../../common'

    import {
        salePubOrderTableComponent,
    } from './publicOrderList/index.js'


    export default {
        components: {
            salePubOrderTableComponent,
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
                        saleService.getApplicationList(), //
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
                this.$store.commit('saleSetWorkerList', {
                    queryKey: 'page',
                    queryedList: val
                })
                await this.getTableList()
            },
            /**
             * 
             */
            dealPublicOrder(){

            }
        },
        async mounted(){
            await this.getTableList()
        }
    }
</script>
<style lang="scss" scoped>
</style>

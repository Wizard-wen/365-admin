<template>
    <div class="worker" v-loading="is_loading">
        <contract-table-component
            :staffTable="contractList"
            :maxLength="maxLength"
            :controlScopeLength="100">

            <template slot="searchList">
                <div class="search-list">
                    <query-component @updateTable="updateTable"></query-component>
                </div>
            </template>

            <template slot="searchForm">
                <query-tag-component 
                    :queryFormConfig="contractConfigForm"
                    :queryedList="queryedContractList"
                    @updateTable="updateTagTable"></query-tag-component>
            </template>

            <template slot="control" slot-scope="controler">
                <el-button size="mini" type="text" @click="goContractPage( controler.scoper.row)">查看</el-button>
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
        </contract-table-component>
    </div>
</template>
<script>
    import {operateService, saleService} from '../../../../common'
    import {queryTagComponent} from '@/pages/components/index.js'
    import {
        contractTableComponent,
        queryComponent,
    } from './contractList/index.js'
    export default {
        components: {
            contractTableComponent,
            queryComponent,
            queryTagComponent,
        },
        data(){
            return {
                //合同列表
                contractList: [],
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
            }
        },
        computed:{
            /**
             * 合同筛选字段
             */
            contractConfigForm(){
                return this.$store.state.operateModule.contractConfigForm
            },
            queryedContractList(){
                return this.$store.state.operateModule.contractList
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
                        saleService.getContractList(2),
                        operateService.getOrderFormConfig()
                    ]).then((data) =>{

                        this.contractList = data[0].data.data
                        //分页信息
                        this.pagination.currentPage = data[0].data.current_page //当前页码
                        this.pagination.total = data[0].data.total //列表总条数
                        //配置订单相关标签
                        this.$store.commit('setContractConfigForm',data[1].data)
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
                await this.$store.commit('setContractList', {
                    queryKey: param[0],
                    queryedList: param[1]
                })
                await this.updateTable()
            },
            prevAndNextClick(val){
                //设置page查询参数
                this.$store.commit('setContractList', {
                    queryKey: 'page',
                    queryedList: val
                })
            },
            /**
             * 切换页码
             */
            async handleCurrentPage(val){
                //设置page查询参数
                this.$store.commit('setContractList', {
                    queryKey: 'page',
                    queryedList: val
                })
                await this.getTableList()
            },
            /**
             * 前往合同详情页
             */
            goContractPage(row){
                this.$router.push({
                    path: "/operate/operateContractItem",
                    query: {
                        id: row.id,
                        from: 2,
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

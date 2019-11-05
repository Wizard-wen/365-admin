<template>
    <div class="worker" v-loading="is_loading">
        <sale-worker-table-component
            :tableData="staffTable"
            :maxLength="maxLength"
            :controlScopeLength="150">

            <template slot="searchList">
                <div class="left-search-module">
                    <query-component :queryFrom="'order'" @updateTable="updateTable"></query-component>
                </div>
            </template>

            <template slot="searchForm">
                <query-tag-component 
                    :queryFormConfig="workerConfigForm"
                    :queryedList="queryedSaleWorkerList"
                    @updateTable="updateTagTable"></query-tag-component>
                <el-button type="primary" @click="createWorker">申请创建服务人员</el-button>
            </template>

            <template slot="control" slot-scope="controler">
                <el-button 
                    size="mini" type="text" 
                    @click="goWorkerShowPage(controler.scoper.$index, controler.scoper.row)">查看</el-button>
                <el-button 
                    size="mini" type="text" style="color:#f56c6c"
                    @click="sendErrorMessage(controler.scoper.row)">提交异常信息</el-button>
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
        </sale-worker-table-component>
        <!-- 申请添加服务人员 -->
        <create-worker-dialog
            v-if="createWorkerDialogVisible"
            :openCreateWorkerDialog="createWorkerDialogVisible"
            @closeCreateWorkerDialog="createWorkerDialogVisible=false"></create-worker-dialog>
        <!-- 提交服务人员异常信息 -->
        <error-worker-dialog
            v-if="errorWorkerDialogVisible"
            :openErrorWorkerDialog="errorWorkerDialogVisible"
            @closeErrorWorkerDialog="closeErrorWorkerDialog"
            :errorWorkerWorkingStatus="errorWorkerRow.working_status"
            :staffId="errorWorkerId"></error-worker-dialog>
    </div>
</template>
<script>
    import {operateService, $utils} from '@common/index.js'
    import {
        queryComponent,
        saleWorkerTableComponent,
        createWorkerDialog,
        errorWorkerDialog} from './saleWorkerList/index.js'

    export default {
        components: {
            saleWorkerTableComponent,
            createWorkerDialog,
            errorWorkerDialog,
            queryComponent,
        },
        data() {
            return {
                //员工信息列表
                staffTable: [],
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
                //控制申请创建服务人员弹出框显示异常
                createWorkerDialogVisible: false,
                //控制异常信息弹出框显示隐藏
                errorWorkerDialogVisible: false,
                //异常服务人员id
                errorWorkerId: 0,
                //异常服务人员信息
                errorWorkerRow: null,
            }
        },
        computed:{
            workerConfigForm(){
                return this.$store.state.operateModule.workerConfigForm
            },
            queryedSaleWorkerList(){
                return this.$store.state.saleModule.saleWorkerList
            }
        },
        methods: {
            computeStringLength(array, listKey, configKey){
                let string = 0
                if(Array.isArray(array)){
                    array.forEach((it, inds) =>{
                        if(this.workerConfigForm[configKey].find(i => i.id == it)){
                            let baseLength = parseInt(this.workerConfigForm[configKey].filter(i => i.id == it)[0].name.length *12 )
                            string += (baseLength + 27)
                        }
                    })
                } else {
                    if(this.workerConfigForm[configKey].find(i => i.id == array)){
                        string = parseInt(this.workerConfigForm[configKey].filter(i => i.id == array)[0].name.length * 12) + 27
                    } else {
                        string = 0
                    }

                }
                if(string > this.maxLength[listKey]){
                    this.maxLength[listKey] = (string + 20) > 80 ? (string + 20) : 80
                }

            },
             /**
             * 请求表格数据
             * des 表格查询参数存储在vuex中，刷新，参数重置
             */
            async getTableList(){
                try{
                    this.is_loading = true

                    await Promise.all([
                        operateService.getWorkerFormConfig('edit'), //获取表单配置字段
                        operateService.getStaffList(4) //获取列表数据
                    ]).then((data) =>{
                        // 将表单配置数据存入 vuex
                        this.$store.commit('setWorkerConfigForm',data[0].data)

                        let tableList = data[1].data.data

                        tableList.forEach((item, index) =>{

                            this.computeStringLength(item.authentication, 'authentication', 'authentication')
                            this.computeStringLength(item.working_status, 'working_status', 'working_status')
                            this.computeStringLength(item.skill_ids, 'skill_ids', 'service_category')
                            this.computeStringLength(item.service_type, 'service_type', 'service_type')
                            this.computeStringLength(item.service_crowd, 'service_crowd', 'service_crowd')
                            this.computeStringLength(item.working_age, 'working_age', 'working_age')
                            this.computeStringLength(item.nation, 'nation', 'nation')
                            this.computeStringLength(item.region_ids, 'region_ids', 'service_region')
                            this.computeStringLength(item.course, 'course', 'course')
                            this.computeStringLength(item.paper_ids, 'paper_ids', 'paper_category')
                            this.computeStringLength(item.source, 'source', 'source')
                        })

                        this.staffTable = data[1].data.data

                        //分页信息
                        this.pagination.currentPage = data[1].data.current_page //当前页码
                        this.pagination.total = data[1].data.total //列表总条数
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
                await this.$store.commit('saleSetWorkerList', {
                    queryKey: param[0],
                    queryedList: param[1]
                })
                await this.updateTable()
            },
            prevAndNextClick(val){
                //设置page查询参数
                this.$store.commit('saleSetWorkerList', {
                    queryKey: 'page',
                    queryedList: val
                })
            },
            /**
             * 切换页码
             */
            async handleCurrentPage(val){
                //设置page查询参数
                this.$store.commit('saleSetWorkerList', {
                    queryKey: 'page',
                    queryedList: val
                })
                await this.getTableList()
            },
            /**
             * 申请创建服务人员
             * des 先创建服务人员，然后才能添加服务人员技能。
             */
            createWorker(){
                this.createWorkerDialogVisible = true;
            },
            /**
             * 异常服务人员申请
             */
            sendErrorMessage(row){
                this.errorWorkerRow = row
                this.errorWorkerId = row.id
                this.errorWorkerDialogVisible = true;
            },
            /**
             * 查看服务人员详情
             */
            goWorkerShowPage(index, row){
                this.$router.push({
                    path: "/sale/saleWorkerShow",
                    query: {
                        id: row.id,
                        from: 1,//
                    }
                })
            },
            /**
             * 关闭异常弹窗
             */
            async closeErrorWorkerDialog(){
                this.errorWorkerDialogVisible = false;
                await this.getTableList()
            },
        },
        async mounted(){
            await this.getTableList()
        }
    }
</script>
<style lang="scss" scoped>

</style>

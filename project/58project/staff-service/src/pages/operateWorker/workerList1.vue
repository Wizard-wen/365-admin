<template>
    <div class="worker" v-loading="is_loading">
        <worker-table-component
            :tableData="workerTable"
            :maxLength="maxLength"
            :controlScopeLength="200">
            <template slot="searchList">
                <div class="left-search-module">
                    <query-component @updateTable="updateTable"></query-component>
                </div>
            </template>

            <template slot="searchedForm">
                <query-tag-component 
                    :queryFormConfig="workerConfigForm"
                    :queryedList="queryedList"
                    @updateTable="updateTagTable"></query-tag-component>
                <el-button type="primary" @click="exportReturnStaff(1)">导入回访</el-button>
                <el-button type="primary" @click="editStaff(0)">创建服务人员</el-button>
            </template>

            <template slot="control" slot-scope="controler">
                
                <el-button size="mini" type="text" @click="showWorker(controler.scoper.row)">查看</el-button>
                <el-button size="mini" type="text" @click="editStaff(1, controler.scoper.row)">编辑</el-button>
                <el-button size="mini" type="text" style="color:#f56c6c" v-if="controler.scoper.row.type == 'enable'" @click="openChangeStaffStatus(controler.scoper.row)">停用</el-button>
                <el-button size="mini" type="text" style="color:#67c23a" @click="openChangeStaffStatus(controler.scoper.row)" v-else>启用</el-button>
                <el-button size="mini" type="text" @click="exportReturnStaff(0, controler.scoper.row)">导入回访</el-button>
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
        </worker-table-component>
        <!-- 申请添加服务人员 -->
        <return-worker-dialog
            v-if="returnStaffDialofVisible"
            :openReturnStaffDialog="returnStaffDialofVisible"
            @closeReturnStaffDialog="returnStaffDialofVisible=false"></return-worker-dialog>
    </div>
</template>
<script>
    import {operateService} from '@common/index.js'
    import queryComponent from './workerList1/queryComponent.vue'
    import workerTableComponent from './workerList1/workerTableComponent.vue'
    import returnStaffDialog from './workerList1/returnStaffDialog.vue'

    export default {
        components: {
            queryComponent,
            workerTableComponent,
            returnStaffDialog,
        },
        data(){
            return {
                is_loading:false,
                //员工信息列表
                workerTable: [],
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
                //添加回访数据显示隐藏
                returnStaffDialofVisible: false,
            }
        },
        computed:{
            /**
             * 服务人员信息
             */
            workerConfigForm(){
                return this.$store.state.operateModule.workerConfigForm
            },
            /**
             * 查询对象
             */
            queryedList(){
                return this.$store.state.operateModule.workerList
            },
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
                        operateService.getStaffList(0) //获取列表数据
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

                        this.workerTable = data[1].data.data
                        //分页信息
                        this.pagination.currentPage = data[1].data.current_page //当前页码
                        this.pagination.total = data[1].data.total //列表总条数

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
                await this.getTableList()
            },
            //
            async updateTagTable(param){
                //将查询组件数据变化存入vuex
                await this.$store.commit('setWorkerList', {
                    queryKey: param[0],
                    queryedList: param[1]
                })
                await this.updateTable()
            },
            prevAndNextClick(val){
              //设置page查询参数
              this.$store.commit('setWorkerList', {
                  queryKey: 'page',
                  queryedList: val
              })
            },
            /**
             * 切换页码
             */
            async handleCurrentPage(val){
                //设置page查询参数
                this.$store.commit('setWorkerList', {
                    queryKey: 'page',
                    queryedList: val
                })
                await this.getTableList()
            },
            /**
             * 打开导入回访服务人员对话框
             * @param type 是全部导出还是单个导出 全部导出 1 单个导出 0
             */
            async exportReturnStaff(type, row){
                //如果导出单个
                if(type == 0){
                    await this.$confirm(`确定将该服务人员导入回访列表吗?`, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(async () =>{

                        //添加单个服务人员至回访列表
                        await this.addReturnStaffSingle(row)
                        //请求列表数据
                        await this.getTableList()
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: `已取消导入`
                        });
                    });
                } else{
                    //打开导入回访弹窗
                    this.returnStaffDialofVisible = true
                }
            },
            /**
             * 添加单个人员至回访
             */
            async addReturnStaffSingle(row){
                this.is_loading = true

                try{
                    await operateService.addReturnStaffSingle(row.id).then(data =>{
                        if(data.code == "0"){
                            this.$message({
                                type:'success',
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
            /**
             * 创建、编辑服务人员信息
             * des type字段在 创建，编辑，回访，处理异常，创建申请 都能用到
             * 运营人员创建 0
             * 运营人员编辑 1
             * 运营人员回访时编辑 2
             * 运营人员处理异常时编辑 3
             * 运营人员处理新建申请 4
             */
            editStaff(type, row){
                this.$router.push({
                    path: "/worker/workerItem",
                    query: {
                        type: type, //编辑为1 创建为 0
                        id: type == 1? row.id : 0
                    }
                })
            },
            /**
             * 查看服务人员详情
             */
            showWorker(row){
                this.$router.push({
                    path: "/worker/workerItemShow",
                    query: {
                        id: row.id,
                        from: 1,//
                    }
                })
            },
            /**
             * 切换停用启用
             */
            async openChangeStaffStatus(row){

                let status = row.type == 'enable'? '停用' : '启用'

                let response = await this.$confirm(`确定${status}该服务人员吗?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () =>{
                    //请求改变服务人员状态接口
                    await this.changeWorkerType(row)
                    //请求列表数据
                    await this.getTableList()
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: `已取消${status}`
                    });
                });
            },
            /**
             * 改变服务人员停用启用状态
             * @param row
             */
            async changeWorkerType(row){
                this.is_loading = true

                try{
                    await operateService.changeStaffType(row.id, row.version).then(data =>{
                        if(data.code == "0"){
                            this.$message({
                                type:'success',
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
            }
        },
        
        async mounted(){
            await this.getTableList()
        }
    }
</script>
<style lang="scss" scoped>
</style>

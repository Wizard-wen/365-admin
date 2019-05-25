<template>
    <div class="staff" v-loading="isLoaded">
        <staff-table-component
            :staffTable="staffTable"
            :maxLength="maxLength"
            :controlScopeLength="150">
            
            <template slot="searchForm">
                <div class="search-left">
                    <el-input v-model="staffSearch.name" placeholder="请输入员工姓名" :maxlength="20"></el-input>
                    <el-input v-model="staffSearch.phone" placeholder="请输入电话" :maxlength="20"></el-input>
                    <el-button type="primary" @click="searchStaff">查询</el-button>
                    <el-button type="primary" @click="resetStaff">重置</el-button>
                </div>
                <el-button type="primary" @click="createStaff">申请创建服务人员</el-button>
            </template>

            <template slot="control" slot-scope="controler">
                <el-button size="mini" type="text" @click="showStaff(controler.scoper.$index, scoper.row)">查看</el-button>
                <el-button size="mini" style="color:#f56c6c" type="text" @click="sendErrorMessage(controler.scoper.row)">提交异常信息</el-button>
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
        </staff-table-component>
        <!-- 申请添加服务人员 -->
        <create-staff-dialog
            v-if="createStaffDialogVisible"
            :openCreateStaffDialog="createStaffDialogVisible"
            @closeCreateStaffDialog="createStaffDialogVisible=false"></create-staff-dialog>
        <!-- 提交服务人员异常信息 -->
        <error-staff-dialog
            v-if="errorStaffDialogVisible"
            :openErrorStaffDialog="errorStaffDialogVisible"
            @closeErrorStaffDialog="errorStaffDialogVisible=false"
            :errorStaffWorkingStatus="errorStaffRow.working_status"
            :staffId="errorStaffId"></error-staff-dialog>
    </div>
</template>
<script>
    import {hrService, $utils} from '../../../common'


    import {staffTableComponent} from '@/pages/servicehr/staff/components'

    import createStaffDialog from './components/createStaff/createStaffDialog.vue'
    import errorStaffDialog from './components/errorStaff/errorStaffDialog.vue'
    
    export default {
        components: {
            staffTableComponent,
            createStaffDialog,
            errorStaffDialog
        },
        data() {
            return {
                //员工信息列表
                staffTable: [],
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
                //控制申请创建服务人员弹出框显示异常
                createStaffDialogVisible: false,
                //控制异常信息弹出框显示隐藏
                errorStaffDialogVisible: false,
                //异常服务人员id
                errorStaffId: 0,
                //异常服务人员信息
                errorStaffRow: null,
            }
        },
        computed:{
            /**
             * 
             */
            workerConfigList(){
                return this.$store.state.hrModule.configForm
            }
        },
        methods: {
            computeStringLength(array, listKey, configKey){
                let string = 0
                if(Array.isArray(array)){
                    array.forEach((it, inds) =>{
                        if(this.workerConfigList[configKey].find(i => i.id == it)){
                            let baseLength = parseInt(this.workerConfigList[configKey].filter(i => i.id == it)[0].name.length *12 )
                            string += (baseLength + 27)
                        }
                    })
                } else {
                    if(this.workerConfigList[configKey].find(i => i.id == array)){
                        string = parseInt(this.workerConfigList[configKey].filter(i => i.id == array)[0].name.length * 12) + 27
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
                    this.isLoaded = true

                    await Promise.all([
                        hrService.getFormConfig(), //获取表单配置字段
                        hrService.getStaffList() //获取列表数据
                    ]).then((data) =>{
                        // 将表单配置数据存入 vuex 
                        this.$store.commit('setConfigForm',data[0].data)

                        let tableList = data[1].data.data
                        //  debugger
                        tableList.forEach((item, index) =>{
                           
                            this.computeStringLength(item.authentication, 'authentication', 'authentication')
                            this.computeStringLength(item.working_status, 'working_status', 'working_status')
                            this.computeStringLength(item.skill_ids, 'skill_ids', 'service_category')
                            this.computeStringLength(item.service_type_ids, 'service_type_ids', 'service_type')
                            this.computeStringLength(item.service_crowd_ids, 'service_crowd_ids', 'service_crowd')
                            this.computeStringLength(item.working_age, 'working_age', 'working_age')
                            this.computeStringLength(item.nation, 'nation', 'nation')
                            this.computeStringLength(item.region_ids, 'region_ids', 'service_region')
                            this.computeStringLength(item.course_ids, 'course_ids', 'course')
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
             * 查找用户
             */
            async searchStaff(){
                //设置name查询参数
                this.$store.commit('setQueryList', {
                    queryKey: 'name', 
                    queryedList: this.staffSearch.name
                })
                //设置手机号查询参数
                this.$store.commit('setQueryList', {
                    queryKey: 'phone', 
                    queryedList: this.staffSearch.phone
                })
                await this.getTableList()
            },
            /**
             * 重置
             */
            async resetStaff(){
                this.staffSearch.name = ''
                this.staffSearch.phone = ''
                //重置name查询参数
                this.$store.commit('setQueryList', {
                    queryKey: 'name', 
                    queryedList: null
                })
                //重置手机号查询参数
                this.$store.commit('setQueryList', {
                    queryKey: 'phone', 
                    queryedList: null
                })
                await this.getTableList()
            },
            /**
             * 申请创建服务人员
             * des 先创建服务人员，然后才能添加服务人员技能。
             */
            createStaff(){
                this.createStaffDialogVisible = true;
            },
            /**
             * 异常服务人员申请
             */
            sendErrorMessage(row){
                this.errorStaffRow = row
                this.errorStaffId = row.id
                this.errorStaffDialogVisible = true;
            },
            /**
             * 查看服务人员详情
             */
            showStaff(index, row){
                this.$router.push({
                    path: "/sale/orderWorkerItem",
                    query: {
                        id: row.id
                    }
                })
            },
            /**
             * 创建时间字段转换
             */
            created_atFormatter(row, column){
                return $utils.formatDate(new Date(row.created_at), 'yyyy-MM-dd')
            },
            //登记时间
            register_atFormatter(row, column){
                return $utils.formatDate(new Date(row.register_at), 'yyyy-MM-dd')
            },
            educationFomatter(row, column){
                let a =  this.$store.state.hrModule.educationList.filter(item => item.id == row.education)
                return a.length? a[0].name : ''
            }
        },
        async mounted(){
            await this.getTableList()
        }
    }
</script>
<style lang="scss" scoped>
    .tag-style{
        height:24px;
        line-height: 24px;
    }
    .staff{
        .list-table{
            height: calc(100vh - 50px);
            width:100%;
            display: flex;
            .search-list{
                width: 180px;
                height: 100%;
                overflow-y: auto;
                background: #eaedf1;
            }
            .table-list{
                overflow: auto;
                flex:1;
                width: calc(100% - 180px);
                height: calc(100vh - 50px);
                .search-form{
                    display: none;
                    height: 40px;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    .search-left{
                        display: flex;
                    }
                }
                .staff-table{
                    height: calc(100% - 72px);
                    width: 100%;
                    margin: 0 auto;
                }
                .pagination-box{
                    height:32px;
                    .pagination{
                        margin: 0 auto;
                        width: 600px;
                    }
                }
            }
        }
            
            
        


    }
</style>

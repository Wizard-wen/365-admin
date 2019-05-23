<template>
    <div class="staff" v-loading="isLoaded">
        <staff-table-component
            :staffTable="staffTable"
            :maxLength="maxLength"
            :controlScopeLength="110">
            
            <template slot="searchList">
                <div class="search-list">
                    <query-component @updateTable="updateTable"></query-component>
                </div>
            </template>
            
            <template slot="searchForm">
                <div class="search-left">
                    <el-input v-model="staffSearch.name" placeholder="请输入员工姓名" :maxlength="20"></el-input>
                    <el-input v-model="staffSearch.phone" placeholder="请输入电话" :maxlength="20"></el-input>
                    <el-button type="primary" @click="searchStaff">查询</el-button>
                    <el-button type="primary" @click="resetStaff">重置</el-button>
                </div>
                <el-button type="primary" @click="createStaff">导出回访</el-button>
                <el-button type="primary" @click="createStaff">添加服务人员</el-button>
            </template>

            <template slot="control" slot-scope="controler">
                <el-button size="mini" type="text" @click="editStaff(controler.scoper.$index, controler.scoper.row)">编辑</el-button>
                <el-button size="mini" type="text" style="color:#f56c6c" v-if="controler.scoper.row.status == 0" @click="changeStaffStatus(control.scoper.row)">停用</el-button>
                <el-button size="mini" type="text" style="color:#67c23a" @click="changeStaffStatus(controler.scoper.row)" v-else>启用</el-button>
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
    </div>
</template>
<script>
    import {hrService} from '../../../../common'

    import {
        queryComponent,
        staffTableComponent,
    } from './components'
    
    export default {
        components: {
            queryComponent,
            staffTableComponent
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
                    authentication: 0, //认证状态
                    working_status: 0,//接单状态
                    skill_ids: 0,// 职业类型
                    service_type_ids: 0,//服务类型
                    service_crowd_ids: 0,//可服务人群
                    working_age: 0,// 工龄
                    nation: 0,// 民族
                    region_ids: 0,//服务地区
                    course_ids: 0,//参加培训
                    paper_ids: 0, //技能证书
                    source: 0,//信息来源
                }
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
             * 创建服务人员
             * des 先创建服务人员，然后才能添加服务人员技能。
             */
            createStaff(){
                this.$router.push({
                    path: "/worker/workerItem",
                    query: {
                        type: 0, //新建
                    }
                })
            },
            /**
             * 编辑服务人员信息
             * 编辑时可以添加服务人员技能
             */
            editStaff(index, row){
                this.$router.push({
                    path: "/worker/workerItem",
                    query: {
                        type: 5, //编辑为1
                        id: row.id
                    }
                })
            },
            /**
             * changeStaffStatus
             */
            async changeStaffStatus(row){
                let _this= this;

                let status = row.status == 0? '停用' : '启用'

                let response = await this.$confirm(`确定${status}该服务人员吗?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: `已取消${status}`
                    });
                });

                if(response == "confirm"){
                    store.commit('setLoading',true)

                    try{
                        await hrService.changeStaffStatus(row.id, row.version)
                            .then(data =>{
                                if(data.code == "0"){
                                    this.$message({
                                        type:'success',
                                        message: `${status}成功`
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

.search-form{
    height: 40px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    .search-left{
        display: flex;
    }
}
.pagination{
    margin: 0 auto;
    width: 600px;
}
</style>

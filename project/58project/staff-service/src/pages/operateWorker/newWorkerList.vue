<template>
    <worker-table-component
        v-loading="is_loading"
        :tableData="staffTable"
        :maxLength="maxLength"
        :controlScopeLength="140">

        <template slot="searchedForm">
            <div class="search-left">
                <el-input v-model="staffSearch.name" placeholder="请输入员工姓名" :maxlength="20"></el-input>
                <el-input v-model="staffSearch.phone" placeholder="请输入电话" :maxlength="20"></el-input>
                <el-button type="primary" @click="searchStaff">查询</el-button>
                <el-button type="primary" @click="resetStaff">重置</el-button>
            </div>
        </template>

        <template slot="control" slot-scope="controler">
            <el-button size="mini" type="text" @click="agreeStaffSingle(controler.scoper.row)" style="color:#67c23a">提交</el-button>
            <el-button size="mini" type="text" @click="editStaff(3, controler.scoper.row)">编辑</el-button>
            <el-button size="mini" type="text" style="color:#f56c6c" @click="deleteNewStaff(controler.scoper.row)">删除</el-button>
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
</template>
<script>
    import {operateService} from '@common/index.js'

    import {
        workerTableComponent,
    } from './workerList/index.js'

    export default {
        components: {
            workerTableComponent
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
                    service_type_ids: 80,//服务类型
                    service_crowd: 100,//可服务人群
                    working_age: 80,// 工龄
                    nation: 80,// 民族
                    region_ids:80,//服务地区
                    course: 80,//参加培训
                    paper_ids: 80, //技能证书
                    source: 80,//信息来源
                }
            }
        },
        computed:{
            /**
             *
             */
            workerConfigList(){
                return this.$store.state.operateModule.workerConfigForm
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
                    //设置name查询参数
                    this.$store.commit('setNewWorkerList', {
                        queryKey: 'name',
                        queryedList: this.staffSearch.name
                    })
                    //设置手机号查询参数
                    this.$store.commit('setNewWorkerList', {
                        queryKey: 'phone',
                        queryedList: this.staffSearch.phone
                    })
                    this.is_loading = true

                    await Promise.all([
                        operateService.getWorkerFormConfig('edit'), //获取表单配置字段
                        operateService.getStaffList(3) //获取列表数据
                    ]).then((data) =>{
                        // 将表单配置数据存入 vuex
                        this.$store.commit('setWorkerConfigForm',data[0].data)

                        let tableList = data[1].data.data
                        tableList.forEach((item, index) =>{

                            this.computeStringLength(item.authentication, 'authentication', 'authentication')
                            this.computeStringLength(item.working_status, 'working_status', 'working_status')
                            this.computeStringLength(item.skill_ids, 'skill_ids', 'service_category')
                            this.computeStringLength(item.service_type_ids, 'service_type_ids', 'service_type')
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
            prevAndNextClick(val){
                //设置page查询参数
                this.$store.commit('setNewWorkerList', {
                    queryKey: 'page',
                    queryedList: val
                })
            },
            /**
             * 切换页码
             */
            async handleCurrentPage(val){
                // this.pagination.currentPage = val
                //设置page查询参数
                this.$store.commit('setNewWorkerList', {
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
                this.$store.commit('setNewWorkerList', {
                    queryKey: 'name',
                    queryedList: this.staffSearch.name
                })
                //设置手机号查询参数
                this.$store.commit('setNewWorkerList', {
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
                this.$store.commit('setNewWorkerList', {
                    queryKey: 'name',
                    queryedList: null
                })
                //重置手机号查询参数
                this.$store.commit('setNewWorkerList', {
                    queryKey: 'phone',
                    queryedList: null
                })
                await this.getTableList()
            },
            /**
             * 编辑服务人员信息
             */
            editStaff(type, row){
                this.$router.push({
                    path: "/worker/workerItem",
                    query: {
                        type: 4, //编辑为1
                        id: row.id
                    }
                })
            },
            /**
             * 删除服务人员
             */
            async deleteNewStaff(row){
                let _this= this;

                let response = await this.$confirm(`确定删除该服务人员吗?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: `已取消删除`
                    });
                });

                if(response == "confirm"){
                    store.commit('setLoading',true)

                    try{
                        await operateService.deleteApplyStaff(row.id)
                            .then(data =>{
                                if(data.code == "0"){
                                    this.$message({
                                        type:'success',
                                        message: `删除成功`
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
            /**
             * 提交保姆
             */
            async agreeStaffSingle(row){
                let _this= this;
            if(row.name == '' || row.age == '' || row.phone == ''){
                this.$message({
                    type:'error',
                    message: `该服务人员字段不完整，不能提交！`
                })
                return;
            }
                let response = await this.$confirm(`确定提交该服务人员信息吗?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: `已取消提交`
                    });
                });

                if(response == "confirm"){
                    // //设置name查询参数
                    // this.$store.commit('setErrorWorkerList', {
                    //     queryKey: 'name',
                    //     queryedList: this.staffSearch.name
                    // })
                    // //设置手机号查询参数
                    // this.$store.commit('setErrorWorkerList', {
                    //     queryKey: 'phone',
                    //     queryedList: this.staffSearch.phone
                    // })

                    store.commit('setLoading',true)

                    try{
                        await operateService.agreeStaffSingle('apply', 'list', row.id)
                            .then(data =>{
                                if(data.code == "0"){
                                    this.$message({
                                        type:'success',
                                        message: `提交成功`
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


.search-left{
    display: flex;
}

.pagination{
    margin: 0 auto;
    width: 600px;
}
</style>

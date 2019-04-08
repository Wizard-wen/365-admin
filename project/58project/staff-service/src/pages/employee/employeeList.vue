<template>
    <div class="employee">
        <el-form :inline="true" :model="employeeSearch" class="employee-form">
            <div class="search-up">
                <div>
                    <el-form-item>
                        <el-input v-model="employeeSearch.name" placeholder="请输入员工名" :maxlength="20"></el-input>
                    </el-form-item>

                    <el-form-item>  
                        <el-select v-model="employeeSearch.department" placeholder="请选择所属部门">
                            <el-option
                            v-for="item in departmentList"
                            :key="item.id"
                            :label="item.label"
                            :value="item.id">
                            </el-option>
                        </el-select>                    
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="searchEmployee">查询</el-button>
                        <el-button type="primary" @click="resetEmployee">重置</el-button>
                    </el-form-item>
                </div>
                <el-form-item>
                    <el-button type="primary" @click="createEmployee">添加员工</el-button>
                </el-form-item>
            </div>
        </el-form>

        <el-table :data="employeeTable" class="employee-table">

            <el-table-column label="姓名" prop="name" align="center"></el-table-column>

            <el-table-column label="手机号" prop="phone" align="center"></el-table-column>

            <el-table-column label="微信" prop="wechat" align="center"></el-table-column>

            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" @click="editEmployee(scope.$index, scope.row)">编辑员工</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
            class="pagination"
            @current-change="handleCurrentPage"
            @prev-click="handleCurrentPage"
            @next-click="handleCurrentPage"
            :current-page.sync="pagination.currentPage"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="pagination.total"></el-pagination>
    </div>
</template>
<script>
    import {employeeService} from '../../../common'
    export default {
        data() {
            return {
                //需求信息列表
                employeeTable: [],
                //表单搜索项
                employeeSearch: {
                    name: '', //姓名
                    department: 0,//部门
                },
                /**
                 * 分页信息
                 */
                pagination: {
                    total: 0,
                    currentPage: 1,
                    pageNumber: 10,
                },
            }
        },
        computed:{
            /**
             * 全部已添加搜索字段
             */
            searchArray(){
                let arr = [],
                _this = this;

                Object.keys(this.employeeSearch).forEach((item, index) =>{
                    //如果搜索字段是数组的话
                    if(Array.isArray(_this.employeeSearch[item])){
                        if(_this.employeeSearch[item].length){
                            let obj = {}
                            obj[item] = [..._this.employeeSearch[item]]
                            obj = {
                                ...obj,
                                key: item
                            }
                            arr.push(obj)
                        }
                    }
                    //如果搜索字段是字符串的话
                    else if(_this.employeeSearch[item] != ''){
                        let obj = {}
                        obj[item] = _this.employeeSearch[item]
                        obj = {
                            ...obj,
                            key: item
                        }
                        arr.push(obj)
                    }
                })
                return arr
            },
            /**
             * 所属部门
             */
            departmentList(){
                return this.$store.state.employeeModule.departmentList
            }
        },
        methods: {
             /**
             * 请求表格数据
             * @param tableOption 表格配置项
             * @param tableOption.currentPage 当前页
             * @param tableOption.searchSelect Array 页面筛选项
             * [{searchkey: '', searchValue: ''}]
             */
            async getTableList(){

                let tableOption = {
                    currentPage: this.pagination.currentPage,
                    pageNumber: this.pagination.pageNumber,
                    searchSelect: this.searchArray
                }

                store.commit('setLoading',true)
                try{
                    await employeeService.getEmployeeList(tableOption).then(data =>{
                            if(data.code == "0"){
                                this.employeeTable = data.data.data

                                //分页信息
                                this.pagination.currentPage = data.data.current_page //当前页码
                                this.pagination.total = data.data.total //列表总条数
                            }
                        }).catch(error =>{
                            this.$message({
                                type:'error',
                                message: error.message
                            })
                        }).finally(() =>{
                            store.commit('setLoading',false)
                        })
                } catch(error){
                    this.$message({
                        type:'error',
                        message: error.message
                    })
                }
            },
            /**
             * 切换页码
             */
            async handleCurrentPage(val){
                this.pagination.currentPage = val
                await this.getTableList()
            },
            /**
             * 查找用户
             */
            async searchEmployee(){
                await this.getTableList()
            },
            /**
             * 重置搜索框
             */
            async resetEmployee(){
                this.employeeSearch.name= '' //姓名
                this.employeeSearch.department= 0//部门
                await this.getTableList()
            },
            /**
             * 创建原始需求
             */
            createEmployee(){
                this.$router.push({
                    path: "/employee/employeeItem",
                    query: {
                        type: 0
                    }
                })
            },
            /**
             * 编辑需求信息
             */
            editEmployee(index, row){
                this.$router.push({
                    path: "/employee/employeeItem",
                    query: {
                        type: 1, //编辑为1
                        id: row.id
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
        .employee{
        padding-top: 30px;
        margin: 0 auto;
        .employee-form{
            width:80%;
            min-width:1100px;
            margin: 0 auto;
            .search-up{
                display: flex;
                justify-content: space-between;
            }
        }
        .employee-table{
            width: 80%;
            min-width: 1100px;
            margin: 0 auto;
        }
        .pagination{
            width:80%;
            min-width:1100px;
            margin: 30px auto 0 auto;;
        }
    }
</style>

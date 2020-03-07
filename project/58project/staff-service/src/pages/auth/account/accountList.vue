<template>
    <div class="account">

        <div class="container-box">

            <el-form :inline="true" :model="accountSearch" class="account-form">
                <div class="search">
                    <el-form-item>
                        <el-input class="input" v-model="accountSearch.name" placeholder="请输入管理员名" :maxlength="20"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="accountSearch.department_id" placeholder="请选择部门">
                            <el-option v-for="(item, index) in departmentList" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-select v-model="accountSearch.store_id" placeholder="请选择门店">
                            <el-option v-for="(item, index) in store_selection" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="searchAccount">查询</el-button>
                        <el-button type="primary" @click="resetAccount">重置</el-button>
                    </el-form-item>
                </div>
                <el-form-item>
                    <el-button type="primary" @click="createAccount">添加账户</el-button>
                </el-form-item>
            </el-form>

            <!-- 表格 -->
            <el-table v-loading="is_loading" :data="accountTable" class="account-table" :header-cell-style="{height: '48px',background: '#fafafa'}">

                <el-table-column label="编号" prop="id" align="center"></el-table-column>
                <el-table-column label="账号" prop="account" align="center"></el-table-column>
                <el-table-column label="用户名" prop="name" align="center"></el-table-column>
                <el-table-column label="部门" prop="department_id"  align="center">
                    <template slot-scope="scope">
                        <table-tag-component
                        v-if="departmentList"
                        :propList="departmentList"
                        :tableOriginData="scope.row.department_id"></table-tag-component>
                    </template>
                </el-table-column>
                <el-table-column label="所属门店" prop="store_name" align="center"></el-table-column>

                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="editAccount(scope.$index, scope.row)">账户编辑</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            v-if="scope.row.status == 1"
                            @click="setAccountState(2, scope.row)">停用</el-button>
                        <el-button
                            size="mini"
                            type="success"
                            v-else
                            @click="setAccountState(1, scope.row)">启用</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
                class="pagination"
                @current-change="handleCurrentPage"
                @prev-click="prevAndNextClick"
                @next-click="prevAndNextClick"
                :current-page.sync="pagination.currentPage"
                :page-size="10"
                layout="prev, pager, next, jumper"
                :total="pagination.total"></el-pagination>
        </div>
    </div>
</template>
<script>
    import {authService} from '@common/index.js'
    export default {
        data() {

            return {
                is_loading: false,
                //用户列表
                accountTable: [],
                //门店基本信息列表
                store_selection: [],
                //用户列表搜索条件
                accountSearch: {
                    name:'',
                    department_id: 0,
                    store_id: 0,
                },
                /**
                 * 分页信息
                 */
                pagination: {
                    total: 0,
                    currentPage: 1,
                    pageNumber: 10,
                }
            }
        },
        computed:{
            /**
             * 全部已添加搜索字段
             */
            searchArray(){
                let arr = [],
                _this = this;

                Object.keys(this.accountSearch).forEach((item, index) =>{
                    if(_this.accountSearch[item] != ''){
                        let obj = {}
                        obj[item] = _this.accountSearch[item]
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
             * 部门信息
             */
            departmentList(){
                return this.$store.state.authModule.departmentList
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

                

                try{
                    this.is_loading = true
                    await authService.getManagerList(tableOption).then(data =>{
                        if(data.code == "0"){
                            this.accountTable = data.data.list.data

                            this.store_selection = data.data.store_selection

                            //分页信息
                            this.pagination.currentPage = data.data.list.current_page //当前页码
                            this.pagination.total = data.data.list.total //列表总条数
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
            async prevAndNextClick(val){
                this.pagination.currentPage = val
                await this.getTableList()
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
            async searchAccount(){
                await this.getTableList()
            },
            /**
             * 重置
             */
            async resetAccount(){
                this.accountSearch.name = ''
                this.accountSearch.department_id = 0
                this.accountSearch.store_id = 0
                await this.getTableList()
            },
            /**
             * 创建账户
             */
            createAccount(){
                this.$router.push({
                    path: "/auth/accountEdit",
                    query: {
                        type: 0, //创建为0
                    }
                })
            },
            /**
             * 账户编辑
             */
            editAccount(index, row) {
                this.$router.push({
                    path: "/auth/accountEdit",
                    query: {
                        type: 1, //编辑为1
                        id: row.id,
                    }
                })
            },
            /**
             * 停用或启用账户
             */
            async setAccountState(type, row) {

                let _this= this,
                    status = type == 2 ? '停用' : '启用'

                let response = await this.$confirm(`确定${status}该账户吗?`, '提示', {
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
                    store.commit('setLoading',1)

                    try{
                        await authService.changeManagerType(row.id)
                            .then(data =>{
                                if(data.code == "0"){
                                    this.$message({
                                        type:'success',
                                        message: `${status}成功`
                                    })
                                    store.commit('setLoading',false)
                                }
                            }).catch(error =>{
                                this.$message({
                                    type:'error',
                                    message: error.message
                                })
                                store.commit('setLoading',false)
                            }).finally(() =>{
                                store.commit('setLoading',false)
                            })
                    } catch(error){
                        this.$message({
                            type:'error',
                            message: error.message
                        })
                        store.commit('setLoading',false)
                    }

                    await _this.getTableList()

                }
            },
            /**
             * 部门字段转换
             */
            departmentFormatter(row, column){
                return this.departmentList.filter(item => item.id == row.department_id)[0].name
            }
        },
        async mounted(){
            await this.getTableList()
        }
    }
</script>
<style lang="scss" scoped>
    .account{
        padding-top: 30px;
        margin: 0 auto;
        .account-form{
            width:90%;
            min-width:900px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
        }
        .account-table{
            width: 90%;
            min-width: 900px;
            margin: 0 auto;
        }
        .pagination{
            width:80%;
            min-width:1100px;
            margin: 30px auto 0 auto;;
        }

    }
</style>

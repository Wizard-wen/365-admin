<template>
    <div class="authority">
        
        <div class="container-box">

            <!-- 搜索项 -->
            <div class="authority-option">
                <div class="search">
                    <el-input class="input" v-model="accountSearch[0].name" placeholder="请输入用户名"></el-input>
                    <el-button type="primary" @click="searchAccount">查询</el-button>
                </div>
                <el-button type="primary" @click="createAccount">添加账户</el-button>
            </div>
            
            <!-- 表格 -->
            <el-table   
                :data="accountTable" 
                class="authority-table">
                <el-table-column
                    label="id"
                    prop="id"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="账号"
                    prop="account"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="用户名"
                    prop="name"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="editRole(scope.$index, scope.row)">角色配置</el-button>
                        <el-button
                            size="mini"
                            @click="editAccount(scope.$index, scope.row)">账户编辑</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="deleteAccount(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
                style="margin-top:30px;"
                @current-change="handleCurrentPage"
                @prev-click="handleCurrentPage"
                @next-click="handleCurrentPage"
                :current-page.sync="pagination.currentPage"
                :page-size="10"
                layout="prev, pager, next, jumper"
                :total="pagination.total"></el-pagination>
        </div>
    </div>
</template>
<script>
    import {authService} from '../../../../common'
    export default {
        data() {
            
            return {
                //用户列表
                accountTable: [],
                //用户列表搜索条件
                accountSearch: [
                    {
                        key: 'name',
                        name: ''
                    },
                ],
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
                let arr = this.accountSearch.filter((item, index) =>{
                    if(item[item.key] != ''){
                        return item
                    }
                })
                return arr
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

                await authService.getManagerList(tableOption)
                    .then(data =>{
                        
                        this.accountTable = data.data.data
                        
                        //分页信息
                        this.pagination.currentPage = data.data.current_page //当前页码
                        this.pagination.total = data.data.total //列表总条数
                    }).catch(error =>{
                        this.$message({
                            type:'error',
                            message: error.message
                        })
                    })
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
             * 角色配置
             */
            editRole(index, row){
                this.$router.push({
                    path: "/auth/accountConfig",
                    query: {
                        id: row.id
                    }
                })
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
            async realDelete(id){
                await authService.deleteManager(id)
                    .then(data =>{
                        console.log(data)
                        // done();
                    }).catch(error =>{
                        this.$message({
                            type:'error',
                            message: error.message
                        })
                    })
            },
            /**
             * 删除用户
             */
            deleteAccount(index, row) {

                this.$confirm('此操作将永久删除该账户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                })
                .then(async () => {
                    // debugger
                    await this.realDelete(row.id)
                })
            },
        },
        async mounted(){
            store.commit('setLoading',true)
            try{
                // await authService.getManagerList(this.accountSearch.page,this.accountSearch.username)
                //     .then(data =>{
                //         this.accountTable = data.data.data
                //     }).catch(error =>{
                //         this.$message({
                //             type:'error',
                //             message: error.message
                //         })
                //     })
                await this.getTableList()
            }catch(e){
                this.$message({
                    type:'error',
                    message: e.message
                })
            }
            store.commit('setLoading',false)
        }
    }
</script>
<style lang="scss" scoped>
    .authority{
        
        padding-top: 30px;
        .container-box{
            width:80%;
            min-width:1100px;
            margin: 0 auto;
            .authority-option{
                padding-right: 30px;
                margin-bottom:30px;
                width:100%;
                display: flex;
                justify-content: space-between;
                .search{
                    width: 400px;
                    display: flex;
                    .input{
                        margin-right: 30px;
                    }
                }
            }
            .authority-table{
                width: 100%;
            }
        }
    }
</style>
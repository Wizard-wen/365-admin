<template>
    <div class="account">
        
        <div class="container-box">

            <el-form :inline="true" :model="accountSearch" class="account-form">
                <div class="search">
                    <el-form-item>
                        <el-input class="input" v-model="accountSearch.name" placeholder="请输入用户名"></el-input>
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
            <el-table :data="accountTable" class="account-table">

                <el-table-column label="id" prop="id" align="center"></el-table-column>
                <el-table-column label="账号" prop="account" align="center"></el-table-column>
                <el-table-column label="用户名" prop="name" align="center"></el-table-column>
                
                <el-table-column label="操作" align="center">
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
                class="pagination"
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
                accountSearch: {
                    name:''
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
                    await authService.getManagerList(tableOption).then(data =>{
                            if(data.code == "0"){
                                this.accountTable = data.data.data

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
            async searchAccount(){
                await this.getTableList()
            },
            /**
             * 重置
             */
            async resetAccount(){
                this.accountSearch.name = ''
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
                // if(row.account == 'admin'){
                //     this.$message({
                //         type:'error',
                //         message: '超级管理员不能修改'
                //     })
                // } else {
                //     this.$router.push({
                //         path: "/auth/accountEdit",
                //         query: {
                //             type: 1, //编辑为1
                //             id: row.id,
                //         }
                //     })
                // }
                this.$router.push({
                    path: "/auth/accountEdit",
                    query: {
                        type: 1, //编辑为1
                        id: row.id,
                    }
                })

            },
            /**
             * 删除用户
             */
            async deleteAccount(index, row) {

                let _this= this;

                let response = await this.$confirm('确定删除该账户吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });

                if(response == "confirm"){
                    store.commit('setLoading',1)

                    try{
                        await authService.deleteManager(row.id)
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
                        throw error
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
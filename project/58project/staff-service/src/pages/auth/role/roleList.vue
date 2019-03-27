<template>
    <div class="role">
        <el-form :inline="true" :model="roleSearch" class="role-form">
            <div class="search">
                <el-form-item>
                    <el-input class="input" v-model="roleSearch.name" placeholder="请输入角色名"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="searchRole">查询</el-button>
                    <el-button type="primary" @click="resetRole">重置</el-button>
                </el-form-item>
            </div>
            <el-form-item>
                <el-button type="primary" @click="createRole">添加角色</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="roleTable" class="role-table">
            
            <el-table-column label="id" prop="id" align="center"></el-table-column>
            <el-table-column label="名称" prop="name" align="center"></el-table-column>
            
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="editAuth(scope.$index, scope.row)">权限配置</el-button>
                    <el-button
                        size="mini"
                        @click="editRole(scope.$index, scope.row)">角色编辑</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="deleteRole(scope.$index, scope.row)">删除</el-button>
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
    import {authService} from '../../../../common'
    export default {
        data() {
            return {
                //角色列表
                roleTable: [],
                //角色列表搜索条件
                roleSearch: {
                    name: ''
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

                Object.keys(this.roleSearch).forEach((item, index) =>{
                    if(_this.roleSearch[item] != ''){
                        let obj = {}
                        obj[item] = _this.roleSearch[item]
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
                    await authService.getRoleList(tableOption).then(data =>{
                            if(data.code == "0"){
                                this.roleTable = data.data.data

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
             * 查找角色
             */
            async searchRole(){
                await this.getTableList()
            },
            /**
             * 重置角色
             */
            async resetRole(){
                this.roleSearch.name = ''
                await this.getTableList()
            },
            /**
             * 权限配置
             */
            editAuth(index, row){
                this.$router.push({
                    path: "/auth/roleConfig",
                    query: {
                        id: row.id,
                    }
                })
            },
            /**
             * 创建角色
             */
            createRole(){
                this.$router.push({
                    path: "/auth/roleEdit",
                    query: {
                        type: 0, //创建为0
                    }
                })
            },
            /**
             * 角色编辑
             */
            editRole(index, row) {
                this.$router.push({
                    path: "/auth/roleEdit",
                    query: {
                        type: 1, //编辑为1
                        id: row.id,
                    }
                })
            },
            /**
             * 删除角色
             */
            deleteRole(index, row) {

                this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () =>{
                    store.commit('setLoading',1)
                    
                    await authService.deleteRole(row.id).then((data) => {
                        if(data.code == '0'){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }
                    }).catch((err) =>{
                        this.$message({
                            type: 'success',
                            message: err.message
                        });
                    })

                    await this.getTableList()

                    store.commit('setLoading',false)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
        },
        async mounted(){
            await this.getTableList()
        }
    }
</script>
<style lang="scss" scoped>
    .role{
        padding-top: 30px;
        margin: 0 auto;
        .role-form{
            width:90%;
            min-width:900px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
        }
        .role-table{
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



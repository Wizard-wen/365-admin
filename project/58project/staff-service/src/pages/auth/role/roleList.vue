<template>
    <div class="authority">
        
        <div class="container-box">
            <div class="authority-option">
                <div class="search">
                    <el-input class="input" v-model="roleSearch[0].name" placeholder="请输入角色名"></el-input>
                    <el-button type="primary" @click="searchRole">查询</el-button>
                </div>
                <el-button type="primary" @click="createRole">添加角色</el-button>
            </div>
            
            <el-table
                :data="roleTable" 
                class="authority-table">
                <el-table-column
                    label="id"
                    prop="id"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="名称"
                    prop="name"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center">
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
                //角色列表
                roleTable: [],
                //角色列表搜索条件
                roleSearch: [
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
                let arr = this.roleSearch.filter((item, index) =>{
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

                await authService.getRoleList(tableOption)
                    .then(data =>{
                        
                        this.roleTable = data.data.data
                        
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
             * 查找角色
             */
            async searchRole(){
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
                console.log(index, row);
                this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () =>{
                    await authService.deleteRole(row.id)
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
        },
        async mounted(){
            store.commit('setLoading',true)
            try{
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



0<template>
    <div class="authTable">
        <div class="container-box">
            <div class="authTable-option">
                <div class="search">
                    <el-input class="input" v-model="authSearch[0].title" placeholder="请输入权限"></el-input>
                    <el-button type="primary" @click="searchAuth">查询</el-button>
                </div>
                <el-button type="primary" @click="createAuth">添加权限</el-button>
            </div>
            
            <el-table
                :data="authTable" 
                class="authTable-table">
                <el-table-column
                    label="id"
                    prop="id"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="是否展示"
                    prop="is_display"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="名称"
                    prop="title"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="路由"
                    prop="router"
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
                            type="danger"
                            @click="deleteAuth(scope.$index, scope.row)">删除</el-button>
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
    data(){
        return {
            //权限列表
            authTable: [], 
            //权限列表搜索
            authSearch: [
                {
                    key: 'title',
                    title: ''
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
            let arr = this.authSearch.filter((item, index) =>{
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

            await authService.getPermissionList(tableOption)
                .then(data =>{
                    
                    this.authTable = data.data.data
                    
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
         * 查找权限信息
         */
        async searchAuth(){
            await this.getTableList()
        },
        /**
         * 新建权限
         */
        createAuth(){
            this.$router.push({
                path: "/auth/authConfig",
                query: {
                    type: 0,
                }
            })
        },
        /**
         * 配置权限
         */
        editAuth(index, row){
            this.$router.push({
                path: "/auth/authConfig",
                query: {
                    id: row.id,
                    type: 1
                }
            })
        },
        /**
         * 删除用户
         */
        deleteAuth(index, row) {
            console.log(index, row);
            this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(async () => {
                let a = await authService.deletePermission(row.id)
                // Promise.resolve()
                    // .then(data =>{
                    //     debugger
                    //     this.$message({
                    //         type: 'success',
                    //         message: data.message
                    //     });
                    // }).catch(error =>{
                    //     debugger
                    //     this.$message({
                    //         type: 'info',
                    //         message: error.message
                    //     }); 
                    // })
            }).catch(error =>{
                    this.$message({
                            type: 'info',
                            message: error.message
                        }); 
            })
        },
    },
    async mounted(){
        store.commit('setLoading',true)
        try {
            await this.getTableList()
        } catch (error) {
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
    .authTable{
        
        padding-top: 30px;
        .container-box{
            width:80%;
            min-width:1100px;
            margin: 0 auto;
            .authTable-option{
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
            .authTable-table{
                width: 100%;
            }
        }
    }
</style>



<template>
    <div class="authList">
        <div class="container-box">
            <div class="authList-option">
                <div class="search">
                    <el-input class="input" v-model="authSearch.username" placeholder="请输入权限"></el-input>
                    <el-button type="primary" @click="searchAuth">查询</el-button>
                </div>
                <el-button type="primary" @click="createAuth">添加权限</el-button>
            </div>
            
            <el-table
                :data="authList" 
                class="authList-table">
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
                    label="描述"
                    prop="description"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="路由"
                    prop="route"
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
            <!-- <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage3"
                :page-size="100"
                layout="prev, pager, next, jumper"
                :total="1000"></el-pagination> -->
        </div>
    </div>
</template>
<script>
import {authService} from '../../../../common'
export default {
    data(){
        return {
            authList: [], //权限列表
            authSearch: {
                username: ''
            },
            currentPage3: 5,
        }
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        /**
         * 查找权限信息
         */
        searchAuth(){

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
             await authService.getPermissionList()
                .then(data =>{
                    this.authList = data.data.data
                }).catch(err =>{

                })
        } catch (error) {
            
        }
        store.commit('setLoading',false)
    }
}
</script>
<style lang="scss" scoped>
    .authList{
        
        padding-top: 30px;
        .container-box{
            width:80%;
            min-width:1100px;
            margin: 0 auto;
            .authList-option{
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
            .authList-table{
                width: 100%;
            }
        }
    }
</style>



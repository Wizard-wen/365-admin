<template>
    <div class="authority">
        
        <div class="container-box">
            <div class="authority-option">
                <div class="search">
                    <el-input class="input" v-model="authSearch.username" placeholder="请输入角色名"></el-input>
                    <el-button type="primary" @click="search">查询</el-button>
                </div>
                <el-button type="primary" @click="createRole">添加角色</el-button>
            </div>
            
            <el-table
                :data="authTable" 
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
        </div>
        
    </div>
</template>
<script>
    import {authService} from '../../../../common'
    export default {
        data() {
            return {
                //角色列表
                authTable: [],
                //角色列表搜索条件
                authSearch: {
                    username: '',//角色名
                    page: 1,//页码
                }
            }
        },
        methods: {
            /**
             * 查找角色
             */
            async search(){
                await authService.getManagerList(this.authSearch.page,this.authSearch.username)
                    .then(data =>{
                        console.log(data)
                        this.authTable = data.data
                    }).catch(error =>{
                        this.$message({
                            type:'error',
                            message: error.message
                        })
                    })
            },
            /**
             * 权限配置
             */
            editAuth(index, row){
                this.$router.push({
                    path: "/auth/authConfig",
                    query: {

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
                    }
                })
            },
            /**
             * 删除角色
             */
            deleteRole(index, row) {
                console.log(index, row);
            },
        },
        async mounted(){
            await authService.getRoleList()
                .then(data =>{
                    console.log(data)
                    this.authTable = data.data.data
                }).catch(error =>{
                    this.$message({
                        type:'error',
                        message: error.message
                    })
                })
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



<template>
    <div class="authority">
        
        <div class="container-box">
            <div class="authority-option">
                <div class="search">
                    <el-input class="input" v-model="authSearch.username" placeholder="请输入用户名"></el-input>
                    <el-button type="primary" @click="search">查询</el-button>
                </div>
                <el-button type="primary" @click="createAccount">添加账户</el-button>
            </div>
            
            <el-table
                :data="userTable" 
                class="authority-table">
                <el-table-column
                    label="id"
                    prop="id"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="用户名"
                    prop="account"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="昵称"
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
        </div>
        
    </div>
</template>
<script>
    import {authService} from '../../../../common'
    export default {
        data() {
            return {
                //用户列表
                userTable: [],
                //用户列表搜索条件
                authSearch: {
                    username: '',//账户名
                    page: 1,//页码
                }
            }
        },
        methods: {
            /**
             * 查找用户
             */
            async search(){
                await authService.getManagerList(this.authSearch.page,this.authSearch.username)
                    .then(data =>{
                        console.log(data)
                        this.userTable = data.data
                    }).catch(error =>{
                        this.$message({
                            type:'error',
                            message: error.message
                        })
                    })
            },
            /**
             * 角色配置
             */
            editRole(index, row){
                this.$router.push({
                    path: "/auth/roleConfig",
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
                        id: ''
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
                        account: row.account
                    }
                })
            },
            /**
             * 删除用户
             */
            deleteUser(index, row) {
                console.log(index, row);
            },
        },
        async mounted(){
            await authService.getManagerList(this.authSearch.page,this.authSearch.username)
                .then(data =>{
                    // console.log(data)
                    this.userTable = data.data.data
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
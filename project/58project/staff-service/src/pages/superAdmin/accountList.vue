<template>
    <div class="authority">
        
        <div class="container-box">
            <el-form :inline="true" :model="authSearch" class="authority-form">
                <el-form-item label="搜索">
                    <el-input v-model="authSearch.user" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="账号类型">
                    <el-select v-model="authSearch.region" placeholder="账号类型">
                        <el-option label="销售管理员" value="shanghai"></el-option>
                        <el-option label="人力管理员" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table
                :data="userTable" 
                class="authority-table">
                <el-table-column
                    label="id"
                    prop="id"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="姓名"
                    prop="name"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="账号类型"
                    prop="type"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="地址"
                    prop="address"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="editUser(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                            size="mini"
                            @click="viewUser(scope.$index, scope.row)">查看</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="deleteUser(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        
    </div>
</template>
<script>
    import authorityService from '../../../common/service/authorityService.js'
    export default {
        data() {
            return {
                //用户列表
                userTable: [],
                //用户列表搜索条件
                authSearch: {
                    user:'',
                    region: ''
                }
            }
        },
        methods: {
            /**
             * 查找用户
             */
            search(){

            },
            /**
             * 编辑用户权限
             */
            editUser(index, row){
                this.$router.push({
                    path: "/superAdmin/editAccount",
                    query: {
                        type: 1, //编辑为1
                        id: row.id
                    }
                })
            },
            /**
             * 查看用户权限
             */
            viewUser(index, row) {
                this.$router.push({
                    path: "/superAdmin/editAccount",
                    query: {
                        type: 0, //查看为0
                        id: row.id
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
            this.userTable = await authorityService.getAccountList()
        }
    }
</script>
<style lang="scss" scoped>
    .authority{
        
        
        .container-box{
            padding: 30px;
            .authority-form{
                width:80%;
                min-width:1100px;
                margin: 0 auto;
            }
            .authority-table{
                width: 80%;
                min-width: 1100px;
                margin: 0 auto;
            }
        }
    }
</style>
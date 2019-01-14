<template>
    <div class="authList">
        <div class="container-box">
            <div class="authList-option">
                <div class="search">
                    <el-input class="input" v-model="authSearch.username" placeholder="请输入权限"></el-input>
                    <el-button type="primary" @click="search">查询</el-button>
                </div>
                <el-button type="primary" @click="createRole">添加权限</el-button>
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
    data(){
        return {
            authList: [], //权限列表
            authSearch: {
                username: ''
            },
        }
    },
    methods: {
        createRole(){

        },
        search(){

        },
        /**
         * 权限配置
         */
        editAuth(index, row){
            this.$router.push({
                path: "/auth/authConfig",
                query: {
                    id: row.id,
                }
            })
        },
    },
    async mounted(){
        store.commit('setLoading',true)
        try {
             await authService.getPermissionList()
                .then(data =>{
                    console.log(data)
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



<template>
    <div class="table-contains">
        <div class="btn-contains">
            <el-button type="primary" @click="createRole">添加角色</el-button>
        </div>
        <el-table 
            :data="tableData" 
            class="table-list" 
            border
            :header-cell-style="{height: '54px',background: '#fafafa'}">

            <el-table-column label="编号" prop="id" align="center"></el-table-column>
            <el-table-column label="名称" prop="name" align="center"></el-table-column>

            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button
                        size="mini" type="primary"
                        @click="editAuth(scope.row)">权限配置</el-button>
                    <el-button
                        size="mini"
                        @click="editRole(scope.row)">角色编辑</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="deleteRole(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    
</template>

<script>
import {authService} from '@/service/auth'
export default {
    props: {
        //列表数据
        tableData: {
            type: Array,
            default:function(){return []}
        },
        tableConfigForm: {
            type: Object,
            default: function(){return {}}
        },
    },
    methods: {
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
         * 权限配置
         */
        editAuth(row){
            this.$router.push({
                path: "/auth/roleConfig",
                query: {
                    id: row.id,
                }
            })
        },
        /**
         * 角色编辑
         */
        editRole(row) {
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
        deleteRole(row) {

            this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () =>{
                

                await this.deleteRoleRequest(row.id)

                this.$emit('updateTable')

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        
        async deleteRoleRequest(id){
            try{
                this.is_loading = true
                await authService.deleteRole(id).then((data) => {
                    if(data.code == '0'){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }
                    this.is_loading = false
                }).catch((error) =>{
                    this.$message({
                        type: 'success',
                        message: error.message
                    });
                    this.is_loading = false
                }).finally(() =>{
                    this.is_loading = false
                })
            } catch(error){
                this.$message({
                    type: 'success',
                    message: error.message
                });
                this.is_loading = false
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.table-contains{
    background: #fff;
    .btn-contains{
        padding: 10px 50px;
        display: flex;
        justify-content: flex-end;
    }
    .table-list{
        min-height: 800px;
    }  
}  
          
        


</style>
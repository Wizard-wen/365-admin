<template>
    <div class="table-contains">
        <div class="btn-contains">
            <el-button type="primary" @click="createAuth">添加权限</el-button>
        </div>
        <el-table 
            :data="tableData" 
            class="table-list" 
            border
            :header-cell-style="{height: '54px',background: '#fafafa'}">

            <el-table-column label="编号" prop="id" align="center"></el-table-column>
            <el-table-column label="菜单展示" prop="is_display" align="center" >
                <template slot-scope="scope">
                    <el-tag 
                        size="small"
                        :type="scope.row.is_display == 1? 'success':'danger'">
                        {{scope.row.is_display == 1? '展示':'不展示'}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="权限名" prop="title" align="center"></el-table-column>
            <el-table-column label="请求路由" prop="router" align="center"></el-table-column>

            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="primary"
                        @click="editAuth(scope.row)">权限配置</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="deleteAuth(scope.row)">删除</el-button>
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
        editAuth(row){
            this.$router.push({
                path: "/auth/authConfig",
                query: {
                    id: row.id,
                    type: 1,
                }
            })
        },
        /**
         * 删除用户
         */
        async deleteAuth(row) {

            await this.$confirm('确定删除该权限吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () =>{
                await this.deletePermissionRequest(row.id)
                this.$emit('updateTable')
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        /**
         * 删除权限请求
         */
        async deletePermissionRequest(id){
            try{
                this.is_loading = true
                await authService.deletePermission(id).then(data =>{
                    if(data.code == "0"){
                        this.$message({
                            type:'success',
                            message: `删除成功`
                        })
                    }
                    this.is_loading = false
                }).catch(error =>{
                    this.$message({
                        type:'error',
                        message: error.message
                    })
                    this.is_loading = false
                }).finally(() =>{
                    this.is_loading = false
                })
            } catch(error){
                this.$message({
                    type:'error',
                    message: error.message
                })
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
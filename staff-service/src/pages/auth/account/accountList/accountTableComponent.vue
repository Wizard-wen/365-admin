<template>
    <div class="table-contains">
        <div class="btn-contains">
            <el-button type="primary" @click="createAccount">创建账户</el-button>
        </div>
        <el-table 
            :data="tableData" 
            class="table-list" 
            border
            :header-cell-style="{height: '54px',background: '#fafafa'}">

            <el-table-column label="编号" prop="id" align="center"></el-table-column>
            <el-table-column label="账号" prop="account" align="center"></el-table-column>
            <el-table-column label="用户名" prop="name" align="center"></el-table-column>
            <el-table-column label="部门" prop="department_id"  align="center">
                <template slot-scope="scope">
                    <table-tag-component
                        v-if="tableConfigForm.departmentList"
                        :propList="tableConfigForm.departmentList"
                        :tableOriginData="scope.row.department_id"></table-tag-component>
                </template>
            </el-table-column>
            <el-table-column label="所属门店" prop="store_name" align="center"></el-table-column>

            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button
                        size="mini" type="primary"
                        @click="editAccount(scope.row)">账户编辑</el-button>
                    <el-button
                        size="mini" :type="scope.row.status == 1?'danger':'success'"
                        @click="setAccountState(scope.row)">{{scope.row.status == 1?'停用':'启用'}}</el-button>
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
         * 创建账户
         */
        createAccount(){
            this.$router.push({
                path: "/auth/accountEdit",
                query: {
                    type: 0, //创建为0
                }
            })
        },
        /**
         * 账户编辑
         */
        editAccount(row) {
            this.$router.push({
                path: "/auth/accountEdit",
                query: {
                    type: 1, //编辑为1
                    id: row.id,
                }
            })
        },
        /**
         * 停用或启用账户
         */
        async setAccountState(row) {

            let statusText = row.status == 2 ? '停用' : '启用'

            await this.$confirm(`确定${statusText}该账户吗?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () =>{
                await this.changeManagerTypeRequest(row.id)
                this.$emit('updateTable')
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: `已取消${statusText}`
                });
            });
        },
        /**
         * 改变账户状态
         */
        async changeManagerTypeRequest(id){
            try{
                this.is_loading = true
                await authService.changeManagerType(id).then(data =>{
                    if(data.code == "0"){
                        this.$message({
                            type:'success',
                            message: data.message
                        })
                        
                        this.is_loading = false
                    }
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
        },
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
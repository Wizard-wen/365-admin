<template>
    <div class="table-box" v-loading="is_loading">
        <query-role-component
            @changeQueryedForm="changeQueryedForm"></query-role-component>
        <role-table-component
            :tableData="roleTable"
            @updateTable="updateTable"></role-table-component>
        <pagination
            :pagination="pagination"
            @changePage="changePage"></pagination>
    </div>
</template>
<script>
    import {authService} from '@/service/auth'
    import queryRoleComponent from './roleList/queryRoleComponent.vue'
    import roleTableComponent from './roleList/roleTableComponent.vue'
    export default {
        components: {
            queryRoleComponent,
            roleTableComponent,
        },  
        data() {
            return {
                is_loading: false,
                //角色列表
                roleTable: [],
                //角色列表搜索条件
                queryForm: {
                    name: ''
                },
                //分页信息
                pagination: {
                    total: 0,
                    currentPage: 1,
                    pageNumber: 20,
                }
            }
        },
        computed:{
            searchForm(){
                return {
                    page: this.pagination.currentPage,
                    pageNumber: this.pagination.pageNumber,
                    ...this.queryForm,
                }
            }
        },
        methods: {
            /**
             * 请求表格数据
             */
            async getTableList(){
                
                try{
                    this.is_loading = true
                    let getRoleListForm = {
                        ...this.searchForm,
                    }
                    await authService.getRoleList(getRoleListForm).then(data =>{
                            if(data.code == "0"){
                                this.roleTable = data.data.data

                                //分页信息
                                this.pagination.currentPage = data.data.current_page //当前页码
                                this.pagination.total = data.data.total //列表总条数
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
            },
            /**
             * 改变页码
             */
            async changePage(res){
                this.pagination.currentPage = res
                await this.getTableList()
            },
            /**
             * 更新表格
             */
            async updateTable(res){
                this.queryForm = {
                    ...res
                }
                await this.getTableList()
            },
            /**
             * 变更查询条件
             */
            async changeQueryedForm(res){
                this.queryForm = {
                    ...res
                }
                await this.getTableList()
            },
        },
        async mounted(){
            await this.getTableList()
        }
    }
</script>
<style lang="scss" scoped>
.table-box{
    padding: 24px;
    background: #f1f2f5;
}
</style>



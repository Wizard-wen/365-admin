<template>
    <div class="table-box" v-loading="is_loading">
        <query-account-component
            @changeQueryedForm="changeQueryedForm"
            :tableConfigForm="tableConfigForm"></query-account-component>
        <account-table-component
            :tableData="accountTable"
            :tableConfigForm="tableConfigForm"
            @updateTable="updateTable"></account-table-component>
        <pagination
            :pagination="pagination"
            @changePage="changePage"></pagination>
    </div>
</template>
<script>
    import {authService} from '@/service/auth'
    import {departmentList} from '@/pages/myCenter/ImyCenter'
    import queryAccountComponent from './accountList/queryAccountComponent.vue'
    import accountTableComponent from './accountList/accountTableComponent.vue'
    export default {
        components: {
            queryAccountComponent,
            accountTableComponent,
        },
        data() {

            return {
                is_loading: false,
                //用户列表
                accountTable: [],
                tableConfigForm :{
                    store_selection:[],//门店基本信息列表
                    departmentList: departmentList,// 部门列表
                },
                //查询对象
                queryForm: {
                    name:'',
                    department_id: 0,
                    store_id: 0,
                },
                // 分页信息
                pagination: {
                    total: 0,
                    currentPage: 1,
                    pageNumber: 20,
                },
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
                    let searchForm = {
                        ...this.searchForm,
                    }
                    await authService.getManagerList(searchForm).then(data =>{
                        if(data.code == "0"){
                            this.accountTable = data.data.list.data

                            this.tableConfigForm.store_selection = data.data.store_selection

                            //分页信息
                            this.pagination.currentPage = data.data.list.current_page //当前页码
                            this.pagination.total = data.data.list.total //列表总条数
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
            async updateTable(){
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

<template>
   <div class="table-box" v-loading="is_loading">
        <query-component
            @changeQueryedForm="changeQueryedForm"></query-component>
        <client-table-component
            :tableData="clientTable"
            @updateTable="updateTable"></client-table-component>
        <pagination
            :pagination="pagination"
            @changePage="changePage"></pagination>
    </div>
</template>
<script>
    import {clientService} from '@/service/operateClient.ts'

    import queryComponent from './clientList/queryComponent.vue'
    import clientTableComponent from './clientList/clientTableComponent.vue'
    import pagination from './clientList/pagination.vue'

    export default {
        components: {
            clientTableComponent,
            queryComponent,
            pagination,
        },
        data(){
            return {
                is_loading: false,
                //列表
                clientTable: [],
                // 页码
                pagination: {
                    currentPage:1,
                    total: 0,
                    pageNumber: 20,
                },
                //查询对象
                queryedForm: {
                    page: 1,
                    pageNumber: 20,
                    name: '',
                    phone: '',
                },
            }
        },
        methods: {
             /**
             * 请求表格数据
             */
            async getTableList(){
                try{

                    this.is_loading = true


                    
                    await clientService.getUserList().then((data) =>{

                        this.clientTable = data.data.data
                        //分页信息
                        this.pagination.currentPage = data.data.current_page //当前页码
                        this.pagination.total = data.data.total //列表总条数
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
            // 由查询组件触发的更新表格事件
            async updateTable(){
                await this.getTableList()
            },
            //改变页面
            async changePage(res){
                this.pagination.currentPage = res
                await this.getTableList()
            },
            //查询组件更新
            async changeQueryedForm(res){
                this.queryedForm = res
                this.getTableList()
            }
        },
        async mounted(){
            await this.getTableList()
        }
    }
</script>
<style>
    .table-box{
        padding: 24px;
        background: #f1f2f5;
    }
</style>

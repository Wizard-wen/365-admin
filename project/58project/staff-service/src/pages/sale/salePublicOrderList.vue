<template>
    <div class="table-box" v-loading="is_loading">
        <public-query-component
            :queryForm="orderConfigForm"
            @changeQueryedForm="changeQueryedForm"></public-query-component>
        <order-table-component
            :orderModuleType="'public'"
            :tableData="orderTable"
            :orderConfigForm="orderConfigForm"
            :currentPage="pagination.terminateOrderBtn"
            @updateTable="updateTable"></order-table-component>
        <pagination
            :pagination="pagination"
            @changePage="changePage"></pagination>
    </div>
</template>
<script>
    // import {operateService, $utils} from '@common/index.js'
    // 
    import {saleService} from '@/service/sale.ts'
    // 
    import publicQueryComponent from '@/pages/sale/salePublicOrderList/publicQueryComponent.vue'
    import orderTableComponent from '@/public/module/orderList/orderTableComponent.vue'

    export default {
        components: {
            publicQueryComponent,
            orderTableComponent,
        },
        data() {
            return {

                is_loading: false,
                //列表
                orderTable: [],
                // 列表配置项
                orderConfigForm: {},
                // 页码
                pagination: {
                    currentPage:1,
                    total: 0,
                    pageNumber: 20,
                },
                //查询对象
                queryForm: {
                    order_code: '', //订单编号
                    order_at: [],//客户下单时间
                    agent_manager_id: [],//订单经纪人
                    agent_store_id: [],//订单经纪门店
                },
            }
        },
        computed:{
            /**
             * 列表查询对象
             */
            queryObject(){
                return {
                    get_for: 'public',
                    page: this.pagination.currentPage, //请求页码
                    pageNumber: this.pagination.pageNumber,//单页信息数量
                    ...this.queryForm,
                }
            }
        },
        methods: {
            /**
             * 请求列表数据
             */
            async getTable(){          
                try{
                    this.is_loading = true
                    await saleService.getSalePublicOrderList(this.queryObject).then(data=>{
                        
                        this.pagination = data.pagination
                        this.orderTable = data.orderTable
                        this.orderConfigForm = data.orderConfigForm
                        
                        this.is_loading = false
                    }).catch(error =>{
                        this.$message({
                            type: 'error',
                            message: error.message
                        })
                        this.is_loading = false
                    })
                } catch(error){
                    this.$message({
                        type: 'error',
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
                await this.getTable()
            },
            /**
             * 更新表格
             */
            async updateTable(res){
                this.queryForm = {
                    ...res
                }
                await this.getTable()
            },
            /**
             * 变更查询条件
             */
            async changeQueryedForm(res){
                this.queryForm = {
                    ...res
                }
                await this.getTable()
            },
        },
        async mounted(){
            if(this.$route.query.currentPage){
                this.pagination.currentPage = Number(this.$route.query.currentPage)
            }
            await this.getTable()
        }
    }
</script>
<style lang="scss" scoped>
    .table-box{
        padding: 24px;
        background: #f1f2f5;
    }
</style>

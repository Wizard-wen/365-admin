<template>
    <div class="table-box" v-loading="is_loading">
        <order-apply-query-component
            :queryForm="orderApplyConfigForm"
            @changeQueryedForm="changeQueryedForm"></order-apply-query-component>
        <order-apply-table-component
            :orderApplyModuleType="'apply'"
            :tableData="orderApplyTable"
            :orderApplyConfigForm="orderApplyConfigForm"
            :currentPage="pagination.terminateOrderBtn"
            @updateTable="updateTable"></order-apply-table-component>
        <pagination
            :pagination="pagination"
            @changePage="changePage"></pagination>
    </div>
</template>
<script>
    import {operateOrderService} from '@/service/operateOrder.ts'

    import orderApplyQueryComponent from './orderApplyList/orderApplyQueryComponent'
    import orderApplyTableComponent from '@/public/module/orderApplyList/orderApplyTableComponent.vue'

    export default {
        components: {
            orderApplyQueryComponent,
            orderApplyTableComponent,
        },
        data() {
            return {

                is_loading: false,
                //列表
                orderApplyTable: [],
                // 列表配置项
                orderApplyConfigForm: {},
                // 页码
                pagination: {
                    currentPage:1,
                    total: 0,
                    pageNumber: 20,
                },
                //查询对象 8个
                queryForm: {
                    type: [],//订单申请类型
                    apply_manager_id:[],//来源人id
                    apply_store_id: [],//来源门店id
                    apply_code: '',//订单申请编号
                    created_manager_id: [],//申请创建人id
                    user_phone: '',//客户电话
                    user_name: '',//客户姓名
                    created_at: [],//创建时间
                },
            }
        },
        computed:{
            /**
             * 列表查询对象
             */
            queryObject(){
                return {
                    page: this.pagination.currentPage, //请求页码
                    pageNumber: this.pagination.pageNumber,//单页信息数量
                    ...this.queryForm,
                }
            },
        },
        methods: {
            /**
             * 请求列表数据
             */
            async getTable(){          
                try{
                    this.is_loading = true
    
                    await operateOrderService.getOrderApplyList(this.queryObject).then(data=>{
                        
                        this.pagination = data.pagination
                        this.orderApplyTable = data.orderApplyTable
                        this.orderApplyConfigForm = data.orderApplyConfigForm
                        
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

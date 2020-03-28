<template>
    <div class="table-box" v-loading="is_loading">
        <order-query-component
            :orderModuleType="'operate'"
            :queryForm="orderConfigForm"
            @changeQueryedForm="changeQueryedForm"></order-query-component>
        <order-table-component
            :orderModuleType="'operate'"
            :tableData="orderTable"
            :currentPage="pagination.terminateOrderBtn"
            :orderConfigForm="orderConfigForm"
            @updateTable="updateTable"></order-table-component>
        <pagination
            :pagination="pagination"
            @changePage="changePage"></pagination>
    </div>
</template>
<script>
    import {operateService} from '@common/index.js'

    import {operateOrderService} from '@/service/operateOrder'

    import orderQueryComponent from '@/public/module/orderList/orderQueryComponent.vue'
    import orderTableComponent from '@/public/module/orderList/orderTableComponent.vue'

    export default {
        components: {
            orderQueryComponent,
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
                //查询对象  16个
                queryForm: {
                    order_code: '',//订单编号
                    type: [],//订单状态
                    order_at: [],//客户下单时间
                    order_user_phone:'',//下单客户电话
                    order_user_name: '',//下单客户姓名
                    apply_store_id: [],//来源门店
                    apply_manager_id: [],//来源人
                    sign_user_name: '',//签约客户名
                    sign_user_phone: '',//签约客户电话
                    sign_staff_name: '',//签约服务人员姓名
                    sign_staff_code: '',//签约服务人员编号
                    sign_staff_phone: '',//签约服务人员电话
                    created_at: [],//订单创建时间
                    created_manager_id: [],//订单创建人
                    agent_store_id: [],//经纪门店id
                    agent_manager_id: [], //经纪人id
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

                    await operateOrderService.getOperateOrderList(this.queryObject).then(data=>{
                        
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

<template>
    <div class="table-box" v-loading="is_loading">
        <match-query-component
            :queryForm="workerConfigForm"
            @changeQueryedForm="changeQueryedForm"></match-query-component>
        <worker-table-component
            :workerListType="workerListType"
            :tableData="workerTable"
            :workerConfigForm="workerConfigForm"
            @updateTable="updateTable"></worker-table-component>
        <pagination
            :pagination="pagination"
            @changePage="changePage"></pagination>
    </div>
</template>
<script>
    import {saleService} from '@/service/sale.ts'

    import matchQueryComponent from './matchServiceList/matchQueryComponent.vue'

    import workerTableComponent from '@/public/module/workerList/workerTableComponent.vue'

    export default {
        components: {
            matchQueryComponent,
            workerTableComponent,
        },
        data() {
            return {

                is_loading: false,
                //列表
                workerTable: [],
                // 列表配置项
                workerConfigForm: {},
                // 页码
                pagination: {
                    currentPage:1,
                    total: 0,
                    pageNumber: 20,
                },
                //查询对象
                queryForm: {
                    name: '',
                    phone: '',
                    identify: '',
                    staff_code: '',
                    service_category: [],
                    sign_status: 0,
                    manager: [],
                    nation: 0,
                    course: [],
                    education: 0,
                    paper_category: 0,
                },
                //控制异常信息弹出框显示隐藏
                errorWorkerDialogVisible: false,
                //异常服务人员id
                errorWorkerId: 0,
                //异常服务人员信息
                errorWorkerRow: null,
            }
        },
        props: {
            workerListType: {
                type: String,
                default: 'match'
            }
        },
        computed:{
            /**
             * 列表查询对象
             */
            queryObject(){
                return {
                    get_for: 'match',
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
                    await saleService.getSaleOrderConfigMatchWorkerList('edit',this.queryObject).then(data=>{
                        
                        this.pagination = data.pagination
                        this.workerTable = data.workerTable
                        this.workerConfigForm = data.workerConfigForm
                        this.$emit('updateOrderConfig')
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
            await this.getTable()
        }
    }
</script>
<style lang="scss" scoped>
    .table-box{
        // padding: 24px;
        // background: #f1f2f5;
    }
</style>

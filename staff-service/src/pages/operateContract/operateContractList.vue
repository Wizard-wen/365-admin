<template>
    <div class="table-box" v-loading="is_loading">
        <query-contract-component
            :queryForm="contractConfigForm"
            @changeQueryedForm="changeQueryedForm"></query-contract-component>
        <contract-table-component
            :contractModuleType="'operateContractList'"
            :tableData="contractTable"
            :currentPage="pagination.currentPage"
            :contractConfigForm="contractConfigForm"
            @updateTable="updateTable"></contract-table-component>
        <pagination
            :pagination="pagination"
            @changePage="changePage"></pagination>
    </div>
</template>
<script>
    import {operateContractService} from '@/service/operateContract'

    import queryContractComponent from '@/public/module/contractList/queryContractComponent.vue'
    import contractTableComponent from '@/public/module/contractList/contractTableComponent.vue'

    export default {
        components: {
            queryContractComponent,
            contractTableComponent,
        },
        data() {
            return {

                is_loading: false,
                //列表
                contractTable: [],
                // 列表配置项
                contractConfigForm: {},
                // 页码
                pagination: {
                    currentPage:1,
                    total: 0,
                    pageNumber: 20,
                },
                //查询对象
                queryForm: {
                    contract_code:'',//合同流水号
                    contract_number:'',//合同编号

                    status: [],//合同状态
                    sign_at: [],//签约时间 
                    sign_manager_id: [],//签约经纪人
                    sign_store_id: [],//签约经纪门店

                    sign_user_name: '',//雇主
                    sign_user_phone:'',//雇主电话

                    sign_staff_name:'',//签约家政服务员
                    sign_staff_code: '',//签约家政服务员员工号
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
                    //如果当前不是店长
                    let queryForm = {
                        ...this.queryObject,
                    }
                    await operateContractService.getOperateContractList(queryForm).then(data=>{
                        
                        this.pagination = data.pagination
                        this.contractTable = data.contractTable
                        this.contractConfigForm = data.contractConfigForm
                        
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
        padding: 24px;
        background: #f1f2f5;
    }
</style>
s
<template>
    <div class="table-box" v-loading="is_loading">
        
        <query-component
            :queryForm="workerConfigForm"></query-component>
        

        <worker-table-component
            :tableData="workerTable"
            :workerConfigList="workerConfigForm"
            @updateTable="updateTable"></worker-table-component>
        <pagination
            :pagination="pagination"
            @changePage="changePage"></pagination>
    </div>
</template>

<script>
import {operateService} from '@common/index.js'
import {
    queryComponent,
    pagination,
    workerTableComponent,
} from './workerList1/index.js'
export default {
    components: {
        queryComponent,
        pagination,
        workerTableComponent,
    },
    data(){
        return {
            is_loading: false,
            workerTable: [],
            workerConfigForm: {},
            pagination: {
                currentPage:1,
                total: 0,
                pageNumber: 20,
            }
        }
    },
    methods: {
        /**
         * 请求列表数据
         */
        async getTableList(){
            try{

                this.is_loading = true

                await Promise.all([
                    operateService.getWorkerFormConfig('edit'), //获取表单配置字段
                    operateService.getStaffList(0), //获取列表数据
                    operateService.getServiceTree() //服务商品树形
                ]).then((data) =>{
                    // 将表单配置数据存入 vuex
                    // this.$store.commit('setWorkerConfigForm',data[0].data)
                    
                    this.workerConfigForm = {
                        ...data[0].data,
                        serviceConfig: data[2].data
                    }
                    // console.log(data[2].data)
                    // let tableList = data[1].data.data
                    // tableList.forEach((item, index) =>{

                    //     this.computeStringLength(item.authentication, 'authentication', 'authentication')
                    //     this.computeStringLength(item.working_status, 'working_status', 'working_status')
                    //     this.computeStringLength(item.skill_ids, 'skill_ids', 'service_category')
                    //     this.computeStringLength(item.service_type, 'service_type', 'service_type')
                    //     this.computeStringLength(item.service_crowd, 'service_crowd', 'service_crowd')
                    //     this.computeStringLength(item.working_age, 'working_age', 'working_age')
                    //     this.computeStringLength(item.nation, 'nation', 'nation')
                    //     this.computeStringLength(item.region_ids, 'region_ids', 'service_region')
                    //     this.computeStringLength(item.course, 'course', 'course')
                    //     this.computeStringLength(item.paper_ids, 'paper_ids', 'paper_category')
                    //     this.computeStringLength(item.source, 'source', 'source')
                    // })

                    this.workerTable = data[1].data.data
                    //分页信息
                    this.pagination.currentPage = data[1].data.current_page //当前页码
                    this.pagination.total = data[1].data.total //列表总条数
                    this.pagination.pageNumber = data[1].data.per_page //每页显示数

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
        async changePage(){

        },
        async updateTable(){
            debugger
            await this.getTableList()
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
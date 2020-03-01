<template>
    <div class="table-box" v-loading="is_loading">
        <query-component
            :queryForm="workerConfigForm"
            @changeQueryedForm="changeQueryedForm"></query-component>
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
import {storeService} from '@common/service/store'

import queryComponent from './queryComponent/index.vue'
import workerTableComponent from './workerTableComponent/index.vue'
import pagination from './pagination/index.vue'




export default {
    components: {
        queryComponent,
        pagination,
        workerTableComponent,
    },
    data(){
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
            queryedFrom: {
                is_third: [],
                type: [],
                name: '',
                store_manager_name: '',
                store_code: '',
            },
        }
    },
    computed: {
        /**
         * 列表查询对象
         */
        queryObject(){
            return {
                page: this.pagination.currentPage, //请求页码
                pageNumber: this.pagination.pageNumber,//单页信息数量
                ...this.queryedFrom,
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
                await storeService.getTableList(this.queryObject).then(data=>{
                    
                    this.pagination = data.pagination
                    this.workerTable = data.workerTable
                    
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
        async changePage(){

        },
        async updateTable(){
            await this.getTable()
        },
        async changeQueryedForm(res){
            this.queryedFrom = res
            await this.getTable()
        },
        
    },
    async mounted(){
        await this.getTable()
    }   
}
</script>

<style>
    .table-box{
        padding: 24px;
        background: #f1f2f5;
    }
</style>
<template>
    <div class="auth" v-loading="is_loading">
        <div class="auth-table-box">
            <div class="table-box" v-loading="is_loading">
                <query-auth-component
                    @changeQueryedForm="changeQueryedForm"></query-auth-component>
                <auth-table-component
                    :tableData="authTable"
                    @updateTable="updateTable"></auth-table-component>
                <pagination
                    :pagination="pagination"
                    @changePage="changePage"></pagination>
            </div>
        </div>
        <div class="auth-tree-box">
            <div class="title">索引</div>
            <el-tree :data="treelist" accordion @node-click="nodeClick" :props="defaultProps"></el-tree>
        </div>
    </div>
</template>
<script>
import {authService} from '@/service/auth'
import authTableComponent from './authList/authTableComponent.vue'
import queryAuthComponent from './authList//queryAuthComponent.vue'
export default {
    components: {
        authTableComponent,
        queryAuthComponent,
    },
    data(){
        return {
            is_loading: false,
            //权限列表
            authTable: [],
            /**
             * 分页信息
             */
            pagination: {
                total: 0,
                currentPage: 1,
                pageNumber: 20,
            },
            //查询对象
            queryForm: {
                title: '',
            },
            //树形列表
            treelist: [],
            //树形组件配置
            defaultProps: {
                children: 'children',
                label: 'title'
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
                let searchAuthForm = {
                    ...this.searchForm,
                }
                await Promise.all([
                    authService.getPermissionList(searchAuthForm),
                    authService.getPermissionTree()
                ]).then(data =>{
                    if(data[0].code == "0"){
                        this.authTable = data[0].data.data

                        //分页信息
                        this.pagination.currentPage = data[0].data.current_page //当前页码
                        this.pagination.total = data[0].data.total //列表总条数
                    }
                    if(data[1].code == "0"){
                        this.treelist = data[1].data
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
        /**
         * 点击节点
         */
        async nodeClick(clickObject,currentObject){
            this.$router.push({
                path: "/auth/authConfig",
                query: {                                                                   
                    id: clickObject.id,
                    type: 1,
                    fromPage: this.pagination.currentPage
                }
            })
        },
    },
    async mounted(){
        if(this.$route.query.page){
            this.pagination.currentPage = Number(this.$route.query.page)
        }
        await this.getTableList()
    }
}
</script>
<style lang="scss" scoped>
    .auth{
        // padding-top: 30px;
        margin: 0 auto;
        display: flex;
        .auth-table-box{
            width: calc(100% - 200px);
            // .auth-form{
            //     width:90%;
            //     min-width:900px;
            //     margin: 0 auto;
            //     display: flex;
            //     justify-content: space-between;
            // }
            // .auth-table{
            //     width: 90%;
            //     min-width: 900px;
            //     margin: 0 auto;
            // }
            // .pagination{
            //     width:80%;
            //     min-width:1100px;
            //     margin: 30px auto 0 auto;;
            // }
            .table-box{
                padding: 24px;
                background: #f1f2f5;
            }
        }
        .auth-tree-box{
            position: relative;
            width: 200px;
            border-left:1px solid #ccc;
            .title{
                line-height: 40px;
                height: 40px;
                width: 100%;
                text-align:center;
                font-size: 16px;
            }
        }
    }
</style>



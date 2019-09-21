<template>
    <div class="auth">
        <div class="auth-table-box">
            <el-form :inline="true" :model="authSearch" class="auth-form">
                <div class="search">
                    <el-form-item>
                        <el-input class="input" v-model="authSearch.title" placeholder="请输入权限名" :maxlength="20"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="searchAuth">查询</el-button>
                        <el-button type="primary" @click="resetAuth">重置</el-button>
                    </el-form-item>
                </div>
                <el-form-item>
                    <el-button type="primary" @click="createAuth">添加权限</el-button>
                </el-form-item>
            </el-form>

            <el-table :data="authTable" class="authTable-table">

                <el-table-column label="编号" prop="id" align="center"></el-table-column>
                <el-table-column label="菜单展示" prop="is_display" align="center" >
                    <template slot-scope="scope">
                        <table-tag-component 
                            :propList="is_displayList" 
                            :tableOriginData="scope.row.is_display"></table-tag-component>
                    </template>
                </el-table-column>
                <el-table-column label="权限名" prop="title" align="center"></el-table-column>
                <el-table-column label="请求路由" prop="router" align="center"></el-table-column>

                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="editAuth(scope.row)">权限配置</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="deleteAuth(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
                class="pagination"
                @current-change="handleCurrentPage"
                @prev-click="handleCurrentPage"
                @next-click="handleCurrentPage"
                :current-page.sync="pagination.currentPage"
                :page-size="10"
                layout="prev, pager, next, jumper"
                :total="pagination.total"></el-pagination>
        </div>
        <div class="auth-tree-box">
            <div class="title">索引</div>
            <el-tree :data="treelist" accordion @node-click="nodeClick" :props="defaultProps"></el-tree>
        </div>
    </div>
</template>
<script>
import {
    authService,
    saleService
} from '../../../../common'
import {tableTagComponent} from '@/pages/components/index.js'

export default {
    data(){
        return {
            //权限列表
            authTable: [],
            //权限列表搜索
            authSearch: {
                title: ''
            },
            /**
             * 分页信息
             */
            pagination: {
                total: 0,
                currentPage: 1,
                pageNumber: 10,
            },
            //树形列表
            treelist: [],
            defaultProps: {
                children: 'children',
                label: 'title'
            },
            is_displayList: [
                {name: '展示', id: 1},
                {name: '不展示', id: 2},
            ]
        }
    },
    components: {
        tableTagComponent,
    },
    computed:{
        /**
         * 全部已添加搜索字段
         */
        searchArray(){
            let arr = [],
            _this = this;

            Object.keys(this.authSearch).forEach((item, index) =>{
                if(_this.authSearch[item] != ''){
                    let obj = {}
                    obj[item] = _this.authSearch[item]
                    obj = {
                        ...obj,
                        key: item
                    }
                    arr.push(obj)
                }
            })
            return arr
        }
    },
    methods: {
        /**
         * 请求表格数据
         * @param tableOption 表格配置项
         * @param tableOption.currentPage 当前页
         * @param tableOption.searchSelect Array 页面筛选项
         * [{searchkey: '', searchValue: ''}]
         */
        async getTableList(){

            let tableOption = {
                currentPage: this.pagination.currentPage,
                pageNumber: this.pagination.pageNumber,
                searchSelect: this.searchArray
            }

            store.commit('setLoading',true)

            try{
                await Promise.all([
                        authService.getPermissionList(tableOption),
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
                    }).catch(error =>{
                            this.$message({
                                type:'error',
                                message: error.message
                            })
                    }).finally(() =>{
                        store.commit('setLoading',false)
                    })

            } catch(error){
                this.$message({
                    type:'error',
                    message: error.message
                })
            }
        },
        /**
         * 切换页码
         */
        async handleCurrentPage(val){
            this.pagination.currentPage = val
            await this.getTableList()
        },
        /**
         * 查找权限信息
         */
        async searchAuth(){
            await this.getTableList()
        },
        /**
         * 重置权限
         */
        async resetAuth(){
            this.authSearch.title = ''
            await this.getTableList()
        },
        /**
         * 新建权限
         */
        createAuth(){
            this.$router.push({
                path: "/auth/authConfig",
                query: {
                    type: 0,
                }
            })
        },
        /**
         * 点击节点
         */
        async nodeClick(clickObject,currentObject){
            if(clickObject.hasOwnProperty('children')){
                return;
            } else {
                this.$router.push({
                    path: "/auth/authConfig",
                    query: {
                        id: clickObject.id,
                        type: 1,
                        fromPage: this.pagination.currentPage
                    }
                })
            }
        },
        /**
         * 配置权限
         */
        editAuth(row){
            this.$router.push({
                path: "/auth/authConfig",
                query: {
                    id: row.id,
                    type: 1,
                    fromPage: this.pagination.currentPage
                }
            })
        },
        /**
         * 删除用户
         */
        async deleteAuth(row) {
            let _this= this;

            let response = await this.$confirm('确定删除该权限吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

            if(response == "confirm"){
                store.commit('setLoading',1)

                try{
                    await authService.deletePermission(row.id)
                        .then(data =>{
                            if(data.code == "0"){
                                this.$message({
                                    type:'success',
                                    message: `删除成功`
                                })
                            }
                        }).catch(e =>{
                            this.$message({
                                type:'error',
                                message: e.message
                            })
                        })
                } catch(error){
                    throw error
                }

                await _this.getTableList()
                store.commit('setLoading',false)
            }
        },
    },
    async mounted(){
        if(this.$route.query.page){
            this.pagination.currentPage = this.$route.query.page
        }
        await this.getTableList()
    }
}
</script>
<style lang="scss" scoped>
    .auth{
        padding-top: 30px;
        margin: 0 auto;
        display: flex;
        .auth-table-box{
            width: calc(100% - 200px);
            .auth-form{
                width:90%;
                min-width:900px;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
            }
            .auth-table{
                width: 90%;
                min-width: 900px;
                margin: 0 auto;
            }
            .pagination{
                width:80%;
                min-width:1100px;
                margin: 30px auto 0 auto;;
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



<template>
    <div class="template">
        <div class="template-table-box">
            <el-form :inline="true" :model="templateSearch" class="template-form">
                <div class="search">
                    <el-form-item>
                        <el-input class="input" v-model="templateSearch.name" placeholder="请输入" :maxlength="20"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="searchtemplate">查询</el-button>
                        <el-button type="primary" @click="resettemplate">重置</el-button>
                    </el-form-item>
                </div>
                <el-form-item>
                    <el-button type="primary" @click="createtemplate">创建</el-button>
                </el-form-item>
            </el-form>

            <el-table :data="templateTable" class="templateTable-table">

                <el-table-column label="编号" prop="id" align="center"></el-table-column>
                <el-table-column label="菜单展示" prop="is_display" align="center"></el-table-column>
                <el-table-column label="权限名" prop="title" align="center"></el-table-column>
                <el-table-column label="请求路由" prop="router" align="center"></el-table-column>

                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="edittemplate(scope.row)">配置</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="stoptemplate(scope.row)">停用</el-button>
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
    </div>
</template>
<script>
import {authService, orderService} from '../../../../common'
export default {
    data(){
        return {
            //部门列表
            templateTable: [],
            //部门列表搜索
            templateSearch: {
                name: '',//部门名称
            },
            /**
             * 分页信息
             */
            pagination: {
                total: 0,
                currentPage: 1,
                pageNumber: 10,
            },
        }
    },
    computed:{
        /**
         * 全部已添加搜索字段
         */
        searchArray(){
            let arr = [],
            _this = this;

            Object.keys(this.templateSearch).forEach((item, index) =>{
                if(_this.templateSearch[item] != ''){
                    let obj = {}
                    obj[item] = _this.templateSearch[item]
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
                    ]).then(data =>{
                        if(data[0].code == "0"){
                            this.templateTable = data[0].data.data

                            //分页信息
                            this.pagination.currentPage = data[0].data.current_page //当前页码
                            this.pagination.total = data[0].data.total //列表总条数
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
        async searchtemplate(){
            await this.getTableList()
        },
        /**
         * 重置部门搜索
         */
        async resettemplate(){
            this.templateSearch.name = ''
            await this.getTableList()
        },
        /**
         * 新建部门
         */
        createtemplate(){

        },
        /**
         * 配置权限
         */
        edittemplate(row){

        },
        /**
         * 删除用户
         */
        async stoptemplate(row) {
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
        formatterDisplay(row, column){
            if(row.is_display == 1){
                return "展示"
            } else if(row.is_display == 2){
                return "不展示"
            }
        }
    },
    async mounted(){
        await this.getTableList()
    }
}
</script>
<style lang="scss" scoped>
    .template{
        padding-top: 30px;
        margin: 0 auto;
        display: flex;
        .template-table-box{
            width: calc(100% - 200px);
            .template-form{
                width:90%;
                min-width:900px;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
            }
            .template-table{
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
        .template-tree-box{
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



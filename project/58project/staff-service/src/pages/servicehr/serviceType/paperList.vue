<template>
    <div class="paper">
        <el-form :inline="true" :model="paperSearch" class="paper-form">
            <div>
                <el-form-item label="是否启用">
                    <el-select v-model="paperSearch.type" placeholder="请选择是否启用">
                        <el-option label="请选择" value=""></el-option>
                        <el-option label="已启用" value="enable"></el-option>
                        <el-option label="未启用" value="disable"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="paperSearch.name" :maxlength="30" placeholder="请输入证书名称"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="searchPaper">查询</el-button>
                    <el-button type="primary" @click="resetPaper">重置</el-button>
                </el-form-item>
            </div>


            <el-form-item>
                <el-button type="primary" @click="createPaper">添加证书</el-button>
            </el-form-item>
        </el-form>

        <el-table
            :data="paperTable"
            class="paper-table">
            <el-table-column
                label="证书编号"
                prop="id"
                align="center">
            </el-table-column>
            <el-table-column
                label="证书名称"
                prop="name"
                align="center">
            </el-table-column>
            <el-table-column
                label="状态"
                prop="type"
                :formatter="formatterType"
                align="center">
            </el-table-column>

            <el-table-column
                label="操作"
                align="center">
                <template slot-scope="scope">
                    <el-button size="mini" @click="editPaper(scope.$index, scope.row)">配置</el-button>
                </template>
            </el-table-column>
        </el-table>
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
</template>
<script>
    import hrService from '../../../../common/service/hrService.js'
    export default {
        data() {
            return {
                //技能列表
                paperTable: [],
                //技能搜索条件
                paperSearch: {
                    name: '',//证书名称
                    type: '',//是否启用
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

                Object.keys(this.paperSearch).forEach((item, index) =>{
                    if(_this.paperSearch[item] != ''){
                        let obj = {}
                        obj[item] = _this.paperSearch[item]
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
                    await hrService.getPaperList(tableOption).then(data =>{
                            if(data.code == "0"){
                                this.paperTable = data.data.data

                                //分页信息
                                this.pagination.currentPage = data.data.current_page //当前页码
                                this.pagination.total = data.data.total //列表总条数
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
             * 查找用户
             */
            async searchPaper(){
                await this.getTableList()
            },
            /**
             * 重置
             */
            async resetPaper(){
                this.paperSearch.name = ''
                this.paperSearch.type = ''
                await this.getTableList()
            },
            /**
             * 创建服务人员
             * des 先创建服务人员，然后才能添加服务人员技能。
             */
            createPaper(){
                this.$router.push({
                    path: "/serviceType/paperConfig",
                    query: {
                        type: 0
                    }
                })
            },
            /**
             * 编辑服务人员信息
             * 编辑时可以添加服务人员技能
             */
            editPaper(index, row){
                this.$router.push({
                    path: "/serviceType/paperConfig",
                    query: {
                        type: 1, //编辑为1
                        id: row.id
                    }
                })
            },
            /**
             * 是否启用的状态
             */
            formatterType(row, column){
                if(row.type == "enable"){
                    return "启用"
                } else if(row.type == "disable"){
                    return "未启用"
                }
            }
        },
        async mounted(){
            await this.getTableList()
        }
    }
</script>
<style lang="scss" scoped>
    .paper{
        padding-top: 30px;
        margin: 0 auto;
        .paper-form{
            width:80%;
            min-width:1100px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
        }
        .paper-table{
            width: 80%;
            min-width: 1100px;
            margin: 0 auto;
        }
        .pagination{
            width:80%;
            min-width:1100px;
            margin: 30px auto 0 auto;;
        }
    }
</style>

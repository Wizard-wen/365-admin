<template>
    <div class="require">
        <el-form :inline="true" :model="requireSearch" class="require-form">
            <div class="search-up">
                <div>
                    <el-form-item>
                        <el-input v-model="requireSearch.name" placeholder="请输入需求名" :maxlength="20"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="searchRequire">查询</el-button>
                        <el-button type="primary" @click="resetRequire">重置</el-button>
                    </el-form-item>
                </div>
                <el-form-item>
                    <el-button type="primary" @click="createRequire">创建原始需求</el-button>
                </el-form-item>
            </div>

        </el-form>

        <el-table :data="requireTable" class="require-table">
            <el-table-column label="需求编号" prop="code" align="center"></el-table-column>

            <el-table-column label="状态" prop="state" align="center"></el-table-column>

            <el-table-column label="状态" prop="state" align="center"></el-table-column>

            <el-table-column label="需求创建人" prop="initiatorName" align="center"></el-table-column>

            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="editRequire(scope.$index, scope.row)">编辑需求</el-button>
                    <el-button size="mini" type="primary" @click="commitRequire(scope.$index, scope.row)">提交需求</el-button>
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
</template>
<script>
    import {hrService} from '../../../common'
    import {cascaderComponent} from '@/pages/components'
    export default {
        components: {
            cascaderComponent
        },
        data() {
            return {
                //需求信息列表
                requireTable: [],
                //表单搜索项
                requireSearch: {
                    name: '', //姓名
                    region_ids: [],//服务地区
                    service_category_id: 0,//技能分类
                    ability_ids: [],//能力标签
                    paper_ids: [],//证书
                },
                /**
                 * 级联选择器配置字段
                 */
                setProps: {
                    label: 'name',
                    value: 'id'
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

                Object.keys(this.requireSearch).forEach((item, index) =>{
                    //如果搜索字段是数组的话
                    if(Array.isArray(_this.requireSearch[item])){
                        if(_this.requireSearch[item].length){
                            let obj = {}
                            obj[item] = [..._this.requireSearch[item]]
                            obj = {
                                ...obj,
                                key: item
                            }
                            arr.push(obj)
                        }
                    }
                    //如果搜索字段是字符串的话
                    else if(_this.requireSearch[item] != ''){
                        let obj = {}
                        obj[item] = _this.requireSearch[item]
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
                    get_for: 'require',
                    searchSelect: this.searchArray
                }

                store.commit('setLoading',true)
                try{
                    await hrService.getStaffList(tableOption).then(data =>{
                            if(data.code == "0"){
                                this.requireTable = data.data.data

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
            async searchRequire(){
                await this.getTableList()
            },
            /**
             * 重置搜索框
             */
            async resetRequire(){
                this.requireSearch.name= '' //姓名
                this.requireSearch.region_ids= []//服务地区
                this.requireSearch.service_category_id= 0//技能分类
                this.requireSearch.ability_ids= []//能力标签
                this.requireSearch.paper_ids= []//证书
                await this.getTableList()
            },
            /**
             * 创建原始需求
             */
            createRequire(){
                this.$router.push({
                    path: "/develop/originRequire",
                    query: {
                        type: 0
                    }
                })
            },
            /**
             * 编辑需求信息
             */
            editRequire(index, row){
                this.$router.push({
                    path: "/develop/originRequire",
                    query: {
                        type: 1, //编辑为1
                        id: row.id
                    }
                })
            },
            /**
             * 提交需求
             */
            async commitRequire(index, row){

                let response = await this.$confirm(`确定提交该需求吗?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: `已取消提交`
                    });
                });
                if(response == "confirm"){
                    store.commit('setLoading',1)

                    try{
                        await hrService.changeStaffStatus(row.id, row.version)
                            .then(data =>{
                                if(data.code == "0"){
                                    this.$message({
                                        type:'success',
                                        message: `提交成功`
                                    })
                                }
                            }).catch(e =>{
                                this.$message({
                                    type:'error',
                                    message: e.message
                                })
                            })
                    } catch(error){
                        this.$message({
                            type:'error',
                            message: error.message
                        })
                    }

                    await _this.getTableList()

                    store.commit('setLoading',false)
                }
            }
        },
        async mounted(){
            await this.getTableList()
        }
    }
</script>
<style lang="scss" scoped>
        .require{
        padding-top: 30px;
        margin: 0 auto;
        .require-form{
            width:80%;
            min-width:1100px;
            margin: 0 auto;
            .search-up{
                display: flex;
                justify-content: space-between;
            }
        }
        .require-table{
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

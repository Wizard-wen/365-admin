<template>
    <div class="skill">
        <el-form :inline="true" :model="skillSearch" class="skill-form">
            <div>
                <el-form-item label="是否启用">
                    <el-select v-model="skillSearch.type" placeholder="请选择是否启用">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="已启用" value="enable"></el-option>
                        <el-option label="未启用" value="disable"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="skillSearch.name" placeholder="请输入技能名称"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="searchSkill">查询</el-button>
                    <el-button type="primary" @click="resetSkill">重置</el-button>
                </el-form-item>
            </div>


            <el-form-item>
                <el-button type="primary" @click="createSkill">添加技能</el-button>
            </el-form-item>    
        </el-form>
        
        <el-table
            :data="skillTable" 
            class="skill-table">
            <el-table-column
                label="技能id"
                prop="id"
                align="center">
            </el-table-column>
            <el-table-column
                label="技能名称"
                prop="name"
                align="center">
            </el-table-column>
            <el-table-column
                label="状态"
                prop="type"
                :formatter="formatterType"
                :filter-method="showWords"
                align="center">
            </el-table-column>

            <el-table-column
                label="操作"
                align="center">
                <template slot-scope="scope">
                    <el-button size="mini" @click="editSkill(scope.$index, scope.row)">配置</el-button>
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
            :total="pagination.total">
        </el-pagination>
    </div>
</template>
<script>
    import hrService from '../../../../common/service/hrService.js'
    export default {
        data() {
            return {
                //技能列表
                skillTable: [],
                //技能搜索条件
                skillSearch: {
                    name: '',//技能名称
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

                Object.keys(this.skillSearch).forEach((item, index) =>{
                    if(_this.skillSearch[item] != ''){
                        let obj = {}
                        obj[item] = _this.skillSearch[item]
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

                await hrService.getCategoryList(tableOption)
                    .then(data =>{
                        
                        this.skillTable = data.data.data
                        
                        //分页信息
                        this.pagination.currentPage = data.data.current_page //当前页码
                        this.pagination.total = data.data.total //列表总条数
                    }).catch(error =>{
                        this.$message({
                            type:'error',
                            message: error.message
                        })
                    })
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
            async searchSkill(){
                await this.getTableList()
            },
            /**
             * 重置
             */
            async resetSkill(){
                Object.keys(this.skillSearch).forEach((item =>{
                    this.skillSearch[item] = ''
                }))
                await this.getTableList()
            }, 
            /**
             * 创建服务人员
             * des 先创建服务人员，然后才能添加服务人员技能。
             */
            createSkill(){
                this.$router.push({
                    path: "/serviceType/skillConfig",
                    query: {
                        type: 0
                    }
                })
            },
            /**
             * 编辑服务人员信息
             * 编辑时可以添加服务人员技能
             */
            editSkill(index, row){
                this.$router.push({
                    path: "/serviceType/skillConfig",
                    query: {
                        type: 1, //编辑为1
                        id: row.id
                    }
                })
            },
            showWords(value, row, column){
                console.log(value)
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
            store.commit('setLoading',true)
            try{
                await this.getTableList()
            }catch(e){
                this.$message({
                    type:'error',
                    message: e.message
                })
            }
            store.commit('setLoading',false)
        }
    }
</script>
<style lang="scss" scoped>
    .skill{
        padding-top: 30px;
        margin: 0 auto;
        .skill-form{
            width:80%;
            min-width:1100px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
        }
        .skill-table{
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

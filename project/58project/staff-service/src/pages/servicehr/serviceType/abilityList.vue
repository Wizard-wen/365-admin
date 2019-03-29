<template>
    <div class="ability">
        <div class="ability-table-box">
            <el-form :inline="true" :model="abilitySearch" class="ability-form">
                <div class="search">
                    <el-form-item label="是否启用">
                        <el-select v-model="abilitySearch.type" placeholder="请选择是否启用">
                            <el-option label="请选择" value=""></el-option>
                            <el-option label="已启用" value="enable"></el-option>
                            <el-option label="未启用" value="disable"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="abilitySearch.name" :maxlength="30" placeholder="请输入能力标签名称"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="searchAbility">查询</el-button>
                        <el-button type="primary" @click="resetAbility">重置</el-button>
                    </el-form-item>
                </div>
                <el-form-item>
                    <el-button type="primary" @click="createAbility">添加能力标签</el-button>
                </el-form-item>
            </el-form>

            <el-table
                :data="abilityTable"
                class="ability-table">
                <el-table-column
                    label="技能编号"
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
                    align="center">
                </el-table-column>

                <el-table-column
                    label="操作"
                    align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="editAbility(scope.$index, scope.row)">配置</el-button>
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
        <div class="ability-tree-box">
            <div class="title">索引</div>
            <el-tree :data="treelist" accordion :props="defaultProps"></el-tree>
        </div>
    </div>
</template>
<script>
    import hrService from '../../../../common/service/hrService.js'
    export default {
        data() {
            return {
                //技能列表
                abilityTable: [],
                //技能搜索条件
                abilitySearch: {
                    name: '', //能力标签名称
                    type: '', //是否启用
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
                    label: 'name'
                }
            }
        },
        computed:{
            /**
             * 全部已添加搜索字段
             */
            searchArray(){
                let arr = [],
                _this = this;

                Object.keys(this.abilitySearch).forEach((item, index) =>{
                    if(_this.abilitySearch[item] != ''){
                        let obj = {}
                        obj[item] = _this.abilitySearch[item]
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
                        hrService.getAbilityList(tableOption),
                        hrService.getAbilityTree()
                    ]).then(data =>{
                        if(data[0].code == "0"){
                            this.abilityTable = data[0].data.data

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
             * 查找用户
             */
            async searchAbility(){
                await this.getTableList()
            },
            /**
             * 重置
             */
            async resetAbility(){
                this.abilitySearch.name = ''
                this.abilitySearch.type = ''

                await this.getTableList()
            },
            /**
             * 创建服务人员
             * des 先创建服务人员，然后才能添加服务人员技能。
             */
            createAbility(){
                this.$router.push({
                    path: "/serviceType/abilityConfig",
                    query: {
                        type: 0
                    }
                })
            },
            /**
             * 编辑服务人员信息
             * 编辑时可以添加服务人员技能
             */
            editAbility(index, row){
                this.$router.push({
                    path: "/serviceType/abilityConfig",
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
    .ability{
        padding-top: 30px;
        margin: 0 auto;
        display: flex;
        .ability-table-box{
            width: calc(100% - 200px);
            .ability-form{
                width:90%;
                min-width:900px;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
            }
            .ability-table{
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
        .ability-tree-box{
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

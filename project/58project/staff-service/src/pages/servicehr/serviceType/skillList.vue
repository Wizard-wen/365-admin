<template>
    <div class="staff">
        <div class="container-box">
            <el-form :inline="true" :model="skillSearch" class="staff-form">
                <div >
                    <el-form-item>
                        <el-input v-model="skillSearch.phone" placeholder="请输入员工id或姓名"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="searchSkill">查询</el-button>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="createSkill">添加</el-button>
                    </el-form-item>
                </div>
                
                <div>
                    <el-form-item label="订单类型">
                        <el-select v-model="skillSearch.region" placeholder="订单类型">
                            <el-option label="待处理" value="shanghai"></el-option>
                            <el-option label="处理中" value="beijing"></el-option>
                            <el-option label="已完成" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="订单来源">
                        <el-select v-model="skillSearch.origin" placeholder="订单来源">
                            <el-option label="线上" value="shanghai"></el-option>
                            <el-option label="线下" value="beijing"></el-option>
                            <el-option label="渠道" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="搜索途径">
                        <el-select v-model="skillSearch.type" placeholder="搜索途径">
                            <el-option label="按订单号搜索" value="shanghai"></el-option>
                            <el-option label="按手机号搜索" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
            </el-form>
            
            <el-table
                :data="skillTable" 
                class="staff-table">
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
                    label="是否启用"
                    prop="type"
                    align="center">
                </el-table-column>

                <el-table-column
                    label="操作"
                    align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="editSkill(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" @click="deleteSkill(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
                style="margin-top:30px;"
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
    import hrService from '../../../../common/service/hrService.js'
    export default {
        data() {
            return {
                //技能列表
                skillTable: [],
                //技能搜索条件
                skillSearch: {
                    phone: '',
                    region: '',
                    type: '',
                    type1: '',
                    origin: ''
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
            /**
             * 查看用户权限
             */
            viewService(index, row) {
                this.$router.push({
                    path: "/sale/orderEdit",
                })
            },
        },
        async mounted(){
            store.commit('setLoading',true)
            try{
                this.getTableList()
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
    .staff{
        
        
        .container-box{
            padding: 30px;
            .staff-form{
                width:80%;
                min-width:1100px;
                margin: 0 auto;
            }
            .staff-table{
                width: 80%;
                min-width: 1100px;
                margin: 0 auto;
            }
        }
    }
</style>

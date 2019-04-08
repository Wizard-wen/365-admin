<template>
    <div class="staff">
        <el-form :inline="true" :model="staffSearch" class="staff-form">
            <div class="search-up">
                <div>
                    <el-form-item>
                        <el-input v-model="staffSearch.name" placeholder="请输入员工姓名" :maxlength="20"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="searchStaff">查询</el-button>
                        <el-button type="primary" @click="resetStaff">重置</el-button>
                    </el-form-item>
                </div>
                <el-form-item>
                    <el-button type="primary" @click="createStaff">添加服务人员</el-button>
                </el-form-item>
            </div>

        </el-form>

        <el-table :data="staffTable" class="staff-table" :stripe="true" border 
            :cell-style="{height: '30px',padding: '0px!important',}"
            :header-cell-style="{height: '30px',padding: '0px!important',}">

            <el-table-column  filter-placement="top" label="员工号" prop="staff_code" align="center"></el-table-column>

            <el-table-column  label="姓名" prop="name" align="center"></el-table-column>

            <el-table-column label="年龄" prop="age" align="center"></el-table-column>

            <el-table-column label="手机号" prop="phone" align="center"></el-table-column>

            <el-table-column label="地址" prop="address" width="300px" align="center" ></el-table-column>

            <el-table-column label="操作" align="center" fixed="right">
                <template slot-scope="scope">
                    <el-button size="mini" @click="editStaff(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" v-if="scope.row.status == 0" @click="changeStaffStatus(scope.row)">停用</el-button>
                    <el-button size="mini" type="success" @click="changeStaffStatus(scope.row)" v-else>启用</el-button>
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
    import {hrService} from '../../../../common'
    import {cascaderComponent} from '@/pages/components'
    export default {
        components: {
            cascaderComponent
        },
        data() {
            return {
                //员工信息列表
                staffTable: [],
                //表单搜索项
                staffSearch: {
                    name: '', //姓名
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

                Object.keys(this.staffSearch).forEach((item, index) =>{
                    //如果搜索字段是数组的话
                    if(Array.isArray(_this.staffSearch[item])){
                        if(_this.staffSearch[item].length){
                            let obj = {}
                            obj[item] = [..._this.staffSearch[item]]
                            obj = {
                                ...obj,
                                key: item
                            }
                            arr.push(obj)
                        }
                    }
                    //如果搜索字段是字符串的话
                    else if(_this.staffSearch[item] != ''){
                        let obj = {}
                        obj[item] = _this.staffSearch[item]
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
                    get_for: 'staff',
                    searchSelect: this.searchArray
                }

                store.commit('setLoading',true)
                try{
                    await hrService.getStaffList(tableOption).then(data =>{
                        if(data.code == "0"){
                            this.staffTable = data.data.data

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
            async searchStaff(){
                await this.getTableList()
            },
            /**
             * 重置
             */
            async resetStaff(){
                this.staffSearch.name= '' //姓名
                await this.getTableList()
            },
            /**
             * 创建服务人员
             * des 先创建服务人员，然后才能添加服务人员技能。
             */
            createStaff(){
                this.$router.push({
                    path: "/worker/workerItem",
                    query: {
                        type: 0
                    }
                })
            },
            /**
             * 编辑服务人员信息
             * 编辑时可以添加服务人员技能
             */
            editStaff(index, row){
                this.$router.push({
                    path: "/worker/workerItem",
                    query: {
                        type: 1, //编辑为1
                        id: row.id
                    }
                })
            },
            /**
             * changeStaffStatus
             */
            async changeStaffStatus(row){
                let _this= this;

                let status = row.status == 0? '停用' : '启用'

                let response = await this.$confirm(`确定${status}该服务人员吗?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: `已取消${status}`
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
                                        message: `${status}成功`
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
            },
            rowStyleFunction(row, rowIndex){    
                console.log(row,rowIndex)
                if(rowIndex == 0){
                    return {height:'30px'}
                }
            }
        },
        async mounted(){
            await this.getTableList()
        }
    }
</script>
<style lang="scss" scoped>
        .staff{
        padding-top: 30px;
        margin: 0 auto;
        .staff-form{
            width:80%;
            min-width:1100px;
            margin: 0 auto;
            .search-up{
                display: flex;
                justify-content: space-between;
            }
        }
        .staff-table{
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

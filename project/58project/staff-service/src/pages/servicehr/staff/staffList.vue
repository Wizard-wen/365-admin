<template>
    <div class="staff">
        <div class="container-box">
            <el-form :inline="true" :model="staffSearch" class="staff-form">
                <div >
                    <el-form-item>
                        <el-input v-model="staffSearch.name" placeholder="请输入员工姓名"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="searchStaff">查询</el-button>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="createStaff">添加</el-button>
                    </el-form-item>
                </div>
                
                <div>
                    <el-form-item label="服务地区">
                        <el-cascader
                            :options="areaList"
                            v-model="region"
                            :props="areaProps"
                            @change="changeRegion"
                            placeholder="请选择服务地区">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="技能分类">
                        <el-select v-model="staffSearch.skill" placeholder="选择技能分类">
                            <el-option label="线上" value="shanghai"></el-option>
                            <el-option label="线下" value="beijing"></el-option>
                            <el-option label="渠道" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="能力标签">
                        <el-select v-model="staffSearch.lable" placeholder="能力标签">
                            <el-option label="按订单号搜索" value="shanghai"></el-option>
                            <el-option label="按手机号搜索" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                     <el-form-item label="证书">
                        <el-select v-model="staffSearch.paper" placeholder="证书">
                            <el-option label="按订单号搜索" value="shanghai"></el-option>
                            <el-option label="按手机号搜索" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                
                

            </el-form>
            
            <el-table
                :data="staffTable" 
                class="staff-table">
                <el-table-column
                    label="员工id"
                    prop="id"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="姓名"
                    prop="name"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="年龄"
                    prop="age"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="手机号"
                    prop="phone"
                    align="center">
                </el-table-column>

                <el-table-column
                    label="操作"
                    align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="editStaff(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" @click="deleteStaff(scope.$index, scope.row)">删除</el-button>
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
                //员工信息列表
                staffTable: [],
                //表单搜索项
                staffSearch: {
                    name: '', //姓名
                    region: '',//服务地区
                    skill: '',//技能分类
                    label: '',//能力标签
                    paper: '',//证书
                },
                region: [],//地区级联选择器筛选信息
                areaList: [],//地区级联选择器渲染数组
                //地区级联选择字段
                areaProps: {
                    label: 'name',
                    value: 'code'
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
                    if(_this.staffSearch[item] != ''){
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
                    searchSelect: this.searchArray
                }

                await hrService.getStaffList(tableOption)
                    .then(data =>{
                        
                        this.staffTable = data.data.data
                        
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
             * 级联选择器更改时
             */
            changeRegion(val){
                this.staffSearch.region = val[2]
            },
            /**
             * 查找用户
             */
            async searchStaff(){
                await this.getTableList()
            },
            /**
             * 创建服务人员
             * des 先创建服务人员，然后才能添加服务人员技能。
             */
            createStaff(){
                this.$router.push({
                    path: "/staff/staffItem",
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
                    path: "/staff/staffItem",
                    query: {
                        type: 1, //编辑为1
                        id: row.id
                    }
                })
            },
        },
        async mounted(){

            
            store.commit('setLoading',true)
            try{
                 await hrService.getAreaTree()
                    .then(data =>{
                        this.areaList = data.data
                    })
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

</style>

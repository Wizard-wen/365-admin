<template>
    <div class="staff" v-loading="isLoaded">
        <div class="list-table">
            <div class="search-list">

            </div>
            <div class="table-list">
                <div class="search-form">
                    <div class="search-left">
                        <el-input v-model="staffSearch.name" placeholder="请输入员工姓名" :maxlength="20"></el-input>
                        <el-input v-model="staffSearch.phone" placeholder="请输入电话" :maxlength="20"></el-input>
                        <el-button type="primary" @click="searchStaff">查询</el-button>
                        <el-button type="primary" @click="resetStaff">重置</el-button>
                    </div>
                    <el-button type="primary" @click="createStaff">添加服务人员</el-button>
                </div>  
                <el-table :data="staffTable" class="staff-table" :stripe="true" border :fit="true"
                    height="calc(100vh-90px)"
                    :cell-style="{height: '30px',padding: '2px 0',}"
                    :header-cell-style="{height: '30px',fontSize: '12px',padding: '0px!important',}">

                    <el-table-column  label="员工号" prop="staff_code" align="center" width="150"></el-table-column>

                    <el-table-column  label="性别" prop="sex" align="center" width="70">
                        <template slot-scope="scope">
                            <el-tag class="tag-style" size="medium">{{ scope.row.sex == 1?'男':'女' }}</el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column  label="签约状态" prop="type" align="center" width="100">
                        <template slot-scope="scope">
                            <el-tag class="tag-style" size="medium">{{ scope.row.sex == 'sign'?'已签约':'未签约' }}</el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column  label="创建时间" prop="created_at" align="center" :formatter="created_atFormatter" width="155"></el-table-column>

                    <el-table-column  label="登记时间" prop="register_at" :formatter="register_atFormatter" align="center" width="110"></el-table-column>
                    
                    <el-table-column  label="认证状态" prop="authentication" align="center" width="160">
                        <template slot-scope="scope">
                            <list-show-tag :propList="workerConfigList.authentication" :tableOriginData="scope.row.authentication"></list-show-tag>
                        </template>
                    </el-table-column>
                    
                    <el-table-column  label="姓名" prop="name" align="center" fixed="left"></el-table-column>
                    
                    <el-table-column  label="年龄" prop="age" align="center" width="60"></el-table-column>
                    
                    <el-table-column  label="电话" prop="phone" align="center" width="120"></el-table-column>
                    
                    <el-table-column  label="回访信息" prop="return_msg" align="center" width="150">
                        <template slot-scope="scope">
                            <el-popover trigger="click" placement="top">
                                <p>{{ scope.row.return_msg }}</p>
                                <div slot="reference" >
                                    <p style=" overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 129px;">{{ scope.row.return_msg }}</p>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    
                    <el-table-column  label="接单状态" prop="working_status" align="center" width="130">
                        <template slot-scope="scope">
                            <list-show-tag :propList="workerConfigList.working_status" :tableOriginData="scope.row.working_status"></list-show-tag>
                        </template>
                    </el-table-column>
                    <el-table-column  label="备注（商家情况）" prop="remarks" align="center" width="150">
                        <template slot-scope="scope">
                            <el-popover trigger="click" placement="top">
                                <p>{{ scope.row.remarks }}</p>
                                <div slot="reference" >
                                    <p style=" overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 129px;">{{ scope.row.remarks }}</p>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column  label="职业类型" prop="skill" align="center">

                    </el-table-column>
                    <el-table-column  label="服务类型" prop="service_type" align="center" width="200">
                        <template slot-scope="scope">
                            <list-show-tag :propList="workerConfigList.service_type" :tableOriginData="scope.row.service_type"></list-show-tag>
                        </template>
                    </el-table-column>
                    <el-table-column  label="可服务人群" prop="service_crowd" align="center" width="120">
                        <template slot-scope="scope">
                            <list-show-tag :propList="workerConfigList.service_crowd" :tableOriginData="scope.row.service_crowd"></list-show-tag>
                        </template>
                    </el-table-column>
                    <el-table-column  label="工龄" prop="working_age" align="center" width="100">
                        <template slot-scope="scope">
                            <list-show-tag :propList="workerConfigList.working_age" :tableOriginData="scope.row.working_age"></list-show-tag>
                        </template>
                    </el-table-column>
                    <el-table-column  label="工作经验" prop="working_experience" align="center" width="150">
                        <template slot-scope="scope">
                            <el-popover trigger="click" placement="top">
                                <p>{{ scope.row.working_experience }}</p>
                                <div slot="reference" >
                                    <p style=" overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 129px;">{{ scope.row.working_experience }}</p>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column label="民族" prop="nation" align="center">
                        <template slot-scope="scope">
                            <list-show-tag :propList="workerConfigList.nation" :tableOriginData="scope.row.nation"></list-show-tag>
                        </template>
                    </el-table-column>
                    <el-table-column  label="籍贯" prop="birthPlace" align="center"></el-table-column>
                    <el-table-column  label="身份证号" prop="identify" align="center"></el-table-column>
                    <el-table-column  label="地址" prop="address" align="center" width="150">
                        <template slot-scope="scope">
                            <el-popover trigger="click" placement="top">
                                <p>{{ scope.row.address }}</p>
                                <p slot="reference" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 129px;">{{ scope.row.address }}</p>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column  label="服务地区" prop="region" align="center" width=""></el-table-column>
                    <el-table-column  label="学历" prop="education" align="center" :formatter="educationFomatter" width="120"></el-table-column>
                    <el-table-column  label="紧急联系人电话" prop="urgent_phone" align="center" width="150"></el-table-column>
                    <el-table-column  label="银行卡号" prop="bank_card" align="center"></el-table-column>
                    <el-table-column  label="头像" prop="icon" align="center">
                        <template slot-scope="scope">
                            <img :src="scope.row.icon?'./resource/'+scope.row.icon:''" alt="" style="height: 24px;width: 24px;">
                        </template>
                    </el-table-column>
                    <el-table-column  label="课程" prop="course" align="center"></el-table-column>
                    <el-table-column  label="技能证书" prop="paper" align="center"></el-table-column>
                    <el-table-column  label="信息来源" prop="source" align="center">
                        <template slot-scope="scope">
                            <list-show-tag :propList="workerConfigList.source" :tableOriginData="scope.row.source"></list-show-tag>
                        </template>
                    </el-table-column>
                    <el-table-column  label="创建人" prop="manager_name" align="center" width="150"></el-table-column>

                    <el-table-column label="操作" align="center" fixed="right" width="150">
                        <template slot-scope="scope">
                            <el-button size="mini" type="text" @click="editStaff(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="mini" type="text" style="color:#f56c6c" v-if="scope.row.status == 0" @click="changeStaffStatus(scope.row)">停用</el-button>
                            <el-button size="mini" type="text" style="color:#67c23a" @click="changeStaffStatus(scope.row)" v-else>启用</el-button>
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
                    :page-size="pagination.pageNumber"
                    layout="prev, pager, next, jumper"
                    :total="pagination.total"></el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    import {hrService, $utils} from '../../../../common'
    import {cascaderComponent} from '@/pages/components'
    import {listShowTag} from './components'
    export default {
        components: {
            cascaderComponent,
            listShowTag
        },
        data() {
            return {
                //员工信息列表
                staffTable: [],
                //表单搜索项
                staffSearch: {
                    name: '', //姓名
                    phone:'',//手机号
                },
                isLoaded:false,
                /**
                 * 分页信息
                 */
                pagination: {
                    total: 0,
                    currentPage: 1,
                    pageNumber: 20,
                },
                workerConfigList:{

                },
                maxHeight:0
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

                
                try{
                    
                    this.isLoaded = true

                    await Promise.all([
                        hrService.getFormConfig(), //获取表单配置字段
                        hrService.getStaffList(tableOption) //获取列表数据
                    ]).then((data) =>{
                        this.workerConfigList = data[0].data

                        this.staffTable = data[1].data.data
                        //分页信息
                        this.pagination.currentPage = data[1].data.current_page //当前页码
                        this.pagination.total = data[1].data.total //列表总条数
                    }).catch(error =>{
                        this.$message({
                            type:'error',
                            message: error.message
                        })
                    }).finally(() =>{
                        this.isLoaded = false
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
                    store.commit('setLoading',true)

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
            },
            /**
             * 创建时间字段转换
             */
            created_atFormatter(row, column){
                return $utils.formatDate(new Date(row.created_at), 'yyyy-MM-dd hh:mm:ss')
            },
            //登记时间
            register_atFormatter(row, column){
                return $utils.formatDate(new Date(row.register_at), 'yyyy-MM-dd')
            },
            educationFomatter(row, column){
                // debugger
                let a =  this.$store.state.hrModule.educationList.filter(item => item.id == row.education)
                return a.length? a[0].name : ''
            }
        },
        async mounted(){
            // debugger
            // function getClientHeight()
            // {
            // var clientHeight=0;
            // if(document.body.clientHeight&&document.documentElement.clientHeight)
            // {
            // var clientHeight = (document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
            // }
            // else
            // {
            // var clientHeight = (document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
            // }
            // return clientHeight - 85;
            // }
            // this.maxHeight = getClientHeight()
            await this.getTableList()
        }
    }
</script>
<style lang="scss" scoped>
    .tag-style{
        height:24px;
        line-height: 24px;
    }
    .staff{


        .list-table{
            height: calc(100vh - 50px);
            width:100%;
            display: flex;
            .search-list{
                width: 180px;
                height: 100%;
                background: #ccc;
            }
            .table-list{
                flex:1;
                width: calc(100% - 180px);
                height: calc(100vh - 50px);
                .search-form{
                    height: 40px;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    .search-left{
                        display: flex;
                    }
                }
                // background: #185;
                .staff-table{
                    overflow: auto;
                    height: calc(100% - 72px);
                    width: 100%;
                    // min-width: 1100px;
                    margin: 0 auto;
                }
                .pagination{
                    height:32px;
                }
            }
        }
            
            
        


    }
</style>

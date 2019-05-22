<template>
    <div class="staff" v-loading="isLoaded">
        <div class="list-table">
            <div class="search-list">
                <query-component @updateTable="updateTable"></query-component>
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
                    row-key="1233444"
                    :header-cell-style="{height: '30px',padding: '0px',fontSize:'12px'}"
                    :cell-style="{height: '30px',padding: 0,fontSize:'12px',}">

                    <!-- <el-table-column  label="员工号" prop="staff_code" align="center" width="150"></el-table-column> -->

                    <!-- <el-table-column  label="性别" prop="sex" align="center" width="70">
                        <template slot-scope="scope">
                            <el-tag class="tag-style" size="medium">{{ scope.row.sex == 1?'男':'女' }}</el-tag>
                        </template>
                    </el-table-column> -->

                    <!-- <el-table-column  label="签约状态" prop="type" align="center" width="100">
                        <template slot-scope="scope">
                            <el-tag class="tag-style" size="medium">{{ scope.row.sex == 'sign'?'已签约':'未签约' }}</el-tag>
                        </template>
                    </el-table-column> -->

                    <el-table-column  label="创建时间" prop="created_at" align="center" :formatter="created_atFormatter" width="110"></el-table-column>

                    <el-table-column  label="登记时间" prop="register_at" :formatter="register_atFormatter" align="center" width="110"></el-table-column>
                    
                    <el-table-column  label="认证状态" prop="authentication" align="center" :width="maxLength.authentication">
                        <template slot-scope="scope">
                            <table-tag-component 
                            v-if="workerConfigList.authentication" 
                            :propList="workerConfigList.authentication" 
                            :tableOriginData="scope.row.authentication"></table-tag-component>
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
                    
                    <el-table-column  label="接单状态" prop="working_status" align="center" :width="maxLength.working_status">
                        <template slot-scope="scope">
                            <table-tag-component 
                            v-if="workerConfigList.working_status" 
                            :propList="workerConfigList.working_status" 
                            :tableOriginData="scope.row.working_status"></table-tag-component>
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
                    <el-table-column  label="职业类型" prop="skill_ids" :width="maxLength.skill_ids" >
                        <template slot-scope="scope">
                            <table-tag-component 
                            v-if="workerConfigList.service_category" 
                            :propList="workerConfigList.service_category" 
                            :tableOriginData="scope.row.skill_ids"></table-tag-component>
                        </template>
                    </el-table-column>
                    <el-table-column  label="服务类型" prop="service_type_ids" align="center" :width="maxLength.service_type_ids">
                        <template slot-scope="scope">
                            <table-tag-component 
                            v-if="workerConfigList.service_type" 
                            :propList="workerConfigList.service_type" 
                            :tableOriginData="scope.row.service_type_ids"></table-tag-component>
                        </template>
                    </el-table-column>
                    <el-table-column  label="可服务人群" prop="service_crowd_ids" :width="maxLength.service_crowd_ids">
                        <template slot-scope="scope">
                            <table-tag-component 
                            :width="maxLength.service_crowd_ids" 
                            v-if="workerConfigList.service_crowd" 
                            :propList="workerConfigList.service_crowd" 
                            :tableOriginData="scope.row.service_crowd_ids"></table-tag-component>
                        </template>
                    </el-table-column>
                    <el-table-column  label="工龄" prop="working_age" align="center" :width="maxLength.working_age">
                        <template slot-scope="scope">
                            <table-tag-component 
                            v-if="workerConfigList.working_age" 
                            :propList="workerConfigList.working_age" 
                            :tableOriginData="scope.row.working_age"></table-tag-component>
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
                    <el-table-column label="民族" prop="nation" align="center" :width="maxLength.nation">
                        <template slot-scope="scope">
                            <table-tag-component v-if="workerConfigList.nation" :propList="workerConfigList.nation" :tableOriginData="scope.row.nation"></table-tag-component>
                        </template>
                    </el-table-column>
                    <el-table-column  label="籍贯" prop="birthPlace" align="center"></el-table-column>
                    <el-table-column  label="身份证号" prop="identify" align="center" width="145"></el-table-column>
                    
                    <el-table-column  label="地址" prop="address" align="center" width="150">
                        <template slot-scope="scope">
                            <el-popover trigger="click" placement="top">
                                <p>{{ scope.row.address }}</p>
                                <p slot="reference" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 129px;">{{ scope.row.address }}</p>
                            </el-popover>
                        </template>
                    </el-table-column>
                    
                    <el-table-column  label="服务地区" prop="region_ids" align="center" :width="maxLength.region_ids">
                        <template slot-scope="scope">
                            <table-tag-component v-if="workerConfigList.service_region" :propList="workerConfigList.service_region" :tableOriginData="scope.row.region_ids"></table-tag-component>
                        </template>
                    </el-table-column>

                    <el-table-column  label="学历" prop="education" align="center" :formatter="educationFomatter" width="120"></el-table-column>
                    <el-table-column  label="紧急联系人电话" prop="urgent_phone" align="center" width="150"></el-table-column>
                    <el-table-column  label="银行卡号" prop="bank_card" align="center"></el-table-column>
                    
                    <!-- <el-table-column  label="照片" prop="" align="center">
                        <template slot-scope="scope">
                            <img :src="scope.row.icon?'./resource/'+scope.row.icon:''" alt="" style="height: 24px;width: 24px;">
                        </template>
                    </el-table-column> -->

                    <!-- <el-table-column  label="头像" prop="icon" align="center">
                        <template slot-scope="scope">
                            <img :src="scope.row.icon?'./resource/'+scope.row.icon:''" alt="" style="height: 24px;width: 24px;">
                        </template>
                    </el-table-column> -->

                    <el-table-column  label="参加培训" prop="course_ids" :width="maxLength.course_ids" align="center">
                        <template slot-scope="scope">
                            <table-tag-component v-if="workerConfigList.course" :propList="workerConfigList.course" :tableOriginData="scope.row.course_ids"></table-tag-component>
                        </template>
                    </el-table-column>
                    <el-table-column  label="技能证书" prop="paper_ids" align="center" :width="maxLength.paper_ids">
                        <template slot-scope="scope">
                            <table-tag-component v-if="workerConfigList.paper_category" :propList="workerConfigList.paper_category" :tableOriginData="scope.row.paper_ids"></table-tag-component>
                        </template>
                    </el-table-column>
                    <el-table-column  label="信息来源" prop="source" align="center" :width="maxLength.source">
                        <template slot-scope="scope">
                            <table-tag-component v-if="workerConfigList.source" :propList="workerConfigList.source" :tableOriginData="scope.row.source"></table-tag-component>
                        </template>
                    </el-table-column>
                    <el-table-column  label="来源名称" prop="" align="center">
                        
                    </el-table-column>
                    <el-table-column  label="创建人" prop="manager_name" align="center" width="150"></el-table-column>

                    <el-table-column label="操作" align="center" fixed="right" width="150">
                        <template slot-scope="scope">
                            <el-button size="mini" type="text" @click="showStaff(scope.$index, scope.row)">查看</el-button>
                            <el-button size="mini" style="color:#f56c6c" type="text" @click="sendErrorMessage(scope.$index, scope.row)">提交异常信息</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <div class="pagination-box">
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
        <!-- 申请添加服务人员 -->
        <create-staff-dialog
            v-if="createStaffDialogVisible"
            :openCreateStaffDialog="createStaffDialogVisible"
            @closeCreateStaffDialog="createStaffDialogVisible=false"></create-staff-dialog>
    </div>
</template>
<script>
    import {hrService, $utils} from '../../../common'

    import {
        cascaderComponent,
        tableTagComponent} from '@/pages/components'

    import {queryComponent} from '@/pages/servicehr/staff/components'
    import createStaffDialog from './components/createStaff/createStaffDialog.vue'
    
    export default {
        components: {
            cascaderComponent,
            tableTagComponent,
            queryComponent,
            createStaffDialog
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
                //计算列表每一列的最大宽度
                maxLength: {
                    authentication: 0, //认证状态
                    working_status: 0,//接单状态
                    skill_ids: 0,// 职业类型
                    service_type_ids: 0,//服务类型
                    service_crowd_ids: 0,//可服务人群
                    working_age: 0,// 工龄
                    nation: 0,// 民族
                    region_ids: 0,//服务地区
                    course_ids: 0,//参加培训
                    paper_ids: 0, //技能证书
                    source: 0,//信息来源
                },
                //控制弹出框显示异常
                createStaffDialogVisible: false,
            }
        },
        computed:{
            /**
             * 
             */
            workerConfigList(){
                return this.$store.state.hrModule.configForm
            }
        },
        methods: {
            computeStringLength(array, listKey, configKey){
                let string = 0
                if(Array.isArray(array)){
                    array.forEach((it, inds) =>{
                        if(this.workerConfigList[configKey].find(i => i.id == it)){
                            let baseLength = parseInt(this.workerConfigList[configKey].filter(i => i.id == it)[0].name.length *12 )
                            string += (baseLength + 27)
                        }
                    })
                } else {
                    if(this.workerConfigList[configKey].find(i => i.id == array)){
                        string = parseInt(this.workerConfigList[configKey].filter(i => i.id == array)[0].name.length * 12) + 27
                    } else {
                        string = 0
                    }
                    
                }
                
                if(string > this.maxLength[listKey]){
                    this.maxLength[listKey] = (string + 20) > 80 ? (string + 20) : 80
                }
                
            },
             /**
             * 请求表格数据
             * des 表格查询参数存储在vuex中，刷新，参数重置
             */
            async getTableList(){                
                try{
                    this.isLoaded = true

                    await Promise.all([
                        hrService.getFormConfig(), //获取表单配置字段
                        hrService.getStaffList() //获取列表数据
                    ]).then((data) =>{
                        // 将表单配置数据存入 vuex 
                        this.$store.commit('setConfigForm',data[0].data)

                        let tableList = data[1].data.data
                        //  debugger
                        tableList.forEach((item, index) =>{
                           
                            this.computeStringLength(item.authentication, 'authentication', 'authentication')
                            this.computeStringLength(item.working_status, 'working_status', 'working_status')
                            this.computeStringLength(item.skill_ids, 'skill_ids', 'service_category')
                            this.computeStringLength(item.service_type_ids, 'service_type_ids', 'service_type')
                            this.computeStringLength(item.service_crowd_ids, 'service_crowd_ids', 'service_crowd')
                            this.computeStringLength(item.working_age, 'working_age', 'working_age')
                            this.computeStringLength(item.nation, 'nation', 'nation')
                            this.computeStringLength(item.region_ids, 'region_ids', 'service_region')
                            this.computeStringLength(item.course_ids, 'course_ids', 'course')
                            this.computeStringLength(item.paper_ids, 'paper_ids', 'paper_category')
                            this.computeStringLength(item.source, 'source', 'source')
                        })  

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
            // 由查询组件触发的更新表格事件
            async updateTable(){
                await this.getTableList()
            },
            /**
             * 切换页码
             */
            async handleCurrentPage(val){
                // this.pagination.currentPage = val
                //设置page查询参数
                this.$store.commit('setQueryList', {
                    queryKey: 'page', 
                    queryedList: val
                })
                await this.getTableList()
            },
            /**
             * 查找用户
             */
            async searchStaff(){
                //设置name查询参数
                this.$store.commit('setQueryList', {
                    queryKey: 'name', 
                    queryedList: this.staffSearch.name
                })
                //设置手机号查询参数
                this.$store.commit('setQueryList', {
                    queryKey: 'phone', 
                    queryedList: this.staffSearch.phone
                })
                await this.getTableList()
            },
            /**
             * 重置
             */
            async resetStaff(){
                this.staffSearch.name = ''
                this.staffSearch.phone = ''
                //重置name查询参数
                this.$store.commit('setQueryList', {
                    queryKey: 'name', 
                    queryedList: null
                })
                //重置手机号查询参数
                this.$store.commit('setQueryList', {
                    queryKey: 'phone', 
                    queryedList: null
                })
                await this.getTableList()
            },
            /**
             * 创建服务人员
             * des 先创建服务人员，然后才能添加服务人员技能。
             */
            createStaff(){
                this.createStaffDialogVisible = true;
            },
            /**
             * 查看服务人员详情
             */
            showStaff(index, row){
                this.$router.push({
                    path: "/sale/orderWorkerItem",
                    query: {
                        id: row.id
                    }
                })
            },
            /**
             * 创建时间字段转换
             */
            created_atFormatter(row, column){
                return $utils.formatDate(new Date(row.created_at), 'yyyy-MM-dd')
            },
            //登记时间
            register_atFormatter(row, column){
                return $utils.formatDate(new Date(row.register_at), 'yyyy-MM-dd')
            },
            educationFomatter(row, column){
                let a =  this.$store.state.hrModule.educationList.filter(item => item.id == row.education)
                return a.length? a[0].name : ''
            }
        },
        async mounted(){
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
                overflow-y: auto;
                background: #eaedf1;
            }
            .table-list{
                overflow: auto;
                flex:1;
                width: calc(100% - 180px);
                height: calc(100vh - 50px);
                .search-form{
                    display: none;
                    height: 40px;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    .search-left{
                        display: flex;
                    }
                }
                .staff-table{
                    height: calc(100% - 72px);
                    width: 100%;
                    margin: 0 auto;
                }
                .pagination-box{
                    height:32px;
                    .pagination{
                        margin: 0 auto;
                        width: 600px;
                    }
                }
            }
        }
            
            
        


    }
</style>

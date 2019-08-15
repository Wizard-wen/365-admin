<template>
    <div class="orderConfig">
        <div class="order-header">
            <div class="order-name">
                <h4>订单号：{{20190714000001}}</h4>
            </div>
            <div class="btn-group">
                <!-- 仅店长有此权限 -->
                <el-button type="primary" @click="assignOrder" size="mini">分派</el-button>
                <el-button size="mini">续约</el-button>
                <el-button size="mini">终止订单</el-button>
                <el-button size="mini">返回</el-button>
            </div>
            <div class="order-detail">
                <div class="detail-left">
                    <div class="detail-left-box">
                        <div class="detail-left-line">创建人：{{ `宋希文` }}</div>
                        <div class="detail-left-line">订单拥有者：{{ `宋希文` }}</div>
                        <div class="detail-left-line">创建时间：{{'2019-06-27'}}</div>
                        <div class="detail-left-line">订单来源：{{`线上`}}</div>
                        <div class="detail-left-line">签约时间：{{`2019-06-28`}}</div>
                        <div class="detail-left-line">服务周期：{{`2019-06-27 ---- 2019-12-26`}}</div>
                    </div>

                </div>
                <div class="detail-right">
                    <div class="right-box">
                        <div class="title">账户余额</div>
                        <div class="value">{{ `2600` }}</div>
                    </div>
                </div>
            </div>
                        <!-- 签约弹出框 -->
        <assign-dialog
            v-if="assignDialogVisible"
            :openAssignDialog="assignDialogVisible"
            @closeAssignDialog="assignDialogVisible=false"
            :assignOrderId="assignOrderId"></assign-dialog>
        </div>
        <div class="order-down">
            <div class="order-message">
                <div class="title">
                    <div class="title-contains">
                        <div class="left">订单基本信息</div>
                    </div>
                </div>
                <div class="order-list">
                    <div class="line-three-list">
                        客户姓名：<span>{{`唐朝`}}</span>
                        <p @click="changeOrderMessage('')" class="change">
                            <img src="./newOrderConfig/images/change.svg" alt="">
                        </p>
                    </div>
                    <div class="line-three-list">
                        电话：<span>{{`唐朝`}}</span> 
                        <p @click="changeOrderMessage('')" class="change">
                            <img src="./newOrderConfig/images/change.svg" alt="">
                        </p>
                    </div>
                    <div class="line-three-list">
                        工种：<span>{{`唐朝`}}</span>
                        <p @click="changeOrderMessage('')" class="change">
                            <img src="./newOrderConfig/images/change.svg" alt="">
                        </p>
                    </div>
                    <div class="line-three-list">
                        工作时间：<span>{{`早八晚五`}}</span>
                        <p @click="changeOrderMessage('')" class="change">
                            <img src="./newOrderConfig/images/change.svg" alt="">
                        </p>
                    </div>
                    <div class="line-three-list">
                        工资：<span>{{`3500`}}</span>
                        <p @click="changeOrderMessage('')" class="change">
                            <img src="./newOrderConfig/images/change.svg" alt="">
                        </p>
                    </div>
                    <div class="line-three-list">
                        休息日：<span>{{`4`}}</span>
                        <p @click="changeOrderMessage('')" class="change">
                            <img src="./newOrderConfig/images/change.svg" alt="">
                        </p>
                    </div>
                    <div class="line-list">
                        地址： <span>{{`辽宁省沈阳市大东区小北关街43-1 5-8-3`}}</span>
                        <p @click="changeOrderMessage('')" class="change">
                            <img src="./newOrderConfig/images/change.svg" alt="">
                        </p>
                    </div>
                    <div class="line-list">
                        订单详情：<span>{{`辽宁省沈阳市大东区小北关街43-1 5-8-3`}}</span>
                        <p @click="changeOrderMessage('')" class="change">
                            <img src="./newOrderConfig/images/change.svg" alt="">
                        </p>
                    </div>
                </div>
            </div>
            <div class="order-message">
                <div class="title">
                    <div class="title-contains">
                        <div class="left">服务人员匹配</div>
                    </div>
                </div>
                <div class="order-list">
                    <div class="staff">
                        <match-service-table-component
                            :staffTable="staffTable"
                            :maxLength="maxLength"
                            :controlScopeLength="150">
                            
                            <template slot="searchList">
                                <div class="search-list">
                                    <match-service-query-component  :queryFrom="'order'" @updateTable="updateTable"></match-service-query-component>
                                </div>
                            </template>

                            <template slot="searchForm">
                                <!-- <query-tag-component :queryFrom="'order'" @updateTable="updateTable"></query-tag-component>
                                <el-button type="primary" @click="createStaff">申请创建服务人员</el-button> -->
                            </template>

                            <template slot="control" slot-scope="controler">
                                <el-button size="mini" type="text" @click="showStaff(controler.scoper.$index, controler.scoper.row)">查看</el-button>
                                <el-button size="mini" type="text" @click="sendErrorMessage(controler.scoper.row)">添加备选</el-button>
                            </template>

                            <template slot="pagination">
                                <el-pagination
                                    class="pagination"
                                    @current-change="handleCurrentPage"
                                    @prev-click="handleCurrentPage"
                                    @next-click="handleCurrentPage"
                                    :current-page.sync="pagination.currentPage"
                                    :page-size="pagination.pageNumber"
                                    layout="prev, pager, next, jumper"
                                    :total="pagination.total"></el-pagination>
                            </template>
                        </match-service-table-component>
                    </div>
                </div>
            </div>

            <div class="order-message">
                <div class="title">
                    <div class="title-contains">
                        <div class="left">备选服务人员</div>
                    </div>
                </div>
                <div class="order-list">
                    <!-- 匹配劳动者列表 -->
                    <el-table :data="matchServiceTable" class="person-table" :header-cell-style="{height: '48px',background: '#fafafa'}">
                        <el-table-column label="工号" prop="code" align="center"></el-table-column>

                        <el-table-column label="姓名" prop="name" align="center"></el-table-column>

                        <el-table-column label="电话" prop="phone" align="center"></el-table-column>

                        <el-table-column label="职业类型" prop="worType" align="center"></el-table-column>

                        <el-table-column label="接单状态" prop="workStatus" align="center"></el-table-column>

                        <el-table-column label="添加人" prop="addPerson" align="center"></el-table-column>

                        <el-table-column label="操作" align="center" width="300">
                            <template slot-scope="scope">
                                <el-button type="success" @click="goSignOrder" size="mini">签约</el-button>
                                <el-button type="primary" @click="refuseService" size="mini">拒绝</el-button>
                                <el-button type="primary" size="mini">详情</el-button>
                                <el-button type="danger" size="mini">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>

            <div class="order-message">
                <div class="title">
                    <div class="title-contains">
                        <div class="left">合同列表</div>
                    </div>
                </div>
                <div class="order-list">
                    <div class="staff">
                        <contract-table-component
                            :staffTable="contractTable"
                            :controlScopeLength="150">

                            <template slot="control" slot-scope="controler">
                                <el-button size="mini" type="text" >分派合同</el-button>
                            </template>

                            <template slot="pagination">
                                <el-pagination
                                    class="pagination"
                                    @current-change="handleContractCurrentPage"
                                    @prev-click="handleContractCurrentPage"
                                    @next-click="handleContractCurrentPage"
                                    :current-page.sync="contratcPagination.currentPage"
                                    :page-size="contratcPagination.pageNumber"
                                    layout="prev, pager, next, jumper"
                                    :total="contratcPagination.total"></el-pagination>
                            </template>
                        </contract-table-component>
                    </div>
                    <refuse-service-dialog
                        v-if="refuseServiceDialogVisible"
                        :refuseServiceDialogVisible="refuseServiceDialogVisible"
                        @claseRefuseDialog="refuseServiceDialogVisible=false"></refuse-service-dialog>
                </div>
            </div>

            <div class="order-message">
                <div class="title">
                    <div class="title-contains">
                        <div class="left">日志列表</div>
                    </div>
                </div>
                <div class="order-list">
                    <!-- 日志列表 -->
                    <el-table :data="orderLogTable" class="person-table" :header-cell-style="{height: '48px',background: '#fafafa'}">
                        <el-table-column label="创建时间" prop="created_at" align="center"></el-table-column>

                        <el-table-column label="管理员姓名" prop="manager_name" align="center"></el-table-column>

                        <el-table-column label="日志内容" prop="message" align="center"></el-table-column>

                        <el-table-column label="操作" align="center">
                            <!-- <template slot-scope="scope"> -->
                                <el-button size="mini">查看</el-button>
                            <!-- </template> -->
                        </el-table-column>
                    </el-table>
                </div>
            </div>            
        </div>
    </div>
</template>
<script>
    import {operateService, $utils} from '../../../common'
    import {
        matchServiceTableComponent,
        matchServiceQueryComponent,
        contractTableComponent,
        refuseServiceDialog,
        assignDialog} from './newOrderConfig/index.js'
export default {
    data(){
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
            contratcPagination: {
                total: 0,
                currentPage: 1,
                pageNumber: 10,
            },
            //计算列表每一列的最大宽度
            maxLength: {
                authentication: 80, //认证状态
                working_status: 80,//接单状态
                skill_ids: 80,// 职业类型
                service_type_ids: 80,//服务类型
                service_crowd_ids: 100,//可服务人群
                working_age: 80,// 工龄
                nation: 80,// 民族
                region_ids:80,//服务地区
                course_ids: 80,//参加培训
                paper_ids: 80, //技能证书
                source: 80,//信息来源
            },
            //匹配劳动者列表
            matchServiceTable: [
                {
                    code: '111',
                    name: '宋希文',
                    phone: '15011111111',
                    worType: '月嫂',
                    workStatus: '可接单',
                    addPerson: '唐朝',
                }
            ],
            //订单日志列表
            orderLogTable: [],
            //合同列表
            contractTable: [{
                contact_code:'string',//合同编号
                created_at:'string',//印制时间
                manageDepartment:'string',//责任部门
                manager:'string',//责任人
                contract_status:'string',// 合同状态
                isSign:'Boolean',//是否签约
                firstParty:'string',//甲方签约人
                firstPartyId:'string',//甲方签约人id
                secondParty:'string',//乙方签约人
                secondPartyId:'string',//乙方签约人id
                signManager:'string',// 签约管家
                signManagerId:'string',// 签约管家id
                signed_at:'string',// 签约时间               
            }],
            refuseServiceDialogVisible: false,//拒绝服务人员显示隐藏
            //分配弹出框显示
            assignDialogVisible:false,
            //待分配订单id
            assignOrderId: 0,
        }
    },
    components: {
        matchServiceTableComponent,
        matchServiceQueryComponent,
        contractTableComponent,
        refuseServiceDialog,
        assignDialog
    },
    computed:{
        /**
         * 
         */
        workerConfigList(){
            return this.$store.state.operateModule.configForm
        }
    },
    methods: {
        /**
         * 变更订单信息字段
         */
        changeOrderMessage(){

        },
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
                    operateService.getFormConfig('edit'), //获取表单配置字段
                    operateService.getStaffList(4) //获取列表数据
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
            this.$store.commit('setSellerList', {
                queryKey: 'page', 
                queryedList: val
            })
            await this.getTableList()
        },
        /**
         * 切换页码
         */
        async handleContractCurrentPage(val){
            // this.pagination.currentPage = val
            //设置page查询参数
            this.$store.commit('setSellerList', {
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
            this.$store.commit('setSellerList', {
                queryKey: 'name', 
                queryedList: this.staffSearch.name
            })
            //设置手机号查询参数
            this.$store.commit('setSellerList', {
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
            this.$store.commit('setSellerList', {
                queryKey: 'name', 
                queryedList: null
            })
            //重置手机号查询参数
            this.$store.commit('setSellerList', {
                queryKey: 'phone', 
                queryedList: null
            })
            await this.getTableList()
        },
        /**
         * 拒绝劳动者
         */
        refuseService(){
            this.refuseServiceDialogVisible = true
        },
        /**
         * 跳转至签约页面
         */
        goSignOrder(){
            this.$router.push('/sale/saleSignPage')
        },
        /**
         * 分派订单啊
         */
        assignOrder(){
            this.assignDialogVisible = true
        }
    },
    async mounted(){
        await this.getTableList()
    }    
}
</script>
<style lang="scss" scoped>
    .orderConfig{
        width: 100%;
        min-height: calc(100vh - 50px);
        background:#f0f2f5;
        .order-header{
            background: #fff;
            padding: 30px 24px 24px 24px;
            position: relative;
            .order-name{
                line-height: 28px;
                font-size: 20px;
                font-weight: 700;
            }
            .btn-group{
                & /deep/ .el-button{
                    margin-left: 0px;
                }
                position: absolute;
                right: 24px;
                top: 20px;
            }
            .order-detail{
                padding-top: 12px;
                display: flex;
                .detail-left{
                    flex:1;
                    .detail-left-box{
                        display: flex;
                        flex-wrap: wrap;
                        .detail-left-line{
                            width: 50%;
                            color: rgba(0,0,0,.65);
                            line-height: 20px;
                            padding-bottom: 8px;
                        }
                    }
                }
                .detail-right{
                    min-width: 400px;
                    display: flex;
                    .right-box{
                        height: 80px;
                        width: 50%;
                        .title{
                            color: rgba(0,0,0,.45);
                            font-size: 14px;
                            line-height: 1.5;
                        }
                        .value{
                            font-size: 20px;
                            color: rgba(0,0,0,.85);
                            line-height: 1.5;
                        }
                    }
                }
            }
        }
        .order-down{
            margin: 24px;
            .order-message{

                width: 100%;
                // height: 285px;
                background: #fff;
                margin-bottom: 24px; 
                .title{
                    min-height: 48px;
                    margin-bottom: -1px;
                    padding: 0 24px;
                    color: rgba(0,0,0,.85);
                    font-weight: 500;
                    font-size: 16px;
                    background: transparent;
                    border-bottom: 1px solid #e8e8e8;
                    border-radius: 2px 2px 0 0;
                    zoom: 1;
                    .title-contains{
                        display: flex;
                        align-items: center;
                        .left{
                            display: inline-block;
                            flex: 1 1;
                            padding: 16px 0;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                    }

                }
                .order-list{
                    box-sizing: border-box;
                    padding: 24px;
                    &:after{
                        content: '';
                        display: block;
                        clear: both;
                    }
                    .line-three-list{
                        float: left;
                        width: 33%;
                        line-height: 30px;
                    }
                    .line-list{
                        float: left;
                        width: 100%;
                        line-height: 30px;
                    }
                    .change{
                        margin-left: 15px;
                        display: inline-block;
                        color: #1890ff;
                        line-height: 30px;
                        height: 30px;
                        font-size: 12px;
                        cursor: pointer;
                        & img{
                            height: 30px;
                            width: 30px;
                            vertical-align: middle;
                        }
                    }
                }
            }
        }
    }
</style>



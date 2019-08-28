<template>
    <div class="orderConfig">
        <div class="order-header">
            <div class="order-name">
                <h4>订单号：{{orderBase.order_code}}</h4>
            </div>
            <div class="btn-group">
                <!-- 仅店长有此权限 -->
                <el-button type="primary" @click="assignOrder" size="mini">分派</el-button>
                <el-button type="primary" size="mini" @click="goSignOrder">续约</el-button>
                <el-button type="danger" size="mini" @click="determinateOrder">终止订单</el-button>
                <el-button size="mini" @click="goback">返回</el-button>
            </div>
            <div class="order-detail">
                <div class="detail-left">
                    <div class="detail-left-box">
                        <div class="detail-left-line">订单经纪人：{{ orderBase.agent_manager_name }}</div>
                        <div class="detail-left-line">订单门店：{{ orderBase.agent_store_name }}</div>
                        <div class="detail-left-line">创建人：{{ orderBase.created_manager_name }}</div>
                        <div class="detail-left-line">创建时间：{{orderBase.created_at}}</div>
                        <div class="detail-left-line">来源门店：{{orderBase.apply_store_name}}</div>
                        <div class="detail-left-line">来源人：{{orderBase.apply_manager_name}}</div>
                        <div class="detail-left-line">签约时间：{{orderBase.sign_service_start}}</div>
                        <div class="detail-left-line">服务周期：{{orderBase.sign_service_start}}</div>
                    </div>
                </div>
                <div class="detail-right">
                    <div class="right-box">
                        <div class="title">账户余额</div>
                        <div class="value">{{ orderBase.sign_user_account }}</div>
                    </div>
                </div>
            </div>
            <!-- 订单分派弹出框 -->
            <assign-dialog
                v-if="assignDialogVisible"
                :openAssignDialog="assignDialogVisible"
                @closeAssignDialog="assignDialogVisible=false"
                :assignOrderId="order_id"></assign-dialog>
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
                        客户姓名：<span>{{orderBase.order_user_name}}</span>
                        <p @click="changeOrderMessage('')" class="change">
                            <img src="./orderConfig/images/change.svg" alt="">
                        </p>
                    </div>
                    <div class="line-three-list">
                        电话：<span>{{orderBase.order_user_phone}}</span> 
                        <p @click="changeOrderMessage('')" class="change">
                            <img src="./orderConfig/images/change.svg" alt="">
                        </p>
                    </div>
                    <div class="line-list">
                        工种：<span>{{orderBase.work_type}}</span>
                        <p @click="changeOrderMessage('')" class="change">
                            <img src="./orderConfig/images/change.svg" alt="">
                        </p>
                    </div>
                    <div class="line-list">
                        工作时间：<span>{{orderBase.service_duration}}</span>
                        <p @click="changeOrderMessage('')" class="change">
                            <img src="./orderConfig/images/change.svg" alt="">
                        </p>
                    </div>
                    <div class="line-list">
                        工资：<span>{{orderBase.wage}}</span>
                        <p @click="changeOrderMessage('')" class="change">
                            <img src="./orderConfig/images/change.svg" alt="">
                        </p>
                    </div>
                    <div class="line-list">
                        服务地址： <span>{{orderBase.service_address}}</span>
                        <p @click="changeOrderMessage('')" class="change">
                            <img src="./orderConfig/images/change.svg" alt="">
                        </p>
                    </div>
                    <div class="line-list">
                        订单详情：<span>{{orderBase.order_details}}</span>
                        <p @click="changeOrderMessage('')" class="change">
                            <img src="./orderConfig/images/change.svg" alt="">
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
                    <!-- <div class="staff">
                        <match-service-table-component
                            :staffTable="staffTable"
                            :maxLength="maxLength"
                            :controlScopeLength="150">
                            
                            <template slot="searchList">
                                <div class="search-list">
                                    <match-service-query-component  :queryFrom="'order'" @updateTable="updateTable"></match-service-query-component>
                                </div>
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
                    </div> -->
                    <!-- <match-service-list></match-service-list> -->
                    <match-service-list></match-service-list>
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
                        <el-table-column label="工号" prop="staff_code" align="center"></el-table-column>

                        <el-table-column label="姓名" prop="staff_name" align="center"></el-table-column>

                        <el-table-column label="头像" prop="staff_icon" align="center"></el-table-column>

                        <el-table-column label="电话" prop="staff_phone" align="center"></el-table-column>

                        <el-table-column label="签约状态" prop="type" align="center"></el-table-column>

                        <el-table-column label="添加人" prop="create_manager_name" align="center"></el-table-column>

                        <el-table-column label="操作" align="center" width="300">
                            <template slot-scope="scope">
                                <el-button type="success" @click="goSignOrder(scope.row)" size="mini">签约</el-button>
                                <el-button type="danger" @click="refuseService(scope.row)" size="mini">拒绝</el-button>
                                <el-button type="primary" @click="goStaffDetail(scope.row)" size="mini">详情</el-button>
                                <!-- 只有添加人才能删除 -->
                                <el-button 
                                    type="danger" 
                                    size="mini"
                                    @click="deleteMatchStaff(scope.row)" 
                                    v-if="presentUser.id == scope.row.create_manager_id">删除</el-button>
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
                    <contract-list :staffTable="contractTable"></contract-list>
                    <refuse-service-dialog
                        v-if="refuseServiceDialogVisible"
                        :refuseServiceDialogVisible="refuseServiceDialogVisible"
                        @claseRefuseDialog="refuseServiceDialogVisible=false"
                        :matched_staff="matched_staff"></refuse-service-dialog>
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
    import {operateService, $utils, saleService} from '../../../common'
    import {
        // matchServiceTableComponent,
        // matchServiceQueryComponent,
        // contractTableComponent,
        refuseServiceDialog,
        assignDialog,
        matchServiceList,
        contractList} from './orderConfig/index.js'
export default {
    data(){
        return {
            order_id: '',//订单id
            contratcPagination: {
                total: 0,
                currentPage: 1,
                pageNumber: 10,
            },
            //匹配劳动者列表
            matchServiceTable: [
                {
                    staff_code: '111',
                    staff_name: '宋希文',
                    staff_phone: '15011111111',
                    type: '可接单',
                    create_manager_name: '唐朝',
                }
            ],
            //订单日志列表
            orderLogTable: [],
            //合同列表
            contractTable: [{
                contact_code:'string',//合同编号
                type: '',//合同状态
                // created_at:'string',//印制时间
                // manageDepartment:'string',//责任部门
                // manager:'string',//责任人
                // contract_status:'string',// 合同状态
                // isSign:'Boolean',//是否签约
                // firstParty:'string',//甲方签约人
                // firstPartyId:'string',//甲方签约人id
                // secondParty:'string',//乙方签约人
                // secondPartyId:'string',//乙方签约人id
                // signManager:'string',// 签约管家
                // signManagerId:'string',// 签约管家id
                // signed_at:'string',// 签约时间               
            }],
            refuseServiceDialogVisible: false,//拒绝服务人员显示隐藏
            //分配弹出框显示
            assignDialogVisible:false,

            matched_staff: null,//备选服务人员信息对象
        }
    },
    components: {
        // matchServiceTableComponent,
        // matchServiceQueryComponent,
        refuseServiceDialog,
        assignDialog,
        matchServiceList,
        contractList
    },
    computed:{
        /**
         * 
         */
        workerConfigList(){
            return this.$store.state.operateModule.configForm
        },
        /**
         * 当前用户信息
         */
        presentUser(){
            return this.$store.state.loginModule.user
        },
        /**
         * 订单基本信息
         */
        orderBase(){
            return this.$store.state.saleModule.order
        }
    },
    methods: {
        /**
         * 变更订单信息字段
         */
        changeOrderMessage(){

        },
        /**
         * 获取订单信息
         */
        async getOrder(){
            try{
                store.commit('setLoading',true)
                await saleService.getOrder(this.order_id).then((data) =>{
                    if(data.code == "0"){
                        store.commit('configOrderData',data.data)
                    }
                    store.commit('setLoading',false)
                }).catch(e =>{
                    this.$message({
                        type:'error',
                        message: e.message
                    })
                    store.commit('setLoading',false)
                }).finally(() =>{
                    store.commit('setLoading',false)
                })
            } catch(error){
                this.$message({
                    type:'error',
                    message: error.message
                })
                store.commit('setLoading',false)
            }
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

/*********************备选服务人员列表****************************************************/
        /**
         * 跳转至签约页面
         * @param paramObj 匹配服务人员信息对象
         */
        goSignOrder(paramObj){
            this.$router.push(`/sale/saleSignPage`)
        },
        /**
         * 拒绝劳动者
         * @param paramObj 匹配服务人员信息对象
         */
        refuseService(paramObj){
            this.matched_staff = paramObj
            this.refuseServiceDialogVisible = true
        },
        /**
         * 跳转至服务人员详情
         * @param paramObj 匹配服务人员信息对象
         */
        goStaffDetail(paramObj){
            this.$router.push(``)
        },
        /**
         * 删除备选服务人员
         */
        async deleteMatchStaff(){
            let _this= this;

            let response = await this.$confirm(`确定删除该备选服务人员吗?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: `已取消删除`
                });
            });

            if(response == "confirm"){
                store.commit('setLoading',true)

                try{
                    // await operateService.addReturnStaffSingle(row.id)
                    //     .then(data =>{
                    //         if(data.code == "0"){
                    //             this.$message({
                    //                 type:'success',
                    //                 message: `导入成功`
                    //             })
                    //         }
                    //     }).catch(e =>{
                    //         this.$message({
                    //             type:'error',
                    //             message: e.message
                    //         })
                    //     })
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
        /********************订单操作栏***************************************/
        /**
         * 分派订单
         */
        assignOrder(){
            this.assignDialogVisible = true
        },
        /**
         * 返回
         */
        goback(){
            this.$router.push('/sale/orderList')
        },
        /**
         * 终止订单
         */
        determinateOrder(){
            
        }
    },
    async mounted(){
        this.order_id = this.$route.query.id;//订单id
        await this.getOrder()
        
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



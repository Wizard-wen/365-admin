<template>
    <div class="orderConfig" v-loading="is_loading">
        <div class="order-header">
            <div class="order-name">
                <h4>订单号：{{orderBase.order_code}}</h4>
            </div>
            <div class="btn-group">
                <!-- 仅店长有此权限 -->
                <el-button type="primary" @click="openAssignOrderDialog" size="mini">分派</el-button>
                <el-button size="mini" @click="goback">返回</el-button>
            </div>
            <div class="order-detail">
                <div class="detail-left">
                    <div class="detail-left-box">
                        <div class="detail-left-line">订单经纪人：{{ orderBase.agent_manager_name }}</div>
                        <div class="detail-left-line">订单经纪门店：{{ orderBase.agent_store_name }}</div>
                        <div class="detail-left-line">订单创建人（运营）：{{ orderBase.created_manager_name }}</div>
                        <div class="detail-left-line">订单创建时间：{{orderBase.created_at | timeFomatter}}</div>
                        <div class="detail-left-line">来源门店：{{orderBase.apply_store_name}}</div>
                        <div class="detail-left-line">来源人：{{orderBase.apply_manager_name? orderBase.apply_manager_name: '门店'}}</div>
                        <div
                            v-if="orderBase.type != 1" 
                            class="detail-left-line">签约时间：{{orderBase.sign_at | timeFomatter}}</div>
                        <div
                            v-if="orderBase.type != 1" 
                            class="detail-left-line">服务周期：
                            {{orderBase.sign_service_start | timeFomatter}} -
                            {{orderBase.sign_service_end | timeFomatter}} 
                            </div>
                    </div>
                </div>
                <div class="detail-right">
                    <div class="right-box" v-if="orderBase.type!= 1">
                        <div class="title">账户余额</div>
                        <div class="value">{{ orderBase.sign_user_account }}</div>
                    </div>
                    <div class="right-box" >
                        <div class="title">订单状态</div>
                        <div class="value" :style="{color: orderType.color}">{{ orderType.name}}</div>
                    </div>
                </div>
            </div>
            <!-- 订单分派弹出框 -->
            <assign-order-dialog
                v-if="assignOrderDialogVisible"
                :assignOrderDialogVisible="assignOrderDialogVisible"
                @closeAssignOrderDialog="closeAssignOrderDialog"
                :order_id="assignOrderId"></assign-order-dialog>
        </div>
        <div class="order-down">
            <div class="order-message">
                <div class="title">
                    <div class="title-contains">
                        <div class="left">订单基本信息</div>
                        <el-button type="primary" size="mini" @click="makeOrderImage">生成订单图片</el-button>
                    </div>
                </div>
                <div class="order-list">
                    <div class="line-three-list">
                        客户姓名：<span>{{orderBase.order_user_name}}</span>
                    </div>
                    <div class="line-three-list">
                        电话：<span>{{orderBase.order_user_phone}}</span> 
                    </div>
                    <div class="line-list">
                        工种：<span>{{orderBase.work_type}}</span>
                    </div>
                    <div class="line-list">
                        工作时间：<span>{{orderBase.service_duration}}</span>
                    </div>
                    <div class="line-list">
                        工资：<span>{{orderBase.wage}}</span>
                    </div>
                    <div class="line-list">
                        服务地址： <span>{{orderBase.service_address}}</span>
                    </div>
                    <div class="line-list">
                        订单详情：<span>{{orderBase.order_details}}</span>
                    </div>
                </div>
            </div>
            <!-- 生成订单名片组件 -->
            <template>
                <make-image-component
                    :height="500"
                    :width="460"
                    :makeImageDialogVisible="makeImageDialogVisible"
                    v-if="makeImageDialogVisible"
                    @closeMakeImageDialog="makeImageDialogVisible = false">
                    <template slot="pictureContains">
                        <order-picture-component
                            :pictureForm="orderBase"></order-picture-component>
                    </template>
                </make-image-component>
            </template>
            <div class="order-message" v-if="orderBase.type == 1 || orderBase.type == 3">
                <div class="title">
                    <div class="title-contains">
                        <div class="left">备选服务人员</div>
                    </div>
                </div>
                <div class="order-list">
                    <!-- 匹配劳动者列表 -->
                    <el-table :data="order_staff" class="person-table" :header-cell-style="{height: '48px',background: '#fafafa'}">
                        <el-table-column label="工号" prop="staff_code" align="center"></el-table-column>

                        <el-table-column label="姓名" prop="staff_name" align="center"></el-table-column>

                        <el-table-column label="电话" prop="staff_phone" align="center"></el-table-column>

                        <el-table-column label="签约状态" prop="type" align="center">
                            <template slot-scope="scope">
                                <table-tag-component :propList="matchStaffSignList" :tableOriginData="scope.row.type"></table-tag-component>
                            </template>
                        </el-table-column>

                        <el-table-column label="添加人" prop="created_manager_name" align="center"></el-table-column>

                        <el-table-column label="操作" align="center" width="300">
                            <template slot-scope="scope">
                                <el-button type="primary" @click="goStaffDetail(scope.row)" size="mini">详情</el-button>
                            </template>
                        </el-table-column>
                        
                    </el-table>
                </div>
            </div>

            <div class="order-message" v-if="orderBase.type != 1">
                <div class="title">
                    <div class="title-contains">
                        <div class="left">合同列表</div>
                    </div>
                </div>
                <div class="order-list">
                    <contract-list></contract-list>
                </div>
            </div>
            
            <div class="order-message" v-if="orderBase.type != 1">
                <div class="title">
                    <div class="title-contains">
                        <div class="left">签约客户信息</div>
                    </div>
                </div>
                <div class="order-list">
                    <div class="line-two-list">
                        姓名：<span>{{orderBase.sign_user_name}}</span>
                    </div>
                    <div class="line-two-list">
                        电话：<span>{{orderBase.sign_user_phone}}</span> 
                    </div>
                    <div class="line-two-list">
                        身份证号：<span>{{orderBase.sign_user_identify}}</span> 
                    </div>
                </div>
            </div>

            <div class="order-message" v-if="orderBase.type != 1">
                <div class="title">
                    <div class="title-contains">
                        <div class="left">签约服务人员信息</div>
                    </div>
                </div>
                <div class="order-list">
                    
                    <div class="line-two-list">
                        编号：<span>{{orderBase.sign_staff_code}}</span> 
                    </div>
                    <div class="line-two-list">
                        身份证号：<span>{{orderBase.sign_staff_identify}}</span> 
                    </div>
                    <div class="line-two-list">
                        姓名：<span>{{orderBase.sign_staff_name}}</span>
                    </div>
                    <div class="line-two-list">
                        电话：<span>{{orderBase.sign_staff_phone}}</span> 
                    </div>
                    <div class="line-list">
                        户籍地址：<span>{{orderBase.sign_staff_law_address}}</span> 
                    </div>
                    <div class="line-list">
                        现住址：<span>{{orderBase.sign_staff_cur_address}}</span> 
                    </div>
                    <div class="line-list">
                        紧急联系人：<span>{{orderBase.sign_staff_urgent}}</span> 
                    </div>
                </div>
            </div>

            <order-config-log></order-config-log>
                     
        </div>
    </div>
</template>
<script>
    import {operateService, $utils, saleService} from '../../../../common'
    import {
        matchServiceList,
        contractList,
        orderPictureComponent,} from './orderConfig/index.js'
    import {assignOrderDialog} from './orderList/index.js'
    import {
        makeImageComponent,
        tableTagComponent} from '@/pages/components'
    import { 
        orderConfigLog,
    } from '@/public/module/order/orderConfig/index.js'
export default {
    components: {
        assignOrderDialog,
        matchServiceList,
        contractList,
        tableTagComponent,
        makeImageComponent,
        orderPictureComponent,

        orderConfigLog,
    },
    data(){
        return {
            is_loading: false,//
            order_id: 0,//订单id
            matchStaffSignList: [
                {id: 1, name: '未签约'},
                {id: 2, name: '已签约'},
                {id: 3, name: '已拒绝'},
            ],
            //拒绝服务人员显示隐藏
            refuseServiceDialogVisible: false,
            //备选服务人员信息对象
            matched_staff: null,
            //待分配订单id
            assignOrderId: 0,
            //订单分派弹窗显示隐藏
            assignOrderDialogVisible: false,
            makeImageDialogVisible: false,
        }
    },
    filters: {
        timeFomatter(value){
            if(value == 0){
                return '-'
            }
            return $utils.formatDate(new Date(value), 'yyyy-MM-dd')
        }
    },

    computed:{
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
        },
        /**
         * 备选服务人员列表
         */
        order_staff(){
            return this.$store.state.saleModule.order_staff
        },
        /**
         * 订单状态
         */
        orderType(){
            if(this.orderBase.type == 1){
                return {
                    name: '匹配中',
                    color: '#E6A23C'
                }
            } else if(this.orderBase.type == 2){
                return {
                    name: '已签约',
                    color: '#67C23A'
                }
            } else if(this.orderBase.type == 3){
                return {
                    name: '售后匹配中',
                    color: '#E6A23C'
                }
            } else if(this.orderBase.type == 4){
                return {
                    name: '已终止',
                    color: '#F56C6C'
                }
            } else {
                return {
                    name: '',
                    color: ''
                }
            }
        }
    },
    methods: {
        /**
         * 获取订单信息
         */
        async getOrder(){
            try{
                this.is_loading = true
                await saleService.getOrder(this.$route.query.order_id).then((data) =>{
                    if(data.code == "0"){
                        store.commit('configOrderData',data.data)
                    }
                    this.is_loading = false
                }).catch(e =>{
                    this.$message({
                        type:'error',
                        message: e.message
                    })
                    this.is_loading = false
                }).finally(() =>{
                    this.is_loading = false
                })
            } catch(error){
                this.$message({
                    type:'error',
                    message: error.message
                })
                this.is_loading = false
            }
        },
        /**
         * 生成订单图片
         */
        makeOrderImage(){   
            this.makeImageDialogVisible = true
        },
/*********************备选服务人员列表****************************************************/
        /**
         * 跳转至服务人员详情
         * @param paramObj 匹配服务人员信息对象
         */
        goStaffDetail(paramObj){
            this.$router.push({
                path: "/worker/workerItemShow",
                query: {
                    id: paramObj.id,
                    from: 2,
                    order_id: this.$route.query.order_id
                }
            })
        },
/********************订单操作栏***************************************/
        /**
         * 打开分派订单弹窗
         */
        openAssignOrderDialog(){
            this.assignOrderId = this.orderBase.id
            this.assignOrderDialogVisible = true
        },
        /**
         * 关闭订单分派弹窗
         */
        async closeAssignOrderDialog(){
            this.assignOrderDialogVisible = false
            await this.getOrder()
        },
        /**
         * 返回
         */
        goback(){
            this.$router.push('/operate/operateOrderList')
        },
    },
    async mounted(){
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
            padding: 24px;
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
                    .line-two-list{
                        float: left;
                        width: 50%;
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
                        color: $viColor;
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



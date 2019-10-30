<template>
    <div class="orderConfig" v-loading="is_loading">
        <div class="order-header">
            <div class="order-name">
                <h4>订单号：{{orderBase.order_code}}</h4>
            </div>
            <div class="btn-group">
                <!-- 仅店长有此权限 -->
                <el-button type="primary" @click="assignOrder" v-if="presentUser.is_store_manager != 1" size="mini">分派</el-button>
                <el-button type="primary" size="mini" v-if="orderBase.type == 2" @click="goSignOrder(1)">续约</el-button>
                <el-button type="danger" size="mini" v-if="orderBase.type == 3" @click="determinateOrder">终止订单</el-button>
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
                        <div class="detail-left-line">来源人：{{orderBase.apply_manager_id == 0 ? '门店' : orderBase.apply_manager_name}}</div>
                        <div
                            v-if="orderBase.type != 1" 
                            class="detail-left-line">签约时间：{{orderBase.sign_at | timeFomatter}}</div>
                        <div
                            v-if="orderBase.type != 1" 
                            class="detail-left-line">服务周期：{{orderBase.sign_service_start | timeFomatter}} - {{orderBase.sign_service_end | timeFomatter}}</div>
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
            <assign-dialog
                v-if="assignDialogVisible"
                :openAssignDialog="assignDialogVisible"
                @closeAssignDialog="assignDialogVisible=false"
                :order_id="order_id"></assign-dialog>
        </div>
        <div class="order-down">

            <order-base-component
                :type="'normal'"
                @updateOrderConfig="getOrder"></order-base-component>

            <card-box-component
                v-if="orderBase.type == 1 || orderBase.type == 3"
                :title="'服务人员匹配'">
                <template slot="contains">
                    <match-service-list @updateOrderConfig="getOrder"></match-service-list>
                </template>    
            </card-box-component>

            <order-staff-component
                :type="'normal'"
                @updateOrderConfig="getOrder"
                v-if="orderBase.type == 1 || orderBase.type == 3"></order-staff-component>
            
            <card-box-component
                v-if="orderBase.type != 1"
                :title="'合同列表'">
                <template slot="contains">
                    <contract-list></contract-list>
                </template>    
            </card-box-component>
            <signed-service-detail-component
                v-if="orderBase.type != 1"
                :signedServiceDetailObject="orderBase"></signed-service-detail-component>
            <signed-user-detail-component 
            v-if="orderBase.type != 1"
                :signedUserDetailObject="orderBase"></signed-user-detail-component>
            <order-config-log></order-config-log> 
        </div>
    </div>
</template>
<script>
    import {operateService, $utils, saleService} from '../../../common'
    import {
        assignDialog,
        matchServiceList,
        contractList,
        orderBaseComponent,
        orderStaffComponent,
        orderConfigLog,
    } from './orderConfig/index.js'

    import {
        signedUserDetailComponent,
        signedServiceDetailComponent,
    } from './contractItem/index.js'
export default {
    components: {
        assignDialog,
        matchServiceList,
        contractList,
        orderBaseComponent,
        orderStaffComponent,
        orderConfigLog,
        signedUserDetailComponent,
        signedServiceDetailComponent,
    },
    data(){
        return {
            is_loading: false,//
            //订单id
            order_id: this.$route.query.order_id,
            //分配弹出框显示
            assignDialogVisible:false,
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
         * 
         */
        workerConfigList(){
            return this.$store.state.operateModule.workerConfigForm
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
                store.commit('setLoading',false)
            }
        },
        /**
         * 切换页码
         */
        async handleContractCurrentPage(val){
            //设置page查询参数
            this.$store.commit('setContractList', {
                queryKey: 'page', 
                queryedList: val
            })
            await this.getTableList()
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
        }
    }
</style>



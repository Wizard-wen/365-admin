<template>
    <div class="orderConfig" v-loading="is_loading">
        <!-- 订单头部信息 -->
        <order-header-component
            @updateOrderConfig="getSalePublicOrder"
            :currentOrder="salePublicOrderItem.orderBase"
            :publicOrderType="4"
            :orderModuleType="'public'"></order-header-component>
            
        <div class="order-down">
            <!-- 订单基本信息 -->
            <public-order-base-component
                :orderBaseDetail="salePublicOrderItem.orderBase"
                :publicOrderType="4"
                @updatePublicOrderBase="getSalePublicOrder"></public-order-base-component>
            <!-- 服务人员匹配 -->
            <card-box-component
                v-if="salePublicOrderItem.orderBase.type == 1 || salePublicOrderItem.orderBase.type == 3"
                :title="'服务人员匹配'">
                <template slot="contains">
                    <match-service-list :workerListType="'publicMatch'" @updateOrderConfig="getSalePublicOrder"></match-service-list>
                </template>    
            </card-box-component>
            <!-- 已匹配的服务人员 -->
            <order-matched-worker-list-component
                v-if="salePublicOrderItem.orderBase.type == 1 || salePublicOrderItem.orderBase.type == 3"
                :orderBase="salePublicOrderItem.orderBase"
                :order_staff="salePublicOrderItem.order_staff"
                :publicOrderType="4"
                @updateOrderConfig="getSalePublicOrder"></order-matched-worker-list-component>

        </div>
    </div>
</template>
<script>
    import {saleService} from '@/service/sale'
    // 匹配劳动者
    import matchServiceList from './saleOrderConfig/matchServiceList.vue'

    import { 
        orderHeaderComponent,//订单头部信息
        orderMatchedWorkerListComponent,//已经匹配的劳动者
    } from '@/public/module/orderConfig/index.js'

    import {
        publicOrderBaseComponent,//订单基本信息
    } from '@/public/module/orderPublic/index.js'

export default {
    components: {
        orderHeaderComponent,
        publicOrderBaseComponent,
        matchServiceList, 
        orderMatchedWorkerListComponent,
        
    },
    data(){
        return {
            is_loading: false,
            salePublicOrderItem: {
                orderBase: {},
                orderStaff: [],
            },
        }
    },
    methods: {
        /**
         * 获取订单信息
         */
        async getSalePublicOrder(){
            try{
                this.is_loading = true
                await saleService.getSalePublicOrder(this.$route.query.order_id).then((data) =>{
                    this.salePublicOrderItem = {
                        ...data,
                    }
                    this.is_loading = false
                }).catch(Error =>{
                    this.$message({
                        type:'error',
                        message: Error.message
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
    },
    async mounted(){
        await this.getSalePublicOrder()
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



<template>
    <div class="orderConfig" v-loading="is_loading">
        
        <order-header-component
            @updateOrderConfig="getSaleOrder"
            :currentOrder="saleOrderItem.order"
            :orderModuleType="'sale'"
            :publicOrderType="3"></order-header-component>
        
        <div class="order-down">

            <public-order-base-component
                :orderBaseDetail="saleOrderItem.order"
                :publicOrderType="3"
                @updatePublicOrderBase="getSaleOrder"></public-order-base-component>

            <card-box-component
                v-if="saleOrderItem.order.type == 1 || saleOrderItem.order.type == 3"
                :title="'服务人员匹配'">
                <template slot="contains">
                    <match-service-list @updateOrderConfig="getSaleOrder"></match-service-list>
                </template>    
            </card-box-component>

            <order-matched-worker-list-component
                v-if="saleOrderItem.order.type == 1 || saleOrderItem.order.type == 3"
                :orderBase="saleOrderItem.order"
                :order_staff="saleOrderItem.order_staff"
                :publicOrderType="3"
                @updateOrderConfig="getSaleOrder"></order-matched-worker-list-component>
            
            <order-contract-list
                v-if="saleOrderItem.order.type != 1"
                :contractModuleType="'saleOrderConfig'"
                :order_contract="saleOrderItem.order_contract"
                :publicOrderType="3"></order-contract-list>


            <signed-service-detail-component
                v-if="saleOrderItem.order.type != 1"
                :signedServiceDetailObject="saleOrderItem.order"></signed-service-detail-component>

            <signed-user-detail-component
                v-if="saleOrderItem.order.type != 1"
                :signedUserDetailObject="saleOrderItem.order"></signed-user-detail-component>

            <order-config-log
                :isEdit="false"
                @updateOrderConfig="getSaleOrder"
                :order_logs="saleOrderItem.order_logs"></order-config-log>
        </div>
    </div>
</template>
<script>
    import {saleService} from '@/service/sale.ts'
    import matchServiceList from './saleOrderConfig/matchServiceList.vue'

    import { 
        orderHeaderComponent,
        orderConfigLog,
        orderMatchedWorkerListComponent,
        orderContractList,
    } from '@/public/module/orderConfig/index.js'

    import {
        signedServiceDetailComponent,
        signedUserDetailComponent,
    } from '@/public/module/contractItem/index.js'
    
    import {
        publicOrderBaseComponent,
    } from '@/public/module/orderPublic/index.js'

export default {
    components: {
        matchServiceList,
        orderHeaderComponent,
        orderMatchedWorkerListComponent,
        orderContractList,
        orderConfigLog,
        publicOrderBaseComponent,
        signedServiceDetailComponent,
        signedUserDetailComponent,
    },
    data(){
        return {
            is_loading: false,//
            saleOrderItem: {
                order: {},
                order_staff: [],
                order_contract:[],
                order_logs:[],
            },
            //订单id
            order_id: this.$route.query.order_id,
        }
    },
    methods: {
        /**
         * 获取订单信息
         */
        async getSaleOrder(){
            try{
                this.is_loading = true
                await saleService.getSaleOrder(this.$route.query.order_id).then((data) =>{

                    this.saleOrderItem = {
                        ...data,
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
    },
    async mounted(){
        await this.getSaleOrder()
        
    }    
}
</script>
<style lang="scss" scoped>
    .orderConfig{
        width: 100%;
        min-height: calc(100vh - 50px);
        background:#f0f2f5;
        .order-down{
            padding: 24px;
        }
    }
</style>



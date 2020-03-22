<template>
    <div class="orderConfig" v-loading="is_loading">

        <order-header-component
            @updateOrderConfig="getOrder"
            :currentOrder="operateOrderItem.order"
            :orderModuleType="'operate'"
            :publicOrderType="5"></order-header-component>
            
        <div class="order-down">

            <public-order-base-component
                :orderBaseDetail="operateOrderItem.order"
                :publicOrderType="5"
                @updatePublicOrderBase="getOrder"></public-order-base-component>

            <order-matched-worker-list-component
                v-if="operateOrderItem.order.type == 1 || operateOrderItem.order.type == 3"
                :orderBase="operateOrderItem.order"
                :order_staff="operateOrderItem.order_staff"
                :publicOrderType="5"
                @updateOrderConfig="getOrder"></order-matched-worker-list-component>

            <order-contract-list
                v-if="operateOrderItem.order.type != 1"
                :order_contract="operateOrderItem.order_contract"
                :contractModuleType="'operateOrderConfig'"
                :publicOrderType="5"></order-contract-list>

            <signed-service-detail-component
                v-if="operateOrderItem.order.type != 1"
                :signedServiceDetailObject="operateOrderItem.order"></signed-service-detail-component>

            <signed-user-detail-component
                v-if="operateOrderItem.order.type != 1"
                :signedUserDetailObject="operateOrderItem.order"></signed-user-detail-component>

            <order-config-log
                @updateOrderConfig="getOrder" :isEdit="false"></order-config-log>
                     
        </div>
    </div>
</template>
<script>

    import {operateOrderService} from '@/service/operateOrder.ts'
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
    
    import {publicOrderBaseComponent} from '@/public/module/orderPublic/index.js'
export default {
    components: {
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
            operateOrderItem: {
                order: {},
                order_staff: [],
                order_contract:[],
                order_logs:[],
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
                await operateOrderService.getOperateOrder(this.$route.query.order_id).then((data) =>{
                    this.operateOrderItem = {
                        ...data,
                    }
                    this.is_loading = false
                }).catch(error =>{
                    this.$message({
                        type:'error',
                        message: error.message
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
        await this.getOrder()
        
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



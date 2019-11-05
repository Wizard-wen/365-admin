<template>
    <div class="orderConfig" v-loading="is_loading">

        <order-header-component
            @updateOrderConfig="getOrder"
            :orderBase="orderBase"
            :publicOrderType="5"></order-header-component>
        
        <div class="order-down">

            <public-order-base-component
                :orderBaseDetail="orderBase"
                :publicOrderType="5"
                @updatePublicOrderBase="getOrder"></public-order-base-component>

            <order-staff-component
                v-if="orderBase.type == 1 || orderBase.type == 3"
                :orderBase="orderBase"
                :order_staff="order_staff"
                :publicOrderType="5"
                @updateOrderConfig="getOrder"></order-staff-component>

            <order-contract-list
                v-if="orderBase.type != 1"
                :order_contract="order_contract"
                :publicOrderType="5"></order-contract-list>

            <signed-service-detail-component
                v-if="orderBase.type != 1"
                :signedServiceDetailObject="orderBase"></signed-service-detail-component>

            <signed-user-detail-component
                v-if="orderBase.type != 1"
                :signedUserDetailObject="orderBase"></signed-user-detail-component>

            <order-config-log
                @updateOrderConfig="getOrder"></order-config-log>
                     
        </div>
    </div>
</template>
<script>
    import {operateService, $utils, saleService} from '@common/index.js'
    
    import { 
        orderHeaderComponent,
        orderConfigLog,
        orderStaffComponent,
        orderContractList,
    } from '@/public/module/order/orderConfig/index.js'

    import {
        signedServiceDetailComponent,
        signedUserDetailComponent,
    } from '@/public/module/contract/index.js'
    
    import {
        publicOrderBaseComponent,
    } from '@/public/module/common/index.js'
export default {
    components: {
        orderHeaderComponent,
        orderStaffComponent,
        orderContractList,
        orderConfigLog,
        publicOrderBaseComponent,
        signedServiceDetailComponent,
        signedUserDetailComponent,
    },
    data(){
        return {
            is_loading: false,//
        }
    },
    computed:{
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
         * 订单中合同
         */
        order_contract(){
            return this.$store.state.saleModule.order_contract
        },
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



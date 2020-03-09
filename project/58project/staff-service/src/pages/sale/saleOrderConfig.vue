<template>
    <div class="orderConfig" v-loading="is_loading">
        
        <order-header-component
            @updateOrderConfig="getOrder"
            :currentOrder="orderBase"
            :orderModuleType="'sale'"
            :publicOrderType="3"></order-header-component>
        
        <div class="order-down">

            <public-order-base-component
                :orderBaseDetail="orderBase"
                :publicOrderType="3"
                @updatePublicOrderBase="getOrder"></public-order-base-component>

            <card-box-component
                v-if="orderBase.type == 1 || orderBase.type == 3"
                :title="'服务人员匹配'">
                <template slot="contains">
                    <match-service-list @updateOrderConfig="getOrder"></match-service-list>
                </template>    
            </card-box-component>

            <order-matched-worker-list-component
                v-if="orderBase.type == 1 || orderBase.type == 3"
                :orderBase="orderBase"
                :order_staff="order_staff"
                :publicOrderType="3"
                @updateOrderConfig="getOrder"></order-matched-worker-list-component>
            
            <order-contract-list
                v-if="orderBase.type != 1"
                :contractModuleType="'saleOrderConfig'"
                :order_contract="order_contract"
                :publicOrderType="3"></order-contract-list>


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
    import {
        operateService, 
        $utils, 
        saleService
    } from '@common/index.js'

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
            //订单id
            order_id: this.$route.query.order_id,
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
         * 订单基本信息
         */
        orderBase(){
            return this.$store.state.saleModule.order
        },
        /**
         * 订单基本信息
         */
        order_staff(){
            return this.$store.state.saleModule.order_staff
        },
        /**
         * 订单基本信息
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



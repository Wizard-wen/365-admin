<template>
    <div class="orderConfig" v-loading="is_loading">
        
        <order-header-component></order-header-component>
        
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
    import {
        operateService, 
        $utils, 
        saleService
    } from '@common/index.js'

    import {
        matchServiceList,
        contractList,
        orderBaseComponent,
        orderStaffComponent,
        orderConfigLog,
        orderHeaderComponent,
    } from './orderConfig/index.js'

    import {
        signedUserDetailComponent,
        signedServiceDetailComponent,
    } from './contractItem/index.js'


export default {
    components: {
        matchServiceList,
        contractList,
        orderBaseComponent,
        orderStaffComponent,
        orderConfigLog,
        signedUserDetailComponent,
        signedServiceDetailComponent,
        orderHeaderComponent,
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



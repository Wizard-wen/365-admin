<template>
    <div class="orderConfig" v-loading="is_loading">
        <!-- 订单头部数据 -->
        <contract-header-component
            :contractType="2"
            :contractBase="contractBase"
            @updateContract="getSaleContract"></contract-header-component>
        <div class="order-down">
            <!-- 订单基本信息 -->
            <contract-detail-component
                :contractBase="contractBase"></contract-detail-component>
            <!-- 签约服务人员信息 -->
            <signed-service-detail-component
                :signedServiceDetailObject="contractBase"></signed-service-detail-component>
            <!-- 签约客户信息 -->
            <signed-user-detail-component
                :signedUserDetailObject="contractBase"></signed-user-detail-component>
            <!-- 合同终止信息 -->
            <terminal-detail-component
                v-if="is_settle == 2"
                :contractBase="contractBase"></terminal-detail-component>
            <!-- 合同结算信息 -->
            <settled-detail-component
                v-if="is_settle == 1"
                :contractBase="contractBase"></settled-detail-component>  
        </div>
    </div>
</template>
<script>
import {saleService} from '@/service/sale.ts'
    import {
        settledDetailComponent,
        terminalDetailComponent,
        signedServiceDetailComponent,
        signedUserDetailComponent,
        contractDetailComponent,
        contractHeaderComponent,
    } from '@/public/module/contractItem/index.js'
export default {
    components: {
        settledDetailComponent,
        terminalDetailComponent,
        signedServiceDetailComponent,
        signedUserDetailComponent,
        contractDetailComponent,
        contractHeaderComponent,
    },
    data(){
        return {
            is_loading: false,//
            contractBase: {},//合同信息
        }
    },
    computed:{
        //是否已经结算
        is_settle(){
            if(!this.contractBase.account){
                return 3
            } else {
                return this.contractBase.account.type
            }
        },
    },
    methods: {
        /**
         * 获取订单信息
         */
        async getSaleContract(){
            try{
                this.is_loading = true
                await saleService.getSaleContract(this.$route.query.id).then((data) =>{
                    this.contractBase = data.data
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
        await this.getSaleContract()
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



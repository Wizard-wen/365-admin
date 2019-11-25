<template>
    <div class="orderConfig" v-loading="is_loading">
        <contract-header-component
            :contractType="1"
            :contractBase="contractBase"></contract-header-component>
        <div class="order-down">

            <contract-detail-component
                :contractBase="contractBase"></contract-detail-component>
            
            <signed-service-detail-component
                :signedServiceDetailObject="contractBase"></signed-service-detail-component>

            <signed-user-detail-component
                :signedUserDetailObject="contractBase"></signed-user-detail-component>

            <terminal-detail-component
                v-if="is_settle == 2"
                :contractBase="contractBase"></terminal-detail-component>

            <settled-detail-component
                v-if="is_settle == 1"
                :contractBase="contractBase"></settled-detail-component>
                                 
        </div>
    </div>
</template>
<script>
    import {operateService, $utils, saleService} from '@common/index.js'

    import {
        settledDetailComponent,
        terminalDetailComponent,
        signedServiceDetailComponent,
        signedUserDetailComponent,
        contractDetailComponent,
        contractHeaderComponent,
    } from '@/public/module/contract/index.js'
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
    filters: {
        timeFomatter(value){
            if(value == 0){
                return '-'
            }
            return $utils.formatDate(new Date(value), 'yyyy-MM-dd')
        },
        contractTypeFormatter(value){
            if(value == 1){
                return '待执行'
            } else if (value == 2){
                return '执行中'
            } else {
                return '已终止'
            }
        },
        isWagedFormatter(value){
            if(value == 1){
                return '否'
            } else {
                return '是'
            }
        }
    },
    computed:{
        /**
         * 当前用户信息
         */
        presentUser(){
            return this.$store.state.loginModule.user
        },
        //订单服务内容
        order_service_contains(){
            return this.$store.state.saleModule.order_service_contains
        },
        //订单护理依赖程度
        order_service_level(){
            return this.$store.state.saleModule.order_service_level
        },
        //订单服务方式
        order_service_type(){
            return this.$store.state.saleModule.order_service_type
        },
        //合同状态
        contractType(value){
            if(this.contractBase.type == 1){
                return {
                    name: '待执行',
                    color: '#E6A23C'
                }
            } else if (this.contractBase.type == 2){
                return {
                    name: '执行中',
                    color: '#67C23A'
                }
            } else {
                return {
                    name: '已终止',
                    color: '#F56C6C'
                }
            }
        },
        //是否结算
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
        async getContract(){
            try{
                this.is_loading = true
                await saleService.getContract(this.$route.query.id).then((data) =>{
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
        /**
         * 返回
         */
        goback(){
            if(this.$route.query.from == 1){
                this.$router.push({
                    path: '/operate/operateOrderConfig',
                    query: {
                        order_id: this.$route.query.from_id
                    }
                })
            } else {
                this.$router.push('/operate/operateContractList')
            }
        },
    },
    async mounted(){
        await this.getContract()
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



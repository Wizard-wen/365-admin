<template>
    <div class="orderConfig" v-loading="is_loading">
        <contract-header-component
            :contractType="1"
            :contractBase="contractBase"></contract-header-component>
        <div class="order-down">

            <contract-detail-component
                :contractBase="contractBase"
                :workerConfigForm="workerConfigForm"></contract-detail-component>
            
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
    import {operateContractService} from '@/service/operateContract'
    // import {operateContractService} from '@/service/operateContract'

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
            workerConfigForm: {},
        }
    },
    computed: {
        is_settle(){
            if(this.contractBase.account){
                return this.contractBase.account.is_settle
            } else {
                return null
            }
        }
    },
    methods: {
        /**
         * 获取订单信息
         */
        async getContract(){
            try{
                this.is_loading = true
                await operateContractService.getOperateContract(this.$route.query.id).then((data) =>{
                    this.contractBase = data.data
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
        await operateContractService.getWorkerFormConfig().then(data =>{
            this.workerConfigForm = data.data
        })
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



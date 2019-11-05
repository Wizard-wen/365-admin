<template>
    <div class="worker">
        <contract-table-component
            :tableData="order_contract"
            :controlScopeLength="100">
            <template slot="control" slot-scope="controler">
                <el-button size="mini" type="text" 
                    @click="goContractPage(controler.scoper.row)">处理</el-button>
                <!-- <el-button size="mini" type="text" 
                    v-if="controler.scoper.row.type == 2 && controler.scoper.row.is_wage == 1" 
                    @click="sendErrorMessage(controler.scoper.row)">结算工资</el-button>
                <el-button size="mini" type="text" style="color:#F56C6C"
                    v-if="controler.scoper.row.type != 3" 
                    @click="sendErrorMessage(controler.scoper.row)">终止合同</el-button> -->
            </template>
        </contract-table-component>
    </div>
</template>
<script>
import {saleService, $utils} from '@common/index.js'
import {
    contractTableComponent,
} from './contractList/index.js'

export default {
    components: {
        contractTableComponent
    },
    computed:{
        /**
         * 当前订单中的合同
         */
        order_contract(){
            return this.$store.state.saleModule.order_contract
        }
    },
    methods: {
        /**
         * 进入合同详情页
         */
        goContractPage(param){
            this.$router.push({
                path: `/sale/contractItem`,
                query: {
                    id: param.id,
                    from: 1,
                    from_id: this.$route.query.order_id
                }
            })
        },      
    },
}
</script>


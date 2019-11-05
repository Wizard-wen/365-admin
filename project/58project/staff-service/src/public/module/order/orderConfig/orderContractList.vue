<template>
    <card-box-component
        :title="'合同列表'">
        <template slot="contains">
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
        </template>
    </card-box-component>
</template>
<script>
import {saleService, $utils} from '@common/index.js'
import {
    contractTableComponent,
} from './orderContractList/index.js'

export default {
    components: {
        contractTableComponent
    },
    props:{
        /**
         * 当前订单中的合同
         */
        order_contract: {
            type: Array,
            default: function(){return []}
        },
        /**
         * 订单类型
         * 1 门店订单申请 2 客户订单申请 3 门店订单 4 门店公海订单 5 运营订单
         */
        publicOrderType: {    
            type: Number | String,
            default: 1,
        },
    },
    methods: {
        /**
         * 进入合同详情页
         */
        goContractPage(param){
            if(this.publicOrderType == 3){
                this.$router.push({
                    path: `/sale/contractItem`,
                    query: {
                        id: param.id,
                        from: 1,
                        from_id: this.$route.query.order_id
                    }
                })
            } else if(this.publicOrderType == 5){
                this.$router.push({
                    path: `/operate/operateContractItem`,
                    query: {
                        id: param.id,
                        from: 1,
                        from_id: this.$route.query.order_id
                    }
                })
            } else {
                return
            }
           
        },      
    },
}
</script>


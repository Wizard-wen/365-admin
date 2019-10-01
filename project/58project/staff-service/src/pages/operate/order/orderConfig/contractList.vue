<template>
    <div class="worker">
        <contract-table-component
            :staffTable="order_contract"
            :controlScopeLength="100">
            <template slot="control" slot-scope="controler">
                <el-button size="mini" type="text" @click="goContractPage(controler.scoper.row)">查看</el-button>
            </template>
        </contract-table-component>
    </div>
</template>
<script>
import {saleService, $utils} from '../../../../../common'
import {
    contractTableComponent,
} from './contractList/index.js'

export default {
    components: {
        contractTableComponent,
    },
    computed:{
        /**
         * 合同数据
         */
        order_contract(){
            return this.$store.state.saleModule.order_contract
        }
    },
    methods: {
        /**
         * 进入合同详情页
         */
        goContractPage(paramObj){
            this.$router.push({
                path: `/operate/operateContractItem`,
                query: {
                    id: paramObj.id,
                    from: 1,
                    from_id: this.$route.query.order_id
                }
            })
        },
    },
}
</script>


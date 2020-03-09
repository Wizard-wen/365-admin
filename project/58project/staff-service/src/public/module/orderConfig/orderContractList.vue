<template>
    <card-box-component
        :title="'合同列表'">
        <template slot="contains">
            <contract-table-component
                :contractModuleType="'saleOrderConfig'"
                :tableData="order_contract"></contract-table-component>
        </template>
    </card-box-component>
</template>
<script>
import {saleService, $utils} from '@common/index.js'
import contractTableComponent from '@/public/module/contractList/contractTableComponent.vue'
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
         */
        // publicOrderType: {    
        //     type: Number | String,
        //     default: 1,
        // },
    },
}
</script>


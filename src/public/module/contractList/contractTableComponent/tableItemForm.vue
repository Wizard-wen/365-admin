<template>
    <div style="width: 1100px;">
        <detail-form-component>
            <detail-form-item-component
                :labelWidth="140" 
                :label="'签约经纪人'" 
                :size="2" :value="currentContract.sign_manager_name"></detail-form-item-component>
            <detail-form-item-component
                :labelWidth="140" 
                :label="'签约经纪门店'" 
                :size="2" :value="currentContract.sign_store_name"></detail-form-item-component>
            <detail-form-item-component
                :labelWidth="140" 
                :label="'签约客户'" 
                :size="2" :value="currentContract.sign_user_name"></detail-form-item-component>
            <detail-form-item-component
                :labelWidth="140" 
                :label="'签约客户电话'" 
                :size="2" :value="currentContract.sign_user_phone"></detail-form-item-component>
            <detail-form-item-component
                :labelWidth="140" 
                :label="'家政服务员'" 
                :size="2" :value="currentContract.sign_staff_name"></detail-form-item-component>
            <detail-form-item-component
                :labelWidth="140" 
                :label="'家政服务员编号'" 
                :size="2" :value="currentContract.sign_staff_code"></detail-form-item-component>
        </detail-form-component>
        <div>
            <show-contract-btn 
                :currentContract="currentContract" 
                :contractModuleType="contractModuleType"
                :currentPage="currentPage"></show-contract-btn>
        </div>
    </div>
</template>

<script>
import {
    operateService,
} from '@common/index.js'

import showContractBtn from '@/public/module/contractList/contractTableComponent/control/showContractBtn.vue'
export default {
    components: {
        showContractBtn,
    },
    props: {
        /**
         * 当前订单
         */
        currentContract: {
            type: Object,
            default: function(){return {}}
        },
        /**
         * 当前页
         */
        currentPage: {
            type: Number | String,
            default: 1,
        },
        contractModuleType: {
            type: String,
            default: 'operateContractList'
        }
    }
}
</script>

<style lang="scss" scoped>
.demo-table-expand {
    font-size: 0;
    width: 1000px;
}
.demo-table-expand label {
    width: 120px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}  
</style>
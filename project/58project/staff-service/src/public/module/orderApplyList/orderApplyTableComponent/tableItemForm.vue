<template>
    <div style="width: 1100px;">
        <detail-form-component>
            <detail-form-item-component
                v-if="currentOrderApply.apply_manager_name"
                :labelWidth="140" 
                :label="'来源门店'" 
                :size="3" 
                :value="currentOrderApply.apply_store_name"></detail-form-item-component>
            <detail-form-item-component
                v-if="currentOrderApply.apply_manager_name"
                :labelWidth="140" 
                :label="'来源人'" 
                :size="3" 
                :value="currentOrderApply.apply_manager_name">

            </detail-form-item-component>
            <detail-form-item-component
                v-if="currentOrderApply.apply_manager_name" :size="3"></detail-form-item-component>

            
            <detail-form-item-component
                v-if="currentOrderApply.created_manager_name"
                :labelWidth="140" 
                :label="'订单创建人'" 
                :size="3" :value="currentOrderApply.created_manager_name"></detail-form-item-component>
            <detail-form-item-component
                v-if="currentOrderApply.created_manager_name"
                :labelWidth="140" 
                :type="'template'"
                :label="'订单创建时间'" 
                :size="3" 
                :value="currentOrderApply.created_at">
                <p slot="template">{{currentOrderApply.created_at | formatDate}}</p>
            </detail-form-item-component>
            <detail-form-item-component
                v-if="currentOrderApply.created_manager_name" :size="3"></detail-form-item-component>



            <detail-form-item-component
                :labelWidth="140"
                :label="'客户姓名'" 
                :size="3" :value="currentOrderApply.user_name"></detail-form-item-component>
            <detail-form-item-component
                :labelWidth="140"
                :label="'客户联系电话'" 
                :size="3" :value="currentOrderApply.user_phone"></detail-form-item-component>
            
            
            <detail-form-item-component
                :labelWidth="140" 
                :type="'template'"
                v-if="orderApplyModuleType!='require'" 
                :label="'下单时间'" 
                :size="3" :value="currentOrderApply.created_at">
                <p slot="template">{{currentOrderApply.created_at | formatDate}}</p>
            </detail-form-item-component>
            <detail-form-item-component
                v-else :size="3"></detail-form-item-component>

            
        </detail-form-component>
        <div>
            <edit-order-apply-btn
                :orderApplyModuleType="orderApplyModuleType"
                :currentOrderApply="currentOrderApply"></edit-order-apply-btn>
            
            <pass-order-apply-btn
                @updateOrderApply="$emit('updateTable')"
                v-if="currentOrderApply.type == 1"
                :orderApplyModuleType="orderApplyModuleType"
                :currentOrderApply="currentOrderApply"></pass-order-apply-btn>
            <refuse-order-apply-btn
                @updateOrderApply="$emit('updateTable')"
                v-if="currentOrderApply.type == 1"
                :orderApplyModuleType="orderApplyModuleType"
                :currentOrderApply="currentOrderApply"></refuse-order-apply-btn>
        </div>
    </div>
</template>

<script>
import {
    $utils,
    operateService,
} from '@common/index.js'

import editOrderApplyBtn from '../control/editOrderApplyBtn.vue'
import passOrderApplyBtn from '@/public/module/orderApplyItem/control/passOrderApplyBtn.vue'
import refuseOrderApplyBtn from '@/public/module/orderApplyItem/control/refuseOrderApplyBtn.vue'


export default {
    components: {
        editOrderApplyBtn,
        passOrderApplyBtn,
        refuseOrderApplyBtn,
    },
    filters: {
        /**
         * 更改时间戳格式
         */
        formatDate(timestamp){
            return $utils.formatDate(new Date(timestamp), 'yyyy-MM-dd')
        }
    },
    computed: {
        /**
         * 当前用户信息
         */
        presentUser(){
            return this.$store.state.loginModule.user
        },
    },
    props: {
        /**
         * 当前订单
         */
        currentOrderApply: {
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
        /**
         * 字段配置
         */
        orderApplyConfigForm: {
            type: Object,
            default(){return {}}
        },
        //当前模块
        orderApplyModuleType: {
            type: String,
            default: 'operate'
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
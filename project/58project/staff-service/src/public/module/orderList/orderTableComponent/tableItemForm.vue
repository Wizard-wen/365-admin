<template>
    <div style="width: 1100px;">
        <detail-form-component>

            <detail-form-item-component
                :labelWidth="140" 
                :label="'订单经纪人'" 
                :size="3" 
                :value="currentOrder.agent_manager_name"></detail-form-item-component>
            <detail-form-item-component
                :labelWidth="140" 
                :label="'订单经纪门店'" 
                :size="3" 
                :value="currentOrder.agent_store_name"></detail-form-item-component>
            <detail-form-item-component :size="3"></detail-form-item-component>

            <detail-form-item-component
                :labelWidth="140" 
                :type="'template'"
                :label="'下单时间'" 
                :size="3" :value="currentOrder.order_at">
                <p slot="template">{{currentOrder.order_at | timeToDayFomatter}}</p>
            </detail-form-item-component>
            <detail-form-item-component :size="3"></detail-form-item-component>
            <detail-form-item-component :size="3"></detail-form-item-component>

            <detail-form-item-component
                :labelWidth="140" 
                :label="'订单创建人'" 
                :size="3" :value="currentOrder.created_manager_name"></detail-form-item-component>
            <detail-form-item-component
                :labelWidth="140"  
                :type="'template'"
                :label="'订单创建时间'" 
                :size="3" 
                :value="currentOrder.created_at">
                <p slot="template">{{currentOrder.created_at | timeToDayFomatter}}</p>
            </detail-form-item-component>
            <detail-form-item-component  :size="3"></detail-form-item-component>

            <!-- 来源门店、来源人 -->
            <detail-form-item-component
                :labelWidth="140"  
                :label="'来源门店'" 
                :size="3" 
                :value="currentOrder.apply_store_name"></detail-form-item-component>
            <detail-form-item-component
                :labelWidth="140" 
                :type="'template'"
                :label="'来源人'" 
                :size="3" 
                :value="currentOrder.apply_manager_name">
                <p slot="template">{{currentOrder.apply_manager_name?currentOrder.apply_manager_name : '门店'}}</p>
            </detail-form-item-component>
            <detail-form-item-component :size="3"></detail-form-item-component>

            <!-- 只有订单经纪人能看到 -->
            <detail-form-item-component
                :labelWidth="140"
                v-if="orderModuleType!='public'" 
                :label="'下单客户'" 
                :size="3" :value="currentOrder.order_user_name"></detail-form-item-component>
            <detail-form-item-component
                :labelWidth="140"
                v-if="orderModuleType!='public'" 
                :label="'下单客户电话'" 
                :size="3" :value="currentOrder.order_user_phone"></detail-form-item-component>
            <detail-form-item-component v-if="orderModuleType!='public'" :size="3"></detail-form-item-component>
            
            
            <!-- 签约后才显示 -->
            <detail-form-item-component
                :labelWidth="140"
                v-if="isSign" 
                :label="'签约客户'" 
                :size="3" :value="currentOrder.sign_user_name"></detail-form-item-component>
            <detail-form-item-component
                :labelWidth="140"
                v-if="isSign" 
                :label="'签约客户电话'" 
                :size="3" :value="currentOrder.sign_user_phone"></detail-form-item-component>
            <detail-form-item-component
                :labelWidth="140" 
                v-if="isSign" 
                :label="'签约客户余额'" 
                :size="3" :value="currentOrder.sign_user_account"></detail-form-item-component>
            <!-- 签约后才显示 -->
            <detail-form-item-component
                :labelWidth="140"
                v-if="isSign"
                :type="'template'" 
                :label="'签约服务开始时间'" 
                :size="3" :value="currentOrder.sign_service_start">
                <p slot="template">{{ currentOrder.sign_service_start | timeToDayFomatter}}</p>
            </detail-form-item-component>
            <detail-form-item-component
                :labelWidth="140"
                v-if="isSign" 
                :type="'template'" 
                :label="'签约服务截止时间'" 
                :size="3" :value="currentOrder.sign_service_end">
                <p slot="template">{{ currentOrder.sign_service_end | timeToDayFomatter}}</p>
            </detail-form-item-component>
            <detail-form-item-component 
                v-if="isSign"
                :size="3"></detail-form-item-component>
            
            <!-- 签约后才显示 -->
            <detail-form-item-component
                :labelWidth="140" 
                v-if="isSign" 
                :label="'签约服务人员'" 
                :size="3" :value="currentOrder.sign_staff_name"></detail-form-item-component>
            <detail-form-item-component
                :labelWidth="140" 
                v-if="isSign" 
                :label="'签约服务人员编号'" 
                :size="3" :value="currentOrder.sign_staff_code"></detail-form-item-component>
            <detail-form-item-component 
                v-if="isSign"
                :size="3"></detail-form-item-component>

        </detail-form-component>
        <div>
            <!-- 处理订单 -->
            <deal-order-btn 
                :orderModuleType="orderModuleType"
                :currentPage="currentPage"
                :currentOrder="currentOrder"></deal-order-btn>

            <!-- 门店分派订单 -->
            <sale-assign-order-btn
                v-if="presentUser.is_store_manager != 1 && orderModuleType == 'sale'"
                :orderModuleType="orderModuleType"
                :currentOrder="currentOrder"
                @refreshOrder="$emit('updateTable')"></sale-assign-order-btn>
            <!-- 运营分派订单 -->
            <operate-assign-order-btn
                v-if="orderModuleType == 'operate'"
                :orderModuleType="orderModuleType"
                :currentOrder="currentOrder"
                @refreshOrder="$emit('updateTable')"></operate-assign-order-btn>
        </div>
    </div>
</template>

<script>
import {
    operateService,
} from '@common/index.js'



import dealOrderBtn from '../control/dealOrderBtn.vue'

import {
    saleAssignOrderBtn,
    operateAssignOrderBtn,
} from '@/public/module/orderConfig/orderHeaderComponent/index.js'


export default {
    components: {
        operateAssignOrderBtn,
        dealOrderBtn,
        saleAssignOrderBtn,
    },
    computed: {
        /**
         * 当前用户信息
         */
        presentUser(){
            return this.$store.state.loginModule.user
        },
        /**
         * 是否签约
         */
        isSign(){
            return this.currentOrder.type == 2
        },
    },
    props: {
        /**
         * 当前订单
         */
        currentOrder: {
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
        orderConfigForm: {
            type: Object,
            default(){return {}}
        },
        //当前模块
        orderModuleType: {
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
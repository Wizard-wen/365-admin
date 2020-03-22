<template>
    <div class="orderApply" v-loading="is_loading">
        <order-apply-header-component
            :publicOrderType="1"
            :orderApplyModuleType="'apply'"
            :currentOrderApply="orderApplyItem"
            @updateOrderApply="getApplication"></order-apply-header-component>
        <div class="layout-content">
            <public-order-base-component
                :publicOrderType="1"
                :orderBaseDetail="orderApplyItem"
                @updatePublicOrderBase="getApplication"></public-order-base-component>
            <card-box-component
                :title="'订单申请来源'">
                <template slot="control">
                    <change-order-origin-btn
                        v-if="orderApplyItem.type == 1"
                        :currentOrderApply="orderApplyItem"
                        @refreshData="getApplication"></change-order-origin-btn>
                </template>
                <template slot="contains">
                    <detail-form-component>
                        <detail-form-item-component
                            :label="'来源门店'" :size="2"
                            :value="orderApplyItem.apply_store_name"></detail-form-item-component>
                        <detail-form-item-component
                            :label="'来源人'" :size="2"
                            :value="orderApplyItem.apply_manager_name"></detail-form-item-component>
                    </detail-form-component>
                </template>    
            </card-box-component>

            <order-apply-log :isEdit="false" :order_logs="applyLogTable"></order-apply-log>

        </div>
    </div>
</template>

<script>

import {operateOrderService} from '@/service/operateOrder.ts'

import orderApplyHeaderComponent from '@/public/module/orderApplyItem/orderApplyHeaderComponent.vue'
import {publicOrderBaseComponent} from '@/public/module/orderPublic/index.js'
import changeOrderOriginBtn from './orderApplyItem/control/changeOrderOriginBtn.vue'
import orderApplyLog from './orderApplyItem/orderApplyLog.vue'

export default {
    components: {
        publicOrderBaseComponent,
        orderApplyHeaderComponent,
        changeOrderOriginBtn,
        orderApplyLog,
    },
    data() {
        return {
            is_loading: false,
            //订单申请详情
            orderApplyItem: {
                id: '',
                version: '',

                user_phone: '',
                user_name: '',

                work_type: '',
                wage: '',
                service_address: '',
                service_duration: '',
                order_details: '',
                
                type: 1,
                apply_store_name: '',
                apply_store_id: '',

                created_manager_name: '',
                created_manager_id: '',
                created_at: '',

                apply_manager_name: '',
                apply_manager_id: ''
            },
            //订单申请日志列表
            applyLogTable: [],
        };
    },
    methods: {        
        /**
         * 获取订单申请信息
         */
        async getApplication() {
            try{
                this.is_loading = true
                await operateOrderService.getApplication(this.$route.query.id).then(data => {
                    if (data.code == "0") {
                        this.orderApplyItem = data.data.application;
                        //订单申请日志列表
                        this.applyLogTable = data.data.applyLog;

                        this.is_loading = false
                    }
                })
                .catch(error => {
                    this.$message({
                        type: "error",
                        message: error.message
                    });
                    this.is_loading = false
                });
            } catch(error){
                this.$message({
                    type: "error",
                    message: error.message
                });
                this.is_loading = false
            }
            
        },
    },
    mounted() {
        this.getApplication();
    }
};
</script>

<style lang="scss" scoped>

.orderApply {
	background: #f0f2f5;
	min-height: calc(100vh - 50px);
	width: 100%;
	.layout-content{
		padding: 24px;
	}
}

</style>

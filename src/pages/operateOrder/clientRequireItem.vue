<template>
    <div class="orderApply" v-loading="is_loading">
        <order-apply-header-component
            :orderApplyModuleType="'require'"
            :currentOrderApply="clientRequireItem"
            @updateOrderApply="getClientRequire"></order-apply-header-component>
        <div class="layout-content">
            <public-order-base-component
                :publicOrderType="2"
                :orderBaseDetail="clientRequireItem"
                @updatePublicOrderBase="getClientRequire"></public-order-base-component>
            <order-apply-log :isEdit="false" :order_logs="requireLogTable"></order-apply-log>
        </div>
    </div>
</template>

<script>
import {operateOrderService} from '@/service/operateOrder.ts'

import orderApplyHeaderComponent from '@/public/module/orderApplyItem/orderApplyHeaderComponent.vue'
import {publicOrderBaseComponent} from '@/public/module/orderPublic/index.js'
import orderApplyLog from './orderApplyItem/orderApplyLog.vue'
export default {
    components: {
        publicOrderBaseComponent,
        orderApplyHeaderComponent,
        orderApplyLog,
    },
    data() {
        return {
            is_loading: false,
            //客户需求详情
            clientRequireItem: {
                id: 0,//
                require_code: '',//需求编号

                version: 0,//
                type: '',
                created_at: 0,//

                work_type: '',
                wage: '',
                service_duration: '',
                order_details: '',
                service_address: '',

                user_phone: '',
                user_name: '',
            },
            requireLogTable:[],
        };
    },
    methods: {
        /**
         * 获取订单申请
         */
        async getClientRequire() {
            try{
                this.is_loading = true
                await operateOrderService.getClientRequire(this.$route.query.id).then(data => {
                    if (data.code == "0") {
                        this.clientRequireItem = data.data.require;
                        this.requireLogTable = data.data.requireLog;
                        this.is_loading = true
                    }
                }).catch(error => {
                    this.$message({
                        type: "error",
                        message: error.message
                    });
                    this.is_loading = false
                }).finally(() =>{
                    this.is_loading = false
                })
            } catch(error){
                this.$message({
                    type: "error",
                    message: error.message
                });
                this.is_loading = false
            }
        },
    },
    async mounted() {
        await this.getClientRequire();
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

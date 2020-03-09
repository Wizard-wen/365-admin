<template>
    <div class="orderApply" v-loading="is_loading">
        <order-apply-header-component
            :publicOrderType="2"
            :currentOrderApply="clientRequireDetailItem"
            @updateOrderApply="getApplication"></order-apply-header-component>
        <div class="layout-content">
            <public-order-base-component
                :publicOrderType="2"
                :orderBaseDetail="clientRequireDetailItem"
                @updatePublicOrderBase="getApplication"></public-order-base-component>
        </div>
    </div>
</template>

<script>
import { operateService, $utils } from "@common/index.js";


import {
    orderApplyHeaderComponent,
} from '@/public/module/orderApplyItem/index.js'

import {
    publicOrderBaseComponent,
} from '@/public/module/orderPublic/index.js'
export default {
    components: {
        publicOrderBaseComponent,
        orderApplyHeaderComponent,
    },
    data() {
        return {
            is_loading: false,
            //客户需求详情
            clientRequireDetailItem: {
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
        };
    },
    methods: {
        /**
         * 获取订单申请
         */
        async getApplication() {
            try{
                this.is_loading = true
                await operateService.getRequire(this.$route.query.id).then(data => {
                    if (data.code == "0") {
                        this.clientRequireDetailItem = data.data;
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
        await this.getApplication();
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

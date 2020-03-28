<template>
    <div class="orderApply-header">
        <div class="orderApply-name">
            <h4>申请编号：{{orderApplyModuleType == 'apply'? currentOrderApply.apply_code: currentOrderApply.require_code}}</h4>
        </div>
        <div class="btn-group">
            <!-- 返回 -->
            <back-order-apply-list-btn></back-order-apply-list-btn>
            <!-- 通过订单申请 -->
            <pass-order-apply-btn
                v-if="currentOrderApply.type == 1"
                :orderApplyModuleType="orderApplyModuleType"
                :currentOrderApply="currentOrderApply"
                @updateOrderApply="$emit('updateOrderApply')"></pass-order-apply-btn>
            <!-- 拒绝订单申请 -->
            <refuse-order-apply-btn
                v-if="currentOrderApply.type == 1"
                :orderApplyModuleType="orderApplyModuleType"
                :currentOrderApply="currentOrderApply"
                @updateOrderApply="$emit('updateOrderApply')"></refuse-order-apply-btn>
        </div>
        <div class="orderApply-detail">
            <div class="detail-left">
                <div class="detail-left-box">
                    <div 
                        class="detail-left-line" 
                        v-if="orderApplyModuleType == 'apply'">申请创建人：{{ currentOrderApply.created_manager_name }}</div>
                    <div class="detail-left-line">申请创建时间：{{ currentOrderApply.created_at | timeToDayFomatter }}</div>
                    <div 
                        class="detail-left-line" 
                        v-if="orderApplyModuleType == 'apply'">来源门店：{{currentOrderApply.apply_store_name }}</div>
                    <div 
                        class="detail-left-line" 
                        v-if="orderApplyModuleType == 'apply'">来源人：{{currentOrderApply.apply_manager_name}}</div>
                </div>
            </div>
            <div class="detail-right">
                <div class="right-box">
                    <div class="title">状态</div>
                    <div 
                        v-if="orderApplyTypeStyle"
                        class="value"
                        :style="{color: orderApplyTypeStyle.color}">{{orderApplyTypeStyle.name}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    operateService,
} from '@common/index.js'
import {
    publicAssignOrderComponent,
} from '@/public/module/orderPublic/index.js'

import backOrderApplyListBtn from './control/backOrderApplyListBtn.vue'
import passOrderApplyBtn from './control/passOrderApplyBtn.vue'
import refuseOrderApplyBtn from './control/refuseOrderApplyBtn.vue'




import {order_apply_typeList} from '@/public/module/orderApplyItem/IorderApplyItem.ts'
import {orderCurrentPage}from '@/public/module/orderConfig/IorderItem.ts'
export default {
    components: {
        publicAssignOrderComponent,
        
        backOrderApplyListBtn,
        passOrderApplyBtn,
        refuseOrderApplyBtn,

    },
    props: {
        /**
         * 订单申请详情
         */
        currentOrderApply: {
            type: Object,
            default: function(){return {}}
        },
        /**
         * 订单申请类型
         */
        // : {    
        //     type: Number | String,
        //     default: 1,
        // },
        orderApplyModuleType: {
            type: String,
            default: 'apply'
        }
    },
    computed: {
        /**
         * 订单申请状态
         */
        orderApplyTypeStyle(){
            return order_apply_typeList.find(item => item.id == this.currentOrderApply.type)
        },
    },
}
</script>

<style lang="scss" scoped>
    .orderApply-header{
		background: #fff;
		padding: 30px 24px 24px 24px;
		position: relative;
		.orderApply-name{
			line-height: 28px;
			font-size: 20px;
			font-weight: 700;
		}
		.btn-group{
			& /deep/ .el-button{
				margin-left: 0px;
			}
			position: absolute;
			right: 24px;
			top: 20px;
		}
		.orderApply-detail{
			padding-top: 12px;
			display: flex;
			.detail-left{
				flex:1;
				.detail-left-box{
					display: flex;
					flex-wrap: wrap;
					.detail-left-line{
						width: 50%;
						color: rgba(0,0,0,.65);
    					line-height: 20px;
						padding-bottom: 8px;
					}
				}
			}
			.detail-right{
				min-width: 400px;
				display: flex;
				.right-box{
					height: 80px;
					width: 50%;
					.title{
						color: rgba(0,0,0,.45);
						font-size: 14px;
						line-height: 1.5;
					}
					.value{
						font-size: 20px;
						color: rgba(0,0,0,.85);
						line-height: 1.5;
					}
				}
			}
		}
	}
</style>
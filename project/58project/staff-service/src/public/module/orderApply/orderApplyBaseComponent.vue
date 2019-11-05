<template>
    <card-box-component
        :title="'订单申请基本信息'">
        <template slot="contains">
            <div class="detail-show-module">
                <div class="detail-item-box line-two-list">
                    <div class="detail-item">
                        <p class="detail-title">客户姓名： </p>
                        <p class="detail-type-text">{{orderApplyDetail.user_name}}</p>
                        <p  
                            v-if="orderApplyDetail.type == 1"
                            @click="openChangeOrderApplyFieldDialog('user_name','客户姓名')" class="change">
                            <i class="el-icon-edit" style="font-size: 16px;"></i>
                        </p>
                    </div>
                </div>
                <div class="detail-item-box line-two-list">
                    <div class="detail-item">
                        <p class="detail-title">电话： </p>
                        <p class="detail-type-text">{{orderApplyDetail.user_phone}}</p>
                        <p  
                            v-if="orderApplyDetail.type == 1"
                            @click="openChangeOrderApplyFieldDialog('user_phone','电话')" class="change">
                            <i class="el-icon-edit" style="font-size: 16px;"></i>
                        </p>
                    </div>
                </div>
                <div class="detail-item-box line-list">
                    <div class="detail-item">
                        <p class="detail-title">工种： </p>
                        <p class="detail-type-text">{{orderApplyDetail.work_type}}</p>
                        <p  
                            v-if="orderApplyDetail.type == 1"
                            @click="openChangeOrderApplyFieldDialog('work_type','工种')" class="change">
                            <i class="el-icon-edit" style="font-size: 16px;"></i>
                        </p>
                    </div>
                </div>
                <div class="detail-item-box line-list">
                    <div class="detail-item">
                        <p class="detail-title">工作时间： </p>
                        <p class="detail-type-text">{{orderApplyDetail.service_duration}}</p>
                        <p  
                            v-if="orderApplyDetail.type == 1"
                            @click="openChangeOrderApplyFieldDialog('service_duration','工作时间')" class="change">
                            <i class="el-icon-edit" style="font-size: 16px;"></i>
                        </p>
                    </div>
                </div>
                <div class="detail-item-box line-list">
                    <div class="detail-item">
                        <p class="detail-title">工资： </p>
                        <p class="detail-type-text">{{orderApplyDetail.wage}}</p>
                        <p  
                            v-if="orderApplyDetail.type == 1"
                            @click="openChangeOrderApplyFieldDialog('wage','工资')" class="change">
                            <i class="el-icon-edit" style="font-size: 16px;"></i>
                        </p>
                    </div>
                </div>
                <div class="detail-item-box line-list">
                    <div class="detail-item">
                        <p class="detail-title">服务地址： </p>
                        <p class="detail-type-text">{{orderApplyDetail.service_address}}</p>
                        <p  
                            v-if="orderApplyDetail.type == 1"
                            @click="openChangeOrderApplyFieldDialog('service_address','服务地址')" class="change">
                            <i class="el-icon-edit" style="font-size: 16px;"></i>
                        </p>
                    </div>
                </div>
                <div class="detail-item-box line-list">
                    <div class="detail-item">
                        <p class="detail-title">订单详情： </p>
                        <p class="detail-type-text">{{orderApplyDetail.order_details}}</p>
                        <p  
                            v-if="orderApplyDetail.type == 1"
                            @click="openChangeOrderApplyFieldDialog('order_details','订单详情')" class="change">
                            <i class="el-icon-edit" style="font-size: 16px;"></i>
                        </p>
                    </div>
                </div>
            </div>
        </template>
        <template>
            <change-order-apply-field-dialog
                v-if="changeOrderApplyFieldDialogVisible"
                :orderApplyItemObject="orderApplyDetail"
                :orderApplyType="orderApplyType"
                :changeOrderApplyField="changeOrderApplyField"
                @closeChangeOrderApplyFieldDialog="closeChangeOrderApplyFieldDialog"
                :changeOrderApplyFieldDialogVisible="changeOrderApplyFieldDialogVisible"></change-order-apply-field-dialog>
        </template>
    </card-box-component>
</template>

<script>
import {
    changeOrderApplyFieldDialog ,
}from '@/pages/operate/order/public/apply/orderApplyBaseComponent/index.js'
export default {
    components: {
        changeOrderApplyFieldDialog,
    },
    data(){
        return {
            //更改订单申请字段组件显示隐藏
            changeOrderApplyFieldDialogVisible: false,
            //订单申请字段更改
            changeOrderApplyField: {
                field: '',
                fieldName: '',
                value: '',
            },
        }
    },
    props: {
        /**
         * 订单申请对象
         */
        orderApplyDetail: {
            type: Object,
            default: function(){return {}}
        },
        /**
         * 订单申请类型
         * 1 门店订单申请 2 客户订单申请 
         */
        orderApplyType: {    
            type: Number | String,
            default: 1,
        },
    },
    methods: {
        /**
         * 打开更改订单申请字段弹窗
         * @param filed 字段
         * @param filedName 字段名
         */
        openChangeOrderApplyFieldDialog(field,fileName){
            this.changeOrderApplyField.field = field;
            this.changeOrderApplyField.fieldName = fileName;
            this.changeOrderApplyField.value = this.orderApplyDetail[field]
            this.changeOrderApplyFieldDialogVisible = true
        },
        /**
         * 关闭更改字段弹窗
         */
        async closeChangeOrderApplyFieldDialog(){
            this.changeOrderApplyFieldDialogVisible = false
            this.$emit('updateOrderApply')
        },
    }
}
</script>

<style lang="scss" scoped>
.detail-show-module{
    width: 100%;
    display: flex;
    flex-wrap:  wrap;
    justify-content: space-between;
    .detail-item-box {
        .detail-item{
            width: 100%;
            display: flex;
            justify-content: flex-start;
            margin-bottom: 16px;
            .detail-title{
                width: 120px;
                text-align: right;
                line-height: 30px;
                margin-right: 20px;
                color: rgba(0,0,0,.85);
            }
            .detail-picture-box{
                display: flex;
                .contract-picture{
                    margin: 0 15px 15px 0;
                    width: 210px;
                    height: 297px;
                    & img{
                        width: 210px;
                        height: 297px;
                    }
                }
            }
            .detail-type-text{
                line-height: 30px;
                color: rgba(0,0,0,.85);
            }
            .detail-photo-list{
                display: flex;
                flex-wrap: wrap;
                .icon-box{
                    height: 150px;
                    margin-right: 20px;
                    .icon-style{
                        height: 150px;
                    }
                }
            }
        }
    }
    .line-three-list{
        width: 33%;
    }
    .line-two-list{
        width: 50%;
    }
    .line-list{
        width: 100%;
    }
}
</style>
<template>
    <card-box-component
        :title="title">
        <template slot="control">
            <el-button 
                type="primary" size="mini" 
                v-if="publicOrderType != 1 && publicOrderType != 2"
                @click="makeOrderImage">生成图片</el-button>
        </template>
        <template slot="contains">
            <div class="detail-show-module">
                <div class="detail-item-box line-two-list" v-if="publicOrderType != 4">
                    <div class="detail-item">
                        <p class="detail-title">客户姓名： </p>
                        <p class="detail-type-text">{{orderBaseDetail[user_nameKey]}}</p>
                        <p  
                            v-if="isChangeImageShow"
                            @click="openChangeOrderBaseFieldDialog(user_nameKey,'客户姓名')" class="change">
                            <i class="el-icon-edit" style="font-size: 16px;"></i>
                        </p>
                    </div>
                </div>
                <div class="detail-item-box line-two-list" v-if="publicOrderType != 4">
                    <div class="detail-item">
                        <p class="detail-title">电话： </p>
                        <p class="detail-type-text">{{orderBaseDetail[user_phoneKey]}}</p>
                        <p  
                            v-if="isChangeImageShow"
                            @click="openChangeOrderBaseFieldDialog(user_phoneKey,'客户电话')" class="change">
                            <i class="el-icon-edit" style="font-size: 16px;"></i>
                        </p>
                    </div>
                </div>
                <div class="detail-item-box line-list">
                    <div class="detail-item">
                        <p class="detail-title">工种： </p>
                        <p class="detail-type-text">{{orderBaseDetail.work_type}}</p>
                        <p  
                            v-if="isChangeImageShow"
                            @click="openChangeOrderBaseFieldDialog('work_type','工种')" class="change">
                            <i class="el-icon-edit" style="font-size: 16px;"></i>
                        </p>
                    </div>
                </div>
                <div class="detail-item-box line-list">
                    <div class="detail-item">
                        <p class="detail-title">工作时间： </p>
                        <p class="detail-type-text">{{orderBaseDetail.service_duration}}</p>
                        <p  
                            v-if="isChangeImageShow"
                            @click="openChangeOrderBaseFieldDialog('service_duration','工作时间')" class="change">
                            <i class="el-icon-edit" style="font-size: 16px;"></i>
                        </p>
                    </div>
                </div>
                <div class="detail-item-box line-list">
                    <div class="detail-item">
                        <p class="detail-title">工资： </p>
                        <p class="detail-type-text">{{orderBaseDetail.wage}}</p>
                        <p  
                            v-if="isChangeImageShow"
                            @click="openChangeOrderBaseFieldDialog('wage','工资')" class="change">
                            <i class="el-icon-edit" style="font-size: 16px;"></i>
                        </p>
                    </div>
                </div>
                <div class="detail-item-box line-list">
                    <div class="detail-item">
                        <p class="detail-title">服务地址： </p>
                        <p class="detail-type-text">{{orderBaseDetail.service_address}}</p>
                        <p  
                            v-if="isChangeImageShow"
                            @click="openChangeOrderBaseFieldDialog('service_address','服务地址')" class="change">
                            <i class="el-icon-edit" style="font-size: 16px;"></i>
                        </p>
                    </div>
                </div>
                <div class="detail-item-box line-list">
                    <div class="detail-item">
                        <p class="detail-title">订单详情： </p>
                        <p class="detail-type-text">{{orderBaseDetail.order_details}}</p>
                        <p  
                            v-if="isChangeImageShow"
                            @click="openChangeOrderBaseFieldDialog('order_details','订单详情')" class="change">
                            <i class="el-icon-edit" style="font-size: 16px;"></i>
                        </p>
                    </div>
                </div>
            </div>
        </template>
        <!-- 生成订单名片组件 -->
        <template>
            <make-image-component
                :height="500"
                :width="460"
                :makeImageDialogVisible="makeImageDialogVisible"
                v-if="makeImageDialogVisible"
                @closeMakeImageDialog="makeImageDialogVisible = false">
                <template slot="pictureContains">
                    <order-picture-component
                        :pictureForm="orderBaseDetail"></order-picture-component>
                </template>
            </make-image-component>
        </template>
        <template>
            <change-order-base-field-dialog
                v-if="changeOrderBaseFieldDialogVisible"
                :orderItemObject="orderBaseDetail"
                :publicOrderType="publicOrderType"
                :changeOrderBaseField="changeOrderBaseField"
                @closeChangeOrderFieldDialog="closeChangeOrderFieldDialog"
                :changeOrderBaseFieldDialogVisible="changeOrderBaseFieldDialogVisible"></change-order-base-field-dialog>
        </template>
    </card-box-component>
</template>

<script>
import {
    changeOrderBaseFieldDialog ,
    orderPictureComponent,
}from './publicOrderBaseComponent/index.js'
export default {
    components: {
        changeOrderBaseFieldDialog,
        orderPictureComponent,
    },
    data(){
        return {
            //生成订单图片组件
            makeImageDialogVisible: false,
            //更改订单申请字段组件显示隐藏
            changeOrderBaseFieldDialogVisible: false,
            //订单申请字段更改
            changeOrderBaseField: {
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
        orderBaseDetail: {
            type: Object,
            default: function(){return {}}
        },
        /**
         * 订单类型
         * 1 门店订单申请 2 客户订单申请 3 门店订单 4 门店公海订单 5 运营订单
         */
        publicOrderType: {    
            type: Number | String,
            default: 1,
        },
    },
    computed: {
        /**
         * 标题
         */
        title(){
            if(this.publicOrderType == 1){
                return '门店订单申请基本信息'
            }else if(this.publicOrderType == 2){
                return '客户需求申请基本信息'
            } else {
                return '订单基本信息'
            }
        },
        /**
         * 是否展示修改按钮
         */
        isChangeImageShow(){
            // debugger
            if(this.publicOrderType == 1 || this.publicOrderType == 2){
                return this.orderBaseDetail.type == 1 
            } else if(this.publicOrderType == 3) {
                return this.orderBaseDetail.type == 1 || this.orderBaseDetail.type ==3
            } else {
                return false
            }
        },
        /**
         * 客户姓名键名
         */
        user_nameKey(){
            if(this.publicOrderType == 1 || this.publicOrderType == 2){
                return 'user_name'
            } else {
                return 'order_user_name'
            }
        },
        /**
         * 客户电话键名
         */
        user_phoneKey(){
            if(this.publicOrderType == 1 || this.publicOrderType == 2){
                return 'user_phone'
            } else {
                return 'order_user_phone'
            }
        },
    },
    methods: {
        /**
         * 打开更改订单申请字段弹窗
         * @param filed 字段
         * @param filedName 字段名
         */
        openChangeOrderBaseFieldDialog(field,fileName){
            this.changeOrderBaseField.field = field;
            this.changeOrderBaseField.fieldName = fileName;
            this.changeOrderBaseField.value = this.orderBaseDetail[field]
            this.changeOrderBaseFieldDialogVisible = true
        },
        /**
         * 关闭更改字段弹窗
         */
        async closeChangeOrderFieldDialog(){
            this.changeOrderBaseFieldDialogVisible = false
            this.$emit('updatePublicOrderBase')
        },
        /**
         * 生成订单图片
         */
        makeOrderImage(){   
            this.makeImageDialogVisible = true
        },
    }
}
</script>

<style lang="scss" scoped>

</style>
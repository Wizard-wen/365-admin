<template>
    <card-box-component
        :title="'订单基本信息'">
        <template slot="control">
            <el-button type="primary" size="mini" @click="makeOrderImage">生成订单图片</el-button>
        </template>
        <template slot="contains">
            <div class="detail-show-module">
                <div class="detail-item-box line-two-list">
                    <div class="detail-item">
                        <p class="detail-title">客户姓名： </p>
                        <p class="detail-type-text">{{orderBase.order_user_name}}</p>
                        <p  
                            v-if="isChangeImageShow"
                            @click="openChangeOrderDialog('order_user_name','客户姓名')" class="change">
                            <img src="./images/change.svg" alt="">
                        </p>
                    </div>
                </div>
                <div class="detail-item-box line-two-list">
                    <div class="detail-item">
                        <p class="detail-title">电话： </p>
                        <p class="detail-type-text">{{orderBase.order_user_phone}}</p>
                        <p  
                            v-if="isChangeImageShow"
                            @click="openChangeOrderDialog('order_user_phone','电话')" class="change">
                            <img src="./images/change.svg" alt="">
                        </p>
                    </div>
                </div>
                <div class="detail-item-box line-list">
                    <div class="detail-item">
                        <p class="detail-title">工种： </p>
                        <p class="detail-type-text">{{orderBase.work_type}}</p>
                        <p  
                            v-if="isChangeImageShow"
                            @click="openChangeOrderDialog('work_type','工种')" class="change">
                            <img src="./images/change.svg" alt="">
                        </p>
                    </div>
                </div>
                <div class="detail-item-box line-list">
                    <div class="detail-item">
                        <p class="detail-title">工作时间： </p>
                        <p class="detail-type-text">{{orderBase.service_duration}}</p>
                        <p  
                            v-if="isChangeImageShow"
                            @click="openChangeOrderDialog('service_duration','工作时间')" class="change">
                            <img src="./images/change.svg" alt="">
                        </p>
                    </div>
                </div>
                <div class="detail-item-box line-list">
                    <div class="detail-item">
                        <p class="detail-title">工资： </p>
                        <p class="detail-type-text">{{orderBase.wage}}</p>
                        <p  
                            v-if="isChangeImageShow"
                            @click="openChangeOrderDialog('wage','工资')" class="change">
                            <img src="./images/change.svg" alt="">
                        </p>
                    </div>
                </div>
                <div class="detail-item-box line-list">
                    <div class="detail-item">
                        <p class="detail-title">服务地址： </p>
                        <p class="detail-type-text">{{orderBase.service_address}}</p>
                        <p  
                            v-if="isChangeImageShow"
                            @click="openChangeOrderDialog('service_address','服务地址')" class="change">
                            <img src="./images/change.svg" alt="">
                        </p>
                    </div>
                </div>
                <div class="detail-item-box line-list">
                    <div class="detail-item">
                        <p class="detail-title">订单详情： </p>
                        <p class="detail-type-text">{{orderBase.order_details}}</p>
                        <p  
                            v-if="isChangeImageShow"
                            @click="openChangeOrderDialog('order_details','订单详情')" class="change">
                            <img src="./images/change.svg" alt="">
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
                        :pictureForm="orderBase"></order-picture-component>
                </template>
            </make-image-component>
        </template>
        <template>
            <change-order-dialog
                v-if="orderFieldVisible"
                :orderId="orderBase.id"
                :changeOrderField="changeOrderField"
                @closeChangeDialog="closeChangeDialog"
                :orderFieldVisible="orderFieldVisible"></change-order-dialog>
        </template>
    </card-box-component>
</template>

<script>
import {
    changeOrderDialog,
    orderPictureComponent
} from './orderBaseComponent/index.js'
export default {
    components: {
        changeOrderDialog,
        orderPictureComponent,
    },
    props: {
        /**
         * 订单基本信息应用场景
         */
        type: {
            default: 'normal',
            type: String,
        }
    },
    data(){
        return {
            //订单字段更改弹窗显示隐藏
            orderFieldVisible: false,
            //订单字段更改
            changeOrderField: {
                field: '',
                fieldName: '',
                value: '',
            },
            //生成订单图片组件
            makeImageDialogVisible: false,
        }
    },
    computed: {
        /**
         * 订单基本信息
         */
        orderBase(){
            return this.$store.state.saleModule.order
        },
        /**
         * 是否展示修改按钮
         */
        isChangeImageShow(){
            return (this.orderBase.type == 1 || this.orderBase.type == 3) && (this.type == 'normal')
        }
    },
    methods: {
        /**
         * 更改订单字段弹窗
         * @param filed 字段
         * @param filedName 字段名
         */
        openChangeOrderDialog(field,fileName){
            this.changeOrderField.field = field;
            this.changeOrderField.fieldName = fileName;
            this.changeOrderField.value = this.orderBase[field]
            this.orderFieldVisible = true
        },
        /**
         * 关闭更改订单字段弹窗
         */
        closeChangeDialog(){
            this.orderFieldVisible = false
            this.$emit('updateOrderConfig')
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
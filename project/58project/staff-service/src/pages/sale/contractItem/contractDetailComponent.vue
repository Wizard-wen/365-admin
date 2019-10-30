<template>
    <card-box-component
        :title="'合同详情'">
        <template slot="contains">
            <div class="detail-show-module">
                <div class="detail-item-box line-three-list">
                    <div class="detail-item">
                        <p class="detail-title">护理依赖程度： </p>
                            <select-tag-component 
                            v-if="contractBase.service_level"
                            :isEdit="false" 
                            :propTagList="order_service_level" 
                            v-model="contractBase.service_level" 
                            :isSingle="true"></select-tag-component>
                        <p class="detail-type-text" v-else>-</p>
                    </div>
                </div>
                <div class="detail-item-box line-three-list">
                    <div class="detail-item">
                        <p class="detail-title">服务内容： </p>
                        <select-tag-component 
                            v-if="contractBase.service_contains"
                            :isEdit="false" 
                            :propTagList="order_service_contains" 
                            v-model="contractBase.service_contains" 
                            :isSingle="true"></select-tag-component>
                        <p class="detail-type-text" v-else>-</p>
                    </div>
                </div>
                <div class="detail-item-box line-three-list">
                    <div class="detail-item">
                        <p class="detail-title">服务方式： </p>
                        <select-tag-component 
                            v-if="contractBase.service_level"
                            :isEdit="false" 
                            :propTagList="order_service_type" 
                            v-model="contractBase.service_level" 
                            :isSingle="true"></select-tag-component>
                        <p class="detail-type-text" v-else>-</p>
                    </div>
                </div>
                <div class="detail-item-box line-three-list">
                    <div class="detail-item">
                        <p class="detail-title">服务人数： </p>
                        <p class="detail-type-text">{{contractBase.service_count}}</p>
                    </div>
                </div>
                <div class="detail-item-box line-three-list">
                    <div class="detail-item">
                        <p class="detail-title">服务期限： </p>
                        <p class="detail-type-text">{{contractBase.service_start | timeFomatter}} - {{contractBase.service_end | timeFomatter}}</p>
                    </div>
                </div>
                <div class="detail-item-box line-three-list"></div>
                <div class="detail-item-box line-list">
                    <div class="detail-item">
                        <p class="detail-title">工作时间： </p>
                        <p class="detail-type-text">{{contractBase.service_time}}</p>
                    </div>
                </div>
                <div class="detail-item-box line-three-list">
                    <div class="detail-item">
                        <p class="detail-title">劳务报酬： </p>
                        <p class="detail-type-text">{{contractBase.staff_wage}}元</p>
                    </div>
                </div>
                <div class="detail-item-box line-three-list">
                    <div class="detail-item">
                        <p class="detail-title">客户服务费： </p>
                        <p class="detail-type-text">{{contractBase.user_charge}}元</p>
                    </div>
                </div>
                <div class="detail-item-box line-three-list">
                    <div class="detail-item">
                        <p class="detail-title">客户缴纳： </p>
                        <p class="detail-type-text">{{contractBase.user_pay}}元</p>
                    </div>
                </div>
                <div class="detail-item-box line-three-list">
                    <div class="detail-item">
                        <p class="detail-title">劳动者服务费： </p>
                        <p class="detail-type-text">-</p>
                    </div>
                </div>
                <div class="detail-item-box line-three-list">
                    <div class="detail-item">
                        <p class="detail-title">劳动者押金： </p>
                        <p class="detail-type-text">{{contractBase.staff_deposit}}元</p>
                    </div>
                </div>
                <div class="detail-item-box line-three-list"></div>
                <div class="detail-item-box line-three-list">
                    <div class="detail-item">
                        <p class="detail-title">保险受益人： </p>
                        <p class="detail-type-text">{{contractBase.insurance_benefit}}</p>
                    </div>
                </div>
                <div class="detail-item-box line-three-list">
                    <div class="detail-item">
                        <p class="detail-title">保险期限： </p>
                        <p class="detail-type-text">{{contractBase.insurance_start | timeFomatter}} - {{contractBase.insurance_end | timeFomatter}}</p>
                    </div>
                </div>
                <div class="detail-item-box line-three-list"></div>
                <div class="detail-item-box line-list">
                    <div class="detail-item">
                        <p class="detail-title">合同备注： </p>
                        <p class="detail-type-text">{{contractBase.remarks}}</p>
                    </div>
                </div>
                <div class="detail-item-box line-list">
                    <div class="detail-item">
                        <p class="detail-title">合同照片： </p>
                        <div class="detail-photo-list">
                            <photo-component
                                :pictureUrlArrtibute="'url'"
                                v-model="contractBase.accessory"
                                :height="'297px'"
                                :width="'210px'"
                                :isEdit="false"></photo-component>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </card-box-component>
</template>

<script>
import {$utils} from '../../../../common'
import {
    photoComponent
} from '../../operate/worker/workerItem/index.js'
export default {
    components: {
        photoComponent,
    },
    filters: {
        timeFomatter(value){
            if(value == 0){
                return '-'
            }
            return $utils.formatDate(new Date(value), 'yyyy-MM-dd')
        },
    },
    computed:{
        /**
         * 当前用户信息
         */
        presentUser(){
            
            return this.$store.state.loginModule.user
        },
        //订单服务内容
        order_service_contains(){
            return this.$store.state.saleModule.order_service_contains
        },
        //订单护理依赖程度
        order_service_level(){
            return this.$store.state.saleModule.order_service_level
        },
        //订单服务方式
        order_service_type(){
            return this.$store.state.saleModule.order_service_type
        },
    },
    props: {
        /**
         * 合同基本信息
         */
        contractBase: {
            type: Object,
            default: function(){return {}}
        }
    },
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
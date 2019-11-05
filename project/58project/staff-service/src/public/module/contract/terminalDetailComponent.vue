<template>
    <card-box-component
        :title="'订单终止信息'">
        <template slot="contains">
            <div class="detail-show-module">
                
                <div class="detail-item-box line-list">
                    <div class="detail-item">
                        <p class="detail-title">终止事由：</p>
                        <p class="detail-type-text">{{contractBase.account.terminate_reason}}</p>
                    </div>
                </div>

                <div class="detail-item-box line-list">
                    <div class="detail-item">
                        <p class="detail-title">终止时间：</p>
                        <p class="detail-type-text">{{contractBase.account.created_at | timeFomatter}}</p>
                    </div>
                </div>
                <div class="detail-item-box line-list">
                    <div class="detail-item">
                        <p class="detail-title">服务期限：</p>
                        <p class="detail-type-text">
                            {{contractBase.account.service_start | timeFomatter}} —— 
                            {{contractBase.account.service_end | timeFomatter}}
                        </p>
                    </div>
                </div>
                <div class="detail-item-box line-three-list">
                    <div class="detail-item">
                        <p class="detail-title">工作天数：</p>
                        <p class="detail-type-text">{{contractBase.account.service_days}}天</p>
                    </div>
                </div>
                <div class="detail-item-box line-three-list">
                    <div class="detail-item">
                        <p class="detail-title">日工资：</p>
                        <p class="detail-type-text">{{contractBase.account.daily_wage}}元</p>
                    </div>
                </div>
                <div class="detail-item-box line-three-list">
                    <div class="detail-item">
                        <p class="detail-title">首月工资合计：</p>
                        <p class="detail-type-text">{{contractBase.account.total_wage}}元</p>
                    </div>
                </div>
                <div class="detail-item-box line-three-list">
                    <div class="detail-item">
                        <p class="detail-title">服务费扣除：</p>
                        <p class="detail-type-text">{{contractBase.account.service_cost}}元</p>
                    </div>
                </div>
                <div class="detail-item-box line-three-list">
                    <div class="detail-item">
                        <p class="detail-title">其他扣除：</p>
                        <p class="detail-type-text">{{contractBase.account.other_cost}}元</p>
                    </div>
                </div>
                <div class="detail-item-box line-three-list"></div>
                <div class="detail-item-box line-list">
                    <div class="detail-item">
                        <p class="detail-title">扣除事由：</p>
                        <p class="detail-type-text">{{contractBase.account.cost_reason}}</p>
                    </div>
                </div>
                <div class="detail-item-box line-three-list">
                    <div class="detail-item">
                        <p class="detail-title">实发工资：</p>
                        <p class="detail-type-text">{{contractBase.account.real_wage}}元</p>
                    </div>
                </div>
                <div class="detail-item-box line-three-list">
                    <div class="detail-item">
                        <p class="detail-title">返还客户金额：</p>
                        <p class="detail-type-text">{{contractBase.account.return_wage}}元</p>
                    </div>
                </div>
                <div class="detail-item-box line-three-list"></div>
            </div>
        </template>
    </card-box-component>
</template>

<script>
import {$utils} from '@common/index.js'
export default {
    filters: {
        timeFomatter(value){
            if(value == 0){
                return '-'
            }
            return $utils.formatDate(new Date(value), 'yyyy-MM-dd')
        },
    },
    props: {
        /**
         * 合同基本信息
         */
        contractBase: {
            type: Object,
            default: function(){return {
                account: {}
            }}
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
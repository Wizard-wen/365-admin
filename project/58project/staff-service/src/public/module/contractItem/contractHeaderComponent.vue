<template>
<div class="order-header">
    <div class="order-name">
        <h4>合同编号：{{contractBase.contract_number}}</h4>
    </div>
    <div class="btn-group">
        <contract-back-btn></contract-back-btn>
        <terminate-contract-btn 
            @updateContract="$emit('updateContract')"
            v-if="contractType == 2 && contractBase.type != 3"
            :currentContract="contractBase"></terminate-contract-btn>
        <settle-wage-btn 
            @updateContract="$emit('updateContract')"
            v-if="contractType == 2 && contractBase.is_wage == 1 && contractBase.type == 2"
            :currentContract="contractBase"></settle-wage-btn>
    </div>
    <div class="order-detail">
        <div class="detail-left">
            <div class="detail-left-box">
                <div class="detail-left-line">合同流水号：{{contractBase.contract_code}}</div>
                <div class="detail-left-line">签约时间：{{contractBase.sign_at | timeFomatter}}</div>
                <div class="detail-left-line">签约经纪人：{{ contractBase.sign_manager_name }}</div>
                <div class="detail-left-line">签约经纪门店：{{ contractBase.sign_store_name }}</div>
            </div>
        </div>
        <div class="detail-right">
            <div class="right-box" v-if="contractTypeStyle">
                <div class="title">合同状态</div>
                <div class="value" :style="{color: contractTypeStyle.color}">{{ contractTypeStyle.name}}</div>
            </div>
            <div class="right-box" v-if="contractIsSettleStyle && contractBase.type != 3">
                <div class="title">是否发放首月工资</div>
                <div class="value" :style="{color: contractIsSettleStyle.color}">{{ contractIsSettleStyle.name}}</div>
            </div>
        </div>
    </div>
</div>
</template>

<script>

import contractBackBtn from './contractHeaderComponent/control/contractBackBtn.vue'
import terminateContractBtn from './contractHeaderComponent/control/terminateContractBtn.vue'
import settleWageBtn from './contractHeaderComponent/control/settleWageBtn.vue'

import {
    contract_typeList
} from '@/public/module/contractList/IcontractList.ts'
import {is_wageList} from '@/public/module/contractItem/IcontractItem.ts'
import {
    $utils,
} from '@common/index.js'
export default {
    components: {
        settleWageBtn,
        contractBackBtn,
        terminateContractBtn,
    },
    props: {
        /**
         * 合同基本信息
         */
        contractBase: {
            type: Object,
            default: function(){return {}}
        },
        /**
         * 合同来源
         * 1 运营 2 门店
         */
        contractType: {
            type: Number | String,
            default: 1
        },
        currentPage: {
            type: Number,
            default: 1,
        }
    },
    filters: {
        timeFomatter(value){
            if(value == 0){
                return '-'
            }
            return $utils.formatDate(new Date(value), 'yyyy-MM-dd hh:mm:ss')
        },
    },
    computed:{
        //合同状态
        contractTypeStyle(){
            return contract_typeList.find(item => item.id == this.contractBase.type)
        },
        //结算状态
        contractIsSettleStyle(){
            return is_wageList.find(item => item.id == this.contractBase.is_wage)
        }
    },
}
</script>

<style lang="scss" scoped>
.order-header{
    background: #fff;
    padding: 30px 24px 24px 24px;
    position: relative;
    .order-name{
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
    .order-detail{
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
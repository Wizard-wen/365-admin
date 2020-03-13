<template>
    <card-box-component
        :title="'合同终止信息'">
        <template slot="contains">
            <detail-form-component>
                <detail-form-item-component
                    :label="'终止事由'"
                    :size="1"
                    :value="contractBase.account.terminate_reason"></detail-form-item-component>
                <detail-form-item-component
                    :type="'template'"
                    :label="'终止时间'"
                    :size="3"
                    :value="contractBase.stop_at">
                    <p slot="template">{{contractBase.stop_at | timeFomatter}}</p>
                </detail-form-item-component>
                <detail-form-item-component
                    :type="'template'"
                    :label="'服务期限'"
                    :size="23"
                    :value="contractBase.account.service_start">
                    <p slot="template">
                        {{contractBase.account.service_start | timeFomatter}} —— 
                        {{contractBase.account.service_end | timeFomatter}}
                    </p>
                </detail-form-item-component>
                <detail-form-item-component
                    :label="'工作天数'"
                    :size="3"
                    :value="contractBase.account.service_days"></detail-form-item-component>
                <detail-form-item-component
                    :label="'日工资'"
                    :size="3"
                    :value="contractBase.account.daily_wage"></detail-form-item-component>
                <detail-form-item-component
                    :label="'首月工资合计'"
                    :size="3"
                    :value="contractBase.account.total_wage"></detail-form-item-component>
                <detail-form-item-component
                    :label="'服务费扣除'"
                    :size="2"
                    :value="contractBase.account.service_cost"></detail-form-item-component>
                <detail-form-item-component
                    :label="'其他扣除'"
                    :size="2"
                    :value="contractBase.account.other_cost"></detail-form-item-component>
                <detail-form-item-component
                    :label="'扣除事由'"
                    :size="2"
                    :value="contractBase.account.cost_reason"></detail-form-item-component>
                <detail-form-item-component
                    :label="'实发工资'"
                    :size="1"
                    :value="contractBase.account.real_wage"></detail-form-item-component>
                <detail-form-item-component
                    :label="'返还客户金额'"
                    :size="1"
                    :value="contractBase.account.return_wage"></detail-form-item-component>
            </detail-form-component>
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

</style>
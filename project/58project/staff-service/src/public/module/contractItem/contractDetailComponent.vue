<template>
    <card-box-component
        :title="'合同详情'">
        <template slot="contains">
            <detail-form-component>
                <detail-form-item-component
                    :type="'template'"
                    :label="'护理依赖程度'"
                    :size="3"
                    :value="contractBase.service_level">
                    <select-tag-component 
                        slot="template"
                        v-if="contractBase.service_level"
                        :isEdit="false" 
                        :propTagList="order_service_level" 
                        v-model="contractBase.service_level" 
                        :isSingle="true"></select-tag-component>
                </detail-form-item-component>

                <detail-form-item-component
                    :type="'template'"
                    :label="'服务内容'"
                    :size="3"
                    :value="contractBase.service_level">
                    <select-tag-component 
                        slot="template"
                        v-if="contractBase.service_contains"
                        :isEdit="false" 
                        :propTagList="order_service_contains" 
                        v-model="contractBase.service_contains" 
                        :isSingle="true"></select-tag-component>
                </detail-form-item-component>

                <detail-form-item-component
                    :type="'template'"
                    :label="'服务方式'"
                    :size="3"
                    :value="contractBase.service_level">
                    <select-tag-component 
                        slot="template"
                        v-if="contractBase.service_level"
                        :isEdit="false" 
                        :propTagList="order_service_type" 
                        v-model="contractBase.service_level" 
                        :isSingle="true"></select-tag-component>
                </detail-form-item-component>
                <detail-form-item-component
                    :label="'服务人数'"
                    :size="3"
                    :value="`${contractBase.service_count}人`"></detail-form-item-component>
                
                <detail-form-item-component 
                    :type="'template'"
                    :label="'所属行业'"
                    :size="3"
                    :value="contractBase.work_type">
                    <table-tag-component 
                        slot="template"
                        :propList="workerConfigForm.skill" 
                        v-if="workerConfigForm.skill" 
                        :tableOriginData="contractBase.work_type"></table-tag-component>
                </detail-form-item-component>
                <detail-form-item-component :size="3"></detail-form-item-component>
                <detail-form-item-component
                    :type="'template'"
                    :label="'服务期限'"
                    :size="1"
                    :value="contractBase.service_start">
                    <p slot="template">
                        {{contractBase.service_start | timeToDayFomatter}} - {{contractBase.service_end | timeToDayFomatter}}
                    </p>
                </detail-form-item-component>
                <detail-form-item-component
                    :label="'工作时间'"
                    :size="1"
                    :value="contractBase.service_time"></detail-form-item-component>
                <detail-form-item-component
                    :label="'劳务报酬'"
                    :size="3"
                    :value="`${contractBase.staff_wage}元`"></detail-form-item-component>
                <detail-form-item-component
                    :label="'客户服务费'"
                    :size="3"
                    :value="`${contractBase.user_charge}元`"></detail-form-item-component>
                <detail-form-item-component
                    :label="'客户缴纳'"
                    :size="3"
                    :value="`${contractBase.user_pay}元`"></detail-form-item-component>
                <detail-form-item-component
                    :label="'劳动者服务费'"
                    :size="3"
                    :value="`${contractBase.staff_charge}元`"></detail-form-item-component>
                <detail-form-item-component
                    :label="'劳动者押金'"
                    :size="3"
                    :value="`${contractBase.staff_deposit}元`"></detail-form-item-component>
                <detail-form-item-component :size="3"></detail-form-item-component>
                <detail-form-item-component
                    :label="'保险受益人'"
                    :size="3"
                    :value="contractBase.insurance_benefit"></detail-form-item-component>
                <detail-form-item-component :size="3"></detail-form-item-component>
                <detail-form-item-component :size="3"></detail-form-item-component>
                <detail-form-item-component
                    :type="'template'"
                    :label="'保险期限'"
                    :size="1"
                    :value="contractBase.insurance_start">
                    <p slot="template">
                        {{contractBase.insurance_start | timeToDayFomatter}} - {{contractBase.insurance_end | timeToDayFomatter}}
                    </p>
                </detail-form-item-component>
                <detail-form-item-component :size="3"></detail-form-item-component>
                <detail-form-item-component
                    :label="'服务地址'"
                    :size="1"
                    :value="contractBase.service_address"></detail-form-item-component> 
                <detail-form-item-component
                    :label="'合同备注'"
                    :size="1"
                    :value="contractBase.remarks"></detail-form-item-component>
                <detail-form-item-component
                    :type="'template'"
                    :label="'合同照片'"
                    :size="1"
                    :value="contractBase.accessory">
                    <multiple-picture-upload
                        slot="template"
                        v-model="contractBase.accessory"
                        :title="'合同附件'"
                        :height="210"
                        :width="197"
                        :isEdit="false"></multiple-picture-upload>
                </detail-form-item-component>
            </detail-form-component>
        </template>
    </card-box-component>
</template>

<script>
import {
    sign_service_typeList,// 服务方式列表
    sign_service_containsList,//服务内容
    sign_service_levelList,// 护理依赖程度
} from '@/pages/sale/saleSignPage/IsaleSignItem.ts'

export default {
    data(){
        return {
            order_service_type: sign_service_typeList,// 服务方式列表
            order_service_contains: sign_service_containsList,//服务内容
            order_service_level: sign_service_levelList,// 护理依赖程度
        }
    },
    computed:{
        /**
         * 当前用户信息
         */
        presentUser(){
            return this.$store.state.loginModule.user
        },
    },
    props: {
        /**
         * 合同基本信息
         */
        contractBase: {
            type: Object,
            default: function(){return {}}
        },
        workerConfigForm: {
            type: Object,
            default: function(){return {}}
        }
    },
}
</script>

<style lang="scss" scoped>

</style>
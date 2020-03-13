<template>
    <card-box-component
        :title="'签约服务人员信息'">
        <template slot="contains">
            <detail-form-component>
                <detail-form-item-component
                    :label="'编号'"
                    :size="2"
                    :value="signedServiceDetailObject.sign_staff_code"></detail-form-item-component>
                <detail-form-item-component
                    :label="'身份证号'"
                    :size="2"
                    :value="signedServiceDetailObject.sign_staff_identify"></detail-form-item-component>
                <detail-form-item-component
                    :label="'姓名'"
                    :size="2"
                    :value="signedServiceDetailObject.sign_staff_name"></detail-form-item-component>
                <detail-form-item-component
                    :label="'电话'"
                    :size="2"
                    :value="signedServiceDetailObject.sign_staff_phone"></detail-form-item-component>
                <detail-form-item-component
                    :label="'户籍地址'"
                    :size="2"
                    :value="signedServiceDetailObject.sign_staff_law_address"></detail-form-item-component>
                <detail-form-item-component
                    :label="'现住址'"
                    :size="2"
                    :value="signedServiceDetailObject.sign_staff_cur_address"></detail-form-item-component>
                <detail-form-item-component
                    :label="'紧急联系人'"
                    :size="2"
                    :value="signedServiceDetailObject.sign_staff_urgent"></detail-form-item-component>
            </detail-form-component>
        </template>
    </card-box-component>
</template>

<script>
export default {
    props: {
        /**
         * 合同基本信息
         */
        signedServiceDetailObject: {
            type: Object,
            default: function(){return {}}
        }
    },
}
</script>

<style lang="scss" scoped>

</style>
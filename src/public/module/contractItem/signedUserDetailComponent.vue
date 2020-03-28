<template>
    <card-box-component
        :title="'签约客户信息'">
        <template slot="contains">
            <detail-form-component>
                <detail-form-item-component
                    :label="'姓名'"
                    :size="2"
                    :value="signedUserDetailObject.sign_user_name"></detail-form-item-component>
                <detail-form-item-component
                    :label="'电话'"
                    :size="2"
                    :value="signedUserDetailObject.sign_user_phone"></detail-form-item-component>
                <detail-form-item-component
                    :label="'身份证号'"
                    :size="2"
                    :value="signedUserDetailObject.sign_user_identify"></detail-form-item-component>
                <detail-form-item-component :size="2"></detail-form-item-component>
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
        signedUserDetailObject: {
            type: Object,
            default: function(){return {}}
        }
    },
}
</script>

<style lang="scss" scoped>

</style>
<template>
    <detail-form-component>
        <detail-form-item-component
            :type="'template'"
            :label="'头像'"
            :size="1"
            :value="staffForm">
            <icon-component
                slot="template"
                :iconUrl="staffForm.icon"
                :height="60"
                :width="60"
                :displayType="'circle'"></icon-component>
        </detail-form-item-component>
        <detail-form-item-component :label="'真实姓名'" :size="1" :value="staffForm.real_name"></detail-form-item-component>
        <detail-form-item-component :label="'用户名'" :size="1" :value="staffForm.manager_name"></detail-form-item-component>
        <detail-form-item-component :label="'工号'" :size="1" :value="staffForm.manager_code"></detail-form-item-component>
        <detail-form-item-component :label="'手机号'" :size="1" :value="staffForm.phone"></detail-form-item-component>
        <detail-form-item-component :label="'微信号'" :size="1" :value="staffForm.wechat"></detail-form-item-component>
        <detail-form-item-component :label="'邮箱'" :size="1" :value="staffForm.email"></detail-form-item-component>
    </detail-form-component>
</template>

<script>
import { mapState } from 'vuex'

export default {
    props: {
        /**
         * 员工信息表单
         */
        staffForm: {
            type: Object,
            default: function(){return {}}
        }
    },
    computed: {
        ...mapState({
            presentUser: state =>state.loginModule.user,
        })
    },
}
</script>

<style>

</style>
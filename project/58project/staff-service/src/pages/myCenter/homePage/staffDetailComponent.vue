<template>
    <detail-form-component>
        <detail-form-item-component
            :label="'头像'"
            :size="1"
            :value="staffForm">
            <icon-component
                slot="define"
                :iconUrl="staffForm.icon"
                :height="60"
                :width="60"
                :displayType="'circle'"></icon-component>
        </detail-form-item-component>
        <detail-form-item-component
            :label="'真实姓名'"
            :size="1"
            :value="staffForm.real_name"></detail-form-item-component>
        <detail-form-item-component
            :label="'用户名'"
            :size="1"
            :value="staffForm.manager_name"></detail-form-item-component>
        <detail-form-item-component
            :label="'工号'"
            :size="1"
            :value="staffForm.manager_code"></detail-form-item-component>
        <detail-form-item-component
            :label="'手机号'"
            :size="1"
            :value="staffForm.phone"></detail-form-item-component>
        <detail-form-item-component
            :label="'微信号'"
            :size="1"
            :value="staffForm.wechat"></detail-form-item-component>
            <detail-form-item-component
            :label="'邮箱'"
            :size="1"
            :value="staffForm.email"></detail-form-item-component>
    </detail-form-component>
</template>

<script>
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
        /**
         * 当前用户信息
         */
        presentUser(){
            return this.$store.state.loginModule.user
        },
        /**
         * 部门信息
         */
        departmentList(){
            return this.$store.state.authModule.departmentList
        }
    },
}
</script>

<style>

</style>
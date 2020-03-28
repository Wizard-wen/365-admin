<template>
    <el-button type="primary" size="mini" @click="goSignOrderPage">续约</el-button>
</template>

<script>
export default {
    props: {
        currentOrder: {
            type: Object,
            default(){return {}}
        }
    },
    methods: {
        /**
         * 续约跳转至签约页面
         */
        goSignOrderPage(){
            this.$router.push({
                path: `/sale/saleSignPage`,
                query: {
                    order_id: this.currentOrder.id,
                    type: this.currentOrder.type,//订单状态
                    sign_staff_id: this.currentOrder.sign_staff_id ,
                    sign_staff_name: this.currentOrder.sign_staff_name,
                    sign_user_name: this.currentOrder.sign_user_name,
                    sign_user_id: this.currentOrder.sign_user_id,
                    sign_user_identify: this.currentOrder.sign_user_identify,
                }
            })
        },
    }
}
</script>

<style>

</style>
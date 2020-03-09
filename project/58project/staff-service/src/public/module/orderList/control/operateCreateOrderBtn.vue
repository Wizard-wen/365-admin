<template>
    <el-button type="primary" @click="goCreateOrderPage">创建订单</el-button>
</template>

<script>
export default {
    methods: {
        goCreateOrderPage(){
            this.$router.push({
                path: '/operate/operateCreateOrderPage'
            })
        },
    }
}
</script>

<style>

</style>
<template>
    <el-button size="mini" type="primary" @click="dealOrder">{{orderModuleType == 'client'? '查看订单': '处理订单'}}</el-button>
</template>

<script>
export default {
    props: {
        currentOrder: {
            type: Object,
            default(){
                return {}
            }
        },
        currentPage: {
            type: Number | String,
            default: 1
        },
        orderModuleType: {
            type: String,
            default: 'operate'
        }
    },
    methods: {
        setOrderType(){
            if(this.orderModuleType == 'sale'){
                return {id: 2, path: '/sale/saleOrderConfig',}
            } else if(this.orderModuleType == 'public'){
                return {id: 3, path: '/sale/salePublicOrderConfig',}
            } else if(this.orderModuleType == 'operate'){
                return {id: 1, path: '/operate/operateOrderConfig',}
            } else if(this.orderModuleType == 'client'){
                return {id: 4, path: '/operate/operateOrderConfig',}
            }
        },
        /**
         * 处理订单
         */
        dealOrder(){
            this.$router.push({
                path: this.setOrderType().path,
                query: {
                    order_id: this.currentOrder.id,
                    // order_type: this.setOrderType().id,//3代表来源于公海订单
                    module: this.orderModuleType,
                    currentPage: this.currentPage,
                }
            })
        },
    }
}
</script>

<style>

</style>
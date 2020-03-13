<template>
    <el-button size="mini" type="primary" @click="editOrderApply">{{buttonText}}</el-button>
</template>

<script>
export default {
    props: {
        currentOrderApply: {
            type: Object,
            default(){return {}}
        },
        orderApplyModuleType: {
            type: String,
            default: 'apply',
        }
    },
    computed: {
        buttonText(){
            return this.currentOrderApply.type == 1 ? '编辑': '查看'
        }
    },
    methods: {
        /**
         * 编辑订单申请
         */
        editOrderApply(){
            this.$router.push({
                path: this.orderApplyModuleType == 'apply'? 
                "/operate/operateOrderApplyItem":
                "/operate/clientRequireItem",
                query: {
                    from: this.orderApplyModuleType,
                    id: this.currentOrderApply.id
                }
            })
        },
    }
}
</script>

<style>

</style>
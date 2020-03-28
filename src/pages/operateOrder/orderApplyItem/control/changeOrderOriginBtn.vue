<template>
    <div>
        <el-button size="mini" type="primary" @click="openChangeOrderOriginDialog">修改</el-button>
        <change-order-origin-dialog
            v-if="orderOriginVisible"
            :orderApplyId="currentOrderApply.id"
            :changeOrderOriginField="changeOrderOriginField"
            @closeChangeOriginDialog="closeChangeOriginDialog"
            :orderOriginVisible="orderOriginVisible"></change-order-origin-dialog>
    </div>
    
</template>

<script>
import changeOrderOriginDialog from './changeOrderOriginBtn/changeOrderOriginDialog.vue'
export default {
    components: {
        changeOrderOriginDialog,
    },
    data(){
        return {
            //订单申请来源显示隐藏
            orderOriginVisible: false,
            //订单申请来源
            changeOrderOriginField: {
                apply_manager_id: '',
                apply_store_id: '',
            },
        }
    },
    props: {
        currentOrderApply: {
            type: Object,
            default(){return {}}
        }
    },
    methods: {
        /**
         * 打开更改订单申请来源弹窗
         * @param apply_store_id 来源门店id
         * @param apply_manager_id 来源人id
         */
        openChangeOrderOriginDialog(){
            this.changeOrderOriginField.apply_store_id = this.currentOrderApply.apply_store_id;
            this.changeOrderOriginField.apply_manager_id = this.currentOrderApply.apply_manager_id;
            this.orderOriginVisible = true
        },  
        /**
         * 关闭更改订单申请来源弹窗
         */
        async closeChangeOriginDialog(){
            this.orderOriginVisible = false
            this.$emit('refreshData')
        },
    }
}
</script>

<style>

</style>
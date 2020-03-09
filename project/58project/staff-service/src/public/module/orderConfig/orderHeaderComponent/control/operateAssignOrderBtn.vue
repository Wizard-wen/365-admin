<template>
    <div style="display: inline-block">
        <el-button size="mini" type="primary" @click="openAssignOrderDialog">分派订单</el-button>
        <!-- 运营订单分派 -->
        <public-assign-order-component
            v-if="publicAssignOrderDialogVisible"
            :orderItemObject="currentOrder"
            :publicAssignOrderDialogVisible="publicAssignOrderDialogVisible"
            @closePublicAssignOrderDialog="closePublicAssignOrderDialog"
            @updatePublicAssignOrder="updatePublicAssignOrder"
            :publicOrderType="5"></public-assign-order-component>
    </div>
    
</template>

<script>

import {
    publicAssignOrderComponent,
} from '@/public/module/orderPublic/index.js'
import {
    saleService,
} from '@common/index.js'
export default {
    components: {
        publicAssignOrderComponent,
    },
    props: {
        currentOrder: {
            type: Object,
            default(){return {}}
        },

    },
    data(){
        return {
            publicAssignOrderDialogVisible: false,
        }
    },
    methods: {
        /**
         * 打开分派订单弹窗
         */
        openAssignOrderDialog(paramObj){
            this.publicAssignOrderDialogVisible = true
        },
        async updatePublicAssignOrder(param){
            let assignOrderObject = {
                ...param[0],
                order_id: param[1].id,
            }
            await this.assignOrder(assignOrderObject)
            await this.closePublicAssignOrderDialog()
        },
        /**
         * 关闭分派订单弹窗
         */
        closePublicAssignOrderDialog(){
            this.publicAssignOrderDialogVisible = false
            this.$emit('refreshOrder')
        },
        /**
         * 分派订单接口
         */
        async assignOrder(assignOrderObject){
            try{
                this.is_loading = true
                await saleService.assignOrder(assignOrderObject).then(data =>{
                    if(data.code == '0'){
                        this.$message({
                            type:"success",
                            message: data.message
                        })
                        this.is_loading = false
                    }
                }).catch(error =>{
                    this.$message({
                        type:'error',
                        message: error.message
                    })
                    this.is_loading = false
                })
            } catch(error){
                this.$message({
                    type:'error',
                    message: error.message
                })
                this.is_loading = false
            }
        }
    }
}
</script>

<style>

</style>
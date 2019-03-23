<template>
    <div class="order-box">
        <!-- 未签约 -->
        <div class="order-edit" v-if="isSigned < 3">
            <div class="order-message-box" :style="{width: isSearch? 'calc(50% - 8px)' : '100%'}" >
                <div class="order-in-box">
                    <base-component></base-component>
                    <service-list-component></service-list-component>
                    <log-component></log-component>
                </div>
                
                <div class="order-pull" @click="pullSearch" :style="{right: isSearch? '-16px':'0px'}">
                    <i class="el-icon-arrow-left pull-icon"></i>
                </div>
            </div>

            <match-box-component v-if="isSearch" :style="{width: isSearch? 'calc(50% - 8px)' : 0}"></match-box-component>
        </div>

        <!-- 已签约 -->
        <div class="order-edit" v-if="isSigned >= 3">
            <div class="order-message-box">
                <div class="order-in-box">
                    <base-component></base-component>
                    <log-component></log-component>
                    <div class="control" v-if="isSigned==3">
                        <el-button type="primary" @click="showCancelPage">取消订单</el-button>
                        <el-button type="primary" @click="showCompletePage">订单完成</el-button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- 取消订单 -->
        <el-dialog title="取消订单" :visible.sync="cancelDialogVisible">
            <el-form :model="cancelForm">
                <el-form-item label="取消原因" :label-width="formLabelWidth">
                    <el-input v-model="cancelForm.message" type="textarea"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="cancelOrder">确定</el-button>
            </div>
        </el-dialog>

        <!-- 完成订单 -->
        <el-dialog title="完成订单" :visible.sync="completeDialogVisible">
            <el-form :model="completeForm">
                <el-form-item label="日志" :label-width="formLabelWidth">
                    <el-input v-model="completeForm.message" type="textarea"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="completeDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="completeOrder">确定</el-button>
            </div>
        </el-dialog>
    </div>

</template>
<script>
import base from './components/base.vue'

import logComponent from './components/logComponent.vue'
import serviceList from './components/serviceList.vue'
import matchBox from './components/matchBox.vue'

import {orderService} from '../../../common'
export default {
    data(){
        return {
            isSearch: true, 
            cancelDialogVisible: false, 
            completeDialogVisible: false,
            //取消订单表单
            cancelForm : {
                order_id: this.$route.query.order_id,// 订单id
                message: '',//售后日志
            },
            //完成订单表单
            completeForm : {
                order_id: this.$route.query.order_id,// 订单id
                message: '',//售后日志
            },
            formLabelWidth: '120px'
        }
    },
    methods:{   
        pullSearch(){
            let state = this.isSearch
            this.isSearch = Boolean(!state);
        },
        /**
         * 打开取消订单对话框
         */
        showCancelPage(){
            this.cancelForm = {
                ...this.cancelForm,
                message: "",
            }
            this.cancelDialogVisible = true
        },
        /**
         * 打开完成订单对话框
         */
        showCompletePage(){
            this.completeForm = {
                ...this.completeForm,
                message: "",
            }
            this.completeDialogVisible = true
        },
        /**
         * 取消订单
         */
        async cancelOrder(){  
            store.commit('setLoading',true)

            await orderService.cancelOrder(this.cancelForm) 
                .then(data =>{
                    if(data.code == "0"){
                        this.$message({
                            type:'success',
                            message: data.message
                        })
                        this.$router.push('/sale/orderList')
                    }
                })
                .catch(e =>{
                    this.$message({
                        type:'error',
                        message: e.message
                    })
                })
            
            this.cancelDialogVisible = false         
            store.commit('setLoading',false)



        }, 
        /**
         * 完成订单
         */
        async completeOrder(){
            store.commit('setLoading',true)

            await orderService.completeOrder(this.completeForm) 
                .then(data =>{
                    if(data.code == "0"){
                        this.$message({
                            type:'success',
                            message: data.message
                        })
                        this.$router.push('/sale/orderList')
                    }
                })
                .catch(e =>{
                    this.$message({
                        type:'error',
                        message: e.message
                    })
                })
            
            this.completeDialogVisible = false         
            store.commit('setLoading',false)
        },
    },
    computed:{
        /**
         * 该订单是否已经签约
         * des 根据vuex 中orderModule.order.type判断
         *  1 待匹配 2 已匹配 3 已签约 4 已取消 5 订单完成
         */
        isSigned(){
            return store.state.orderModule.order.type
        }
    },
    components:{
        baseComponent: base,
        serviceListComponent: serviceList,
        matchBoxComponent: matchBox,
        logComponent,
    },
    async mounted(){
        store.commit('setLoading',true)
        try{
            await orderService.getOrder(this.$route.query.order_id)
        }catch(e){
            this.$message({
                type:'error',
                message: e.message
            })
        }
        
        store.commit('setLoading',false)
    }
}
</script>
<style lang="scss" scoped>
    .line-bottom-1px{
        &:after{
            content: '';
            display: block;
            height: 1px;
            width: 100%;
            background: #ccc; 
        }
    }
    .order-box{
        height: calc(100vh - 50px);
        width: calc(100vw - 180px);
        // width: 100%;
        overflow-y: hidden;
        .order-edit{
            background: #eaedf1;
            height:100%;
            width:100%;
            display: flex;
            justify-content: space-between;
            .order-message-box{
                height:calc(100vh - 50px);
                width: 100%;
                position: relative;
                // background: #fff;
                .order-in-box{
                    height: 100%;
                    width: 100%;
                    overflow-y: scroll;
                }
                .order-pull{
                    position: absolute;
                    right: 0px;
                    top:calc(50% - 60px);
                    height: 100px;
                    line-height: 100px;
                    width: 16px;
                    text-align: center;
                    background: #409EFF;
                    border-top-left-radius: 6px;
                    border-bottom-left-radius: 6px;
                    cursor: pointer;
                    .pull-icon{
                        color: #fff;
                        font-size: 14px;
                    }
                }
                
            }

            
        }
    }


</style>

<template>
    <card-box-component
        :title="'备选服务人员'">
        <el-table 
            slot="contains"
            :data="order_staff" 
            class="person-table" 
            height="500"
            :header-cell-style="{height: '40px',background: '#fafafa'}">
            <el-table-column label="工号" prop="staff_code" align="center"></el-table-column>

            <el-table-column label="姓名" prop="staff_name" align="center"></el-table-column>

            <el-table-column label="电话" prop="staff_phone" align="center"></el-table-column>

            <el-table-column label="匹配状态" prop="type" align="center">
                <template slot-scope="scope">
                    <table-tag-component 
                        :propList="orderMatchedWorkerList" 
                        :tableOriginData="scope.row.type"></table-tag-component>
                </template>
            </el-table-column>

            <el-table-column label="添加人" prop="created_manager_name" align="center"></el-table-column>

            <el-table-column label="操作" align="center" width="300">
                <template slot-scope="scope">
                    <el-button 
                        type="success" size="mini"
                        v-if="scope.row.type != 3 && publicOrderType == 3" 
                        @click="goSignOrder(2,scope.row)">签约</el-button>
                    <!-- 拒绝服务人员 -->
                    <refuse-matched-worker-btn
                        v-if=" scope.row.type != 3 && publicOrderType == 3"
                        @updateOrderConfig="$emit('updateOrderConfig')"
                        :currentWorker="scope.row"
                        :currentOrder="orderBase"></refuse-matched-worker-btn>
                    <!-- 查看服务人员详情 -->
                    <go-worker-show-item-btn :workerListType="goWorkerShowType" :currentWorker="scope.row"></go-worker-show-item-btn>
                    <!-- 只有添加人才能删除 -->
                    <delete-matched-worker-btn
                        v-if="presentUser.id == scope.row.created_manager_id"
                        @updateOrderConfig="$emit('updateOrderConfig')"
                        :currentWorker="scope.row"
                        :currentOrder="orderBase"></delete-matched-worker-btn>
                </template>
            </el-table-column>
        </el-table>
    </card-box-component>
</template>

<script>

import {publicModuleService} from '@/service/publicModule.ts'

import {orderMatchedWorkerList} from '@/public/module/orderConfig/IorderItem.ts'

import refuseMatchedWorkerBtn from './orderMatchedWorkerListComponent/refuseMatchedWorkerBtn.vue'
import deleteMatchedWorkerBtn from './orderMatchedWorkerListComponent/deleteMatchedWorkerBtn.vue'
import goWorkerShowItemBtn from '@/public/module/workerList/control/goWorkerShowItemBtn.vue'

export default {
    components: {
        refuseMatchedWorkerBtn,
        deleteMatchedWorkerBtn,
        goWorkerShowItemBtn,
    },
    data(){
        return {
            //已匹配劳动者签约状态
            orderMatchedWorkerList,
        }
    },
    props: {
        /**
         * 订单基本信息
         */
        orderBase: {
            type: Object,
            default: function(){return {}}
        },
        /**
         * 订单类型
         */
        publicOrderType: {    
            type: Number | String,
            default: 1,
        },
        /**
         * 备选服务人员列表
         */
        order_staff: {
            type: Array,
            default: function(){return []}
        },
    },
    computed: {
        /**
         * 当前用户信息
         */
        presentUser(){
            return this.$store.state.loginModule.user
        },
        goWorkerShowType(){
            return this.publicOrderType == 5? 'operatePublicMatch' : 'publicMatch'
        }
    },
    methods: {
        /**
         * 跳转至签约页面
         * @param type 是签约还是续约 1 续约 2 首次签约
         * @param paramObj 匹配服务人员信息对象
         */
        async goSignOrder(type, paramObj){
            try{
                await publicModuleService.getWorker(paramObj.staff_id).then(data =>{
                    let workerItem = data.data
                    if( workerItem.name && 
                        workerItem.phone && 
                        workerItem.identify && 
                        workerItem.address && 
                        workerItem.urgent_phone){
                    } else {
                        this.$message({
                            type: 'warning',
                            message: `该备选服务人员基本信息不全，请联系运营完善信息！`
                        })
                        return
                    }

                    if( this.orderBase.order_user_name && 
                        this.orderBase.order_user_phone && 
                        this.orderBase.work_type){ 
                    } else {
                        this.$message({
                            type: 'warning',
                            message: `订单信息不完善！`
                        })
                        return
                    }
                    this.$alert(`<p>签约前请确定<Strong style="color:#E6A23C;">客户姓名、电话、工种</Strong>正确，</p>
                        <p>并仔细核实<Strong style="color:#E6A23C;">待服务人员信息</Strong>。</p>
                        <p>如有不符，请联系运营中心更改后再签约！</p>
                        <p><Strong style="color:#E6A23C;">按下按钮代表<span style="text-decoration:underline">您已经仔细核实相关信息，并对此负责。</span></Strong></p>`, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        dangerouslyUseHTMLString: true,
                        type: 'warning'
                    }).then(async () =>{
                        this.$router.push({
                            path: `/sale/saleSignPage`,
                            query: {
                                order_id: this.orderBase.id,
                                type: this.orderBase.type,//订单状态\
                                work_type: this.orderBase.work_type,//
                                worker_id: type == 1 ? this.orderBase.sign_staff_id : paramObj.staff_id,
                                sign_user_name: this.orderBase.type == 3 ? this.orderBase.sign_user_name : '',
                                sign_user_id: this.orderBase.type == 3 ? this.orderBase.sign_user_id : '',
                                sign_user_phone: this.orderBase.type == 3 ? this.orderBase.sign_user_phone : '',
                                sign_user_identify: this.orderBase.type == 3 ? this.orderBase.sign_user_identify : '',
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: `已取消签约`
                        });
                    });
                    
                }).catch(error =>{
                    this.$message({
                        type: 'error',
                        message: error.message
                    })
                })
            } catch(error){
                this.$message({
                    type: 'error',
                    message: error.message
                })
            }
        },
    }
}
</script>

<style>

</style>
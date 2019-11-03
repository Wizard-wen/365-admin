<template>
    <div class="workstation">
        <div class="performance">
            <div class="card">
                <div class="title">总销售额</div>
                <div class="number">{{`¥ 30000`}}</div>
                <div class="statistic">
                    <div class="left">上月&nbsp;&nbsp;
                        <span>{{`￥ 2500`}}</span>
                    </div>
                    <div class="right">环比&nbsp;&nbsp;
                        <span class="">{{`20%`}}</span>
                    </div>
                </div>
                <div class="message">本月销售额&nbsp;&nbsp;
                    <span>{{`￥ 3000`}}</span>
                </div>
            </div>
            <div class="card">
                <div class="title">引入劳动者</div>
                <div class="number">{{`30`}}</div>
                <div class="statistic">
                    <div class="left">上月&nbsp;&nbsp;
                        <span>{{`5`}}</span>
                    </div>
                    <div class="right">环比&nbsp;&nbsp;
                        <span class="">{{`40%`}}</span>
                    </div>
                </div>
                <div class="message">本月引入劳动者&nbsp;&nbsp;
                    <span>{{`3`}}</span>
                </div>
            </div>
            <div class="card">
                <div class="title">总签单量</div>
                <div class="number">{{`103`}}</div>
                <div class="statistic">
                    <div class="left">上月&nbsp;&nbsp;
                        <span>{{`15`}}</span>
                    </div>
                    <div class="right">环比&nbsp;&nbsp;
                        <span class="">{{`33%`}}</span>
                    </div>
                </div>
                <div class="message">本月签单量&nbsp;&nbsp;
                    <span>{{`10`}}</span>
                </div>
            </div>
            <div class="card">
                <div class="title">我的签约客户</div>
                <div class="number">{{`30`}}</div>
                <div class="statistic">
                    <div class="left">上月&nbsp;&nbsp;
                        <span>{{`15`}}</span>
                    </div>
                    <div class="right">环比&nbsp;&nbsp;
                        <span class="">{{`33%`}}</span>
                    </div>
                </div>
                <div class="message">本月新增客户&nbsp;&nbsp;
                    <span>{{`10`}}</span>
                </div>
            </div>
        </div>
        <div class="down-board">
            <div class="left-board">
                <processing-order></processing-order>
                <dynamic-information></dynamic-information>
            </div>
            <div class="right-board">
                <card-box-component :title="'快速操作'" class="operate-card-box">
                    <template slot="contains">
                        <div class="operation-list">
                            <div class="control" @click="openOrderApplyDialog">申请订单</div>
                            <div class="control" @click="goSaleWorkerList">服务人员信息库</div>
                            <div class="control" @click="goSaleOrderList">我的订单</div>
                            <div class="control" >我的客户</div>
                            <div class="control" @click="goContractList">我的合同</div>
                            <div class="control" @click="goPublicOrderList">公海订单</div>
                            <div class="control" @click="goSaleOwnWorkerList">我创建的服务人员</div>
                        </div>
                    </template>
                </card-box-component>
                <card-box-component :title="'业绩排行'">
                    <template slot="control">
                        <div class="rank-control">
                            <div class="type">销售额</div>
                            <div class="type">劳动者</div>
                            <div class="type">签单量</div>
                            <div class="type">客户量</div>
                        </div>
                    </template>
                </card-box-component>
                <!-- <div class="rank-box">
                    <div class="title">
                        <div class="title-contains">
                            <div class="left">业绩排行</div>
                            <div class="right">
                                <div class="type">销售额</div>
                                <div class="type">劳动者</div>
                                <div class="type">签单量</div>
                                <div class="type">客户量</div>
                            </div>
                        </div>
                    </div>
                    <div class="rank-list">

                    </div>
                </div> -->
            </div>
        </div>
        <!-- 订单申请弹出框 -->
        <apply-order-dialog
            v-if="applyOrderDialogVisible"
            :applyOrderDialogVisible="applyOrderDialogVisible"
            @closeCreateStaffDialog="applyOrderDialogVisible=false"></apply-order-dialog>
    </div>
</template>
<script>
import {
    applyOrderDialog,
    processingOrder,
    dynamicInformation,
} from './saleWorkStation/index.js'

import {saleService} from '@common/index.js'


export default {
    data(){
        return {
            applyOrderDialogVisible: false,//订单申请弹窗显示隐藏
        }
    },
    components: {
        applyOrderDialog,
        processingOrder,
        dynamicInformation,
    },
    computed: {
        /**
         * 当前用户信息
         */
        presentUser(){
            return this.$store.state.loginModule.user
        },
        /**
         * 工作台数据
         */
        saleWorkstation(){
            return this.$store.state.saleModule.saleWorkstation
        }
    },
    methods: {
        //打开订单申请弹窗
        openOrderApplyDialog(){
            if(this.presentUser.store_id == 0){
                this.$message({
                    message: '您不能创建订单申请',
                    type: 'error'
                })
                return;
            }
            this.applyOrderDialogVisible = true
        },
        //跳转至服务人员信息页
        goSaleWorkerList(){
            this.$router.push('/sale/saleWorkerList')
        },
        //跳转至订单页
        goSaleOrderList(){
            this.$router.push('/sale/orderList')
        },
        //跳转至我的合同
        goContractList(){
            this.$router.push('/sale/contractList')
        },
        //跳转至公海订单列表
        goPublicOrderList(){
            this.$router.push('/sale/publicOrderList')
        },
        //跳转至由我创建的服务人员
        goSaleOwnWorkerList(){
            this.$router.push('/sale/saleOwnWorkerList')
        },
        /**
         * 跳转至公海订单详情
         */
        goPublicOrderPage(item){
            this.$router.push({
                path: `/sale/publicOrderConfig`,
                query: {
                    order_id: item.id
                }
            })
        },
        /**
         * 进入订单页面
         */
        goOrderDetailPage(item){
            this.$router.push({
                path: `/sale/orderConfig`,
                query: {
                    order_id: item.id
                }
            })
        }

    },
    async mounted(){
        try{
            this.is_loading = true
            await saleService.saleWorkBench(this.presentUser.id).then(data =>{
                if(data.code == '0'){
                    //设置工作台数据
                    this.$store.commit('configSaleWorkstation', data.data)
                    this.is_loading = false
                }
            }).catch(error =>{
                this.$message({
                    message: error.message,
                    type: 'error'
                })
                this.is_loading = false
            }).finally(() =>{
                this.is_loading = false
            })
        } catch(error){
            this.$message({
                message: error.message,
                type: 'error'
            })
            this.is_loading = false
        }
        
    }
}
</script>
<style lang="scss" scoped>
.workstation{
    width: 100%;
    padding: 24px;
    background: #f0f2f5;
    .performance{
        width: 100%;
        display: flex;
        justify-content: space-between;
        .card{
            height: 180px;
            width: calc(25% - 20px);
            margin: 0 10px;
            background: #fff;
            padding: 20px 24px 8px;
            .title{
                height: 22px;
                line-height: 22px;
                font-size: 14px;
                color: rgba(0,0,0,0.45);
            }
            .number{
                margin-top: 7px;
                height: 35px;
                line-height: 35px;
                font-size: 30px;
                color:rgba(0,0,0,.85);
            }
            .statistic{
                display: flex;
                margin-top: 25px;
                margin-bottom: 8px;
                .left{
                    min-width: 100px;
                    margin-right: 20px;
                    height: 23px;
                    line-height: 23px;
                    color: rgba(0,0,0,.65);
                    font-size: 14px;
                    & span{
                        color: rgba(0,0,0,.85);
                        font-size: 14px;
                    }
                }
                .right{
                    min-width: 100px;
                    height: 23px;
                    line-height: 23px;
                    color: rgba(0,0,0,.65);
                    font-size: 14px;
                    & span{
                        color: rgba(0,0,0,.85);
                        font-size: 14px;
                    }
                    .down{
                        right: -20px; 
                        top: 0;
                        height: 20px;
                        width: 20px;
                    }
                    .up{
                        right: -20px; 
                        top: 0;
                        display: inline-block;
                        height: 20px;
                        width: 20px;
                        transform: rotate(180deg);
                    }
                }
            }
            .message{
                border-top: 1px solid rgb(232,232,232);
                padding-top: 9px;
                height: 22px;
                line-height: 22px;
                color: rgba(0,0,0,.65);
                font-size: 14px;
                & span{
                    color: rgba(0,0,0,.85);
                    font-size: 14px;
                }
            }
        }
    }
    .down-board{
        display: flex;
        margin-top: 24px;
        .left-board{
            width: 67%;
        }
        .right-board{
            box-sizing: border-box;
            width: 33%;
            padding: 0 10px;
            .operate-card-box /deep/ .contains{
                padding: 20px 0 8px 24px;
            }
            .operation-list{
                box-sizing: border-box;
                font-size: 0px;
                .control{
                    box-sizing: border-box;
                    display: inline-block;
                    margin-right: 10px;
                    margin-bottom: 13px;
                    color: rgba(0,0,0,.65);
                    font-size: 14px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    cursor: pointer;
                    &:hover{
                        color: $viColor;
                    }
                }
            }

            .rank-control{
                display: flex;
                line-height: 20px;
                .type{
                    margin-right: 12px;
                    font-size: 14px;
                    font-weight: normal;
                }
            }
        }
    }
}


</style>



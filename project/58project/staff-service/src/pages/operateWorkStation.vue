<template>
    <div class="workstation" v-loading="is_loading">
        <div class="performance">
            <number-card-component></number-card-component>
            <number-card-component></number-card-component>
            <number-card-component></number-card-component>
            <number-card-component></number-card-component>
        </div>
        <div class="down-board">
            <div class="left-board">
                <user-order-application></user-order-application>
                <store-order-application></store-order-application>
                <staff-application></staff-application>
            </div>
            <div class="right-board">
                <card-box-component :title="'快速操作'" class="operate-card-box">
                    <template slot="contains">
                        <div class="operation-list">
                            <div class="control" @click="goWorkerList">服务人员信息库</div>
                            <div class="control" @click="goReturnWorkerList">回访服务人员</div>
                            <div class="control" @click="goNewWorkerList">审核新服务人员</div>
                            <div class="control" @click="goErrorWorkerList">异常服务人员</div>
                            <div class="control" @click="goOperateOrderList">订单列表</div>
                            <div class="control" @click="goClientRequireList">客户端订单申请</div>
                            <div class="control" @click="goOperateOrderApplyList">门店订单申请</div>
                            <div class="control" @click="goOperateVoidContractList">空合同列表</div>
                            <div class="control" @click="goOperateContractList">合同列表</div>
                            <div class="control" @click="goProductList">服务商品列表</div>
                            <div class="control" @click="goResourceList">广告资源库</div>
                            <div class="control" @click="goVideoList">视频素材库</div>
                            <div class="control" @click="goWorkerAdList">服务端广告位</div>
                            <div class="control" @click="goCustomAdList">客户端广告位</div>
                        </div>
                    </template>
                </card-box-component>

                <card-box-component :title="'业绩排行'" v-hide>
                    <template slot="control">
                        <div class="rank-control">
                            <div class="type">销售额</div>
                            <div class="type">劳动者</div>
                            <div class="type">签单量</div>
                            <div class="type">客户量</div>
                        </div>
                    </template>
                </card-box-component>
            </div>
        </div>
    </div>
</template>
<script>
import {operateService} from '@common/index.js'

import {
    userOrderApplication,
    storeOrderApplication,
    staffApplication,
    numberCardComponent,
} from './operateWorkstation/index.js'

// import {
//     cardBoxComponent,
// } from '@/pages/components/index.js'
export default {
    components: {
        userOrderApplication,
        storeOrderApplication,
        staffApplication,
        numberCardComponent,
    },
    data(){
        return {
            is_loading: false,
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
         * 工作台数据
         */
        saleWorkstation(){
            return this.$store.state.operateModule.operateWorkstation
        }
    },
    methods: {
        //服务人员信息库
        goWorkerList(){
            this.$router.push('/worker/workerList')
        },
        //回访服务人员
        goReturnWorkerList(){
            this.$router.push('/worker/returnWorkerList')
        },
        //审核新服务人员
        goNewWorkerList(){
            this.$router.push('/worker/newWorkerList')
        },
        //异常服务人员
        goErrorWorkerList(){
            this.$router.push('/worker/errorWorkerList')
        },
        //订单列表
        goOperateOrderList(){
            this.$router.push('/operate/operateOrderList')
        },
        //客户端订单申请
        goClientRequireList(){
            this.$router.push('/operate/clientRequireList')
        },
        //门店订单申请
        goOperateOrderApplyList(){
            this.$router.push('/operate/operateOrderApplyList')
        },
        //合同列表
        goOperateContractList(){
            this.$router.push('/operate/operateContractList')
        },
        //空合同列表
        goOperateVoidContractList(){
            this.$router.push('/operate/operateVoidContractList')
        },
        //服务商品列表
        goProductList(){
            this.$router.push('/operate/productList')
        },
        //广告资源库
        goResourceList(){
            this.$router.push('/operate/resourceList')
        },
        //视频素材库
        goVideoList(){
            this.$router.push('/operate/videoList')
        },
        //服务端广告位
        goWorkerAdList(){
            this.$router.push('/operate/workerAdList')
        },
        //客户端广告位
        goCustomAdList(){
            this.$router.push('/operate/customAdList')
        },
        /**
         * 获取运营工作台数据
         */
        async getData(){
            try{
                this.is_loading = true
                await operateService.getOperateWorkBench(this.presentUser.id).then(data =>{
                    if(data.code == '0'){
                        //设置工作台数据
                        this.$store.commit('configOperateWorkstation', data.data)
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
    },
    async mounted(){
        await this.getData()
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



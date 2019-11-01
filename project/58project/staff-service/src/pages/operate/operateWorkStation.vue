<template>
    <div class="workstation">
        <div class="performance">
            <div class="card">
                <div class="title">我维护的客户</div>
                <div class="number">{{`300`}}</div>
                <div class="statistic">
                    <div class="left">上月&nbsp;&nbsp;
                        <span>{{`250`}}</span>
                    </div>
                    <div class="right">环比&nbsp;&nbsp;
                        <span class="">{{`20%`}}</span>
                    </div>
                </div>
                <div class="message">本月新增客户&nbsp;&nbsp;
                    <span>{{`300`}}</span>
                </div>
            </div>
            <div class="card">
                <div class="title">我维护的劳动者</div>
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
                <div class="title">我回访的劳动者</div>
                <div class="number">{{`103`}}</div>
                <div class="statistic">
                    <div class="left">上月&nbsp;&nbsp;
                        <span>{{`15`}}</span>
                    </div>
                    <div class="right">环比&nbsp;&nbsp;
                        <span class="">{{`33%`}}</span>
                    </div>
                </div>
                <div class="message">本月回访劳动者&nbsp;&nbsp;
                    <span>{{`10`}}</span>
                </div>
            </div>
            <div class="card">
                <div class="title">我生成的订单</div>
                <div class="number">{{`30`}}</div>
                <div class="statistic">
                    <div class="left">上月&nbsp;&nbsp;
                        <span>{{`15`}}</span>
                    </div>
                    <div class="right">环比&nbsp;&nbsp;
                        <span class="">{{`33%`}}</span>
                    </div>
                </div>
                <div class="message">本月新增订单&nbsp;&nbsp;
                    <span>{{`10`}}</span>
                </div>
            </div>
        </div>
        <div class="down-board">
            <div class="left-board">
                
                <user-order-application></user-order-application>
                <store-order-application></store-order-application>
                <staff-application></staff-application>
            </div>
            <div class="right-board">
                <div class="operation-box">
                    <div class="title">
                        <div class="title-contains">
                            <div class="left">快速操作</div>
                        </div>
                    </div>
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
                </div>
                <div class="rank-box">
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
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {operateService} from '../../../common/index.js'

import {
    userOrderApplication,
    storeOrderApplication,
    staffApplication,
} from './operateWorkstation/index.js'
export default {
    components: {
        userOrderApplication,
        storeOrderApplication,
        staffApplication,
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
            .message-box{
                margin: 0 10px;
                margin-top:24px;
                height: 549px;
                background: #fff;
                .title{
                    min-height: 48px;
                    margin-bottom: -1px;
                    padding: 0 24px;
                    color: rgba(0,0,0,.85);
                    font-weight: 500;
                    font-size: 16px;
                    background: transparent;
                    border-bottom: 1px solid #e8e8e8;
                    border-radius: 2px 2px 0 0;
                    zoom: 1;
                    .title-contains{
                        display: flex;
                        align-items: center;
                        .left{
                            display: inline-block;
                            flex: 1 1;
                            padding: 16px 0;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                    }

                }    
                .message-list{
                    padding: 0 24px 8px;
                    .list-item{
                        padding: 16px 0;
                        border-bottom: 1px solid #e8e8e8;
                        .item-contains{
                            position: relative;
                            display: flex;
                            align-items: flex-start;
                            .icon-box{
                                height: 32px;
                                width: 32px;
                                margin-right: 16px;
                                & img{
                                    height: 32px;
                                    width: 32px;
                                }
                            }
                            .right{
                                .news{
                                    margin-bottom: 4px;
                                    color: rgba(0,0,0,.65);
                                    font-size: 14px;
                                    line-height: 22px;
                                }
                                .time{
                                    color: rgba(0,0,0,.45);
                                    font-size: 14px;
                                    line-height: 22px;
                                }
                            }
                            .btn{
                                position: absolute;
                                right: 10px;
                                bottom: 5px;
                                line-height: 30px;
                                font-size: 14px;
                                color: #ff6400;
                                cursor: pointer;
                            }
                        }
                    }
                } 
            }
        }
        .right-board{
            width: 33%;
            .operation-box{
                margin: 0 10px;
                background: #fff;
                .title{
                    min-height: 48px;
                    margin-bottom: -1px;
                    padding: 0 24px;
                    color: rgba(0,0,0,.85);
                    font-weight: 500;
                    font-size: 16px;
                    background: transparent;
                    border-bottom: 1px solid #e8e8e8;
                    border-radius: 2px 2px 0 0;
                    zoom: 1;
                    .title-contains{
                        display: flex;
                        align-items: center;
                        .left{
                            display: inline-block;
                            flex: 1 1;
                            padding: 16px 0;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                    }

                }
                .operation-list{
                    box-sizing: border-box;
                    padding: 20px 0 8px 24px;
                    font-size: 0px;
                    .control{
                        box-sizing: border-box;
                        display: inline-block;
                        // width: 25%;
                        margin-bottom: 13px;
                        margin-right: 10px;
                        color: rgba(0,0,0,.65);
                        font-size: 14px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        cursor: pointer;
                        &:hover{
                            color: #ff6400;
                        }
                    }
                }
            }
            .rank-box{
                margin: 0 10px;
                margin-top: 24px;
                height: 653px;
                background: #fff;
                .title{
                    min-height: 48px;
                    margin-bottom: -1px;
                    padding: 0 24px;
                    color: rgba(0,0,0,.85);
                    font-weight: 500;
                    font-size: 16px;
                    background: transparent;
                    border-bottom: 1px solid #e8e8e8;
                    border-radius: 2px 2px 0 0;
                    zoom: 1;
                    .title-contains{
                        display: flex;
                        align-items: center;
                        position: relative;
                        .left{
                            display: inline-block;
                            flex: 1 1;
                            padding: 16px 0;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                        .right{
                            position: absolute;
                            bottom: 0px;
                            right: -5px;
                            display: flex;
                            line-height: 30px;
                            .type{
                                margin-right: 12px;
                                font-size: 14px;
                                font-weight: normal;
                            }
                        }
                    }

                }
                .rank-list{
                    box-sizing: border-box;

                }
            }
        }
    }
}
</style>



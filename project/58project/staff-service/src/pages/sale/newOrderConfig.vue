<template>
    <div class="orderConfig">
        <div class="order-header">
            <div class="order-name">
                <h4>订单号：{{20190714000001}}</h4>
            </div>
            <div class="btn-group">
                <el-button size="mini">分派</el-button>
                <el-button size="mini">续约</el-button>
                <el-button size="mini">终止订单</el-button>
                <el-button size="mini">返回</el-button>
            </div>
            <div class="order-detail">
                <div class="detail-left">
                    <div class="detail-left-box">
                        <div class="detail-left-line">创建人：{{ `宋希文` }}</div>
                        <div class="detail-left-line">订单拥有者：{{ `宋希文` }}</div>
                        <div class="detail-left-line">创建时间：{{'2019-06-27'}}</div>
                        <div class="detail-left-line">订单来源：{{`线上`}}</div>
                        <div class="detail-left-line">签约时间：{{`2019-06-28`}}</div>
                        <div class="detail-left-line">服务周期：{{`2019-06-27 ---- 2019-12-26`}}</div>
                    </div>

                </div>
                <div class="detail-right">
                    <div class="right-box">
                        <div class="title">账户余额</div>
                        <div class="value">{{ `2600` }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="order-down">
            <div class="order-message">
                <div class="title">
                    <div class="title-contains">
                        <div class="left">订单基本信息</div>
                    </div>
                </div>
                <div class="order-list">
                    <div class="line-three-list">
                        客户姓名：<span>{{`唐朝`}}</span>
                        <p @click="changeOrderMessage('')" class="change">
                            <img src="./images/change.svg" alt="">
                        </p>
                    </div>
                    <div class="line-three-list">
                        电话：<span>{{`唐朝`}}</span> 
                        <p @click="changeOrderMessage('')" class="change">
                            <img src="./images/change.svg" alt="">
                        </p>
                    </div>
                    <div class="line-three-list">
                        工种：<span>{{`唐朝`}}</span>
                        <p @click="changeOrderMessage('')" class="change">
                            <img src="./images/change.svg" alt="">
                        </p>
                    </div>
                    <div class="line-three-list">
                        工作时间：<span>{{`早八晚五`}}</span>
                        <p @click="changeOrderMessage('')" class="change">
                            <img src="./images/change.svg" alt="">
                        </p>
                    </div>
                    <div class="line-three-list">
                        工资：<span>{{`3500`}}</span>
                        <p @click="changeOrderMessage('')" class="change">
                            <img src="./images/change.svg" alt="">
                        </p>
                    </div>
                    <div class="line-three-list">
                        休息日：<span>{{`4`}}</span>
                        <p @click="changeOrderMessage('')" class="change">
                            <img src="./images/change.svg" alt="">
                        </p>
                    </div>
                    <div class="line-list">
                        地址： <span>{{`辽宁省沈阳市大东区小北关街43-1 5-8-3`}}</span>
                        <p @click="changeOrderMessage('')" class="change">
                            <img src="./images/change.svg" alt="">
                        </p>
                    </div>
                    <div class="line-list">
                        订单详情：<span>{{`辽宁省沈阳市大东区小北关街43-1 5-8-3`}}</span>
                        <p @click="changeOrderMessage('')" class="change">
                            <img src="./images/change.svg" alt="">
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    methods: {
        /**
         * 变更订单信息字段
         */
        changeOrderMessage(){

        }
    }
}
</script>
<style lang="scss" scoped>
    .orderConfig{
        width: 100%;
        min-height: calc(100vh - 50px);
        background:#f0f2f5;
        .order-header{
            background: #fff;
            padding: 30px 24px 24px 24px;
            position: relative;
            .order-name{
                line-height: 28px;
                font-size: 20px;
                font-weight: 700;
            }
            .btn-group{
                & /deep/ .el-button{
                    margin-left: 0px;
                }
                position: absolute;
                right: 24px;
                top: 20px;
            }
            .order-detail{
                padding-top: 12px;
                display: flex;
                .detail-left{
                    flex:1;
                    .detail-left-box{
                        display: flex;
                        flex-wrap: wrap;
                        .detail-left-line{
                            width: 50%;
                            color: rgba(0,0,0,.65);
                            line-height: 20px;
                            padding-bottom: 8px;
                        }
                    }
                }
                .detail-right{
                    min-width: 400px;
                    display: flex;
                    .right-box{
                        height: 80px;
                        width: 50%;
                        .title{
                            color: rgba(0,0,0,.45);
                            font-size: 14px;
                            line-height: 1.5;
                        }
                        .value{
                            font-size: 20px;
                            color: rgba(0,0,0,.85);
                            line-height: 1.5;
                        }
                    }
                }
            }
        }
        .order-down{
            margin: 24px;
            .order-message{

                width: 100%;
                // height: 285px;
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
                .order-list{
                    box-sizing: border-box;
                    padding: 24px;
                    &:after{
                        content: '';
                        display: block;
                        clear: both;
                    }
                    .line-three-list{
                        float: left;
                        width: 33%;
                        line-height: 30px;
                    }
                    .line-list{
                        float: left;
                        width: 100%;
                        line-height: 30px;
                    }
                    .change{
                        margin-left: 15px;
                        display: inline-block;
                        color: #1890ff;
                        line-height: 30px;
                        height: 30px;
                        font-size: 12px;
                        cursor: pointer;
                        & img{
                            height: 30px;
                            width: 30px;
                            vertical-align: middle;
                        }
                    }
                }
            }
        }
    }
</style>



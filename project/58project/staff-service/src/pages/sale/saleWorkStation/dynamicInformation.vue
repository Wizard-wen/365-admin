<template>
    <div class="message-box">
        <div class="title">
            <div class="title-contains">
                <div class="left">公海订单动态信息</div>
                <div class="control" @click="goPublicOrderList">公海订单列表</div>
            </div>
        </div>
        <div class="message-list">
            <div 
                class="list-item"
                :key="index"
                v-for="(item, index) in dynamic_information">
                <div class="item-contains">
                    <div class="icon-box">
                        <img src="./images/icon.png" alt="">
                    </div>
                    <div class="base-message">
                        <div class="news">
                            <div class="base-news">
                                {{`和平门店`}} {{`宋希文`}} {{`15001279361`}} 创建订单
                            </div>
                            
                        </div>
                        <div class="time">2019-07-14</div>
                    </div>
                    <div class="order-message">
                        <el-tag class="tag-item" size="mini">保姆月嫂</el-tag>
                        <el-tag class="tag-item" size="mini">月薪3000</el-tag>
                    </div>
                    <div class="btn" @click="goPublicOrderPage(item)">
                        <i class="el-icon-d-arrow-right"></i>
                    </div>
                </div>
            </div>
            <div class="list-item" >
                <div class="more-box" @click="goPublicOrderList">
                    <i class="el-icon-more-outline"></i>
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
    props: {

    },
    computed: {
        dynamic_information(){
            return this.$store.state.saleModule.saleWorkstation.dynamic_information
        }
    },
    methods: {
        /**
         * 进入公海订单列表
         */
        goPublicOrderList(){
            this.$router.push({
                path: '/sale/publicOrderList'
            })
        },
        /**
         * 进入公海订单配置页
         */
        goPublicOrderConfig(item){

        }
    }
}
</script>

<style lang="scss" scoped>
.message-box{
    margin: 0 10px;
    margin-top:24px;
    height: 649px;
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
            .control{
                float: right;
                margin-left: auto;
                padding: 16px 0;
                color: #1890ff;
                font-weight: 400;
                font-size: 14px;
                cursor: pointer;
            }
        }

    }    
    .message-list{
        padding: 0 24px 8px;
        height: 600px;
        overflow: auto;
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
                .base-message{
                    // width: 260px;
                    margin-right: 20px;
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
                .order-message{
                    padding: 14px 0;
                    .tag-item{
                        margin-right: 15px;
                    }
                }
                .btn{
                    position: absolute;
                    right: 10px;
                    bottom: 5px;
                    line-height: 30px;
                    font-size: 14px;
                    color: #1890ff;
                    cursor: pointer;
                }
            }
            .more-box{
                padding: 0 30px;
                line-height: 48px;
                font-size: 24px;
                text-align: right;
            }
        }
    } 
}
</style>
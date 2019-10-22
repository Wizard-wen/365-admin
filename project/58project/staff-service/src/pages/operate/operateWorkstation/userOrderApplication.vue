<template>
    <div class="order-box">
        <div class="title">
            <div class="title-contains">
                <div class="left">客户端订单申请</div>
                <div class="control" @click="goClientRequireListPage">客户端订单申请列表</div>
            </div>
        </div>
        <div class="order-list">
            <div 
                class="order-card"
                v-for="(item, index) in user_order_application"
                :key="index">
                <div class="tag-list">
                    <div class="customer">唐先生 - 15001279361</div>
                    <div class="text">保姆月嫂 / 月薪3000 / 早八晚五保姆月嫂</div>
                </div>
                <div class="control">
                    <div class="time">2019-07-14</div>
                    <div class="btn" @click="goClientRequireItemPage(item)">
                        <i class="el-icon-d-arrow-right"></i>
                    </div>
                </div>
            </div>
            <div class="order-card" v-if="user_order_application.length < 6">
                <div class="more-box" @click="goClientRequireListPage">
                    <i class="el-icon-more-outline"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {

    },
    computed: {
        user_order_application(){
            return this.$store.state.operateModule.operateWorkstation.user_order_application
        }
    },
    data(){
        return {

        }
    },
    methods: {
        /**
         * 前往订单申请处理页
         */
        goClientRequireItemPage(item){
            this.$router.push({
                path: '/operate/clientRequireItem',
                query: {

                }
            })
        },
        goClientRequireListPage(){
            this.$router.push({
                path: '/operate/clientRequireList',
                query: {

                }
            })
        }
    }
}
</script>

<style lang="scss">
    .order-box{
        margin: 0 10px;
        margin-bottom:24px;
        // height: 342px;
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
        .order-list{
            box-sizing: border-box;
            &:after{
                clear: both;
                content: '';
                display: block;
            }
            .order-card{
                float: left;
                height: 163px;
                width: 33.33%;
                padding: 10px 10px 5px 20px;
                border: 0;
                border-radius: 0;
                box-shadow: 1px 0 0 0 #e8e8e8, 0 1px 0 0 #e8e8e8, 1px 1px 0 0 #e8e8e8, inset 1px 0 0 0 #e8e8e8, inset 0 1px 0 0 #e8e8e8;
                transition: all .3s;
                .tag-list{
                    height: 128px;
                    width: 100%;
                    .customer{
                        line-height: 30px;
                        font-size: 16px;
                        margin-bottom: 10px;
                    }
                    .text{

                        display: block;
                        color: #333;
                        display: -webkit-box;
                        width: 100%;
                        height: 75px;
                        margin: 0 auto;
                        font-size: 14px;
                        line-height: 25px;
                        -webkit-line-clamp: 3;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .tag-item{
                        margin-right: 10px;
                    }
                }
                .control{
                    height: 20px;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    .time{
                        line-height: 20px;
                        flex: 1;
                        font-size: 12px;
                    }
                    .btn{
                        line-height: 20px;
                        color: #1890ff;
                        font-size: 12px;
                        cursor: pointer;
                    }
                }
                //更多
                .more-box{
                    height: 128px;
                    width: 100%;
                    text-align: center;
                    line-height: 128px;
                    font-size: 35px;
                    cursor: pointer;
                }
            }
        }
    }
</style>
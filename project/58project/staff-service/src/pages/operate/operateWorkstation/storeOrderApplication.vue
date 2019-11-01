<template>
    <div class="order-box">
        <div class="title">
            <div class="title-contains">
                <div class="left">门店订单申请</div>
                <div class="control" @click="goOrderApplyListPage">门店订单申请列表</div>
            </div>
        </div>
        <div class="order-list">
            <div 
                class="order-card"
                v-for="(item, index) in store_order_application"
                :key="index">
                <div class="tag-list">
                    <div class="customer">{{item.user_name}} - {{item.user_phone}}</div>
                    <div class="text">{{item.work_type}} / {{item.wage}} / {{item.service_duration}}</div>
                </div>
                <div class="control">
                    <div class="time">{{item.created_at | timeFomatter}}</div>
                    <div class="btn" @click="goOrderApplyItemPage(item)">
                        <i class="el-icon-d-arrow-right"></i>
                    </div>
                </div>
            </div>
            <div class="order-card" v-if="store_order_application.length < 6">
                <div class="more-box" @click="goOrderApplyListPage">
                    <i class="el-icon-more-outline"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    $utils,
} from '../../../../common'
export default {
    props: {

    },
    filters: {
        timeFomatter(value){ 
            if(value == 0){
                return '-'
            }
            return $utils.formatDate(new Date(value), 'yyyy-MM-dd')
        }
    },
    computed: {
        store_order_application(){
            return this.$store.state.operateModule.operateWorkstation.store_order_application
        }
    },
    data(){
        return {

        }
    },
    methods: {
        /**
         * 前往门店订单申请处理页
         */
        goOrderApplyItemPage(item){
            this.$router.push({
                path: '/operate/operateOrderApplyItem',
                query: {
                    id: item.id
                }
            })
        },
        /**
         * 前往门店订单申请列表
         */
        goOrderApplyListPage(){
            this.$router.push({
                path: '/operate/operateOrderApplyList',
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
                    color: #ff6400;
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
                        color: #ff6400;
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
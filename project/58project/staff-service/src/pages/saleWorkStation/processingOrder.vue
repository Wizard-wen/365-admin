<template>
    <card-box-component
        class="processing-card-box"
        :title="'待处理订单'">
        <template slot="control">
            <el-button type="text" @click="goOrderListPage">全部订单</el-button>
        </template>
        <template slot="contains">
            <div class="order-list">
                <div 
                    class="order-card"
                    v-for="(item, index) in processing_order"
                    :key="index">
                    <div class="tag-list">
                        <div class="customer">{{item.order_user_name}} - {{item.order_user_phone}}</div>
                        <div class="text">{{item.work_type}} / {{item.wage}} / {{item.service_duration}}</div>
                    </div>
                    <div class="control">
                        <div class="time">{{item.created_at | timeFomatter}}</div>
                        <div class="btn" @click="goOrderConfigPage(item)">
                            <i class="el-icon-d-arrow-right"></i>
                        </div>
                    </div>
                </div>
                <div class="order-card" v-if="processing_order.length < 6">
                    <div class="more-box" @click="goOrderListPage">
                        <i class="el-icon-more-outline"></i>
                    </div>
                </div>
            </div>
        </template>
    </card-box-component>
</template>

<script>
import {
    $utils,

} from '@common/index.js'
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
        processing_order(){
            return this.$store.state.saleModule.saleWorkstation.processing_order
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
        goOrderConfigPage(item){
            this.$router.push({
                path: '/sale/saleOrderConfig',
                query: {
                    order_id: item.id,
                    module: 'sale',
                }
            })
        },
        /**
         * 前往清单列表
         */
        goOrderListPage(){
            this.$router.push({
                path: '/sale/saleOrderList',
                query: {

                }
            })
        }
    }
}
</script>

<style lang="scss">
.processing-card-box /deep/ .contains{
    padding: 0!important;
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
                color: $viColor;
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
</style>
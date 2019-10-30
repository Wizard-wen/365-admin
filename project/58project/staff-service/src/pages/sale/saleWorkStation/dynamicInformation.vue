<template>
    <card-box-component
        :title="'公海订单动态信息'">
        <template slot="contains">
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
                                    {{item.agent_store_name}} {{item.agent_manager_name}} {{item.agent_manager_phone}} 创建订单 {{item.order_code}}
                                </div>
                                
                            </div>
                            <div class="time">{{item.created_at | timeFomatter}}</div>
                        </div>
                        <div class="order-message">
                            <el-tag class="tag-item" size="mini" v-if="item.work_type">{{item.work_type}}</el-tag>
                            <el-tag class="tag-item" size="mini" v-if="item.wage">{{item.wage}}</el-tag>
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
        </template>
        <template slot="control">
            <el-button size="text" @click="goPublicOrderList">公海订单列表</el-button>
        </template>
    </card-box-component>
</template>

<script>
import {
    $utils,
} from '../../../../common'
export default {
    data(){
        return {

        }
    },
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
.message-list{
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
</style>
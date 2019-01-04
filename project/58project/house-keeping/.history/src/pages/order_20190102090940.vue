<template>
    <div class="order">
        <v-header :title="'我的订单'"></v-header>
        <div class="order-type">
            <div 
                class="order-item"
                v-for="(item, index) in orderTypes"
                :key="index+item.name"
                :class="[activeIndex == index? 'order-item-active' : '']"
                @click="toggleActive(index, item)">{{item.name}}</div>
        </div>
        <div class="px-lines"></div>
        <div class="order-contains">
            <div 
                class="order-item"
                v-for="(item, index) in orderList"
                :key="index">
                {{item.date}}
            </div>
        </div>
    </div>
</template>
<script>
import header from '../../common/components/header/header.vue'
import orderService from '../../common/service/orderService.js'
export default {
    data(){
        return {
            orderTypes: [
                {
                    name: "全部",
                    type: 1
                },
                {
                    name: "待支付",
                    type: 2
                },
                {
                    name: "待确认",
                    type: 3
                },
                {
                    name: "已完成",
                    type: 4
                },
                {
                    name: "待评价",
                    type: 5
                },
            ],
            activeIndex: 0,//高亮的索引
            orderList: [],//订单列表
        }
    },
    methods: {
        /**
         * 切换高亮选项
         * @param inds 索引
         * @param item 当前选项
         */
        toggleActive(inds, item){
            this.activeIndex = inds;
        }
    },
    components: {
        'v-header': header,
    },
    async mounted(){
        this.orderList = await orderService.getOrderList();
    }
}
</script>
<style scoped lang="scss">
    .order-type{
        position: fixed;
        top: 0.5rem;
        height: .4rem;
        width: 100%;
        padding: 0 .2rem;
        display: flex;
        justify-content: space-between;
        background: #fff;
        .order-item{
            height: .4rem;
            width: .5rem;
            line-height: .4rem;
            text-align: center;
        }
        .order-item-active{
            color: #4b77be;
            font-weight: bold;
            position: relative;
            &:after{
                content: '';
                position: absolute;
                height: .02rem;
                width: .5rem;
                background: #4b77be;
                bottom: 0;
                left: 0;
            }
        }
        

    }
    .px-lines{
        height: .05rem;
        width: 100%;
    }
    .order-contains{
        padding: 01.1rem .2rem;
        .order-item{
            height: 1.5rem;
            width: 100%;
            border-radius: .1rem;
            background: #fff;
            margin-bottom: .1rem;
            padding: .1rem;
        }
    }
</style>



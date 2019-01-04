<template>
    <div class="user">
        <div class="user-general">
            <div class="user-message">
                <div class="user-photo"></div>
                <div class="user-name">
                    <p class="user-nickname">{{userData.nickname}}</p>
                    <p class="user-label">{{userData.label}}</p>
                </div>
                <div class="user-set">
                    <img :src="setPic" alt="">
                </div>
            </div>
            <div class="user-right">
                <div 
                    class="user-right-item"
                    v-for="(item,index) in userData.userRights"
                    :key="index">
                    <div class="right-number">{{item.number}}</div>
                    <div class="right-label">{{item.label}}</div>
                </div>
            </div>
        </div>
        <div class="user-order">
            <div class="my-order">
                我的订单
                <span class="all-order">查看全部订单</span>
                <img class="right-arrow" :src="rightArrow" alt="">
            </div>
            <div class="px-line"></div>
            <div class="order-itemList">
                <div 
                    class="order-item"
                    v-for="(item, index) in orderList"
                    :key="index">
                    <img :src="item.icon" alt="">
                    <p class="order-item-text">{{item.text}}</p>
                </div>
            </div>
        </div>
        <div class="user-about">
            <div 
                class="about-item"
                v-for="(item, index) in serviceList"
                :key="index"
                @click="goPage(item)">
                {{item.name}}
                <img class="right-arrow" :src="rightArrow" alt="">
                <div class="px-line"></div>
            </div>
            
        </div>
    </div>
</template>
<script>
/**
 * <a href="tel:15001279362">15001279361</a>
 * 这样ios会识别为手机号码
 */
import setPic from './home/img/set.svg'
import preaffording from './home/img/preaffording.svg'
import prewaiting from './home/img/prewaiting.svg'
import preconfirm from './home/img/preconfirm.svg'
import precomment from './home/img/precomment.svg'
import rightArrow from './home/img/right-arrow.svg'
export default {
    data(){
        return {
            setPic,//设置图标
            rightArrow,//向右箭头
            userData:{
                nickname:'wizard',
                label: 'level 1',
                userRights: [
                    {
                        number: 1,
                        label: '收藏夹',
                        type: 1
                    },
                    {
                        number: 72,
                        label: '关注店铺',
                        type: 2
                    },
                    {
                        number: 15,
                        label: '足迹',
                        type: 3
                    },
                    {
                        number: 6,
                        label: '红包卡券',
                        type: 4
                    },
                ],
                
            },
            orderList: [
                {
                    icon: preconfirm,
                    text: "待确认",
                },
                {
                    icon: prewaiting,
                    text: "待服务",
                },
                {
                    icon: preaffording,
                    text: "待支付",
                },
                {
                    icon: precomment,
                    text: "待评价",
                },
            ],
            serviceList: [
                {
                    name: '我的地址',
                    router: ''
                },
                {
                    name: '联系客服',
                    router: ''
                },
                {
                    name: '关于我们',
                    router: ''
                },
            ]
        }
    },
    methods: {
        /**
         * 跳转页面
         */
        goPage(item){
            if(item.name=="联系客服"){
                alert('15001279361')
            }
        }
    }
}
</script>
<style scoped lang="scss">
    .user{
        // background: #f5f5f5;
        // min-height: calc(100vh - .7rem);
        // width: 100%;
        .user-general{
            height: 1.7rem;
            padding: .25rem .2rem;
            width:100%;
            background: #336699;
            margin-bottom: .2rem;
            .user-message{
                height:.6rem;
                width:100%;
                position: relative;
                .user-photo{
                    float: left;
                    height: .6rem;
                    width: .6rem;
                    border-radius: 50%;
                    background: #fff;
                    margin-right:.2rem;
                }
                .user-name{
                    float:left;
                    height:.6rem;
                    width: 1rem;
                    .user-nickname{
                        color: #fff;
                        height: .3rem;
                        line-height: .3rem;
                        width: 100%;
                        text-indent: .05rem;
                        font-size: .18rem;
                    }
                    .user-label{
                        color: #fff;
                        height: .2rem;
                        line-height: .2rem;
                        width: .7rem;
                        text-align: center;
                        margin-top: .05rem;
                        border-radius: .2rem;
                        background: rgba(0,0,0,.3);
                    }
                }
                .user-set{
                    position: absolute;
                    height: .18rem;
                    width: .18rem;
                    right: 0rem;
                    top: .1rem;
                    & img{
                        display: inline-block;
                        height: .18rem;
                        width: .18rem;
                    }
                }
            }
            .user-right{
                display: flex;
                justify-content: space-between;
                margin-top: .2rem;
                .user-right-item{
                    color: #fff;
                    font-size: .14rem;
                    height: .45rem;
                    width: 100%;
                    text-align: center;
                    .right-number{
                        margin-bottom: .05rem;
                    }
                }
            }
        }
        .user-order{
            margin: 0 auto;
            height: 1rem;
            width: calc(100% - .3rem);
            margin-bottom: .2rem;
            .my-order{
                position: relative;
                height: .3rem;
                width: 100%;
                line-height: .3rem;
                background: #fff;
                border-top-right-radius: .06rem;
                border-top-left-radius: .06rem;
                text-indent: .1rem;
                color: #333;
                font-size: .14rem;
                .all-order{
                    position: absolute;
                    right: .2rem;
                    font-size: .12rem;
                }
                .right-arrow{
                    position: absolute;
                    display: inline-block;
                    height: .14rem;
                    width: .14rem;
                    right: .07rem;
                    top: .07rem;
                }
            }
            .px-line{
                height: .01rem;
                width: 100%;
            }
            .order-itemList{
                height: .7rem;
                width: 100%;
                padding: .15rem .2rem;
                background: #fff;
                border-bottom-right-radius: .06rem;
                border-bottom-left-radius: .06rem;
                display: flex;
                justify-content: space-between;
                .order-item{
                    height: .4rem;
                    width: .4rem;
                    img{
                        display: inline-block;
                        height: .25rem;
                        width: .25rem;
                        margin-left: .075rem;
                    }
                    .order-item-text{
                        text-align: center;
                        font-size: .12rem;
                    }
                }
            }
        }
        .user-about{
            .about-item{
                position: relative;
                margin: 0 auto;
                background: #fff;
                height: .55rem;
                line-height: .55rem;
                text-indent: .2rem;
                width: calc(100% - .3rem);
                .right-arrow{
                    position: absolute;
                    display: inline-block;
                    height: .14rem;
                    width: .14rem;
                    right: .07rem;
                    top: .2rem;
                }
            }
            .about-item:first-child{
                border-top-right-radius: .06rem;
                border-top-left-radius: .06rem;
            }
            .about-item:last-child{
                border-bottom-right-radius: .06rem;
                border-bottom-left-radius: .06rem;
            }
            .px-line{
                position: absolute;
                bottom: 0;
                background: #f5f5f5;
                height: .01rem;
                width: 100%;
            }
        }
    }
    
</style>



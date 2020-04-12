<template>
    <div class="card" >
        <div class="title">{{title}}</div>
        <div class="number">{{statisticItem.total}}</div>
        <!-- <count-to
            ref="example"
            :start-val="0"
            :end-val="total"
            :duration="1000"
            :decimals="0"
            :separator="','"
            :prefix="''"
            :suffix="''"
            :autoplay="false"
            class="number"/> -->


        <div class="statistic">
            <div class="left">上月&nbsp;&nbsp;
                <span>{{statisticItem.last_month}}</span>
            </div>
            <div class="right">环比&nbsp;&nbsp;
                <span class="">{{`${statisticItem.rate}%`}}</span>
            </div>
        </div>
        <div class="message">本月&nbsp;&nbsp;
            <span>{{statisticItem.this_month}}</span>
        </div>
    </div>
</template>

<script>
import countTo from 'vue-count-to'
export default {
    components: {
        countTo,
    },
    props: {
        title: {
            type: String,
            default: ''
        },
        statisticItem: {
            type: Object,
            default(){return {
                total: 0,
                last_month: 0,
                rate: 0,
                this_month: 0,
            }}
        }
    },
    computed: {
        total(){
            return Number(this.statisticItem.total)
        }
    },
    mounted(){
        // this.$refs.example.start()
    }
}
</script>

<style lang="scss" scoped>


.example {
  font-size: 50px;
  color: #F6416C;
  display: block;
  margin: 10px 0;
  text-align: center;
  font-size: 40px;
  font-weight: 500;
}


.card{
    height: 180px;
    width: calc(25% - 20px);
    // margin: 0 10px;
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
        color: rgba(97,160,168,0.85);
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
</style>
<template>
    <div class="card" v-hide>
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
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
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
</style>
<template>
    <div class="storeStatistic">
        <div class="performance">
            <statistic-card-component :title="'流水'"></statistic-card-component>
            <statistic-card-component :title="'销售额'"></statistic-card-component>
            <statistic-card-component :title="'转化率'"></statistic-card-component>
            <statistic-card-component v-hide></statistic-card-component>
        </div>
        <chart-box></chart-box>
        <div style="display:flex;justify-content:space-around">
            <bar-box :title="'行业分析'" style="width: 45%"></bar-box>
            <bar-box :title="'培训课程分析'" style="width: 45%"></bar-box>
        </div>
        <sort-skill-box></sort-skill-box>
    </div>
</template>

<script>
import chartBox from './storeStatistic/chartBox.vue'
import barBox from './storeStatistic/barBox.vue'
import sortSkillBox from './storeStatistic/sortSkillBox.vue'
import {
    statisticCardComponent,
} from '../operateWorkStation/index.js'
export default {
    components: {
        chartBox,
        barBox,
        sortSkillBox,
        statisticCardComponent,
    },
    data () {
        return {
            value4: '',
            orgOptions: {},
            orgOptions2: {},
            options3: {},
        }
    },
    mounted() {
        this.orgOptions = {
            xAxis: {
                type: 'category',
                data: ['4', '5', '6', '7月', '8月', '9月', '10月'],
                
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            tooltip : {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    animation: false,
                    label: {
                        backgroundColor: '#505765'
                    }
                },
                formatter: `月份：{b}<br/>金额：{c}`
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                }
            },
            series: [{
                data: [18, 9, 10, 34, 29, 13, 20],
                type: 'bar',
                itemStyle: {
                    color: '#58afff',
                },
                barWidth: 35,
                smooth: true
            }]
        }
    }
}
   
</script>

<style lang="scss" scoped>
.storeStatistic{
    width: 100%;
    padding: 24px;
    background: #f0f2f5;
    .performance{
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
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
    }
}




</style>
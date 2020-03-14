<template>
    <card-box-component :title="title" >
        <div slot="control">
            <div class="filter-box">
                <div 
                    @click="changeTag(index)"
                    :class="['filter-item',item.isActive?'filter-item-active': '']"  :key="index"
                    v-for="(item, index) in typeList">{{item.name}}</div>
            </div>
        </div>
        <div class="chart-contains" slot="contains">
            <chart ref="chart1" class="charts-box" :options="chartData.chartOption" :auto-resize="true"></chart>
        </div>
    </card-box-component>
</template>

<script>
import sortBox from './sortBox.vue'
export default {
    components: {
        sortBox,
    },
    data(){
        return {
            typeList: [
                {type: 1, name: '流水',isActive: true},
                {type: 2, name: '销售额',isActive: false},
                {type: 3, name: '订单转化率',isActive: false},
            ]
        }
    },
    props: {
        chartData: {
            default(){
                return {
                    chartOption: {
                        xAxis: {
                            type: 'category',
                            data: ['4', '5', '6', '7月', '8月', '9月', '10月'],
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
                            formatter: `月份：{b}<br/>数值：{c}`
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
                        },{
                            data: [18, 9, 10, 34, 29, 13, 20],
                            type: 'line',
                            itemStyle: {
                                color: '#58afff',
                            },
                            barWidth: 35,
                            smooth: true
                        }]
                    },
                    sortList: [{store_name: '365总店', store_number: 300},
                            {store_name: '365总店1', store_number: 300},
                            {store_name: '365总店2', store_number: 300},
                            {store_name: '365总店3', store_number: 300},
                            {store_name: '365总店4', store_number: 300},
                            {store_name: '365总店5', store_number: 300},
                    ],
                }
            },
            type: Object,
        },
        title: {
            type: String,
            default: '近六个月业务走势'
        }
    },
    methods: {
        changeTag(index){
            this.typeList = this.typeList.map((item, ind) =>{
                if(ind == index){
                    return {
                        ...item,
                        isActive: true
                    }
                } else {
                    return  {
                        ...item,
                        isActive: false
                    }
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.filter-box{
    display: flex;
    padding: 0 20px;
    .filter-item {
        margin-left: 20px;
        font-size: 14px;
        cursor: pointer;
    }
    .filter-item-active{
        color: #409eff;
    }
}
.chart-contains{
    width: 100%;
    display: flex;
    justify-content: space-between;
    .charts-box{
        flex: 1;
    }
    
}
</style>
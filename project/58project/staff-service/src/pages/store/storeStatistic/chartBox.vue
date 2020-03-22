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
            <chart ref="chart1" class="charts-box" :options="chartData" :auto-resize="true"></chart>
            <sort-box :title="'流水'"></sort-box>
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
                {type: 'sale_amount', name: '流水',Yunit: '元',Xunit:'月',isActive: true},
                {type: 'sale_service_amount', name: '销售额',Yunit: '元',Xunit:'月',isActive: false},
                // {type: 'order_transform_rate', name: '订单转化率',isActive: false},
            ]
        }
    },
    computed: {
        halfYearDataList(){
            let showList = []
            Object.keys(this.halfYearData).forEach((item, index) =>{

                let currentObject = this.halfYearData[item];

                showList.push({
                    key: item,
                    xAxis: Object.keys(currentObject),
                    yAxis: Object.values(currentObject),
                })
            })
            return showList
        },
        chartData(){
            let active = this.typeList.find(item => item.isActive)
            let currentObj = this.halfYearDataList.find(item => item.key == active.type)

            return {
                title: { 
                    show: true, //显示折线图
                    text: `近六个月总体${active.name}对比图`, //标题文字
                    left: 'center', //配置title的位置
                    padding: [5,20,5,10] //title的padding值
                },
                toolbox: {
                    show: true,
                    orient: 'horizontal',
                    right: 120,
                    top: 20,
                    feature: {
                        saveAsImage: {show: true}
                    }
                },
                xAxis: {
                    name: '月',
                    type: 'category',
                    data: currentObj.xAxis
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
                    data: currentObj.yAxis,
                    type: 'bar',
                    barWidth: 35,
                    smooth: true
                },{
                    data: currentObj.yAxis,
                    type: 'line',
                    // barWidth: 35,
                    // smooth: true
                }]
            }
        }
    },
    props: {
        halfYearData:{
            type: Object,
            default(){return {}}
        },
        title: {
            type: String,
            default: '近六个月总体业务走势'
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
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .charts-box{
        flex: 1;
    }
    
}
</style>
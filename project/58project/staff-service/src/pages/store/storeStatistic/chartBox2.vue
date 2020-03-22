<template>
    <card-box-component :title="title" >
        <div class="chart-contains" slot="contains">
            <chart ref="chart1" class="charts-box" :options="chartData" :auto-resize="true"></chart>
        </div>
    </card-box-component>
</template>

<script>
import sortBox from './sortBox.vue'
import 'echarts/lib/component/legend'; //引入图例组件
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
        chartData(){
            let legend = Object.keys(this.halfYearData)
            let typeList = ['流水','销售额']
            let xAxis = Object.keys(this.halfYearData[legend[0]])
            let seriesList = legend.map((item,index) =>{
                return {
                    name: typeList[index],
                    data: Object.values(this.halfYearData[item]),
                    type: 'bar',
                    barWidth: 35,
                    smooth: true,
                    label:{
                        show: true,
                        position: 'top',
                    }
                }
            })
            return {
                title: { 
                    show: true, //显示折线图
                    text: '近六个月总体业务对比图', //标题文字
                    subtext: '对比流水、销售额、转化率', //副标题
                    left: 'center', //配置title的位置
                    padding: [5,20,5,10] //title的padding值
                },
                xAxis: {
                    name: '月',
                    type: 'category',
                    data: xAxis
                },
                toolbox: {
                    show: true,
                    orient: 'horizontal',
                    right: 120,
                    top: 20,
                    feature: {
                        magicType: {show: true, type: ['line', 'bar', 'stack']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    show: true,
                    orient: 'horizontal',
                    z:1000,
                    right:300,
                    top: 20,
                    data: typeList,
                },

                yAxis: {
                    name: '元',
                    type: 'value',
                    splitLine: {
                        lineStyle: {
                            type: 'dashed'
                        }
                    }
                },
                series: seriesList,
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
            default: '近六个月总体业务对比'
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
    margin: 0 auto;
    max-width: 1200px;
    display: flex;
    justify-content: space-between;
    .charts-box{
        flex: 1;
    }
    
}
</style>
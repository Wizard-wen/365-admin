<template>
    <card-box-component :title="title" >
        <div class="chart-contains" slot="contains">
            <chart ref="chart1" class="charts-box" :options="chartData" :auto-resize="true"></chart>
        </div>
    </card-box-component>
</template>

<script>
import 'echarts/lib/component/legend'; //引入图例组件
export default {
    computed: {
        chartData(){
            let legend = Object.keys(this.workTypeList)
            
            let typeList = ['流水','销售额']
            
            let xAxis = this.workTypeList.map(item =>{
                return item.work_type
            })
            
            let seriesList = this.workTypeList.map(item =>{
                return item[this.barkey]
            })
            return {
                title: { 
                    show: true, //显示折线图
                    text: this.title, //标题文字
                    subtext: '工种数额对比', //副标题
                    left: 'center', //配置title的位置
                    padding: [5,20,5,10] //title的padding值
                },
                xAxis: {
                    name: '类别',
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
                series: [{
                    data: seriesList,
                    type: 'bar',
                    barWidth: 35,
                    showBackground: true,
                    backgroundStyle: {
                        color: 'rgba(220, 220, 220, 0.8)'
                    },
                    label:{
                        show: true,
                        position: 'top',
                    }
                }],
            }
        }
    },
    props: {
        workTypeList:{
            type: Array,
            default(){return []  }
        },
        title: {
            type: String,
            default: '近六个月总体业务对比'
        },
        barkey: {
            type: String,
            default: ''
        }
    },
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
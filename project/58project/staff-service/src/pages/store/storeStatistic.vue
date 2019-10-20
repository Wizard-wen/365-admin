<template>
    <div class="storeStatistic">
        <div class="performance">
            <div class="card">
                <div class="title">总销售额</div>
                <div class="number">{{`300`}}</div>
                <div class="statistic" style="height: 30px;width: 100%;">
                    <!-- <div class="left">上月&nbsp;&nbsp;
                        <span>{{`250`}}</span>
                    </div>
                    <div class="right">环比&nbsp;&nbsp;
                        <span class="">{{`20%`}}</span>
                    </div> -->
                    <chart ref="chart2" style="height: 30px;width: 100%;" :options="options3" :auto-resize="true"></chart>
                </div>
                <div class="message">本月销售额&nbsp;&nbsp;
                    <span>{{`300`}}</span>
                </div>
            </div>
            <div class="card">
                <div class="title">总签单量</div>
                <div class="number">{{`30`}}</div>
                <div class="statistic">
                    <div class="left">上月&nbsp;&nbsp;
                        <span>{{`5`}}</span>
                    </div>
                    <div class="right">环比&nbsp;&nbsp;
                        <span class="">{{`40%`}}</span>
                    </div>
                </div>
                <div class="message">本月签单量&nbsp;&nbsp;
                    <span>{{`3`}}</span>
                </div>
            </div>
            <div class="card">
                <div class="title">平均转化率</div>
                <div class="number">{{`70%`}}</div>
                <div class="statistic" >
                <div style="height: 30px;width: 100%">
                    <el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
                </div>
                    
                </div>
                <div class="message">本月平均转化率&nbsp;&nbsp;
                    <span>{{`60%`}}</span>
                </div>
            </div>
            <div class="card">
                <div class="title">门店劳动者</div>
                <div class="number">{{`30`}}</div>
                <div class="statistic">
                    <div class="left">上月&nbsp;&nbsp;
                        <span>{{`15`}}</span>
                    </div>
                    <div class="right">环比&nbsp;&nbsp;
                        <span class="">{{`33%`}}</span>
                    </div>
                </div>
                <div class="message">本月门店新增劳动者&nbsp;&nbsp;
                    <span>{{`10`}}</span>
                </div>
            </div>
        </div>
        <div class="order-message">
            <div class="title">
                <div class="title-contains">
                    <div class="left">销售额走势</div>
                    <div class="right">
                        <div class="filter-box">
                            <div class="filter-item">今日</div>
                            <div class="filter-item">本月</div>
                            <div class="filter-item">本季</div>
                            <div class="filter-item">本年</div>
                        </div>
                        <el-date-picker
                            v-model="value4"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"></el-date-picker>
                        
                    </div>
                </div>
            </div>
            <div class="detail-show-module">
                <chart ref="chart1" class="charts-box" :options="orgOptions" :auto-resize="true"></chart>
                <div class="sort-box">
                    <div class="sort-title">
                        销售额排名
                    </div>
                    <div class="sort-list">
                        <div 
                            class="sort-list-item"
                            v-for="(item, index) in 7" 
                            :key="index">
                            <div :class="['rank',index < 3?'rank-high': '']">{{item}}</div>
                            <div class="sort-item-name">365总店</div>
                            <div class="sort-item-number">334455</div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        <chart ref="chart2" class="charts-box" :options="orgOptions2" :auto-resize="true"></chart>
    </div>
</template>

<script>
export default {
    name: 'HelloWorld',
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
        this.orgOptions2 = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
            },
            series: [
                {
                    name:'访问来源',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {value:335, name:'直接访问'},
                        {value:310, name:'邮件营销'},
                        {value:234, name:'联盟广告'},
                        {value:135, name:'视频广告'},
                        {value:1548, name:'搜索引擎'}
                    ]
                }
            ]
        },
        this.options3 =  {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                splitLine:{
                show:false     //去掉网格线
                },
                axisTick: {
                    show: false
                },
                show: false,
            },
            yAxis: {
                type: 'value',
                splitLine:{
                show:false     //去掉网格线
                },
                show: false,
            },
            series: [{
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar'
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
    .order-message{
        width: 100%;
        // height: 285px;
        background: #fff;
        margin-bottom: 24px; 
        .title{
            min-height: 48px;
            margin-bottom: -1px;
            padding: 0 24px;
            color: rgba(0,0,0,.85);
            font-weight: 500;
            font-size: 16px;
            background: transparent;
            border-bottom: 1px solid #e8e8e8;
            border-radius: 2px 2px 0 0;
            zoom: 1;
            .title-contains{
                display: flex;
                align-items: center;
                .left{
                    display: inline-block;
                    flex: 1 1;
                    padding: 16px 0;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                .right{
                    display: flex;
                    .filter-box{
                        display: flex;
                        margin-right: 20px;
                        .filter-item{
                            line-height: 48px;
                            margin-left: 24px;
                            color: rgba(0,0,0,.65);
                            font-size: 14px;
                            cursor: pointer;
                        }
                        .filter-item:hover{
                            color: #58afff;
                        }
                    }
                }
            }

        }
        .detail-show-module{
            width: 100%;
            display: flex;
            flex-wrap:  wrap;
            justify-content: space-between;
            margin-bottom: 32px;
            padding: 10px;
            .charts-box{
                flex: 1;
            }
            .sort-box{
                width:28%;
                height: 400px;
                .sort-title{
                    height: 30px;
                    line-height: 30px;
                    width: 100%;
                    margin-bottom: 15px;
                    color: rgba(0,0,0,.85);
                    font-weight: 500;
                }
                .sort-list{
                    // margin-top: 16px;
                    
                    .sort-list-item{
                        display: flex;
                        margin-top: 16px;
                        .rank{
                            line-height: 22px;
                            text-align: center;
                            height: 22px;
                            width: 22px;
                            border-radius: 50%;
                            margin-right: 16px;
                            color:rgba(0,0,0,.65);
                        }
                        .rank-high{
                            background: #314659;
                            color: #fff;
                        }
                        .sort-item-name{
                            line-height: 22px;
                            flex: 1;
                            color: rgba(0,0,0,.65);
                        }
                        .sort-item-number{
                            line-height: 22px;
                            width:60px;
                            color: rgba(0,0,0,.65);
                        }
                    }
                    
                }
            }
        }
    }
}
</style>
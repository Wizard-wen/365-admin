<template>
    <card-box-component :title="title" >
        <div slot="contains">
            <chart ref="chart2" :options="barData.options" :auto-resize="true"></chart>
        </div>
    </card-box-component>
</template>

<script>
export default {
    props: {
        barData: {
            default(){
                return {
                    options: {
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            x: 'left',
                            data:['育儿嫂','月嫂','日间保姆','育婴师']
                        },
                        series: [
                            {
                                name:'行业分析',
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
                                    {value:335, name:'育儿嫂'},
                                    {value:310, name:'月嫂'},
                                    {value:234, name:'日间保姆'},
                                    {value:135, name:'育婴师'},
                                ]
                            }
                        ]
                    },
                }
            }
        },
        title: {
            type: String,
            default: ''
        }
    }
}
</script>

<style>

</style>
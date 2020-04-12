<template>
    <card-box-component :title="title" >
        <div slot="contains" ref="chart2" >
            <chart 
                :style="{margin:'0 auto',width: '550px',height: '400px'}"
                :options="barShowData" :auto-resize="true"></chart>
        </div>
    </card-box-component>
</template>

<script>
export default {
    props: {
        barData: {
            default(){
                return []
            },
            type: Array
        },
        barkey: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        }
    },
    computed: {
        barShowData(){
            let legendList = this.barData.map(item =>{
                return item.work_type
            })
            let valueList = this.barData.map(item =>{
                return {
                    value: item[this.barkey],
                    name: item.work_type
                }
            })
            return {
                title: {
                    text: this.title,
                    // subtext: '纯属虚构',
                    left: 'center'
                },
                toolbox: {
                    show: true,
                    orient: 'horizontal',
                    right: 20,
                    top: 20,
                    feature: {
                        saveAsImage: {show: true}
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    // x: 'left',
                    left:20,
                    right:20,
                    // data:['育儿嫂','月嫂','日间保姆','育婴师']
                    data: legendList.slice(0,4)
                },
                series: [
                    {
                        name:'行业分析',
                        type:'pie',
                        radius: ['50%', '70%'],
                        center: ['55%', '55%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: true,
                                position: 'outside',
                                formatter: "{b}:{d}%"
                            },
                            emphasis: {
                                show: true,
                                position: 'inner',
                                formatter: "{b}:{d}%"
                            }
                        },
                        // emphasis: {
                        //     label: {
                        //         show: false,
                        //         position: 'inside',
                        //         textStyle: {
                        //             fontSize: '30',
                        //             fontWeight: 'bold'
                        //         }
                        //     }
                            
                        // },
                        labelLine: {
                            normal: {
                                show: true
                            }
                        },
                        // data:[
                        //     {value:335, name:'育儿嫂'},
                        //     {value:310, name:'月嫂'},
                        //     {value:234, name:'日间保姆'},
                        //     {value:135, name:'育婴师'},
                        // ],
                        data: valueList.slice(0,4)
                    }
                ]
            }
        }
    },
    mounted(){


    }
}
</script>

<style>

</style>
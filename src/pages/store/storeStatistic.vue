<template>
    <div class="storeStatistic" v-loading="is_loading">
        <div class="statistic-contains">
            <div class="performance">
                <statistic-card-component :statisticItem="sale_amount" :title="'流水'"></statistic-card-component>
                <statistic-card-component :statisticItem="sale_service_amount" :title="'营收（销售额）'"></statistic-card-component>
                <statistic-card-component :statisticItem="order_transform_rate" :title="'转化率'"></statistic-card-component>
                <statistic-card-component v-hide></statistic-card-component>
            </div>
            <!-- <div class="chart-box">
                <div class="chart-left"> -->
                    <chart-box :halfYearData="statisticData.half_year"></chart-box>
                    <chart-box2 :halfYearData="statisticData.half_year"></chart-box2>
                <!-- </div>
                <div class="chart-right"> -->
                    <rank-box :title="'门店业绩排行'" style="height: 500px;" :dataList="statisticData.rank"></rank-box>
                <!-- </div>
            </div> -->
            
 
            <div style="display:flex;justify-content:space-around">
                <bar-box :title="'家政行业流水分析'" :barkey="'sale_amount'" :barData="statisticData.work_type_rank.sale_amount"></bar-box>
                <bar-box :title="'家政行业营收（销售额）分析'" :barkey="'sale_service_amount'" style="margin-left: 20px" :barData="statisticData.work_type_rank.sale_service_amount" ></bar-box>
            </div>
            <work-type-bar :title="'家政行业流水前八名工种分析'" :barkey="'sale_amount'" :workTypeList="statisticData.work_type_rank.sale_amount"></work-type-bar>
            <work-type-bar :title="'家政行业营收（销售额）前八名工种分析'" :barkey="'sale_service_amount'" :workTypeList="statisticData.work_type_rank.sale_service_amount"></work-type-bar>
        </div>
        
    </div>
</template>

<script>
import chartBox from './storeStatistic/chartBox.vue'
import chartBox2 from './storeStatistic/chartBox2.vue'
import barBox from './storeStatistic/barBox.vue'
import sortStoreBySkillBox from './storeStatistic/sortStoreBySkillBox.vue'
import workTypeBar from './storeStatistic/workTypeBar.vue'
import rankBox from './storeStatistic/rankBox.vue'
import {
    statisticCardComponent,
} from '../operateWorkStation/index.js'

import {storeService} from '@/service/store'
export default {
    components: {
        chartBox,
        barBox,
        chartBox2,
        sortStoreBySkillBox,
        statisticCardComponent,
        workTypeBar,
        rankBox,
    },
    data () {
        return {
            is_loading: false,
            statisticData: {
                sale_amount:{},
                sale_service_amount:{},
                order_transform_rate: {},
                half_year: {
                    sale_amount:{},
                    sale_service_amount:{},
                },
                work_type_rank: {
                    sale_amount:[],
                    sale_service_amount:[],
                },
                rank: {
                    sale_amount:{},
                    sale_service_amount:{},
                    order_transform_rate: {},
                },
            },
            halfYearData: {
                sale_amount: {},
                sale_service_amount: {},
                
            }
        }
    },
    computed: {
        order_transform_rate(){
            return {
                total: this.statisticData.order_transform_rate.total *100 + '%',
                last_month: this.statisticData.order_transform_rate.last_month * 100 + '%',
                rate: this.statisticData.order_transform_rate.rate * 100,
                this_month: this.statisticData.order_transform_rate.this_month * 100 +'%',
            }
        },
        sale_service_amount(){
            return {
                total: this.statisticData.sale_service_amount.total + '元',
                last_month: this.statisticData.sale_service_amount.last_month + '元',
                rate: this.statisticData.sale_service_amount.rate,
                this_month: this.statisticData.sale_service_amount.this_month +'元',
            }
        },
        sale_amount(){
            return {
                total: this.statisticData.sale_amount.total + '元',
                last_month: this.statisticData.sale_amount.last_month + '元',
                rate: this.statisticData.sale_amount.rate,
                this_month: this.statisticData.sale_amount.this_month +'元',
            }
        },

    },
    async mounted() {
            let getSaleWorkerStationForm = {
                get_for:'total'
            }
            try{
                this.is_loading = true
                await storeService.getSaleWorkBench(getSaleWorkerStationForm).then(data =>{
                    this.statisticData = {
                        sale_amount: data.data.sale_amount,
                        sale_service_amount:data.data.sale_service_amount,
                        order_transform_rate: data.data.order_transform_rate,
                        half_year: {
                            ...data.data.half_year
                        },
                        work_type_rank: {
                            ...data.data.work_type_rank
                        },
                        rank: {
                            ...data.data.rank
                        },
                        
                    }
                    this.is_loading = false
                }).catch(error =>{
                    this.$message({
                        type: 'error',
                        message: error.message
                    })
                    this.is_loading = false
                }).finally(() =>{
                    this.is_loading = false
                })
            } catch(error){
                this.$message({
                    type: 'error',
                    message: error.message
                })
                this.is_loading = false
            }
            
    }
}
   
</script>

<style lang="scss" scoped>
.storeStatistic{
    width: 100%;
    padding: 24px;
    background: #f0f2f5;
    .statistic-contains{
        .performance{
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
        }
        .chart-box{
            width: 100%;
            display: flex;
            justify-content: space-around;
            .chart-right{
                width: 350px;
                margin-left: 20px;
            }
            .chart-left{
                flex: 1;
            }
        }
    }
    
}




</style>
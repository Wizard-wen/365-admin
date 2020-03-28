<template>
    <div class="storeStatistic">
        <div class="statistic-contains">
            <div class="performance">
                <statistic-card-component :statisticItem="statisticData.sale_amount" :title="'流水'"></statistic-card-component>
                <statistic-card-component :statisticItem="statisticData.sale_service_amount" :title="'销售额'"></statistic-card-component>
                <statistic-card-component :statisticItem="statisticData.order_transform_rate" :title="'转化率'"></statistic-card-component>
                <statistic-card-component v-hide></statistic-card-component>
            </div>
            <chart-box :halfYearData="halfYearData"></chart-box>
            <chart-box2 :halfYearData="halfYearData"></chart-box2>
 
            <div style="display:flex;justify-content:space-around">
                <bar-box :title="'行业分析'"></bar-box>
                <bar-box style="margin-left: 10px;" :title="'培训课程分析'"></bar-box>
            </div>
            <sort-store-by-skill-box></sort-store-by-skill-box>
        </div>
        
    </div>
</template>

<script>
import chartBox from './storeStatistic/chartBox.vue'
import chartBox2 from './storeStatistic/chartBox2.vue'
import barBox from './storeStatistic/barBox.vue'
import sortStoreBySkillBox from './storeStatistic/sortStoreBySkillBox.vue'
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
    },
    data () {
        return {
            statisticData: {
               sale_amount:{},
               sale_service_amount:{},
               order_transform_rate: {},
            },
            halfYearData: {
                sale_amount: {},
                sale_service_amount: {},
                
            }
        }
    },
    async mounted() {
            let getSaleWorkerStationForm = {
                get_for:'total'
            }
            await Promise.all([
                storeService.getHalfYearData(),
                storeService.getSaleWorkBench(getSaleWorkerStationForm),
            ]).then(data =>{
                this.statisticData = {
                    ...data[1].data
                }
                this.halfYearData = {
                    ...data[0].data
                }
            })
    }
}
   
</script>

<style lang="scss" scoped>
.storeStatistic{
    width: 100%;
    padding: 24px;
    background: #f0f2f5;
    .statistic-contains{
        // width: 1200px;
        // margin: 0 auto;
    }
    .performance{
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
    }
}




</style>
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
            <sort-box :title="currentTitle" :sortList="sortList" :currentKey="currentKey"></sort-box>
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
                {type: 'sale_amount', sortTitle: '门店流水排行',name: '流水',isActive: true},
                {type: 'sale_service_amount', sortTitle: '门店（营收）销售额',name: '销售额',isActive: false},
                {type: 'order_transform_rate', sortTitle: '门店订单转化率排行',name: '订单转化率',isActive: false},
            ],
            
        }
    },
    computed: {
        sortList(){
            let currentKey = this.typeList.find(item => item.isActive == true).type
            let sortList = this.dataList[currentKey].length? this.dataList[currentKey]: []

            if(currentKey == 'order_transform_rate'){
                sortList = sortList.map(item =>{
                    return {
                        ...item,
                        order_transform_rate: Number(item.order_transform_rate * 100)+'%'
                    }
                })
            } else if (currentKey == 'sale_amount'){
                sortList = sortList.map(item =>{
                    return {
                        ...item,
                        sale_amount: Number(item.sale_amount)+'元'
                    }
                })
            } else if(currentKey == 'sale_service_amount'){
                sortList = sortList.map(item =>{
                    return {
                        ...item,
                        sale_service_amount: Number(item.sale_service_amount)+'元'
                    }
                })
            }
            return sortList  
        },
        currentKey(){
            return this.typeList.find(item => item.isActive == true).type
        },
        currentTitle(){
            return this.typeList.find(item => item.isActive == true).sortTitle
        }
    },
    props: {
        dataList:{
            type: Object,
            default(){return {}}
        },
        title: {
            type: String,
            default: '门店'
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
    height: 926px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .charts-box{
        flex: 1;
    }
    
}
</style>
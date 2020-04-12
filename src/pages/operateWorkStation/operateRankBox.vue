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
                {type: 'return_staff_count', sortTitle: '回访服务人员排行',name: '回访',isActive: true},
                {type: 'pass_staff_count', sortTitle: '审核新服务人员排行',name: '审核新服务人员',isActive: false},
                {type: 'pass_order_count', sortTitle: '审核订单申请排行',name: '审核订单',isActive: false},
            ],
            
        }
    },
    computed: {
        sortList(){
            let currentKey = this.typeList.find(item => item.isActive == true).type
            let sortList = this.dataList[currentKey].length? this.dataList[currentKey]: []

            if(currentKey == 'return_staff_count'){
                sortList = sortList.map(item =>{
                    return {
                        ...item,
                        return_staff_count: Number(item.return_staff_count)+'人'
                    }
                })
            } else if (currentKey == 'pass_staff_count'){
                sortList = sortList.map(item =>{
                    return {
                        ...item,
                        pass_staff_count: Number(item.pass_staff_count)+'人'
                    }
                })
            } else if(currentKey == 'pass_order_count'){
                sortList = sortList.map(item =>{
                    return {
                        ...item,
                        pass_order_count: Number(item.pass_order_count)+'单'
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
    height: 580px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .charts-box{
        flex: 1;
    }
    
}
</style>
<template>
    <div v-if="showList.length">
        <el-tag style="margin-right: 10px;" v-for="(item, index) in showList" :key="index">
            {{item.name}}
        </el-tag>
    </div>
</template>
<script>
export default {
    data(){
        return {
            showList: []
        }
    },
    props: {
        /**
         * 全部字段数据
         */
        propList: {
            type:Array,
            default: function(){return []}
        },
        /**
         * 表格原始数据
         */
        tableOriginData: {
            default : function(){return [] | 0},
            type: [Number, Array]
        }
    },
    mounted(){
            let setTableOriginData = []
            if(typeof this.tableOriginData == 'number'){
                setTableOriginData =  [this.tableOriginData]
            } else {
                setTableOriginData =  this.tableOriginData
            }
            
            setTableOriginData.forEach((item, index) =>{
                let a = this.propList.filter(it => it.id == item)
                // debugger
                if(a.length){
                    this.showList.push(a[0])
                }
            })
    }
}
</script>


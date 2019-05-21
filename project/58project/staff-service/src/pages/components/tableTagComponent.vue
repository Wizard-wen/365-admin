<template>
    <div v-if="showList.length">
        <div class="tag-item-style" v-for="(item, index) in showList" :key="index">
            {{item.name}}
        </div>
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
            type: [Number, Array, String]
        }
    },
    mounted(){
            let setTableOriginData = []

            if(typeof this.tableOriginData == 'number'){
                setTableOriginData =  [this.tableOriginData]
            } else if(typeof this.tableOriginData == 'string'){
                setTableOriginData =  [Number(this.tableOriginData)]
            } else {
                setTableOriginData =  this.tableOriginData
            }
            
            setTableOriginData.forEach((item, index) =>{
                // debugger
                let a = this.propList.filter(it => it.id == item)

                if(typeof this.propList.find(it => it.id == item) != 'undefined'){
                    this.showList.push(this.propList.find(it => it.id == item))
                }
            })
    }
}
</script>
<style lang="scss" scoped>
    .tag-item-style{
        background-color: rgba(64,158,255,.1);
        padding: 0 10px;
        height: 24px;
        line-height: 24px;
        font-size: 12px;
        color: #409EFF;
        border-radius: 4px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border: 1px solid rgba(64,158,255,.2);
        white-space: nowrap;
    }
</style>



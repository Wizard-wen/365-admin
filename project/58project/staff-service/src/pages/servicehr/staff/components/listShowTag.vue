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
                let a = this.propList.filter(it => it.id == item)
                // debugger
                if(a.length){
                    this.showList.push(a[0])
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
    .tag-color1{
        color: #409eff;
        border: 1px solid rgba(64,158,255,.2);
        background-color: rgba(64,158,255,.1);           
    }
    .tag-color2{
        background-color: rgba(103,194,58,.1);
        border-color: rgba(103,194,58,.2);
        color: #67c23a;
    }
    .tag-color3{
        background-color: rgba(144,147,153,.1);
        border-color: rgba(144,147,153,.2);
        color: #909399;
    }
    .tag-color4{
        background-color: rgba(230,162,60,.1);
        border-color: rgba(230,162,60,.2);
        color: #e6a23c;
    }
    .tag-color5{
        background-color: rgba(245,108,108,.1);
        border-color: rgba(245,108,108,.2);
        color: #f56c6c;       
    }
</style>



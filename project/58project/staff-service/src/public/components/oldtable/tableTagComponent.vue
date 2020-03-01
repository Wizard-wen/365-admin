<template>
    <div v-if="showList.length" class="tag-box" :style="{width: width?width+'px': ''}">
        <div 
            class="tag-item-style"
            :class="'tag-color'+ (item.id%8)" 
            v-for="(item, index) in showList" :key="index">
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
        },
        width: {
            default: 0,
            type: Number
        }
    },
    watch: {
        tableOriginData: function(newVal, oldVal){
            if(newVal != oldVal){
                this.changeData()
            }
            
        }
    },
    methods: {
        changeData(){
            let setTableOriginData = []

            if(typeof this.tableOriginData == 'number'){
                setTableOriginData =  [this.tableOriginData]
            } else if(typeof this.tableOriginData == 'string'){
                setTableOriginData =  [Number(this.tableOriginData)]
            } else {
                setTableOriginData =  this.tableOriginData
            }
            this.showList = []
            setTableOriginData.forEach((item, index) =>{
                let a = this.propList.filter(it => it.id == item)

                if(typeof this.propList.find(it => it.id == item) != 'undefined'){
                    this.showList.push(this.propList.find(it => it.id == item))
                }
            })
        }
    },
    mounted(){
        this.changeData()
    }
}
</script>
<style lang="scss" scoped>
.tag-box{
    // width:200px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .tag-item-style{
        // background-color: rgba(64,158,255,.1);
        // padding: 0 10px;
        // height: 24px;
        // line-height: 24px;
        // font-size: 12px;
        // color: #fff;
        // border-radius: 4px;
        // -webkit-box-sizing: border-box;
        // box-sizing: border-box;
        // border: 1px solid rgba(64,158,255,.2);
        // white-space: nowrap;
        // margin-right:5px;
        


        display: inline-block;
        padding: 0 10px;
        // margin: 8px 14px 0 0;
        height: 24px;
        line-height: 24px;
        font-size: 12px;
        border: 1px solid #fff;
        border-radius: 4px;
        box-sizing: border-box;
        white-space: nowrap;
        margin-right:5px;
    }
}
    .tag-color0{
        color: #409eff;
        border: 1px solid rgba(64,158,255,.2);
        background-color: rgba(64,158,255,.1);           
    }
    .tag-color1{
        background-color: rgba(103,194,58,.1);
        border-color: rgba(103,194,58,.2);
        color: #67c23a;
    }
    .tag-color2{
        background-color: rgba(144,147,153,.1);
        border-color: rgba(144,147,153,.2);
        color: #909399;
    }
    .tag-color3{
        background-color: rgba(230,162,60,.1);
        border-color: rgba(230,162,60,.2);
        color: #e6a23c;
    }
    .tag-color4{
        background-color: rgba(245,108,108,.1);
        border-color: rgba(245,108,108,.2);
        color: #f56c6c;       
    }

    .tag-color5{
        background-color: rgba(8,103,81,.1);
        border-color: rgba(8,103,81,.2);
        color: #086751;       
    }
    .tag-color6{
        background-color: rgba(8,101,139,.1);
        border-color: rgba(8,101,139,.2);
        color: #08658B;       
    }
    .tag-color7{
        background-color: rgba(185,29,85,.1);
        border-color: rgba(185,29,85,.2);
        color: #b91d55;       
    }
    // .tag-color0{  
    //     color: #fff;
    //     background:#409eff;    
    // }
    // .tag-color1{
    //     color: #fff;
    //     background:#67c23a;
    // }
    // .tag-color2{
    //     color: #fff;
    //     background:#909399;
    // }
    // .tag-color3{
    //     color: #fff;
    //     background:#e6a23c;
    // }
    // .tag-color4{
    //     color: #fff;
    //     background:#f56c6c;  
    // }

    // .tag-color5{
    //     color: #fff;
    //     background:#086751;     
    // }
    // .tag-color6{
    //     color: #fff;
    //     background:#08658B;      
    // }
    // .tag-color7{   
    //     color: #fff;
    //     background:#b91d55;   
    // }
</style>



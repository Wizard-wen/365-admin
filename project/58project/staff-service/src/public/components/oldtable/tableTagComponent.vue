<template>
    <div v-if="showList.length" class="tag-box">
        <div 
            class="tag-item-style"
            :class="'tag-color'+ (item.id%8)" 
            v-for="(item, index) in showList" :key="index">
            {{item.name}}
        </div>
        <!-- <el-tag 
            :size="'mini'" :key="index" :color="item.color" 
            v-for="(item, index) in showList" >{{item.name}}</el-tag> -->
    </div>
</template>
<script>
export default {
    data(){
        return {
            colorList: ['#409eff','#67c23a','#909399','#e6a23c','#f56c6c','#086751','#08658B','#b91d55']
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
    },
    computed: {
        showList(){
            let showList = []
            
            if(this.tableOriginData && this.propList.length){
                var arr = this.changeOriginData(this.tableOriginData)
                arr.forEach((item, index) =>{
                    if(this.propList.length){

                        let a = this.findTargetId(item,this.propList)
                        
                        if( a!=null && a.hasOwnProperty('id')){
                            showList.push(a)
                        }

                    }
                })
                showList = showList.reduce((arr,item,index) => {
                    return [
                        ...arr,
                        {
                            ...item,
                            color: this.colorList[index%8]
                        }
                    ]
                },[])
                return showList
            } else {
                return []
            }
        },
    },
    methods: {
        /**
         * 包装初始化数据
         */
        changeOriginData(val){
            // 如果是数组，直接返回
            if(Array.isArray(val)){return val}
            // 若是数字或者字符串类型，包装成数组，若是
            if(typeof val == 'number'  || typeof val == 'string'){
                return val == 0? [] : [Number(val)]
            } 
        },
        /**
         * 查找字段
         */
        findTargetId(targetId,arr){
            let targetObject = null;

            function findTagId(arr){
                for(var i = 0; i<arr.length; i++){
                    if(arr[i].id == targetId){
                        targetObject = arr[i]
                    } 
                    if(arr[i].children){
                        findTagId(arr[i].children)
                    }
                }
            }
            findTagId(arr)
            
            if(targetObject!=null){
                return targetObject
            }
        },
    },
}
</script>
<style lang="scss" scoped>
.tag-box{
    // width:200px;
    // display: flex;
    // justify-content: space-between;
    // flex-wrap: wrap;
    .tag-item-style{
        display: inline-block;
        padding: 0 10px;
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
</style>



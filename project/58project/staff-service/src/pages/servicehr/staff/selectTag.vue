<template>
    <div class="tag-box">
        <span 
            class="tag-element" 
            v-for="(item, index) in showTagList" 
            :key="index"
            @click="changeStatus(item)"
            :class="[item.isSelected? 'tag-color'+`${(index%5+1)}` : '']">{{item[setLabel.label]}}</span>
    </div>
</template>
<script>
export default {
    props: {
        /**
         * v-model数据
         */
        value: {
            default: function(){return []},
            type: Array,
        },
        /**
         * tag列表
         */
        propTagList: {
            default: function(){return []},
            type: Array,
        },
        /**
         * 是否单选
         */
        isSingle: {
            type: Boolean,
            default: true
        },
        /**
         * tag字段主键
         */
        setLabel: {
            default: function(){
                return {
                    mainKey:'id',//主键
                    label:'name',//标签名
                }
            },
            type: Object,
        }
    },
    data(){
        return {
            showTagList:[],//渲染的tag标签
        }
    },
    watch: {
        /**
         * v-model数据
         */
        value(val){
            this.changeValue(val)
        },
    },
    methods: {
        /**
         * 点击标签改变状态
         * des v-model返回的是数组，元素是主键属性
         */
        changeStatus(item){

            if(this.isSingle){
                //若是单选，直接返回被选中的主键属性               
                this.$emit('input',[item[this.setLabel.mainKey]])
            } else {
                //多选
                let inputArr = this.showTagList.reduce((arr, it, index) =>{
                    //改变当前被改变的元素的isSelecetd属性
                    if(it.id == item.id){
                        it.isSelected = !it.isSelected
                    }
                    //如果处于被选中状态，将主键属性插入数组
                    if(it.isSelected){
                        return arr.concat(it[this.setLabel.mainKey])
                    } else {
                        return arr
                    }
                },[])

                this.$emit('input',inputArr)
            }
        },
        /**
         * 渲染数据
         */
        changeValue(val){
            //加载渲染数组
            this.showTagList = this.propTagList.reduce((arr,item,index) =>{
                return arr.concat({
                    ...item,
                    isSelected: false,
                })
            },[])
            // 如果是单选
            if(this.isSingle){

                if(val.length){
                    //在数组中寻找选中标签
                    let selectedTag = this.showTagList.find((item, index) =>{
                        return item[this.setLabel.mainKey] == val[0]
                    })
                    
                    //若是在数组中可以找到选中标签，渲染数据
                    if(typeof selectedTag != 'undefined'){
                        this.showTagList.forEach((item, index) =>{
                            item.isSelected = false
                        })
                        selectedTag.isSelected = true
                    }
                }

            } else {
                this.showTagList = this.showTagList.reduce((arr,item, index) =>{
                    item.isSelected = false
                    val.forEach((it, index) =>{
                        if(item[this.setLabel.mainKey] == it){
                            item.isSelected = true
                        }
                    })
                    return arr.concat(item)
                },[])
            }
        },
    },
    mounted(){
        //加载渲染数组
        this.changeValue(this.value)
    }
}
</script>
<style lang="scss" scoped>
    .tag-box{
        width: 760px;
        padding: 10px;
    }
    .tag-element{
        display: inline-block;
        padding: 0 10px;
        margin: 8px 7px;
        height: 32px;
        line-height: 30px;
        font-size: 12px;
        border: 1px solid #fff;
        border-radius: 4px;
        box-sizing: border-box;
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



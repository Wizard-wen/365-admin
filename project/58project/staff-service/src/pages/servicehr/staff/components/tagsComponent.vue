<template>
    <div class="tag">
        <div class="tag-add" :style="{marginBottom: showList.length? '20px': ''}">
            <el-cascader
                clearable
                :options="optionList"
                v-model="selectedCascader"
                :props="setProps"
                placeholder="请选择技能">
            </el-cascader>
            <el-button icon="el-icon-plus" circle @click="addTag"></el-button>
        </div>
        <div class="tag-box" v-if="showList.length">
            <el-tag
                :style="{marginRight: (index+1)%5 == 0? '0': '10px'}"
                v-for="(tag, index) in showList"
                :key="index"
                @close="deleteTag(tag)"
                closable>{{tag.name}}</el-tag>
        </div>
    </div>
</template>
<script>
/**
 *
 */
export default {
    model:{
        prop: 'tagList',
        event: 'input',
    },
    props: {
        /**
         * 级联选择器字段定义
         */
        setProps:{
            default: function(){
                return {
                    label: 'name',
                    value: 'id'
                }
            },
            type: Object,
        },
        /**
         * 级联选择器渲染数组
         */
        optionList: {
            default: function(){
                return []
            },
            type: Array
        },
        /**
         * tag标签的
         */
        tagList: {
            default:function(){
                return []
            },
            type: Array
        },
        /**
         * tags 类别
         */
        tagName: {  
            default: "",
            type: String,
        },
        /**
         * 新的id键名
         */
        idkey: {
            default: "",
            type: String,
        }

    },
    watch: {
        tagList: function(val){
            if(Array.isArray(val)){
                this.showList = val
            }
        }
    },
    data(){
        return {
            //级联选择器被选中的数组
            selectedCascader: [],
            showList: this.tagList? this.tagList : [],
        }
    },
    methods: {
        /**
         * 添加标签
         */
        addTag(){

            let _this = this,
                tagItem = {};

            //判断是否已经选择级联选择器
            if(this.selectedCascader.length == 0){
                this.$message({
                    type:'error',
                    message: `请先选择${_this.tagName}`
                })
                return;
            }
            //判断是否已经存在这个字段
            let isHave = this.showList.some((item, index) =>{
                let length = _this.selectedCascader.length
                return item[_this.idkey] == _this.selectedCascader[length-1]
            })

            //如果标签已经存在
            if(isHave){
                this.$message({
                    type:'error',
                    message: `当前${_this.tagName}已存在，请重新选择`
                })
                this.selectedCascader = []
                return;
            }
            
            let selectedId = this.selectedCascader[this.selectedCascader.length -1]

            //更改组件视图
            findAreaObj(_this.optionList,  selectedId, _this.showList)

            //
            let newTagItem = {
                name: tagItem.name,
            }
            newTagItem[this.idkey] = tagItem.id


            // //触发组件v-model事件
            this.$emit('input', [...this.showList,newTagItem])


            this.showList = [...this.showList,newTagItem]
            this.selectedCascader = []//清空级联选择器

            /**
             * Tag数组添加方法
             * des 级联选择器控件拿到的格式是一个包含三级选项id的数组， [1000, 10001, 10002]
             *  该函数通过最后一级的id值，递归树，找到这个匹配的叶节点选项，并插入tag数组中
             */
            function findAreaObj(treeList, selectedId){

                for(var i = 0; i< treeList.length; i++){                   

                    if(treeList[i].children){
                        
                        findAreaObj(treeList[i].children, selectedId)
                    } else {
                        if(treeList[i].id == selectedId){
                            tagItem = treeList[i]
                        }
                    }
                }
            }
        },
        deleteTag(tag){
            let _this = this;

            this.showList.forEach((item, index) =>{
                if(item[_this.idkey] == tag[_this.idkey]){
                    _this.showList.splice(index, 1)
                }
            })
            this.$emit('input', this.showList)
        }
    },
}
</script>
<style lang="scss" scoped>
    .tag{
        width: 432px;
        .tag-add{
            width:100%;
        }
        .tag-box{
            width: 100%;
            // width: 432px;
            padding:10px;
            border:1px dashed #ccc;
            border-radius: 4px;
        }
    }
</style>



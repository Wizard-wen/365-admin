<template>
    <div class="tag-box">
        <span 
            class="tag-element" 
            v-for="(item, index) in value" 
            :key="index"
            @click="changeTag(item)"
            :class="[ item.type == 'enable'? `tag-color${(index%5+1)}` : '']">{{item[setLabel.label]}}</span>
        <el-button icon="el-icon-plus" circle @click="changeTag"></el-button>
        <config-tag-dialog
            v-if="tagDialogVisible"
            :openTagDialog="tagDialogVisible"
            @closeTagDialog="reloadPage"
            :workerConfigForm="workerConfigForm"></config-tag-dialog>
    </div>
</template>

<script>
import {configTagDialog} from './configTag'
export default {
    components: {
        configTagDialog
    },
    props: {
        /**
         * v-model数据
         */
        value: {
            default: function(){return []},
            type: Array,
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
        },
        /**
         * 当前tag组件的字段名
         */
        tableConfig:{
            default: '',
            type: String,
        }
    },
    data(){
        return {
            tagDialogVisible:false,//弹出框隐藏
            //tag配置项
            workerConfigForm: {},
        }
    },
    methods: {
        /**
         * 新增或编辑标签
         */
        changeTag(item){
            let workerConfigForm = {
                table: this.tableConfig
            }
            if(item){
                workerConfigForm = {
                    ...workerConfigForm,
                    ...item,
                }
            } 
            this.workerConfigForm = workerConfigForm
            this.tagDialogVisible = true
        },
        /**
         * 刷新上层页面
         */
        reloadPage(){
            this.tagDialogVisible = false
            this.$emit('reload') //刷新上层页面
        }
    },
    mounted(){
    }
}
</script>
<style lang="scss" scoped>
    .tag-box{
        width: 760px;
        padding:  8px 10px;
        border: 1px dashed #ccc;
        border-radius: 4px;
    }
    .tag-element{
        display: inline-block;
        padding: 0 12px;
        margin: 0px 14px 8px 0;
        height: 24px;
        line-height: 24px;
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



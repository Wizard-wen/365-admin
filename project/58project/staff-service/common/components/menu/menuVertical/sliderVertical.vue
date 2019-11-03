<template>
<div class="vertical-slider">
    <div 
        ref=""
        class="vertical-menu-item"
        :style="{background: backColor}"
        v-for="(item, index) in menulist"
        onselectstart="return false"
        :key="index">   
        <div 
            class="vertical-item-line" 
            @click="changeSpreadState(item, index)">
            <div 
                class="vertical-item-title" 
                :style="{fontSize: `${12-level *2}px`,textIndent: `${5 * level}px`,color: hightLightIndex == index?$styleConfig.$viColor : ''}">
                
                <div class="left-circle-box">
                    <i class="icon-position el-icon-eleme"></i>
                </div>
                <div class="title-text">{{item.title}}</div>
                <i 
                v-if="item.children"
                class="vertical-arrow"
                :class="(item.children && showState.isShow && (showState.shownIndex == index))? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
            </div>
        </div>
        <slider-vertical
            v-show="item.children && showState.isShow && (showState.shownIndex == index)"
            :menulist="item.children"
            :colorList="colorList"
            :level="levelProp"
            @changeHighState="changeHighLight"
            :highLight="highLight"></slider-vertical>
    </div>
</div>
    
</template>
<script>
import circle from '../../img/circle.svg'
import circleActive from '../../img/circle-active.svg'
export default {
    data(){
        return{
            /**
             * 判断菜单收拉的状态
             */
            showState: {
                isShow: false, //当前是否有菜单打开
                shownIndex: null,  //当前显示的节点索引
            },
            hightlight: 0,
            circle,//小图标
            circleActive,
        }
    },
    props: {
        menulist: {
            type: Array,
            default : function(){
                return []
            }
        },
        level: {
            type: Number,
            default: 0
        },
        colorList: {
            type: Array,
            default: function(){
                return []
            }
        },
        /**
         * 高亮的数组
         */
        highLight: {
            default:function(){
                return []
            },
            type: Array
        }
    },
    computed : {
        /**
         * 传入子组件的层级数组信息
         * level1 [0]
         * level2 [0,1]
         */
        levelProp(){
            return this.level+1
        },
        /**
         * 本级菜单的背景色
         */
        backColor(){
            return this.colorList[this.level]
        },
        /**
         * 高亮的索引
         */
        hightLightIndex(){

            let i = 0
                
            if(this.menulist.length){
                var componentLevel = this.menulist[0].level //当前层的item.level信息
            }

            if(this.level ==0){
                //如果层级在第一层
                return Number(this.highLight[this.level])
            } else {

                while(i < this.level){
                    if(this.highLight[i] ==componentLevel[i]){
                        i++;
                    }else{
                        break;
                    }
                }
                if(i == this.level){
                    return Number(this.highLight[this.level])
                }
            }
        }
    },
    methods: {
        /**
         * case 1 当前是叶节点
         *      直接跳转路由
         * case 2 当前不是叶节点
         *      若当前状态是展开的，则收起
         *      若当前状态是收起的，则收起当前被展开的，同时打开当前菜单。
         * @param item 当前被点击的元素信息
         * @param index
         */
        changeSpreadState(item, index){
            
            //该节点为叶节点
            if(!item.hasOwnProperty('children')){
                this.$router.push(item.router)
                this.showState.isShow = false
                //通知上层改变高亮的状态
                this.$emit('changeHighState',item.level)
            } else {
                if(this.showState.shownIndex == index){
                    this.showState.isShow = false
                    this.showState.shownIndex = null
                } else {
                    this.showState.isShow = true
                    this.showState.shownIndex = index
                }
            }
        },
        /**
         * 
         */
        changeHighLight(item){
            this.$emit('changeHighState',item)
        },
    },
}
</script>
<style scoped lang="scss">
    .vertical-slider{

    }

    .vertical-menu-item{
        /* height: 40px; */
        width: 100%;
        color: #fff;
        cursor: pointer;
    }
    .vertical-item-line{
        position: relative;
        height: 40px;
        width: 100%;
    }
    .vertical-item-icon{
        float: left;
        height : 40px;
        width : 40px;
        text-align: center;
        line-height: 40px;
    }
    
    .vertical-item-title{
        display: flex;
        position : relative;
        height : 40px;
        width :100%;
        line-height: 40px;
        cursor: pointer;
        &:hover{
            color : $viColor
        }
        .left-circle-box{
            height: 40px;
            width: 40px;
            text-align: center;
            line-height: 40px;
            .icon-position{
                font-size: 14px;
                
            }
        }
        .title-text{
            flex:1;
        }
        //右侧箭头
        .vertical-arrow{
            position:absolute;
            right: 10px;
            top: calc(50% - 6px);
        }
    }
    
    .vertical-arrow-transform{
        transform: rotate(180deg);
    }
</style>




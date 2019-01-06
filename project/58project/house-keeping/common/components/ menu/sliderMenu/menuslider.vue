<template>
    <div
        class="menubox"
        ref="list"
        :style="{height : `calc(100vh - 50px)`, background : liststyle.color}">
        <ul style="padding-top : 15px;">
            <li
                class="menuline"
                v-for="(item,index) in menulist"
                ref="menuline"
                :key="index"
                :style="{position : 'relative',background : (index == liststyle.ind) ? liststyle.hovercolor : undefined}"
                @mouseenter="shownextmenu(item.children, index)"
                @click="chosenmenu(item, index, item.router)">
                <p class="icon" >
                    <Icon 
                        :type="item.icon? item.icon : 'md-radio-button-off'" 
                        size='18' 
                        class="icon-position" 
                        :style="{color : (index == liststyle.ind  || index== selectedLevelHigh) ? '#42AAFA' : '#fff'}"/>
                </p>
                <p class="title" v-if="showWord" >
                    <span class="titlestyle" :title="item.title">{{item.title}}</span>
                    <Icon
                        v-if="item.children && !(index == liststyle.ind)"
                        type="ios-arrow-forward"
                        size="15"
                        class="arrow-position" />
                </p>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props : {
        //父组件传入的数据
        datalist : {
            dafault : [],
            type : Array
        },
        //是否闭合
        isClose : {
            default : false,
            type : Boolean
        },
        //收起宽度
        siderWidth : {
            default : 180,
            type : Number
        },
        //目录层级
        level: {
            default : 0,
            type : Number
        },
        //当前被选中层级
        menuName : {
            default : [],
            type : Array
        },
        //当前样式
        liststyle : {
            type : Object,
            default : function(){
                return {}
            }
        },
        /**
         * 第一级目录高亮索引
         * 若未选中任何子目录，则始终是第一级index == 0的项高亮
         * 若点击子目录之后，则切为子目录所属的第一级目录的索引高亮
         */
        selectedHighLight : {
            type : Array,
            default : []
        }
    },
    watch :{
        'siderWidth' : function(val){
            if(this.level == 0){
                this.$refs.list.style.width = this.siderWidth+'px'
            }
        },
    },
    computed : {
        /**
         * 父级目录层级
         */
        fatherlevel(){
            return this.datalist[0].level.split('-')
        },
        /**
         * 当前目录层列表数据
         * from prop
         */
        menulist(){
            return this.datalist
        },
        //高亮的索引
        highind(){
            if(Array.isArray(this.menuName) && this.menuName[this.level]){
                return this.menuName[this.level].index
            }
        },
        /**
         * 第一级目录的文字可以收起
         */
        showWord(){
            if(this.isClose && this.level == 0){
                return 0
            } else {
                return 1
            }
        },
        /**
         * 各层级高亮的索引判断
         */
        selectedLevelHigh(){
            let length = this.fatherlevel.length
            if(this.fatherlevel.reduce((bool, item, index) =>{

                if(index < length -1){
                    return bool && item == this.selectedHighLight[index]
                } else {
                    return bool && true
                }   
            },true)){
                return this.selectedHighLight[this.level + 1]
            }
        }
    },
    methods : {
        /*
            listchild 当前滑过元素的子元素
            index 当前元素索引
        */
        shownextmenu(listchild,index){
            // level 当前元素层级
            this.$emit('changelist',listchild, index, this.level)
        },
        //点击后改变面包屑导航
        chosenmenu(item, index, router){
            if(!item.children){
                // this.$emit('onchosenmenu', index, this.level, router)
                this.$emit('onchosenmenu', router)
                this.$router.push(router)
            }   
            
        }
    }
}
</script>
<style scoped>
    ul,li{ padding:0;margin:0;list-style:none}

    .menubox{
        float: left;
        /* background: rgba(7,19,46,0.9); */
        background: #333;
        width: 180px;
    }



    .menuline{
        /* background: #262626; */
        height: 40px;
        width: 100%;
        color: #bbb;
        cursor: pointer;
        /* position : relative; */
    }


    .menuline:hover{
        background: #444;
    }



    .icon{
        float : left;
        height : 40px;
        width : 40px;
        position : relative;
    }
    .icon-position{
        position :absolute;
        left : 11px;
        top : 11px;
    }


    .title{
        float :right;
        position : relative;
        height : 40px;
        width : 140px;
        line-height: 40px;
    }
    .title:hover{
        color : #42AAFA
    }

    .titlestyle{
        color : #ddd;
        display: inline-block;
        height : 40px;
        width : 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    .arrow-position{
        position : absolute;
        right : 10px;
        top : 12px;
    }
    .icon-position:hover{
        color : #42AAFA
    }

</style>



<template>
    <div class="search-box" >
        <div class="search-label" @click="toggle">{{queryName}}</div>
        <div class="search-list" v-if="isShow">
            <div class="list-item" :class="item.isSelected? 'list-item-active' : ''" v-for="(item, index) in showQueryList" :key="index" @click="addQuery(item)">
                <span class="list-item-block" :class="'list-item-color'+(index+1)%5"></span>
                {{item.name}}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            isShow:false, //是否展示列表
            showQueryList:[], //展示的列表
            queryedList: [], //当前筛选的字段
        }
    },
    props: {
        /**
         * 查询参数字段列表
         */
        queryList: {
            type: Array,
            default: function(){return []}
        },
        /**
         * 查询参数名
         */
        queryName:{
            type: String,
            default: ''
        },
        /**
         * vuex 中存储的查询参数键名
         */
        queryKey: {
            type:String,
            default:''
        }
    },
    watch: {
        queryList(val, oldVal){
            if(oldVal.length == 0 && val.length!=0){
                this.showQueryList = this.queryList.map((item, index) =>{
                    return {
                        ...item,
                        isSelected :false
                    }
                })
            }
        }
    },
    mounted(){
        //渲染初始数据
        this.showQueryList = this.queryList.map((item, index) =>{
            return {
                ...item,
                isSelected :false
            }
        })
    },
    methods: {
        /**
         * 切换显示隐藏
         */
        toggle(){
            this.isShow = !this.isShow
        },
        /**
         * 改变查询条件
         */
        addQuery(item){
            
            item.isSelected = !item.isSelected;
            
            // 清空id数组
            this.queryedList = [];
            
            this.showQueryList.forEach((item, index) =>{
                if(item.isSelected){
                    this.queryedList.push(item.id)
                }
            })

            //将查询组件数据变化存入vuex
            this.$store.commit('setQueryList', {
                queryKey: this.queryKey, 
                queryedList: this.queryedList
            })

            //更新表格数据
            this.$emit('updateTable')
        }
    }
}
</script>
<style lang="scss" scoped>
    .search-box{
        // height:40px;
        width:100%;
        .search-label{
            height: 30px;
            width: 100%;
            line-height: 30px;
            color: #333;
            text-indent: 25px;
            background: #D9DEE4;
            cursor: pointer;
            position:relative;
            &:after{
                position:absolute;
                bottom: 0;
                left: 0;
                content: '';
                display: block;
                height:1px;
                width:100%;
                background: #fff;
            }
        }
        .search-list{
            // display: none;
            .list-item{
                height:30px;
                line-height: 30px;
                width:100%;
                text-indent:30px;   
                background: #eaedf1;
                color: #333;
                font-size: 12px;
                cursor: pointer;
                position: relative;
                &:hover{
                    background: #fff;
                }
                .list-item-block{
                    position: absolute;
                    height: 5px;
                    width:5px;
                    border-radius: 50%;
                    left: 12.5px;
                    top:12.5px;
                }
            }
            .list-item-active{
                &:after{
                    content: "\E643";
                    text-align: center;
                    font-weight: 400!important;
                    text-decoration: none!important;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                    -webkit-text-stroke-width: .22px;
                    position: relative;
                    font-family: hbicon;
                    padding-left: 1px;
                    font-size: 13px;
                    color: #008ed2;
                    font-weight: 700;
                    position: absolute;
                    right: 10px;
                }
            }
        }
    }
    .list-item-color1{
        background: #409eff;
        // border: 1px solid rgba(64,158,255,.2);
        // background-color: rgba(64,158,255,.1);           
    }
    .list-item-color2{
        // background-color: rgba(103,194,58,.1);
        // border-color: rgba(103,194,58,.2);
        background: #67c23a;
    }
    .list-item-color3{
        // background-color: rgba(144,147,153,.1);
        // border-color: rgba(144,147,153,.2);
        background: #909399;
    }
    .list-item-color4{
        // background-color: rgba(230,162,60,.1);
        // border-color: rgba(230,162,60,.2);
        background: #e6a23c;
    }
    .list-item-color5{
        // background-color: rgba(245,108,108,.1);
        // border-color: rgba(245,108,108,.2);
        background: #f56c6c;       
    }
</style>



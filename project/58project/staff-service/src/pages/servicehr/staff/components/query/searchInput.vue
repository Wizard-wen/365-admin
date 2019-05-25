<template>
    <div class="search-box" >
        <div class="search-label" @click="toggle">
            {{queryName}}
            <i class="arrow-position" :class="isShow?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
        </div>
        <div class="search-list" v-if="isShow">
            <input type="text" class="input">
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            isShow:false, //是否展示列表
        }
    },
    props: {
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
    mounted(){

    },
    methods: {
        /**
         * 切换显示隐藏
         */
        toggle(){
            this.isShow = !this.isShow
        },

    }
}
</script>
<style lang="scss" scoped>
    .search-box{
        // height:40px;
        width:100%;
        .search-label{
            height: 39px;
            width: 100%;
            line-height: 39px;
            color: #333;
            text-indent: 25px;
            background: #D9DEE4;
            cursor: pointer;
            position:relative;
            .arrow-position{
                position: absolute;
                right:10px;
                // height: 12px;
                // width:12px;
                font-size:12px;
                top: 13px;
            }
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
            height: 40px;
            width: 100%;
            padding: 6px 0 6px 25px;
            // position: relative;
            // &:after{
            //     position:absolute;
            //     bottom: 0;
            //     left: 0;
            //     content: '';
            //     display: block;
            //     height:1px;
            //     width:100%;
            //     background: #fff;
            // }
            .input{
                box-sizing: border-box;
                margin: 0 auto;
                height: 27px;
                width: 175px;
                display: block;
                outline: none;
                border: none;
                padding-left: 10px;
            }
        }
    }

</style>



<template>
    <div class="layoutbox">
        <div class="">
            <!-- 用户header，可供用户扩展 -->
            <header  ref="header" >
                <slot name="header" ></slot>
            </header>
            <!-- 用户content，包括导航栏和router-view -->
            <div class="content">
                <!-- 菜单栏 -->
                <div class="sider"  :style="{height: `calc(100vh - ${headerHeight}px)`, width : `${siderWidth}px`,position : 'relative'}">

                    <!-- 菜单组件 -->
                    <menu-box
                        v-if="menuState == 1"
                        :datalist="menuNav"
                        :isClose="isClose"
                        :siderWidth="siderWidth"
                        :style="{position : 'absolute', zIndex : '4'}"></menu-box>
                    <menu-vertical
                        v-else-if="menuState == 2"
                        :datalist="menuNav"></menu-vertical>
                    <menu-spread
                        v-else
                        :datalist="menuNav"></menu-spread>
                    <!-- 菜单缩进 -->
                    <div class="menucontrol" :style="{width : `${siderWidth}px`}" v-if="menuState == 1">
                        <div class="icon-place" v-if="closeAble">
                            <i class="el-icon-menu icon-position" type="md-menu" size="18" @click="changesider"></i>
                        </div>
                    </div>
                </div>
                <div
                    class="contentshow"
                    :style="{height: `calc(100vh - ${headerHeight}px)`,width : `calc(100% - ${siderWidth}px`}"
                    ref="content">
                    <div class="banner">
                        <i @click="goback" class="el-icon-back banner-back" ></i>
                        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
                            <el-breadcrumb-item v-for="item in breadcrumb">item</el-breadcrumb-item>
                        </el-breadcrumb> -->
                    </div>
                    <div class="router-contains">
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import MenuBox from '../menu/sliderMenu/menubox.vue'
import menuVertical from '../menu/menuVertical/menuVertical.vue'
import menuSpread from '../menu/menuspread/menuSpread.vue'



export default {
    props :{
        //导航列表
        menuNav: {
            type: Array,
            required: true
        },
        //是否可以关闭
        closeAble :{
            type : Boolean,
            default : true
        },
        //导航菜单展现形式 1为侧拉 2为竖拉
        menuState:{
            type: Number,
            default:1
        }
    },
    data(){
        return {
            headerHeight : 50, //头部高
            siderWidth : 180,
            isClose : false
        }
    },
    computed:{
        /**
         * 面包屑导航数据
         */
        breadcrumb(){   
            // return store.state.loginModule.user.routerNavigator[this.$route.path]
        }
    },
    methods : {
        headerSizeChange(){
            this.headerHeight = this.$refs.header ? this.$refs.header.clientHeight : 0
        },
        //收起sider
        changesider(){
            if(this.isClose){
                this.siderWidth = 180
                this.isClose = false
            } else {
                this.siderWidth = 40
                this.isClose = true
            }
        },
        /**
         * 返回上一级
         */
        goback(){
            this.$router.go(-1)
        }
    },
    components : {
        MenuBox : MenuBox,
        menuVertical,
        menuSpread
    }
}
</script>
<style scoped lang="scss">
    .layoutbox{
        height : 100vh;
        position : relative;
        overflow: hidden;
    }
    .sider{
        float: left;
        position : relative;
        background: #333;
    }
    .contentshow{
        float :right;
        // overflow-y: auto;
        background-color: #f2f2f2 !important;
        padding: 0px 30px 0px 30px;
        .banner{
            height:50px;
            width:100%;
            background: #f2f2f2;
            position: relative;
            .banner-back{
                position:absolute;
                top: 5px;
                height: 40px;
                width:40px;
                font-size: 25px;
                line-height: 40px;
                text-align: center;
                cursor: pointer;
            }
        }
        .router-contains{
            overflow-y: auto;
            height:100%;
            width:100%;
            border-radius: 6px;
            background: #fff;
            padding:20px;
        }
    }
    .routercontent{
        height : 100%;
        width :100%;    
        padding: 10px;
            overflow-y: auto;
            border-radius :4px;
            border: 1px solid #ddd;
            box-shadow: 0 2px 3px 0 rgba(0,0,0,.2);
    }
    .menucontrol{
        position : absolute;
        z-index : 10;
        height : 40px;
        background-color: #333;
        border-top: 1px solid #262626;
        bottom : 0px;
        left : 0px;
        right : 0px;
    }
    .icon-place{
        height : 40px;
        width : 100%;
        position : relative;
    }
    .icon-position{
        position : absolute;
        cursor: pointer;
        right : 12.5px;
        bottom : 10px;
        color : #fff;
    }
    .icon-position:hover{
        color : #42AAFA
    }
</style>



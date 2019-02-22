<template>
    <div class="layoutbox">
        <div class="">
            <div class="header" ref="header">
                <div class="logo">
                    365后台管理系统
                </div>
                <div class="header-right">
                    <div class="breadcrumb-box">
                        <el-breadcrumb class="breadcrumb">
                            <el-breadcrumb-item 
                                v-for="(item,index) in breadcrumb" 
                                :key="index">{{item}}</el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                    <div class="user">
                        <img :src="minePic" alt="">
                        <el-dropdown @command="handleCommand">
                            <span class="el-dropdown-link">
                                {{`您好！${$store.state.loginModule.user.username}`}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="1">注销</el-dropdown-item>
                                <el-dropdown-item>我的</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
                
            </div>

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
                    <div class="router-contains" v-loading="isLoaded">
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

//侧拉菜单
import menuBox from '../menu/menuBox/menuBox.vue'
import menuVertical from '../menu/menuVertical/menuVertical.vue'
import menuSpread from '../menu/menuSpread/menuSpread.vue'

//图片
import minePic from '../img/mine.svg'

//service方法
import loginService from '../../service/loginService.js'

export default {
    data(){
        return {
            headerHeight : 50, //头部高
            siderWidth : 180,
            isClose : false,
            breadcrumb: [],//面包屑导航
            minePic,//我的图标
        }
    },
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
        },
    },
    computed:{
        isLoaded(){
            return store.state.loadingModule.isLoading
        }
    },
    watch: {
        $route: {
            handler: function(val, oldVal){
                if(store.state.loginModule.user.routerNavigator[val.path])
                    this.breadcrumb = store.state.loginModule.user.routerNavigator[val.path]
                else 
                    console.log(-1);
            },
            // 深度观察监听
            deep: true
        }
    },
    methods : {
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
         * 下拉菜单
         */
        handleCommand(type){
            if(type == '1'){
                loginService.logout()
                this.$router.push('/login')
            }
        }
    },
    components : {
        menuBox,
        menuVertical,
        menuSpread
    },
    async mounted(){
        //面包屑导航
        this.breadcrumb = store.state.loginModule.user.routerNavigator[this.$route.path]
    }
}
</script>
<style scoped lang="scss">
    .layoutbox{
        height : 100vh;
        position : relative;
        overflow: hidden;
        .header{
            height:50px;
            width:100%;
            display: flex;
            background: #fafafa;
            border-bottom:1px solid #e8e8e8 ;
            .logo{
                position: relative;
                height:50px;
                line-height: 50px;
                color:#fff;
                text-align: center;
                width:180px;
                background: #333;
                
                &:after{
                    content : '';
                    position: absolute;
                    height : 1px;
                    width : 100%;
                    bottom: 0;
                    left: 0;
                    background: hsla(0,0%,100%,.1);
                }
            }
            .header-right{
                height: 50px;
                width: calc(100% - 180px);
                padding: 0 30px;
                .breadcrumb-box{
                    height: 50px;
                    width: 300px;
                    float: left;
                    .breadcrumb{
                        & /deep/ .el-breadcrumb__item{
                            display: inline-block;
                            height: 50px;
                            line-height: 50px;
                            color:#fff;
                        }
                    }
                }
                .user{
                    float:right;
                    font-size: 14px;
                    line-height: 20px;
                    padding: 10px 0;
                    img{
                        height: 20px;
                        width: 20px;
                    }
                }
            }
            
        }
        .content{
            .sider{
                float: left;
                position : relative;
                background: #333;
                .menucontrol{
                    position : absolute;
                    z-index : 10;
                    height : 40px;
                    background-color: #333;
                    border-top: 1px solid #262626;
                    bottom : 0px;
                    left : 0px;
                    right : 0px;
                    .icon-place{
                        height : 40px;
                        width : 100%;
                        position : relative;
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
                    }
                }
            }
            .contentshow{
                float :right;
                background-color: #f2f2f2 !important;
                .router-contains{
                    overflow-y: auto;
                    min-height: calc(100vh - 50px);
                    height:100%;
                    width:100%;
                    background: #fff;
                }
            }
        }
    }
</style>



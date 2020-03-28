<template>
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
                <Icon class="icon-position" type="md-menu" size="18" @click="changesider"></Icon>
            </div>
        </div>
    </div>
</template>
<script>

import menuBox from './menuBox/menuBox.vue'
import menuVertical from './menuVertical/menuVertical.vue'
import menuSpread from './menuspread/menuSpread.vue'

export default {
    data(){
        return {
            headerHeight : 50, //头部高
            siderWidth : 180,
            isClose : false
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
        }
    },
    components : {
        menuBox,
        menuVertical,
        menuSpread
    }
}
</script>


<template>
    <div class="icon-box" :style="{height: `${height}px`, width: `${width}px`}">
        <img 
            v-if="iconUrl"
            class="icon-image"
            :style="{height: `${height}px`, width: `${width}px`,borderRadius: displayType == 'circle'? '50%' : ''}" 
            :src="`./resource/${iconUrl}`" alt="" >
        <div 
            v-else
            class="no-icon-style" 
            :style="{height: `${height}px`, width: `${width}px`,borderRadius: displayType == 'circle'? '50%' : ''}" >暂无头像</div>
    </div>
</template>

<script>
export default {
    props: {
        /**
         * 头像展示组件
         */
        iconUrl: {
            defalut: '',
            type: String,
        },
        height: {
            type: Number | String,
            default: 120
        },
        width: {
            type: Number | String,
            default: 120
        },
        /**
         * 头像展现形式
         *  circle 圆 square 方
         */
        displayType: {
            type: String,
            default: 'square'
        }
    }
}
</script>

<style lang="scss" scoped>
.icon-box{
    .no-icon-style{
        height: 120px;
        width: 120px;
        line-height: 120px;
        text-align: center;
        color: #fff;
        background: rgba(0,0,0,0.3)
    }
}

</style>
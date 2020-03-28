<template>
    <div :class="['detail-item-box', sizeStyleClass]">
        <div class="detail-item" v-if="label">
            <p class="detail-title" :style="{width: `${labelWidth}px`}">{{label}}：</p>
            <div class="detail-contains">
                <template v-if="type == 'original'">
                    <template v-if="value">
                        <p class="detail-type-text" >{{value}}</p>
                    </template>
                    <template v-else>
                        <p class="detail-type-text" >-</p>
                    </template>
                </template>
                <template v-else>
                    <slot name="template"></slot>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            default: ''
        },
        size: {
            type: Number | String,
            default: 1,
        },
        value: {
            type: String | Array| Object,
            default: ''
        },
        /**
         * 是否按原始字符显示
         * @param original 按原始值展示
         * @param template 按模板展示
         */
        type: {
            type: String,
            default: 'original'
        },
        labelWidth: {
            type: Number,
            default: 120,
        }
    },
    computed: {
        /**
         * 详情尺寸
         */
        sizeStyleClass(){
            if(this.size == 1){
                return 'line-list'
            } else if(this.size == 2){
                return 'line-two-list'
            } else if(this.size == 23){
                return 'list-two-three-list'
            } else {
                return 'line-three-list'
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.detail-item-box {
    .detail-item{
        width: 100%;
        display: flex;
        justify-content: flex-start;
        margin-bottom: 16px;
        line-height: 30px;
        .detail-title{
            text-align: right;
            line-height: 30px;
            margin-right: 20px;
            color: rgba(0,0,0,.85);
        }
        .detail-contains{
            flex: 1;
            .detail-type-text{
                line-height: 30px;
                color: rgba(0,0,0,.85);
            }
        }
    }
}
.line-three-list{
    width: 33%;
}
.list-two-three-list{
    width: 66%
}
.line-two-list{
    width: 50%;
}
.line-list{
    width: 100%;
}
</style>
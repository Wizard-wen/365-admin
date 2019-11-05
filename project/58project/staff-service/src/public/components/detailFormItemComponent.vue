<template>
    <div :class="['detail-item-box','abc', sizeStyleClass]">
        <div class="detail-item">
            <p class="detail-title">{{label}}：</p>
            <div class="detail-contains">
                <template v-if="value && valueType!='string'">
                    <slot name="define"></slot>
                </template>
                <template v-else-if="value && valueType == 'string'">
                    <p class="detail-type-text" >{{value}}</p>
                </template>
                <template v-else>
                    <p class="detail-type-text" >-</p>
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
            } else {
                return 'line-three-list'
            }
        },
        valueType(){
            if(typeof this.value == 'string'){
                return 'string'
            } else if(Array.isArray(this.value)){
                return 'array'
            } else {
                return 'object'
            }
        }
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
            width: 120px;
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
        // .detail-picture-box{
        //     display: flex;
        //     .contract-picture{
        //         margin: 0 15px 15px 0;
        //         width: 210px;
        //         height: 297px;
        //         & img{
        //             width: 210px;
        //             height: 297px;
        //         }
        //     }
        // }
        
        // .detail-photo-list{
        //     display: flex;
        //     flex-wrap: wrap;
        //     .icon-box{
        //         height: 150px;
        //         margin-right: 20px;
        //         .icon-style{
        //             height: 150px;
        //         }
        //     }
        // }
    }
}
.line-three-list{
    width: 33%;
}
.line-two-list{
    width: 50%;
}
.line-list{
    width: 100%;
}
</style>
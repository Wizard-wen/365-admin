<template>
    <div class="card-box">
        <div class="title">
            <div class="title-contains">
                <div class="left">{{title}}</div>
                <div class="right">
                    <slot name="control"></slot>
                </div>
            </div>
        </div>
        <div class="contains">
            <slot name="contains"></slot>
        </div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        /**
         * 标题
         */
        title: {
            default: '',
            type: String,
        },

    }
}
</script>

<style lang="scss" scoped>
.card-box{

    width: 100%;
    background: #fff;
    margin-bottom: 24px; 
    .title{
        min-height: 48px;
        margin-bottom: -1px;
        padding: 0 24px;
        color: rgba(0,0,0,.85);
        font-weight: 500;
        font-size: 16px;
        background: transparent;
        border-bottom: 1px solid #e8e8e8;
        border-radius: 2px 2px 0 0;
        zoom: 1;
        .title-contains{
            display: flex;
            align-items: center;
            .left{
                display: inline-block;
                flex: 1 1;
                padding: 16px 0;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .right{
                // flex: 1;
            }
        }

    }
    .contains{
        box-sizing: border-box;
        padding: 24px;
        &:after{
            content: '';
            display: block;
            clear: both;
        }
        .line-three-list{
            float: left;
            width: 33%;
            line-height: 30px;
        }
        .line-two-list{
            float: left;
            width: 50%;
            line-height: 30px;
        }
        .line-list{
            float: left;
            width: 100%;
            line-height: 30px;
        }
        .change{
            margin-left: 15px;
            display: inline-block;
            color: $viColor;
            line-height: 30px;
            height: 30px;
            font-size: 12px;
            cursor: pointer;
            & img{
                height: 30px;
                width: 30px;
                vertical-align: middle;
            }
        }
    }
}
</style>
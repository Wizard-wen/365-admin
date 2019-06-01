<template>
    <div class="pageEdit">
        <div class="edit-header">
            <div class="edit-name">
                <h4>{{title}}</h4>
            </div>
            <div class="btn-group">
                <slot name="control"></slot>
            </div>
            <div class="edit-detail">
                <slot name="detail"></slot>
            </div>
        </div>
        <div class="page-edit-contains">
            <div class="form-box">
                <div class="form-size">
                    <slot name="form"></slot>
                </div>
            </div>
            <slot name="log"></slot>
        </div>
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: {
        /**
         * 编辑页
         */
        title: {
            type: String,
            default: ''
        }
    },
    data(){
        return {

        }
    },
    methods: {

    }
}
</script>
<style lang="scss" scoped>
    .pageEdit{
        min-height: calc(100vh - 50px);
        width: 100%;
        background: #f0f2f5; 
        .edit-header{
            background: #fff;
            padding: 30px 24px 10px 24px;
            position: relative;
            .edit-name{
                line-height: 28px;
                font-size: 20px;
                font-weight: 700;
            }
            .btn-group{
                & /deep/ .el-button{
                    margin-left: 0px; 
                }
                position: absolute;
                right: 24px;
                top: 20px;
            }
            .edit-detail{
                padding-top: 12px;
                display: flex;
            }
        }
        .page-edit-contains{
            margin: 24px 24px 0;
            display: flex;
            .form-box{
                padding: 24px;
                flex:1;
                background: #fff;
                // margin: 0 auto;
                .form-size{
                    width: 100%;
                    margin: 0 auto;
                }
            }
            .log-box{
                // padding: 24px;
                background: #fff;
                // width: 300px;
                // margin-left: 24px;
            }
        }
    }
</style>



<template>
    <div class="pageEdit">
        <div class="edit-header">
            <div class="header-contains">
                <slot name="icon"></slot>
                <div class="detail-box">
                    <div class="detail-box-header">
                        <h2>{{title}}</h2>
                        <div class="control">
                            <slot name="control"></slot>
                        </div>
                    </div>
                    <div class="detail-box-contains">
                        <div class="left-contains">
                            <slot name="detail"></slot>
                        </div>
                        <div class="right-contains">
                            <slot name="statistic"></slot>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-edit-contains">
            <!-- <div class="form-box">
                <div class="form-size"> -->
            <slot name="form"></slot>
                <!-- </div> -->
            <!-- </div> -->
            <!-- <slot name="log"></slot> -->
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
            default: '配置页'
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
            padding: 24px 24px 12px 24px;
            .header-contains{
                display: flex;
                width: 100%;
                .detail-box{
                    flex: 1;
                    margin-left: 10px;
                    .detail-box-header{
                        display: flex;
                        height: 32px;
                        width: 100%;
                        justify-content: space-between;
                        h2{
                            line-height: 32px;
                        }
                    }
                    .detail-box-contains{
                        padding-top: 12px;
                        display: flex;
                        .left-contains{
                            flex: 1;
                        }
                        .right-contains{
                            min-width: 242px;
                            margin-left: 88px;
                            text-align: right;
                        }
                    }
                }
            }
            .btn-group{
                & /deep/ .el-button{
                    margin-left: 0px; 
                }
                position: absolute;
                right: 24px;
                top: 20px;
            } 
        }
        .page-edit-contains{
            padding: 24px;
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



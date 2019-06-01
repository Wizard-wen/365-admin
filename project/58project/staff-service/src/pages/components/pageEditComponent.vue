<template>
    <div class="pageEdit">
        <div class="edit-header">
            <div class="edit-name">
                <h4>{{title}}</h4>
            </div>
            <div class="btn-group">
                <el-button size="mini" @click="goback">返回</el-button>
                <el-button size="mini" @click="edit">修改</el-button>
            </div>
            <!-- <div class="edit-detail">
                <div class="detail-left">
                    <div class="detail-left-box">
                        <div class="detail-left-line">创建人：</div>
                        <div class="detail-left-line">创建时间：</div>
                        <div class="detail-left-line">门店类型：{{shopDetail.is_third == 1 ? '直营店': shopDetail.is_third == 2 ?'加盟店': ''}}</div>
                        <div class="detail-left-line">门店负责人：</div>
                        <div class="detail-left-line">门店状态：{{shopDetail.type == 'enable'?'正常':'停业'}}</div>
                        <div class="detail-left-line">门店地址：{{shopDetail.address}}</div>
                    </div>
                </div>
                <div class="detail-right">
                    <div class="right-box">
                        <div class="title">状态</div>
                        <div class="value">{{shopDetail.type == 'enable'?'正常':'停业'}}</div>
                    </div>
                    <div class="right-box">
                        <div class="title">员工数量</div>
                        <div class="value">4</div>
                    </div>
                </div>
            </div> -->
        </div>
        <div class="page-edit-contains">
            <div class="form-box">
                <slot name="form"></slot>
            </div>
        </div>
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
        goback(){
            this.$emit('goback')
        },
        edit(){
            this.$emit('edit')
        }
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
            padding: 30px 24px 24px 24px;
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
                .detail-left{
                    flex:1;
                    .detail-left-box{
                        display: flex;
                        flex-wrap: wrap;
                        .detail-left-line{
                            width: 50%;
                            color: rgba(0,0,0,.65);
                            line-height: 20px;
                            padding-bottom: 8px;
                        }
                    }
                }
                .detail-right{
                    min-width: 400px;
                    display: flex;
                    .right-box{
                        height: 80px;
                        width: 50%;
                        .title{
                            color: rgba(0,0,0,.45);
                            font-size: 14px;
                            line-height: 1.5;
                        }
                        .value{
                            font-size: 20px;
                            color: rgba(0,0,0,.85);
                            line-height: 1.5;
                        }
                    }
                }
            }
        }
        .page-edit-contains{
            margin: 24px 24px 0;
            background: #fff;
            padding: 24px;
            .form-box{
                width: 780px;
                margin: 0 auto;
            }
        }
    }
</style>



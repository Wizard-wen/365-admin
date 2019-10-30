<template>
    <card-box-component
        :title="'签约客户信息'">
        <template slot="contains">
            <div class="detail-show-module">
 
                <div class="detail-item-box line-two-list">
                    <div class="detail-item">
                        <p class="detail-title">姓名：</p>
                        <p class="detail-type-text">{{signedUserDetailObject.sign_user_name}}</p>
                    </div>
                </div>
                <div class="detail-item-box line-two-list">
                    <div class="detail-item">
                        <p class="detail-title">电话：</p>
                        <p class="detail-type-text">{{signedUserDetailObject.sign_user_phone}}</p>
                    </div>
                </div>
                <div class="detail-item-box line-two-list">
                    <div class="detail-item">
                        <p class="detail-title">身份证号：</p>
                        <p class="detail-type-text">{{signedUserDetailObject.sign_user_identify}}</p>
                    </div>
                </div>
                <div class="detail-item-box line-two-list"></div>
            </div>
        </template>
    </card-box-component>
</template>

<script>
export default {
    props: {
        /**
         * 合同基本信息
         */
        signedUserDetailObject: {
            type: Object,
            default: function(){return {}}
        }
    },
}
</script>

<style lang="scss" scoped>
.detail-show-module{
    width: 100%;
    display: flex;
    flex-wrap:  wrap;
    justify-content: space-between;
    .detail-item-box {
        .detail-item{
            width: 100%;
            display: flex;
            justify-content: flex-start;
            margin-bottom: 16px;
            .detail-title{
                width: 120px;
                text-align: right;
                line-height: 30px;
                margin-right: 20px;
                color: rgba(0,0,0,.85);
            }
            .detail-picture-box{
                display: flex;
                .contract-picture{
                    margin: 0 15px 15px 0;
                    width: 210px;
                    height: 297px;
                    & img{
                        width: 210px;
                        height: 297px;
                    }
                }
            }
            .detail-type-text{
                line-height: 30px;
                color: rgba(0,0,0,.85);
            }
            .detail-photo-list{
                display: flex;
                flex-wrap: wrap;
                .icon-box{
                    height: 150px;
                    margin-right: 20px;
                    .icon-style{
                        height: 150px;
                    }
                }
            }
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
}
</style>
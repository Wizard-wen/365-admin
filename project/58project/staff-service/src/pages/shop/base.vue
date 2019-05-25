<template>
    <el-card class="box-card">
        <div slot="header" class="card-header">
            <h3>门店基本信息</h3>
            <div class="control">
                <el-button
                    type="text"
                    :icon="isShow? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
                    circle size="small"
                    @click="changeFormState">{{isShow?`收起`:`展开`}}</el-button>
            </div>
        </div>

        <div class="base-form-box" >
            <div class="base-message-box" v-if="isShow">
                <div v-if="shopDetail.length">
                    <!-- <div
                        class="base-line"
                        :style="{
                            width: item.size == 1? '100%' : '50%',
                            marginBottom: index == baseList.length - 1? '20px': '0'}"

                        v-for="(item, index) in baseList"
                        :key="index">
                        <div class="base-word" v-if="item.key">
                            <div class="base-key">{{item.key+'：'}}</div>
                            <div class="base-value" v-if="item.value">{{item.value}}</div>
                            <div class="base-value" style="color: #F56C6C" v-else>暂无数据</div>
                        </div>
                        <div class="base-word" v-else>
                            <div class="base-key"></div>
                            <div class="base-value"></div>
                        </div>
                    </div> -->
                    <div>{{shopDetail}}</div>
                </div>
                <div v-else> 暂无内容</div>
            </div>
        </div>

    </el-card>
</template>
<script>
import {$utils} from '../../../../../common'
import { shopService } from '../../../common';
export default {
    data(){
        return {
            shopKeyName: {
                name: "门店名", //门店名
                addresss: '门店地区',//门店地区
                is_third: '门店类型',//门店类型
                phone: '门店电话',//门店电话
                boss_id: '门店经理',//门店经理
                start_time: '门店开业时间',//门店开业时间
                end_time: '门店终止时间',//门店终止时间
                type: '门店状态',//门店状态
                remark: '备注信息',//备注信息
            },
            //是否展示表单
            isShow:true,
            //门店详情
            shopDetail: null

        }
    },
    computed: {

    },
    methods: {
        //改变表单的显示隐藏状态
        changeFormState(){
            this.isShow = !this.isShow
        }
    },
    async mounted(){
        this.shopDetail = await shopService.getStore(this.$route.query.id)
    }
}
</script>
<style lang="scss" scoped>
    .box-card{
        margin: 10px 0 10px 10px;
        & /deep/ .el-card__header{
            padding: 0 30px;;
        }
        & /deep/ .el-card__body{
            padding: 20px;
        }
        .card-header{
            height:50px;
            width:100%;
            padding-right:30px;
            display: flex;
            justify-content: space-between;
            & h3{
                line-height: 50px;
            }
            .control{
                padding: 9px 0;
            }
        }
        .base-form-box{
            height: 100%;
            width: 100%;
            .base-message-box{
                width: 100%;
                .base-line{
                    float: left;
                    display: flex;
                    line-height: 40px;
                    .base-word{
                        display: flex;
                        .base-key{
                            width: 120px;
                            padding-right: 10px;
                            text-align: right;
                        }
                        .base-value{
                            flex: 1;
                        }
                    }
                }
            }

            .baseForm{
                width: 80%;
                min-width: 500px;
            }
        }

    }
</style>



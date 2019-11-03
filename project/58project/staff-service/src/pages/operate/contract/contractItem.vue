<template>
    <div class="orderConfig" v-loading="is_loading">
        <div class="order-header">
            <div class="order-name">
                <h4>合同号：{{contractBase.contract_code}}</h4>
            </div>
            <div class="btn-group">
                <el-button size="mini" @click="goback">返回</el-button>
            </div>
            <div class="order-detail">
                <div class="detail-left">
                    <div class="detail-left-box">
                        <div class="detail-left-line">签约经纪人：{{ contractBase.sign_manager_name }}</div>
                        <div class="detail-left-line">签约经纪门店：{{ contractBase.sign_store_name }}</div>
                        <div class="detail-left-line">签约时间：{{contractBase.sign_at | timeFomatter}}</div>
                    </div>
                </div>
                <div class="detail-right">
                    <div class="right-box">
                        <div class="title">合同状态</div>
                        <div class="value" :style="{color: contractType.color}">{{ contractType.name}}</div>
                    </div>
                    <div class="right-box" v-if="contractBase.type != 3">
                        <div class="title">是否发放工资</div>
                        <div class="value" :style="{color: contractBase.is_wage == 1? '#F56C6C' : '#67C23A'}">{{ contractBase.is_wage | isWagedFormatter}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="order-down">
            <div class="order-message">
                <div class="title">
                    <div class="title-contains">
                        <div class="left">合同详情</div>
                    </div>
                </div>
                <div class="detail-show-module">
                    <div class="detail-item-box line-three-list">
                        <div class="detail-item">
                            <p class="detail-title">护理依赖程度： </p>
                             <select-tag-component 
                                v-if="contractBase.service_level"
                                :isEdit="false" 
                                :propTagList="order_service_level" 
                                v-model="contractBase.service_level" 
                                :isSingle="true"></select-tag-component>
                            <p class="detail-type-text" v-else>-</p>
                        </div>
                    </div>
                    <div class="detail-item-box line-three-list">
                        <div class="detail-item">
                            <p class="detail-title">服务内容： </p>
                            <select-tag-component 
                                v-if="contractBase.service_contains"
                                :isEdit="false" 
                                :propTagList="order_service_contains" 
                                v-model="contractBase.service_contains" 
                                :isSingle="true"></select-tag-component>
                            <p class="detail-type-text" v-else>-</p>
                        </div>
                    </div>
                    <div class="detail-item-box line-three-list">
                        <div class="detail-item">
                            <p class="detail-title">服务方式： </p>
                            <select-tag-component 
                                v-if="contractBase.service_level"
                                :isEdit="false" 
                                :propTagList="order_service_type" 
                                v-model="contractBase.service_level" 
                                :isSingle="true"></select-tag-component>
                            <p class="detail-type-text" v-else>-</p>
                        </div>
                    </div>
                    <div class="detail-item-box line-three-list">
                        <div class="detail-item">
                            <p class="detail-title">服务人数： </p>
                            <p class="detail-type-text">{{contractBase.service_count}}</p>
                        </div>
                    </div>
                    <div class="detail-item-box line-three-list">
                        <div class="detail-item">
                            <p class="detail-title">服务期限： </p>
                            <p class="detail-type-text">{{contractBase.service_start | timeFomatter}} - {{contractBase.service_end | timeFomatter}}</p>
                        </div>
                    </div>
                    <div class="detail-item-box line-three-list"></div>
                    <div class="detail-item-box line-list">
                        <div class="detail-item">
                            <p class="detail-title">工作时间： </p>
                            <p class="detail-type-text">{{contractBase.service_time}}</p>
                        </div>
                    </div>
                    <div class="detail-item-box line-three-list">
                        <div class="detail-item">
                            <p class="detail-title">劳务报酬： </p>
                            <p class="detail-type-text">{{contractBase.staff_wage}}元</p>
                        </div>
                    </div>
                    <div class="detail-item-box line-three-list">
                        <div class="detail-item">
                            <p class="detail-title">客户服务费： </p>
                            <p class="detail-type-text">{{contractBase.user_charge}}元</p>
                        </div>
                    </div>
                    <div class="detail-item-box line-three-list">
                        <div class="detail-item">
                            <p class="detail-title">客户缴纳： </p>
                            <p class="detail-type-text">{{contractBase.user_pay}}元</p>
                        </div>
                    </div>
                    <div class="detail-item-box line-three-list">
                        <div class="detail-item">
                            <p class="detail-title">劳动者服务费： </p>
                            <p class="detail-type-text">-</p>
                        </div>
                    </div>
                    <div class="detail-item-box line-three-list">
                        <div class="detail-item">
                            <p class="detail-title">劳动者押金： </p>
                            <p class="detail-type-text">{{contractBase.staff_deposit}}元</p>
                        </div>
                    </div>
                    <div class="detail-item-box line-three-list"></div>
                    <div class="detail-item-box line-three-list">
                        <div class="detail-item">
                            <p class="detail-title">保险受益人： </p>
                            <p class="detail-type-text">{{contractBase.insurance_benefit}}</p>
                        </div>
                    </div>
                    <div class="detail-item-box line-three-list">
                        <div class="detail-item">
                            <p class="detail-title">保险期限： </p>
                            <p class="detail-type-text">{{contractBase.insurance_start | timeFomatter}} - {{contractBase.insurance_end | timeFomatter}}</p>
                        </div>
                    </div>
                    <div class="detail-item-box line-three-list"></div>
                    <div class="detail-item-box line-list">
                        <div class="detail-item">
                            <p class="detail-title">合同备注： </p>
                            <p class="detail-type-text">{{contractBase.remarks}}</p>
                        </div>
                    </div>
                    <div class="detail-item-box line-list">
                        <div class="detail-item">
                            <p class="detail-title">合同照片： </p>
                            <div class="detail-photo-list">
                                <photo-component
                                    :pictureUrlArrtibute="'url'"
                                    v-model="contractBase.accessory"
                                    :height="'297px'"
                                    :width="'210px'"
                                    :isEdit="false"></photo-component>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="order-message">
                <div class="title">
                    <div class="title-contains">
                        <div class="left">签约服务人员信息</div>
                    </div>
                </div>
                <div class="order-list">
                    
                    <div class="line-two-list">
                        编号：<span>{{contractBase.sign_staff_code}}</span> 
                    </div>
                    <div class="line-two-list">
                        身份证号：<span>{{contractBase.sign_staff_identify}}</span> 
                    </div>
                    <div class="line-two-list">
                        姓名：<span>{{contractBase.sign_staff_name}}</span>
                    </div>
                    <div class="line-two-list">
                        电话：<span>{{contractBase.sign_staff_phone}}</span> 
                    </div>
                    <div class="line-list">
                        户籍地址：<span>{{contractBase.sign_staff_law_address}}</span> 
                    </div>
                    <div class="line-list">
                        现住址：<span>{{contractBase.sign_staff_cur_address}}</span> 
                    </div>
                    <div class="line-list">
                        紧急联系人：<span>{{contractBase.sign_staff_urgent}}</span> 
                    </div>
                </div>
            </div>
            <div class="order-message">
                <div class="title">
                    <div class="title-contains">
                        <div class="left">签约客户信息</div>
                    </div>
                </div>
                <div class="order-list">
                    <div class="line-two-list">
                        姓名：<span>{{contractBase.sign_user_name}}</span>
                    </div>
                    <div class="line-two-list">
                        电话：<span>{{contractBase.sign_user_phone}}</span> 
                    </div>
                    <div class="line-two-list">
                        身份证号：<span>{{contractBase.sign_user_identify}}</span> 
                    </div>
                </div>
            </div>
            <div class="order-message">
                <div class="title">
                    <div class="title-contains">
                        <div class="left">结算信息</div>
                    </div>
                </div>
                <div class="order-list">
                   
                </div>
            </div>
            <div class="order-message">
                <div class="title">
                    <div class="title-contains">
                        <div class="left">订单终止信息</div>
                    </div>
                </div>
                <div class="order-list">
                   
                </div>
            </div>
            
                     
        </div>
    </div>
</template>
<script>
    import {operateService, $utils, saleService} from '../../../../common'
    import {
    selectTagComponent} from '@/pages/components'
    import {
        photoComponent,
    } from '../worker/workerItem/index.js'

export default {
    data(){
        return {
            is_loading: false,//
            contractBase: {},//合同信息
        }
    },
    filters: {
        timeFomatter(value){
            if(value == 0){
                return '-'
            }
            return $utils.formatDate(new Date(value), 'yyyy-MM-dd')
        },
        contractTypeFormatter(value){
            if(value == 1){
                return '待执行'
            } else if (value == 2){
                return '执行中'
            } else {
                return '已终止'
            }
        },
        isWagedFormatter(value){
            if(value == 1){
                return '否'
            } else {
                return '是'
            }
        }
    },
    components: {
        selectTagComponent,
        photoComponent,
    },
    computed:{
        /**
         * 当前用户信息
         */
        presentUser(){
            return this.$store.state.loginModule.user
        },
        //订单服务内容
        order_service_contains(){
            return this.$store.state.saleModule.order_service_contains
        },
        //订单护理依赖程度
        order_service_level(){
            return this.$store.state.saleModule.order_service_level
        },
        //订单服务方式
        order_service_type(){
            return this.$store.state.saleModule.order_service_type
        },
        //合同状态
        contractType(value){
            if(this.contractBase.type == 1){
                return {
                    name: '待执行',
                    color: '#E6A23C'
                }
            } else if (this.contractBase.type == 2){
                return {
                    name: '执行中',
                    color: '#67C23A'
                }
            } else {
                return {
                    name: '已终止',
                    color: '#F56C6C'
                }
            }
        },
    },
    methods: {
        /**
         * 获取订单信息
         */
        async getContract(){
            try{
                this.is_loading = true
                await saleService.getContract(this.$route.query.id).then((data) =>{
                    this.contractBase = data.data
                }).catch(e =>{
                    this.$message({
                        type:'error',
                        message: e.message
                    })
                    this.is_loading = false
                }).finally(() =>{
                    this.is_loading = false
                })
            } catch(error){
                this.$message({
                    type:'error',
                    message: error.message
                })
                store.commit('setLoading',false)
            }
        },
        /**
         * 返回
         */
        goback(){
            if(this.$route.query.from == 1){
                this.$router.push({
                    path: '/operate/operateOrderConfig',
                    query: {
                        order_id: this.$route.query.from_id
                    }
                })
            } else {
                this.$router.push('/operate/operateContractList')
            }
        },
    },
    async mounted(){
        await this.getContract()
    }    
}
</script>
<style lang="scss" scoped>
    .orderConfig{
        width: 100%;
        min-height: calc(100vh - 50px);
        background:#f0f2f5;
        .order-header{
            background: #fff;
            padding: 30px 24px 24px 24px;
            position: relative;
            .order-name{
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
            .order-detail{
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
        .order-down{
            margin: 24px;
            .order-message{

                width: 100%;
                // height: 285px;
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
                    }

                }
                .detail-show-module{
                    width: 100%;
                    display: flex;
                    flex-wrap:  wrap;
                    justify-content: space-between;
                    margin-bottom: 32px;
                    padding: 10px;
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
                .order-list{
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
        }
    }
</style>



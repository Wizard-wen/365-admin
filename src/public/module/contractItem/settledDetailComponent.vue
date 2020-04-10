<template>
    <card-box-component
        :title="'合同结算信息'">
        <template slot="control">
            <el-button size="mini" type="primary" @click="makeImage">下载账单</el-button>
        </template>
        <template slot="contains">
            <detail-form-component>
                <detail-form-item-component
                    :type="'template'"
                    :label="'结算时间'"
                    :size="1"
                    :value="contractBase.account.created_at">
                    <p slot="template">{{contractBase.account.created_at | timeToSecondFomatter}}</p>
                </detail-form-item-component>
                <detail-form-item-component
                    :type="'template'"
                    :label="'服务期限'"
                    :size="1"
                    :value="contractBase.service_start">
                    <p slot="template">
                        {{contractBase.account.service_start | timeToDayFomatter}} —— 
                        {{contractBase.account.service_end | timeToDayFomatter}}
                    </p>
                </detail-form-item-component>
                <el-divider content-position="left">服务人员工资信息</el-divider>
                <detail-form-item-component
                    :label="'工作天数'"
                    :size="3"
                    :value="`${contractBase.account.service_days}天`"></detail-form-item-component>
                <detail-form-item-component
                    :label="'日工资'"
                    :size="3"
                    :value="`${contractBase.account.daily_wage}元`"></detail-form-item-component>
                <detail-form-item-component
                    :label="'首月工资合计'"
                    :size="3"
                    :value="`${contractBase.account.total_wage}元`"></detail-form-item-component>
                <detail-form-item-component
                    :label="'服务费扣除'"
                    :size="3"
                    :value="`${contractBase.account.service_cost}元`"></detail-form-item-component>
                <detail-form-item-component
                    :label="'其他扣除'"
                    :size="3"
                    :value="`${contractBase.account.other_cost}元`"></detail-form-item-component>
                <detail-form-item-component :size="3"></detail-form-item-component>
                <detail-form-item-component
                    :label="'扣除事由'"
                    :size="1"
                    :value="`${contractBase.account.cost_reason}`"></detail-form-item-component>
                <detail-form-item-component
                    :label="'实发工资'"
                    :size="1"
                    :value="real_wage"></detail-form-item-component>
                
                <el-divider content-position="left">客户支出</el-divider>
                <detail-form-item-component
                    :label="'扣除前客户余额'"
                    :size="1"
                    :value="'暂无'"></detail-form-item-component>
                <detail-form-item-component
                    :label="'客户支出'"
                    :size="1"
                    :value="user_cost"></detail-form-item-component>
                <detail-form-item-component
                    :label="'返还客户金额'"
                    :size="3"
                    :value="`${contractBase.account.return_wage}元`"></detail-form-item-component>
                <detail-form-item-component :size="1"></detail-form-item-component>
                <detail-form-item-component
                    :label="'扣除后客户余额'"
                    :size="1"
                    :value="'暂无'"></detail-form-item-component>
            
            </detail-form-component>
        </template>
        <template>
            <make-image-component
                :makeImageDialogVisible="makeImageDialogVisible"
                v-if="makeImageDialogVisible"
                @closeMakeImageDialog="makeImageDialogVisible = false"
                :width="450"
                :height="800">
                <template slot="pictureContains">
                    <div id="bell-list-id" class="bell-list">
                        <div class="bell-box">
                            <div class="title">工资账单明细</div>
                            <div class="level-1">
                                <span class="label">结算时间：</span>
                                {{contractBase.account.created_at | timeToSecondFomatter}}
                            </div>
                            <div class="level-1">
                                <span class="label">服务周期：</span>
                                {{contractBase.account.service_start | timeToDayFomatter}} - {{contractBase.account.service_end | timeToDayFomatter}}
                            </div>
                            <el-divider content-position="right">服务人员工资</el-divider>
                            <div class="level-1">
                                <span class="label">首月应发工资：</span>
                                {{contractBase.account.service_days}} 天 × {{contractBase.account.daily_wage}} 元 = {{contractBase.account.total_wage}}元
                            </div>
                            <div class="level-1">
                                <span class="label">工作天数：</span>
                                {{contractBase.account.service_days}} 天</div>
                            <div class="level-1">
                                <span class="label">日工资：</span>
                                {{contractBase.account.daily_wage}} 元</div>
                            <div class="level-1">
                                <span class="label">服务费扣除：</span>
                                {{contractBase.account.service_cost}} 元</div>
                            <div class="level-1">
                                <span class="label">其他扣除：</span>
                                {{contractBase.account.other_cost}} 元</div>
                            <div class="level-1">
                                <span class="label" style="color: #F56C6C">实发工资：</span>
                            </div>
                            <div class="level-2">
                                {{contractBase.account.service_days}} 天 × {{contractBase.account.daily_wage}} 元
                                <span> - {{contractBase.account.service_cost}} 元</span>
                                <span> - {{contractBase.account.other_cost}} 元</span>
                                = {{contractBase.account.real_wage}} 元
                            </div>
                            <el-divider content-position="right">客户余额</el-divider>
                            <div class="level-1">
                                <span class="label">扣除前余额：</span>
                                {{contractBase.account.sign_user_account?contractBase.account.sign_user_account:"-"}} 元
                            </div>
                            <div class="level-1">
                                <span class="label" style="color: #F56C6C">客户当月支出：</span>
                                {{contractBase.account.service_days}} 天 × {{contractBase.account.daily_wage}} 元
                                <span> - {{contractBase.account.other_cost}} 元</span>
                                = {{contractBase.account.user_cost?contractBase.account.user_cost:'-'}} 元
                            </div>
                            <div class="level-1">
                                <span class="label">返还客户金额：</span>
                                {{contractBase.account.return_wage}} 元
                            </div>
                            <div class="level-1">
                                <span class="label">扣除后余额：</span>
                                {{contractBase.account.finally_user_account?contractBase.account.finally_user_account:'-'}} 元
                            </div>
                            <el-divider style="margin: 0"></el-divider>
                        </div>
                        <div class="bottom">
                            <div class="sun-code">
                                <div class="des-box">
                                    <p style="color:#ccc;">账单数据来源于365生活服务平台</p>
                                    <p style="color:#ccc;">私密数据，注意保密，外泄必究。</p>
                                </div>
                                <div class="sun-code-pic">
                                    <img class="pic" :src="sunCodePic">
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </template>
            </make-image-component>
        </template>
    </card-box-component>
</template>

<script>
import sunCodePic from './settledDetailComponent/sun-code.jpg'
export default {
    props: {
        /**
         * 合同基本信息
         */
        contractBase: {
            type: Object,
            default: function(){return {}}
        }
    },
    data(){
        return {
            makeImageDialogVisible: false,
            sunCodePic,
        }
    },
    computed: {
        user_cost(){
            let uesr_cost = parseInt(
                this.contractBase.account.service_days * 
                this.contractBase.account.daily_wage
                - this.contractBase.account.other_cost)
            return `${this.contractBase.account.service_days} 天 × ${this.contractBase.account.daily_wage} 元
            - ${this.contractBase.account.other_cost} 元 = ${uesr_cost}元`
        },
        real_wage(){
            return `${this.contractBase.account.service_days} 天 × ${this.contractBase.account.daily_wage} 元
            - ${this.contractBase.account.service_cost} 元
            - ${this.contractBase.account.other_cost} 元 = ${this.contractBase.account.real_wage}元`
        }
    },
    methods: {
        /**
         * 生成图片
         */
        makeImage(){
            let message = ''
            if( 
                // this.contractBase.account.service_days != '' &&
                // this.contractBase.account.daily_wage != '' &&
                // this.contractBase.account.total_wage != '' &&
                // this.contractBase.account.service_cost != '' &&
                // this.contractBase.account.other_cost != null &&
                // this.contractBase.account.cost_reason != '' &&
                // this.contractBase.account.real_wage != '' &&
                // this.contractBase.user_account != '' &&
                // this.contractBase.user_cost != '' &&
                // this.contractBase.return_wage != '' &&
                // this.contractBase.finally_user_account != ''
                true
            ){
                this.$confirm(`账单信息涉及隐私，请妥善保管`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() =>{
                    this.makeImageDialogVisible = true
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: `已取消生成账单操作`
                    });
                });
            } else {
                this.makeImageDialogVisible = false
                this.$message({
                    type: 'error',
                    message: '账单字段不全'
                })
            }  
        },
    }
}
</script>

<style lang="scss" scoped>
.bell-list{
    width: 450px;
    height: 800px;
    padding: 30px 20px 0px 20px;
    // border: 1px dashed #ccc;
    border-radius: 4px;
    .bell-box{
        padding: 10px;
        .title{
            height: 50px;
            width: 100%;
            line-height: 50px;
            text-align: center;;
        }
        
        .level-1{
            .label{
                display: inline-block;
                width: 100px;
                text-align: right;
            }
            line-height: 30px;
        }
        .level-2{
            text-indent: 50px;
        }
    }
    .bottom{
        height: 170px;
        .sun-code{
            height: 140px;
            width: 100%;
            display: flex;
            .des-box{
                flex:1;
                height: 40px;
                padding: 50px 0;
                text-align: center;;
            }
            .sun-code-pic{
                height: 160px;
                width: 160px;
                padding: 20px;
                .pic{
                    height: 120px;
                    width: 120px;
                }
            }
        }
    }
}
</style>
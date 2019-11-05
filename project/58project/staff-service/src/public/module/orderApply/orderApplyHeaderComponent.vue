<template>
    <div class="orderApply-header">
        <div class="orderApply-name">
            <h4>申请编号：{{publicOrderType == 1? orderApplyDetail.apply_code: orderApplyDetail.require_code}}</h4>
        </div>
        <div class="btn-group">
            <el-button size="mini" @click="goback">返回</el-button>
            <el-button 
                size="mini" type="success"
                v-if="orderApplyDetail.type == 1" 
                @click="openPassOrderApplyDialog">通过</el-button>
            <el-button 
                size="mini" type="danger" 
                v-if="orderApplyDetail.type == 1" 
                @click="refuseOrderApply">拒绝</el-button>
        </div>
        <div class="orderApply-detail">
            <div class="detail-left">
                <div class="detail-left-box">
                    <div 
                        class="detail-left-line" 
                        v-if="publicOrderType == 1">申请创建人：{{ orderApplyDetail.created_manager_name }}</div>
                    <div class="detail-left-line">申请创建时间：{{ orderApplyDetail.created_at | formDate }}</div>
                    <div 
                        class="detail-left-line" 
                        v-if="publicOrderType == 1">来源门店：{{orderApplyDetail.apply_store_name }}</div>
                    <div 
                        class="detail-left-line" 
                        v-if="publicOrderType == 1">来源人：{{orderApplyDetail.apply_manager_name}}</div>
                </div>
            </div>
            <div class="detail-right">
                <div class="right-box">
                    <div class="title">状态</div>
                    <div 
                        class="value"
                        :style="{color: orderApplyTypeStyle.color}">{{orderApplyTypeStyle.text}}</div>
                </div>
            </div>
        </div>
        <public-assign-order-component
            v-if="publicAssignOrderDialogVisible"
            :orderItemObject="orderApplyDetail"
            :publicAssignOrderDialogVisible="publicAssignOrderDialogVisible"
            @closePublicAssignOrderDialog="closePublicAssignOrderDialog"
            @updatePublicAssignOrder="updatePublicAssignOrder"
            :publicOrderType="publicOrderType"></public-assign-order-component>
    </div>
</template>

<script>
import {
    $utils,
    operateService,
} from '@common/index.js'
import {
    publicAssignOrderComponent,
} from '@/public/module/common/index.js'

export default {
    components: {
        publicAssignOrderComponent,
    },
    props: {
        /**
         * 订单申请详情
         */
        orderApplyDetail: {
            type: Object,
            default: function(){return {}}
        },
        /**
         * 订单申请类型
         * 1 门店订单申请 2 客户订单申请 
         */
        publicOrderType: {    
            type: Number | String,
            default: 1,
        },
    },
    data(){
        return {
            publicAssignOrderDialogVisible: false,
        }
    },
    computed: {
        /**
         * 订单申请状态
         */
        orderApplyTypeStyle(){
            if(this.orderApplyDetail.type == 1){
                return {
                    color: '#E6A23C',
                    text: '待处理',
                }
            } else if(this.orderApplyDetail.type == 2){
                return {
                    color: '#f56c6c',
                    text: '已拒绝',
                }
            } else {
                return {
                    color: '#67c23a',
                    text: '已通过',
                }
            }
        },
        /**
         * 是否可以提交订单
         */
        couldSubmit(){
            if(
                this.orderApplyDetail.user_name && 
                this.orderApplyDetail.user_phone && 
                this.orderApplyDetail.work_type && 
                this.orderApplyDetail.wage && 
                this.orderApplyDetail.service_duration && 
                this.orderApplyDetail.order_details && 
                this.orderApplyDetail.service_address){
                    return true
                } else {
                    return false
                }
        }
    },
    filters: {
        /**
         * 更改时间戳格式
         */
        formDate(timestamp){
            return $utils.formatDate(new Date(timestamp * 1000), 'yyyy-MM-dd')
        }
    },
    methods: {
        //打开通过订单申请弹窗
        openPassOrderApplyDialog(){
            //订单申请是否已经填写完整
            if(this.couldSubmit){
                this.publicAssignOrderDialogVisible = true
            } else {
                this.$message({
                    type: "error",
                    message: '请完善订单申请基本信息！'
                });
            }
        },
        /**
         * 关闭通过订单申请弹窗
         */
        async closePublicAssignOrderDialog(){
            this.publicAssignOrderDialogVisible = false
            this.$emit('updateOrderApply')
        },
        /**
         * 拒绝订单申请年轻
         */
        async refuseOrderApply(){
            await this.$confirm("确定拒绝该订单申请吗?此操作将会关闭订单申请", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(async () =>{
                //拒绝订单申请表单
                let orderApplyObject = {
                    id: this.$route.query.id,
                    type: 2,
                    version: this.orderApplyDetail.version,
                }
                if(this.publicOrderType == 1){
                    await this.dealApplication(orderApplyObject)
                } else {
                    await this.changeRequireType(orderApplyObject)
                }
                
            }).catch((error) => {
                this.$message({
                    type: "info",
                    message: error.message
                });
            });
        },
        async updatePublicAssignOrder(param){
            let orderApplyObject = {
                id: param[1].id,
                type: 3,
                ...param[0],
                version: param[1].version,
            }
            if(this.publicOrderType == 1){
                await this.dealApplication(orderApplyObject)
            } else {
                await this.changeRequireType(orderApplyObject)
            }
        },
        /**
         * 处理订单申请接口
         */
        async dealApplication(orderApplyObject){
            try {
                await operateService.dealApplication(orderApplyObject).then(data => {
                    if (data.code == 0) {
                        this.$message({
                            type: "success",
                            message: data.message
                        });
                        this.publicAssignOrderDialogVisible = false
                        this.$emit('updateOrderApply')
                    }
                }).catch(error => {
                    this.$message({
                        type: "error",
                        message: error.message
                    });
                }).finally(() =>{

                })
            } catch (error) {
                this.$message({
                    type: "error",
                    message: error.message
                });
            }
        },
        /**
         * 处理客户需求接口
         */
        async changeRequireType(orderApplyObject){
            try {
                await operateService.changeRequireType(orderApplyObject).then(data => {
                    if (data.code == 0) {
                        this.$message({
                            type: "success",
                            message: data.message
                        });
                        this.publicAssignOrderDialogVisible = false
                        this.$emit('updateOrderApply')
                    }
                }).catch(error => {
                    this.$message({
                        type: "error",
                        message: error.message
                    });
                }).finally(() =>{

                })
            } catch (error) {
                this.$message({
                    type: "error",
                    message: error.message
                });
            }
        },
        /**
         * 返回上一级
         */
        goback(){
            if(this.publicOrderType == 1){
                this.$router.push({
                    path: '/operate/operateOrderApplyList',
                })
            } else {
                this.$router.push({
                    path: '/operate/clientRequireList',
                })
            }
            
        },
    }
}
</script>

<style lang="scss" scoped>
    .orderApply-header{
		background: #fff;
		padding: 30px 24px 24px 24px;
		position: relative;
		.orderApply-name{
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
		.orderApply-detail{
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
</style>
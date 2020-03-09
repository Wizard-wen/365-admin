<template>
    <div class="orderApply" v-loading="is_loading">
        <order-apply-header-component
            :publicOrderType="1"
            :currentOrderApply="orderApplyDetail"
            @updateOrderApply="getApplication"></order-apply-header-component>
        <div class="layout-content">
            <public-order-base-component
                :publicOrderType="1"
                :orderBaseDetail="orderApplyDetail"
                @updatePublicOrderBase="getApplication"></public-order-base-component>
            <card-box-component
                :title="'订单申请来源'">
                <template slot="control">
                    <el-button 
                        size="mini" 
                        type="primary" 
                        v-if="orderApplyDetail.type == 1"
                        @click="openChangeOrderOriginDialog">修改</el-button>
                </template>
                <template slot="contains">
                    <div class="detail-show-module">
                        <div class="detail-item-box line-two-list">
                            <div class="detail-item">
                                <p class="detail-title">来源门店： </p>
                                <p class="detail-type-text">{{orderApplyDetail.apply_store_name }}</p>
                            </div>
                        </div>
                        <div class="detail-item-box line-two-list">
                            <div class="detail-item">
                                <p class="detail-title">来源人： </p>
                                <p class="detail-type-text">{{orderApplyDetail.apply_manager_name}}</p>
                            </div>
                        </div>
                    </div>
                </template>    
            </card-box-component>

            <order-apply-log :order_logs="applyLogTable"></order-apply-log>

        </div>
        <change-order-origin-dialog
            v-if="orderOriginVisible"
            :orderApplyId="orderApplyDetail.id"
            :changeOrderOriginField="changeOrderOriginField"
            @closeChangeOriginDialog="closeChangeOriginDialog"
            :orderOriginVisible="orderOriginVisible"></change-order-origin-dialog>
    </div>
</template>

<script>
import { 
    operateService, 
    $utils, 
} from "@common/index.js";

import {
    orderApplyHeaderComponent,
} from '@/public/module/orderApplyItem/index.js'

import {
    publicOrderBaseComponent,
} from '@/public/module/orderPublic/index.js'


import {
    changeOrderOriginDialog,
    orderApplyLog,
} from './orderApplyItem/index.js'

export default {
    components: {
        changeOrderOriginDialog,
        publicOrderBaseComponent,
        orderApplyHeaderComponent,
        orderApplyLog,
    },
    data() {
        return {
            is_loading: false,
            //订单申请详情
            orderApplyDetail: {
                work_type: '',
                wage: '',
                version: '',
                user_phone: '',
                user_name: '',
                type: 'pass',
                apply_store_name: '',
                apply_store_id: '',
                service_duration: '',
                order_details: '',
                id: '',
                created_manager_name: '',
                created_manager_id: '',
                created_at: '',
                code: '',
                apply_manager_name: '',
                apply_manager_id: ''
            },
            //员工列表
            salesPersonTable: [],
            //订单申请日志列表
            applyLogTable: [],
            // //订单申请字段显示隐藏
            // orderApplyFieldVisible: false,
            // //订单申请字段更改
            // changeApplyField: {
            //     field: '',
            //     fieldName: '',
            //     value: '',
            // },
            //订单申请来源显示隐藏
            orderOriginVisible: false,
            //订单申请来源
            changeOrderOriginField: {
                apply_manager_id: '',
                apply_store_id: '',
            },
            // //通过订单申请弹窗显示隐藏
            // orderApplyPassVisible: false,
            // //拒绝订单申请表单
            // refuseOrderApplyObject: {
            //     id: this.$route.query.id,
            //     type: 2,
            //     version: '',
            // },
            // systemVersion: '',//系统版本号
        };
    },
    // computed: {
    //     orderTypeStyle(){
    //         if(this.orderApplyDetail.type == 1){
    //             return {
    //                 color: '#E6A23C',
    //                 text: '待处理',
    //             }
    //         } else if(this.orderApplyDetail.type == 2){
    //             return {
    //                 color: '#f56c6c',
    //                 text: '已拒绝',
    //             }
    //         } else {
    //             return {
    //                 color: '#67c23a',
    //                 text: '已通过',
    //             }
    //         }
    //     }
    // },
    methods: {
        /**
        //  * 打开更改订单申请字段弹窗
        //  * @param filed 字段
        //  * @param filedName 字段名
        //  */
        // openChangeOrderApplyFieldDialog(field,fileName){
        //     this.changeApplyField.field = field;
        //     this.changeApplyField.fieldName = fileName;
        //     this.changeApplyField.value = this.orderApplyDetail[field]
        //     this.orderApplyFieldVisible = true
        // },  
        // /**
        //  * 关闭更改字段弹窗
        //  */
        // async closeChangeApplyDialog(){
        //     this.orderApplyFieldVisible = false
        //     await this.getApplication()
        // },
        
        /**
         * 打开更改订单申请来源弹窗
         * @param apply_store_id 来源门店id
         * @param apply_manager_id 来源人id
         */
        openChangeOrderOriginDialog(){
            this.changeOrderOriginField.apply_store_id = this.orderApplyDetail.apply_store_id;
            this.changeOrderOriginField.apply_manager_id = this.orderApplyDetail.apply_manager_id;
            this.orderOriginVisible = true
        },  
        /**
         * 关闭更改订单申请来源弹窗
         */
        async closeChangeOriginDialog(){
            this.orderOriginVisible = false
            await this.getApplication()
        },
        // //打开通过订单申请弹窗
        // openPassOrderApplyDialog(){
        //     this.systemVersion = this.orderApplyDetail.version
        //     this.orderApplyPassVisible = true
        // },
        // /**
        //  * 关闭通过订单申请弹窗
        //  */
        // async closeOrderApplyPassDialog(){
        //     this.orderApplyPassVisible = false
        //     await this.getApplication()
        // },
        /**
         * 拒绝订单申请年轻
         */
        // async refuseOrderApply(){
        //     let response = await this.$confirm("确定拒绝该订单申请吗?此操作将会关闭订单申请", "提示", {
        //         confirmButtonText: "确定",
        //         cancelButtonText: "取消",
        //         type: "warning"
        //     }).catch((error) => {
        //         this.$message({
        //             type: "info",
        //             message: error.message
        //         });
        //     });
        //     if (response == "confirm") {
        //         store.commit("setLoading", 1);
        //         try {
        //             this.refuseOrderApplyObject.version = this.orderApplyDetail.version
        //             await operateService.dealApplication(this.refuseOrderApplyObject).then(data => {
        //                 if (data.code == 0) {
        //                     this.$message({
        //                         type: "success",
        //                         message: data.message
        //                     });
        //                 }
        //             }).catch(error => {
        //                 this.$message({
        //                     type: "error",
        //                     message: error.message
        //                 });
        //             }).finally(() =>{
        //                 store.commit("setLoading", false);
        //             })
        //         } catch (error) {
        //             throw error;
        //         }
        //     }
        // },
        /**
         * 获取订单申请信息
         */
        async getApplication() {
            try{
                this.is_loading = true
                await operateService.getApplication(this.$route.query.id).then(data => {
                    if (data.code == "0") {
                        this.orderApplyDetail = data.data.application;
                        //订单申请日志列表
                        this.applyLogTable = data.data.applyLog;

                        this.is_loading = false
                    }
                })
                .catch(error => {
                    this.$message({
                        type: "error",
                        message: error.message
                    });
                    this.is_loading = false
                });
            } catch(error){
                this.$message({
                    type: "error",
                    message: error.message
                });
                this.is_loading = false
            }
            
        },
        // /**
        //  * 添加日志
        //  */
        // addLog() {
           
        // },
        /**
        //  * 返回上一级
        //  */
        // goback(){
        //     this.$router.push('/operate/operateOrderApplyList')
        // },
        /**
         * 签约时间
         */
        // created_atFormatter(row, column){
        //     if(row.created_at == 0){
        //         return '-'
        //     }
        //     return $utils.formatDate(new Date(row.created_at), 'yyyy-MM-dd')
        // },
    },
    // filters: {
    //     /**
    //      * 更改时间戳格式
    //      */
    //     formDate(timestamp){
    //         return $utils.formatDate(new Date(timestamp * 1000), 'yyyy-MM-dd')
    //     }
    // },
    mounted() {
        this.getApplication();
    }
};
</script>

<style lang="scss" scoped>
.box-card {
  margin: 10px 0 10px 10px;
  & /deep/ .el-card__header {
    padding: 0 30px;
  }
  & /deep/ .el-card__body {
    padding: 20px;
  }
  .card-header {
    height: 50px;
    width: 100%;
    padding-right: 30px;
    display: flex;
    justify-content: space-between;
    & h3 {
      line-height: 50px;
    }
    .control {
      padding: 9px 0;
    }
  }
  .base-form-box {
    height: 100%;
    width: 100%;
    .base-message-box {
      width: 100%;
      display: flex;
      .base-line {
        line-height: 40px;
        width: 50%;
      }
    }
  }
}

.orderApply {
	background: #f0f2f5;
	min-height: calc(100vh - 50px);
	width: 100%;
	.layout-content{
		padding: 24px;
		.card-box{
			box-sizing: border-box;
			margin: 0;
			padding: 0;
			color: rgba(0,0,0,.65);
			font-size: 14px;
			line-height: 1.5;
			position: relative;
			background: #fff;
			border-radius: 2px;
			transition: all .3s;
			margin-bottom: 24px;
			.card-title{
				display: flex;
				justify-content: space-between;
				min-height: 48px;
				padding: 0 24px;
				color: rgba(0,0,0,.85);
				font-weight: 500;
				font-size: 16px;
				background: transparent;
				border-bottom: 1px solid #e8e8e8;
				border-radius: 2px 2px 0 0;
				.title{
					line-height: 55px;
				}
				.control{
					padding: 11.5px 0;
				}
			}
			.card-contains{
				padding: 24px;
                
			}
		}
	}
	.orderApply-form {
		width: 80%;
		min-width: 1100px;
		margin: 0 auto;
		.addPerson {
			float: right;
			margin: 10px 0;
		}
	}
}

.detail-left-box{
    display: flex;
    flex-wrap: wrap;
    .detail-left-line{
        width: 50%;
        color: rgba(0,0,0,.65);
        line-height: 20px;
        padding-bottom: 8px;
    }
    .detail-all-line{
        width: 100%;
        color: rgba(0,0,0,.65);
        line-height: 20px;
        padding-bottom: 8px;
    }
}
</style>

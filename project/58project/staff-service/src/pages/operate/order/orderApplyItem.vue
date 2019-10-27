<template>
    <div class="orderApply" v-loading="is_loading">
        <!-- 订单申请详情 -->
        <div class="orderApply-header">
            <div class="orderApply-name">
                <h4>申请编号：{{orderApplyDetail.apply_code}}</h4>
            </div>
            <div class="btn-group">
                <el-button size="mini" @click="goback">返回</el-button>
                <el-button v-if="orderApplyDetail.type == 1" size="mini" @click="openPassOrderApplyDialog" type="success">通过</el-button>
                <el-button v-if="orderApplyDetail.type == 1" size="mini" @click="refuseOrderApply" type="danger">拒绝</el-button>
            </div>
            <div class="orderApply-detail">
                <div class="detail-left">
                    <div class="detail-left-box">
                        <div class="detail-left-line">申请创建人：{{ orderApplyDetail.created_manager_name }}</div>
                        <div class="detail-left-line">申请创建时间：{{ orderApplyDetail.created_at | formDate }}</div>
                        <div class="detail-left-line">来源门店：{{orderApplyDetail.apply_store_name }}</div>
                        <div class="detail-left-line">来源人：{{orderApplyDetail.apply_manager_name?orderApplyDetail.apply_manager_name : '门店' }}</div>
                    </div>
                </div>
                <div class="detail-right">
                    <div class="right-box">
                        <div class="title">状态</div>
                        <div 
                            class="value"
                            :style="{color: orderTypeStyle.color}">{{orderTypeStyle.text}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="layout-content">
            <div class="card-box">
                <div class="card-title">
                    <div class="title">
                        订单申请基本信息
                    </div>
                </div>
                <div class="card-contains">
                    <div class="detail-left-box">
                        <div class="detail-left-line">
                            客户名：{{orderApplyDetail.user_name}}
                            <el-button 
                                type="text" 
                                style="color: #409EFF" 
                                v-if="orderApplyDetail.type == 1"
                                @click="openChangeOrderApplyFieldDialog('user_name','客户名')">修改</el-button>
                        </div>
                        <div class="detail-left-line">
                            联系电话：{{orderApplyDetail.user_phone}}
                            <el-button 
                                type="text" 
                                style="color: #409EFF" 
                                v-if="orderApplyDetail.type == 1"
                                @click="openChangeOrderApplyFieldDialog('user_phone','联系电话')">修改</el-button>
                        </div>
                        <div class="detail-all-line">
                            工种：{{orderApplyDetail.work_type}}
                            <el-button 
                                type="text" 
                                style="color: #409EFF" 
                                v-if="orderApplyDetail.type == 1"
                                @click="openChangeOrderApplyFieldDialog('work_type','工种')">修改</el-button>
                        </div>
                        <div class="detail-all-line">
                            服务地址：{{orderApplyDetail.service_address}}
                            <el-button 
                                type="text" 
                                style="color: #409EFF" 
                                v-if="orderApplyDetail.type == 1"
                                @click="openChangeOrderApplyFieldDialog('service_address','服务地址')">修改</el-button>
                        </div>
                        <div class="detail-all-line">
                            工作时间：{{orderApplyDetail.service_duration}}
                            <el-button 
                                type="text" 
                                style="color: #409EFF" 
                                v-if="orderApplyDetail.type == 1"
                                @click="openChangeOrderApplyFieldDialog('service_duration','工作时间')">修改</el-button>
                        </div>
                        <div class="detail-all-line">
                            工资：{{orderApplyDetail.wage}}
                            <el-button 
                                type="text" 
                                style="color: #409EFF" 
                                v-if="orderApplyDetail.type == 1"
                                @click="openChangeOrderApplyFieldDialog('wage','工资')">修改</el-button>
                        </div>
                        <div class="detail-all-line">
                            订单详情：{{orderApplyDetail.order_details}}
                            <el-button 
                                type="text" 
                                style="color: #409EFF" 
                                v-if="orderApplyDetail.type == 1"
                                @click="openChangeOrderApplyFieldDialog('order_details','订单详情')">修改</el-button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card-box">
                <div class="card-title">
                    <div class="title">
                        订单申请来源
                    </div>
                    <div class="control">
                        <el-button 
                            size="small" 
                            type="primary" 
                            v-if="orderApplyDetail.type == 1"
                            @click="openChangeOrderOriginDialog">修改</el-button>
                    </div>
                </div>
                <div class="card-contains">
                    <div class="detail-left-box">
                        <div class="detail-left-line">来源门店：{{orderApplyDetail.apply_store_name }}</div>
                        <div class="detail-left-line">来源人：{{orderApplyDetail.apply_manager_name? orderApplyDetail.apply_manager_name :'门店' }}</div>
                    </div>
                </div>
            </div>

            <div class="card-box">
                <div class="card-title">
                    <div class="title">
                        日志列表
                    </div>
                    <div class="control">
                        <el-button size="small" type="primary" @click="addLog">添加日志</el-button>
                    </div>
                </div>
                <div class="card-contains">
                    <!-- 员工列表 -->
                    <el-table :data="applyLogTable" class="person-table" :header-cell-style="{height: '48px',background: '#fafafa'}">
                        <el-table-column label="创建时间" prop="created_at" :formatter="created_atFormatter" align="center"></el-table-column>

                        <el-table-column label="管理员姓名" prop="manager_name" align="center"></el-table-column>

                        <el-table-column label="日志内容" prop="message" align="center"></el-table-column>

                        <el-table-column label="操作" align="center">
                            <!-- <template slot-scope="scope"> -->
                                <el-button size="mini">查看</el-button>
                            <!-- </template> -->
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <change-apply-dialog
            v-if="orderApplyFieldVisible"
            :orderApplyId="orderApplyDetail.id"
            :changeApplyField="changeApplyField"
            @closeChangeApplyDialog="closeChangeApplyDialog"
            :fieldChangeDialogVisible="orderApplyFieldVisible"></change-apply-dialog>
        <change-order-origin-dialog
            v-if="orderOriginVisible"
            :orderApplyId="orderApplyDetail.id"
            :changeOrderOriginField="changeOrderOriginField"
            @closeChangeOriginDialog="closeChangeOriginDialog"
            :orderOriginVisible="orderOriginVisible"></change-order-origin-dialog>
        <pass-order-apply-dialog
            v-if="orderApplyPassVisible"
            :orderApplyId="orderApplyDetail.id"
            @closeOrderApplyPassDialog="closeOrderApplyPassDialog"
            :orderApplyPassVisible="orderApplyPassVisible"
            :systemVersion="systemVersion"></pass-order-apply-dialog>
    </div>
</template>

<script>
import { operateService, store, $utils } from "../../../../common";
import {
    changeApplyDialog,
    changeOrderOriginDialog,
    passOrderApplyDialog} from './orderApplyItem/index.js'
export default {
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
            //订单申请字段显示隐藏
            orderApplyFieldVisible: false,
            //订单申请字段更改
            changeApplyField: {
                field: '',
                fieldName: '',
                value: '',
            },
            //订单申请来源显示隐藏
            orderOriginVisible: false,
            //订单申请来源
            changeOrderOriginField: {
                apply_manager_id: '',
                apply_store_id: '',
            },
            //通过订单申请弹窗显示隐藏
            orderApplyPassVisible: false,
            //拒绝订单申请表单
            refuseOrderApplyObject: {
                id: this.$route.query.id,
                type: 2,
                version: '',
            },
            systemVersion: '',//系统版本号
        };
    },
    components: {
        changeApplyDialog,
        changeOrderOriginDialog,
        passOrderApplyDialog
    },
    computed: {
        orderTypeStyle(){
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
        }
    },
    methods: {
        /**
         * 打开更改订单申请字段弹窗
         * @param filed 字段
         * @param filedName 字段名
         */
        openChangeOrderApplyFieldDialog(field,fileName){
            this.changeApplyField.field = field;
            this.changeApplyField.fieldName = fileName;
            this.changeApplyField.value = this.orderApplyDetail[field]
            this.orderApplyFieldVisible = true
        },  
        /**
         * 关闭更改字段弹窗
         */
        async closeChangeApplyDialog(){
            this.orderApplyFieldVisible = false
            await this.getApplication()
        },
        
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
        //打开通过订单申请弹窗
        openPassOrderApplyDialog(){
            this.systemVersion = this.orderApplyDetail.version
            this.orderApplyPassVisible = true
        },
        /**
         * 关闭通过订单申请弹窗
         */
        async closeOrderApplyPassDialog(){
            orderApplyPassVisible = false
            await this.getApplication()
        },
        /**
         * 拒绝订单申请年轻
         */
        async refuseOrderApply(){
            let response = await this.$confirm("确定拒绝该订单申请吗?此操作将会关闭订单申请", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).catch((error) => {
                this.$message({
                    type: "info",
                    message: error.message
                });
            });
            if (response == "confirm") {
                store.commit("setLoading", 1);
                try {
                    this.refuseOrderApplyObject.version = this.orderApplyDetail.version
                    await operateService.dealApplication(this.refuseOrderApplyObject).then(data => {
                        if (data.code == 0) {
                            this.$message({
                                type: "success",
                                message: data.message
                            });
                        }
                    }).catch(error => {
                        this.$message({
                            type: "error",
                            message: error.message
                        });
                    }).finally(() =>{
                        store.commit("setLoading", false);
                    })
                } catch (error) {
                    throw error;
                }
            }
        },
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
        /**
         * 添加日志
         */
        addLog() {
           
        },
        /**
         * 返回上一级
         */
        goback(){
            this.$router.push('/operate/operateOrderApplyList')
        },
        /**
         * 签约时间
         */
        created_atFormatter(row, column){
            if(row.created_at == 0){
                return '-'
            }
            return $utils.formatDate(new Date(row.created_at), 'yyyy-MM-dd')
        },
    },
    filters: {
        /**
         * 更改时间戳格式
         */
        formDate(timestamp){
            return $utils.formatDate(new Date(timestamp * 1000), 'yyyy-MM-dd')
        }
    },
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
	.layout-content{
		margin: 24px 48px;
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
</style>

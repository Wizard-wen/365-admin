<template>
  <div class="store" v-loading="isLoading">
    <!-- 门店详情 -->
	<div class="store-header">
		<div class="store-name">
			<h4>{{storeDetail.name}}</h4>
		</div>
		<div class="btn-group">
			<el-button size="mini" type="primary" @click="editStore">修改</el-button>
			<el-button size="mini" @click="goback">返回</el-button>
		</div>
		<div class="store-detail">
			<div class="detail-left">
				<div class="detail-left-box">
					<div class="detail-left-line">编号：{{ storeDetail.store_code }}</div>
					<div class="detail-left-line">创建人：{{ storeDetail.created_manager_name }}</div>
					<div class="detail-left-line">创建时间：{{ storeDetail.created_at | formDate }}</div>
					<div class="detail-left-line">门店类型：{{storeDetail.is_third == 1 ? '直营店': '加盟店'}}</div>
					<div class="detail-left-line">门店负责人：{{ storeDetail.store_manager_name }}</div>
					<div class="detail-left-line">门店地址：{{storeDetail.address}}</div>
				</div>
			</div>
			<div class="detail-right">
				<div class="right-box">
					<div class="title">经营状态</div>
					<div class="value" :style="{color: storeDetail.type == 1? '#67C23A' : '#F56C6C'}">{{storeDetail.type == 1?'营业':'停业'}}</div>
				</div>
				<div class="right-box">
					<div class="title">员工数量</div>
					<div class="value">{{ storeDetail.staff_count }}</div>
				</div>
			</div>
		</div>
	</div>
	<div class="layout-content">
		<div class="card-box">
			<div class="card-title">
				<div class="title">
					员工列表
				</div>
				<div class="control">
					<el-button size="small" type="primary" @click="openAddStroeStaffDialog">添加新店员</el-button>
				</div>
			</div>
			<div class="card-contains">
				<!-- 员工列表 -->
				<el-table :data="salesPersonTable" class="person-table" :header-cell-style="{height: '48px',background: '#fafafa'}">
					<el-table-column label="编号" prop="manager_code" align="center"></el-table-column>

					<el-table-column label="姓名" prop="name" align="center"></el-table-column>

					<el-table-column label="职位" prop="is_store_manager" align="center">
						<template slot-scope="scope">
							<table-tag-component 
								v-if="positionTypeList" 
								:propList="positionTypeList" 
								:tableOriginData="scope.row.is_store_manager"></table-tag-component>
						</template>
					</el-table-column>

					<el-table-column label="电话" prop="phone" align="center"></el-table-column>

					<el-table-column label="操作" align="center">
						<template slot-scope="scope">
							<el-button size="mini" type="primary" @click="showStaffDetail(scope.row)">查看</el-button>
							<el-button size="mini" type="danger" @click="deleteStoreStaff(scope.row)">解绑</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<add-store-worker-dialog
				:addStoreStaffDialogVisible="addStoreStaffDialogVisible"
				v-if="addStoreStaffDialogVisible"
				@closeAddStoreStaffDialog="closeAddStoreStaffDialog"
				:storeObject="storeDetail"></add-store-worker-dialog>
		</div>
	</div>
  </div>
</template>

<script>
import { storeService, store, $utils } from "@common/index.js";
import {addStoreWorkerDialog} from './storeItem/index.js'
// import {tableTagComponent} from '@/pages/components/index.js'
export default {
	components: {
		addStoreWorkerDialog,
		// tableTagComponent,
	},
	data() {
		return {
			isLoading: false,
			//是否展示表单
			isShow: true,
			//门店详情
			storeDetail: {},
			//员工列表
			salesPersonTable: [],
			//添加新店员弹窗显示隐藏
			addStoreStaffDialogVisible: false,
			//门店员工职位
			positionTypeList: [{id: 1, name: '店员'}, {id: 2, name: '店长'}],
			//经营状态
			typeList: [{ id: 1, name: "正常" }, { id: 2, name: "关闭" }],
		};
	},
	methods: {
		/**
		 * 获取门店列表
		 */
		async getStore(){
			try{
				this.isLoading = true
				await storeService.getStore(this.$route.query.id).then(data => {
					if (data.code == "0") {
						this.storeDetail = {...data.data.store};
						this.salesPersonTable = data.data.store_staff_list.data
						this.isLoading = false
					}
				}).catch(error => {
					this.$message({
						type: "error",
						message: error.message
					});
					this.isLoading = false
				}).finally(() =>{
					this.isLoading = false
				})
			} catch(error){
				this.$message({
					type: "error",
					message: error.message
				});
				this.isLoading = false
			}
			
		},
		/**
		 * 打开创建新店员弹窗
		 */
		openAddStroeStaffDialog(){
			this.addStoreStaffDialogVisible = true
		},	
		/**
		 * 关闭添加新店员弹窗
		 */
		async closeAddStoreStaffDialog(){
			this.addStoreStaffDialogVisible = false;
			await this.getStore()
		},
		/**
		 * 编辑门店信息
		 */
		editStore() {
			this.$router.push({
				path: "/store/storeEdit",
				query: {
					type: 1,
					id: this.$route.query.id
				}
			});
		},
		//返回
		goback(){
			this.$router.push('/store/storeList')
		},

		/**
		 * 查看员工详情
		 */
		showStaffDetail(paramObj){
			this.$router.push({
				path: '/auth/accountEdit',
				query: {
					id: paramObj.id,
					type: 1,
				}
			})
		},
		/**
		 * 解绑员工
		 */
		async deleteStoreStaff(paramObj){
			let _this= this;

			let response = await this.$confirm(`确定要解绑该员工吗?`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).catch(() => {
				this.$message({
					type: 'info',
					message: `已取消解绑`
				});
			});

			if(response == "confirm"){
				try{
					let manager = {
						store_manager_id: paramObj.id
					}
					this.isLoading = true
					await storeService.unbind(manager).then(data =>{
						if(data.code == "0"){
							this.$message({
								type:'success',
								message: data.message
							})
							this.isLoading = false
						}
					}).catch(error =>{
						this.$message({
							type:'error',
							message: error.message
						})
						this.isLoading = false
					}).finally(() =>{
						this.isLoading = false
					})
				} catch(error){
					this.$message({
						type:'error',
						message: error.message
					})
					this.isLoading = false
				}
				await _this.getStore()
				
			}
		},

	},
	filters: {
		formDate(timestamp){
			return $utils.formatDate(new Date(timestamp), 'yyyy-MM-dd')
		}
	},
  mounted() {
    this.getStore();
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

.store {
	background: #f0f2f5;
	min-height: calc(100vh - 50px);
	width: 100%;
	.store-header{
		background: #fff;
		padding: 30px 24px 24px 24px;
		position: relative;
		.store-name{
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
		.store-detail{
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
			}
		}
	}
	.store-form {
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

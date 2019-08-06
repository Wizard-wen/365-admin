<template>
  <div class="orderApply">
    <!-- 订单申请详情 -->
	<div class="orderApply-header">
		<div class="orderApply-name">
			<h4>申请编号：{{orderApplyDetail.name}}</h4>
		</div>
		<div class="btn-group">
			<el-button size="mini" @click="goback">返回</el-button>
			<el-button size="mini" type="success">通过</el-button>
            <el-button size="mini" type="danger">拒绝</el-button>
		</div>
		<div class="orderApply-detail">
			<div class="detail-left">
				<div class="detail-left-box">
					<div class="detail-left-line">申请创建人：{{ orderApplyDetail.manager_name }}</div>
					<div class="detail-left-line">申请创建时间：{{ orderApplyDetail.created_at | formDate }}</div>
					<div class="detail-left-line">来源门店：{{orderApplyDetail.is_third }}</div>
					<div class="detail-left-line">来源人：{{orderApplyDetail.address}}</div>
				</div>
			</div>
			<div class="detail-right">
				<!-- <div class="right-box">
					<div class="title">状态</div>
					<div class="value">{{orderApplyDetail.type == 'enable'?'正常':'停业'}}</div>
				</div>
				<div class="right-box">
					<div class="title">员工数量</div>
					<div class="value">{{ orderApplyDetail.staff_count }}</div>
				</div> -->
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
					<div class="detail-left-line">客户名：</div>
					<div class="detail-left-line">联系电话：</div>
					<div class="detail-all-line">工种：</div>
					<div class="detail-all-line">服务地址：</div>
                    <div class="detail-all-line">工作时间：</div>
                    <div class="detail-all-line">工资：</div>
                    <div class="detail-all-line">订单详情：</div>
				</div>
			</div>
		</div>

        <div class="card-box">
			<div class="card-title">
				<div class="title">
					订单申请来源
				</div>
                <div class="control">
					<el-button size="small" type="primary" @click="edit">修改</el-button>
				</div>
			</div>
			<div class="card-contains">
                <div class="detail-left-box">
					<div class="detail-left-line">来源门店：</div>
					<div class="detail-left-line">来源人：</div>
				</div>
			</div>
		</div>

		<div class="card-box">
			<div class="card-title">
				<div class="title">
					日志列表
				</div>
				<div class="control">
					<el-button size="small" type="primary" @click="edit">添加日志</el-button>
				</div>
			</div>
			<div class="card-contains">
				<!-- 员工列表 -->
				<el-table :data="salesPersonTable" class="person-table" :header-cell-style="{height: '48px',background: '#fafafa'}">
					<el-table-column label="创建时间" prop="id" align="center"></el-table-column>

					<el-table-column label="管理员姓名" prop="name" align="center"></el-table-column>

					<el-table-column label="日志类别" prop="phone" align="center"></el-table-column>

                    <el-table-column label="日志内容" prop="phone" align="center"></el-table-column>

					<el-table-column label="操作" align="center">
						<!-- <template slot-scope="scope"> -->
						    <el-button size="mini">查看</el-button>
						<!-- </template> -->
					</el-table-column>
				</el-table>
			</div>
		</div>
	</div>
  </div>
</template>

<script>
import { shopService, store, $utils } from "../../../../common";
export default {
  data() {
    return {
      //是否展示表单
      isShow: true,
      //门店详情
      orderApplyDetail: {},
      //员工列表
      salesPersonTable: [],
    };
  },
  methods: {
    //改变表单的显示隐藏状态
    changeFormState() {
        this.isShow = !this.isShow;
    },
    /**
     * 解绑账号
     */
    async deleteStore(index, row) {
      let response = await this.$confirm("确定解绑该账户吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      });
      if (response == "confirm") {
        store.commit("setLoading", 1);
        try {
          await shopService
            .deleteStore(row.id)
            .then(data => {
              if (data.code == 0) {
                this.$message({
                  type: "success",
                  message: "删除成功"
                });
              }
            })
            .catch(data => {
              this.$message({
                type: "error",
                message: e.message
              });
            });
        } catch (e) {
          throw error;
        }
        this.getStore();
        store.commit("setLoading", false);
      }
      this.$router.push({
        path: "/orderApply/shopItem",
        query: {
          type: 1, //编辑为1
          id: row.id
        }
      });
    },
    /**
     * 获取订单申请信息
     */
    async getApplication() {
        await operateService.getApplication(this.$route.query.id).then(data => {
                if (data.code == "0") {
                    this.orderApplyDetail = {...data.data.store};
                }
            })
            .catch(error => {
                this.$message({
                    type: "error",
                    message: error.message
                });
            });
    },
    //获取绑定的员工列表
    async getSalePersonList() {
      let tableOption = {
        pageNumber: 10,
        id: this.$route.query.id
      };

      try {
        await shopService
          .getStoreManagerList(tableOption)
          .then(data => {
            if (data.code == "0") {
              this.salesPersonTable = [...data.data.data];
            }
          })
          .catch(error => {
            this.$message({
              type: "error",
              message: error.message
            });
          })
      } catch (error) {
        this.$message({
          type: "error",
          message: error.message
        });
      }
    },
    /**
     * 编辑
     */
    edit() {
      this.$router.push({
        path: "/orderApply/shopEdit",
        query: {
          type: 1,
          id: this.$route.query.id
        }
      });
    },
    goback(){
      this.$router.push('/orderApply/shopList')
    }
  },
  filters: {
      formDate(timestamp){
          return $utils.formatDate(new Date(timestamp), 'yyyy-MM-dd')
      }
  },
  mounted() {
    this.getStore();
    this.getSalePersonList();
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

<template>
  <div class="shop">
    <!-- 门店详情 -->
	<div class="shop-header">
		<div class="shop-name">
			<h4>{{shopDetail.name}}</h4>
		</div>
		<div class="btn-group">
			<el-button size="mini" @click="goback">返回</el-button>
			<el-button size="mini">修改</el-button>
		</div>
		<div class="shop-detail">
			<div class="detail-left">
				<div class="detail-left-box">
					<div class="detail-left-line">创建人：{{ shopDetail.manager_name }}</div>
					<div class="detail-left-line">创建时间：{{ shopDetail.created_at | formDate }}</div>
					<div class="detail-left-line">门店类型：{{shopDetail.is_third == 1 ? '直营店': shopDetail.is_third == 2 ?'加盟店': ''}}</div>
					<!-- <div class="detail-left-line">门店负责人：</div> -->
					<!-- <div class="detail-left-line">门店状态：{{shopDetail.type == 'enable'?'正常':'停业'}}</div> -->
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
					<div class="value">{{ shopDetail.staff_count }}</div>
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
					<el-button size="small" type="primary" @click="edit">编辑</el-button>
				</div>
			</div>
			<div class="card-contains">
				<!-- 员工列表 -->
				<el-table :data="salesPersonTable" class="person-table" :header-cell-style="{height: '48px',background: '#fafafa'}">
					<el-table-column label="编号" prop="id" align="center"></el-table-column>

					<el-table-column label="姓名" prop="name" align="center"></el-table-column>

					<el-table-column label="电话" prop="phone" align="center"></el-table-column>

					<!-- <el-table-column label="操作" align="center"> -->
						<!-- <template slot-scope="scope">
						<el-button size="mini" @click="deleteStore(scope.$index, scope.row)">解绑</el-button>
						</template> -->
					<!-- </el-table-column> -->
				</el-table>
			</div>
		</div>
	</div>
  </div>
</template>

<script>
import { shopService, store, $utils } from "../../../common";
export default {
  data() {
    return {
      //是否展示表单
      isShow: true,
      //门店详情
      shopDetail: {},
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
        path: "/shop/shopItem",
        query: {
          type: 1, //编辑为1
          id: row.id
        }
      });
    },
    /**
     * 获取门店列表
     */
    async getStore() {
      await shopService
        .getStore(this.$route.query.id)
        .then(data => {
          if (data.code == "0") {
            this.shopDetail = {...data.data.store};
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
        path: "/shop/shopEdit",
        query: {
          type: 1,
          id: this.$route.query.id
        }
      });
    },
    goback(){
      this.$router.push('/shop/shopList')
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

.shop {
	background: #f0f2f5;
	min-height: calc(100vh - 50px);
	width: 100%;
	.shop-header{
		background: #fff;
		padding: 30px 24px 24px 24px;
		position: relative;
		.shop-name{
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
		.shop-detail{
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
	.shop-form {
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

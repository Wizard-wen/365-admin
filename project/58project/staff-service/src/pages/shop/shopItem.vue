<template>
  <div class="shop">
    <!-- 门店详情 -->
    <el-card class="box-card">
      <div slot="header" class="card-header">
        <h3>门店基本信息</h3>
        <div class="control">
          <el-button
            type="text"
            :icon="isShow? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
            circle
            size="small"
            @click="changeFormState"
          >{{isShow?`收起`:`展开`}}</el-button>
        </div>
      </div>

      <div class="base-form-box">
        <div class="base-message-box" v-if="isShow">
          <div class="base-line">门店名：{{shopDetail.name}}</div>
          <div class="base-line">门店地址：{{shopDetail.address}}</div>
          <div class="base-line">门店类型：{{shopDetail.is_third == 0 ? '直营店': '加盟店'}}</div>
          <div class="base-line">门店状态：{{shopDetail.type == 'enable'?'正常':'停业'}}</div>
          <div class="base-line">备注信息：{{shopDetail.remark}}</div>
        </div>
      </div>
    </el-card>
    <!-- 编辑按钮 -->
    <el-form :inline="true" :model="shopSearch" class="shop-form">
      <div class="addPerson">
        <el-form-item>
          <el-button type="primary" @click="edit">编辑</el-button>
        </el-form-item>
      </div>
    </el-form>
    <!-- 员工列表 -->
    <el-table :data="salesPersonTable" class="person-table">
      <el-table-column label="编号" prop="id" align="center"></el-table-column>

      <el-table-column label="姓名" prop="name" align="center"></el-table-column>

      <el-table-column label="电话" prop="phone" align="center"></el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="deleteStore(scope.$index, scope.row)">解绑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { shopService, store } from "../../../common";
export default {
  data() {
    return {
      //是否展示表单
      isShow: true,
      //门店详情
      shopDetail: null,
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
            this.shopDetail = data.data.store;
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
              this.salesPersonTable = data.data.data;
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
     * 进入员工列表
     */
    edit() {
      this.$router.push({
        path: "/shop/shopEdit",
        query: {
          type: 1,
          id: this.$route.query.id
        }
      });
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
  padding-top: 30px;
  margin: 0 auto;
  .shop-form {
    width: 80%;
    min-width: 1100px;
    margin: 0 auto;
    .addPerson {
      float: right;
    }
  }
}
</style>

<template>
  <div class="worker" v-loading="isLoaded">
    <client-list-table-component
      :staffTable="orderApplyTable"
      :maxLength="maxLength"
      :controlScopeLength="170"
    >

      <template slot="searchList">
          <div class="search-list">
              <query-component @updateTable="updateTable"></query-component>
          </div>
      </template>

      <template slot="searchForm">
          <div class="search-tag-list">
              <query-tag-component @updateTable="updateTable"></query-tag-component>
          </div>
      </template>


      <template slot="control" slot-scope="controler">
          <el-button v-if="controler.scoper.row.type == 1" size="mini" type="text" @click="editOrderApply(1, controler.scoper.row)">编辑</el-button>
          <el-button v-if="controler.scoper.row.type != 1" size="mini" type="text" @click="editOrderApply(1, controler.scoper.row)">查看</el-button>
          <el-button size="mini" type="text" style="color:#f56c6c"
              v-if="controler.scoper.row.type == 1"
              @click="refuseOrderApply(controler.scoper.row)">拒绝</el-button>
          <el-button size="mini" type="text" style="color:#67c23a"
              v-if="controler.scoper.row.type == 1"
              @click="openPassOrderApply(controler.scoper.row)">通过</el-button>
      </template>

      <template slot="pagination">
        <el-pagination
          class="pagination"
          @current-change="handleCurrentPage"
          @prev-click="handleCurrentPage"
          @next-click="handleCurrentPage"
          :current-page.sync="pagination.currentPage"
          :page-size="pagination.pageNumber"
          layout="prev, pager, next, jumper"
          :total="pagination.total"
        ></el-pagination>
      </template>

    </client-list-table-component>
  </div>
</template>

<script>
import {operateService} from '../../../../common'
import {
  clientListTableComponent,
  queryTagComponent,
  queryComponent
} from "./clientRequireList/index.js";

export default {
  components: {
    clientListTableComponent,
    queryTagComponent,
    queryComponent,
  },
  data() {
    return {
      //订单申请列表
      orderApplyTable: [],
      isLoaded: false,
      /**
       * 分页信息
       */
      pagination: {
        total: 0,
        currentPage: 1,
        pageNumber: 20
      },
      //计算列表每一列的最大宽度
      maxLength: {
        type: 100 //订单申请状态
      },
      systemVersion: "", //系统版本号
      orderApplyId: "", //当前订单id
    };
  },
  methods: {
    /**
     * 请求表格数据
     */
    async getTableList() {
      try {
        this.isLoaded = true;

        await Promise.all([
          operateService.getClientRequireList(), //订单申请列表
          operateService.getApplyFormConfig() //订单申请相关配置标签
        ])
          .then(data => {
            this.orderApplyTable = data[0].data.data;

            //分页信息
            this.pagination.currentPage = data[0].data.current_page; //当前页码
            this.pagination.total = data[0].data.total; //列表总条数

            //配置订单相关标签
            this.$store.commit("setOrderApplyConfigForm", data[1].data);
          })
          .catch(error => {
            this.$message({
              type: "error",
              message: error.message
            });
          })
          .finally(() => {
            this.isLoaded = false;
          });
      } catch (error) {
        this.$message({
          type: "error",
          message: error.message
        });
      }
    },
    // 由查询组件触发的更新表格事件
    async updateTable() {
      await this.getTableList();
    },
    /**
     * 切换页码
     */
    async handleCurrentPage(val) {
      //设置page查询参数
      this.$store.commit("setClientRequire", {
        queryKey: "page",
        queryedList: val
      });
      await this.getTableList();
    },
    /**
     * 打开通过订单弹窗
     * @param paramObj 订单字段对象
     */
    async openPassOrderApply(paramObj) {
      this.orderApplyId = paramObj.id;
      this.systemVersion = paramObj.version; //系统版本号
      let reault = await this.$confirm("确定通过该订单申请吗？此操作将会关闭订单拒绝","提示",{
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
      }).catch(() => {
          this.$message({
              type: "info",
              message: "已放弃"
          });
      });
      if (reault == "confirm") {
          this.isLoaded = true
          try {
              await operateService.changeRequireType(paramObj.id,3).then(async data => {
                  if (data.code == 0) {
                      this.$message({
                          type: "success",
                          message: data.message
                      });
                  }
                  await this.getTableList()

              }).catch(error => {
                  this.$message({
                      type: "error",
                      message: error.message
                  });
              }).finally(() =>{
                  this.isLoaded = false
              })
          } catch (error) {
              throw error;
          }
      }
    },
      /**
       * 拒绝订单申请年轻
       * @paramObj
       */
      async refuseOrderApply(paramObj){
      let response = await this.$confirm("确定拒绝该订单申请吗?此操作将会关闭订单申请", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
      }).catch(() => {
          this.$message({
              type: "info",
              message: "已放弃拒绝"
          });
      });
      if (response == "confirm") {
          this.isLoaded = true
          try {

              await operateService.changeRequireType(paramObj.id,2).then(async data => {
                  if (data.code == 0) {
                      this.$message({
                          type: "success",
                          message: data.message
                      });
                  }
                  await this.getTableList()

              }).catch(error => {
                  this.$message({
                      type: "error",
                      message: error.message
                  });
              }).finally(() =>{
                  this.isLoaded = false
              })
          } catch (error) {
              throw error;
          }
      }
      },
    /**
     * 编辑订单申请
     */
    editOrderApply(type, row){
        this.$router.push({
            path: "/operate/clientRequireItem",
            query: {
                type: type, //编辑为1 创建为 0
                id: type == 1? row.id : 0
            }
        })
    },
  },
  async mounted() {
    await this.getTableList();
  }
};
</script>

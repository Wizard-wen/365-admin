<template>
    <div class="shop">
        <el-form :inline="true" :model="shopSearch" class="shop-form">
            <div class="search-up">
                <div>
                    <el-form-item>
                        <el-button type="primary" @click="save">确认</el-button>
                        <el-button type="primary" @click="cancel">取消</el-button>
                    </el-form-item>
                </div>
            </div>
        </el-form>

        <el-table :data="list" class="shop-table">

            <el-table-column label="编号" prop="id" align="center"></el-table-column>

            <el-table-column label="姓名" prop="name" align="center"></el-table-column>

            <el-table-column label="电话" prop="address" align="center"></el-table-column>

        </el-table>
        <!-- 分页 -->
        <el-pagination
            class="pagination"
            @current-change="handleCurrentPage"
            @prev-click="handleCurrentPage"
            @next-click="handleCurrentPage"
            :current-page.sync="pagination.currentPage"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="pagination.total"></el-pagination>
    </div>
</template>
<script>
    import {shopService} from '../../../common'
    export default {
        data() {
            return {
                //门店列表
                list: [],
                //表单搜索项
                shopSearch: {
                    name: '', //门店名
                    type: 0,//门店类型
                },
                /**
                 * 分页信息
                 */
                pagination: {
                    total: 0,
                    currentPage: 1,
                    pageNumber: 10,
                },
            }
        },
        computed:{
            save(){

            },
            cancel(){

            }
        },
        methods: {
    /**
     * 获取门店列表
     */
    async getStore() {
      await shopService
        .getStore(this.$route.query.id)
        .then(data => {
          if (data.code == "0") {
            this.list = data.data.store_manager;
          }
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: error.message
          });
        });
    },
            /**
             * 切换页码
             */
            async handleCurrentPage(val){
                this.pagination.currentPage = val
                await this.getTableList()
            },

        },
        async mounted(){
            await this.getStore()
        }
    }
</script>
<style lang="scss" scoped>
        .shop{
        padding-top: 30px;
        margin: 0 auto;
        .shop-form{
            width:80%;
            min-width:1100px;
            margin: 0 auto;
            .search-up{
                display: flex;
                justify-content: space-between;
            }
        }
        .shop-table{
            width: 80%;
            min-width: 1100px;
            margin: 0 auto;
        }
        .pagination{
            width:80%;
            min-width:1100px;
            margin: 30px auto 0 auto;;
        }
    }
</style>







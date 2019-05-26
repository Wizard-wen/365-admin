<template>
  <div class="shop">
    <el-form :inline="true" :model="shopSearch" class="shop-form">
      <div class="search-up">
        <div>
          <el-form-item>
            <el-input v-model="shopSearch.name" placeholder="请输入门店名" :maxlength="20"></el-input>
          </el-form-item>

          <el-form-item>
            <el-select v-model="shopSearch.is_third" placeholder="请选择门店类型">
              <el-option :label="'全部'" :value="0"></el-option>
              <el-option :label="'直营店'" :value="1"></el-option>
              <el-option :label="'加盟店'" :value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="searchShop">查询</el-button>
            <el-button type="primary" @click="resetShop">重置</el-button>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" @click="createShop">添加门店</el-button>
        </el-form-item>
      </div>
    </el-form>

    <el-table :data="shopList" class="shop-table">
      <el-table-column label="编号" prop="id" align="center"></el-table-column>

      <el-table-column label="门店名" prop="name" align="center"></el-table-column>

      <el-table-column label="门店类型" prop="type" align="center"></el-table-column>

      <el-table-column label="地区" prop="address" align="center"></el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="editShop(scope.$index, scope.row)">详情</el-button>
        </template>
      </el-table-column>
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
      :total="pagination.total"
    ></el-pagination>
  </div>
</template>
<script>
    import {shopService} from '../../../common'
    export default {
        data() {
            return {
                //门店列表
                shopList: [],
                //表单搜索项
                shopSearch: {
                    name: '', //门店名
                    is_third: 0,//门店类型
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
            /**
             * 全部已添加搜索字段
             */
            searchArray(){
                let arr = [],
                _this = this;

                Object.keys(this.shopSearch).forEach((item, index) =>{
                    //如果搜索字段是数组的话
                    if(Array.isArray(_this.shopSearch[item])){
                        if(_this.shopSearch[item].length){
                            let obj = {}
                            obj[item] = [..._this.shopSearch[item]]
                            obj = {
                                ...obj,
                                key: item
                            }
                            arr.push(obj)
                        }
                    }
                    //如果搜索字段是字符串的话
                    else if(_this.shopSearch[item] != ''){
                        let obj = {}
                        obj[item] = _this.shopSearch[item]
                        obj = {
                            ...obj,
                            key: item
                        }
                        arr.push(obj)
                    }
                })
                return arr
            },
        },
        methods: {
             /**
             * 请求表格数据
             * @param tableOption 表格配置项
             * @param tableOption.currentPage 当前页
             * @param tableOption.searchSelect Array 页面筛选项
             * [{searchkey: '', searchValue: ''}]
             */
            async getTableList(){

                let tableOption = {
                    currentPage: this.pagination.currentPage,
                    pageNumber: this.pagination.pageNumber,
                    searchSelect: this.searchArray
                }

                store.commit('setLoading',true)
                try{
                    await shopService.getStoreList(tableOption).then(data =>{
                            if(data.code == "0"){
                                this.shopList = data.data.data
                                this.shopList.forEach(item=>{
                                this.$set(item,'type','')
                                  if(item.is_third == 1){
                                    item.type = '直营店'
                                  }else if(item.is_third == 2){
                                    item.type = '加盟店'
                                  }
                                })

                                //分页信息
                                this.pagination.currentPage = data.data.current_page //当前页码
                                this.pagination.total = data.data.total //列表总条数
                            }
                        }).catch(error =>{
                            this.$message({
                                type:'error',
                                message: error.message
                            })
                        }).finally(() =>{
                            store.commit('setLoading',false)
                        })
                } catch(error){
                    this.$message({
                        type:'error',
                        message: error.message
                    })
                }
            },
            /**
             * 切换页码
             */
            async handleCurrentPage(val){
                this.pagination.currentPage = val
                await this.getTableList()
            },
            /**
             * 查找门店
             */
            async searchShop(){
                await this.getTableList()
            },
            /**
             * 重置搜索框
             */
            async resetShop(){
                this.shopSearch.name= '' //门店名
                this.shopSearch.is_third= 0//门店类型
                await this.getTableList()
            },
            /**
             * 创建门店
             */
            createShop(){
                this.$router.push({
                    path: "/shop/shopEdit",
                    query: {
                        type: 0
                    }
                })
            },
            /**
             * 编辑门店
             */
            editShop(index, row){
                this.$router.push({
                    path: "/shop/shopItem",
                    query: {
                        type: 1, //编辑为1
                        id: row.id
                    }
                })
            },

        },
        async mounted(){
            await this.getTableList()
        }
    }
</script>
<style lang="scss" scoped>
.shop {
  padding-top: 30px;
  margin: 0 auto;
  .shop-form {
    width: 80%;
    min-width: 1100px;
    margin: 0 auto;
    .search-up {
      display: flex;
      justify-content: space-between;
    }
  }
  .shop-table {
    width: 80%;
    min-width: 1100px;
    margin: 0 auto;
  }
  .pagination {
    width: 80%;
    min-width: 1100px;
    margin: 30px auto 0 auto;
  }
}
</style>







<template>
	<div class="store" :v-loading="isLoading">
		<el-form :inline="true" :model="storeSearch" class="store-form">
			<div class="search-up">
				<div>
					<el-form-item>
						<el-input v-model="storeSearch.name" placeholder="请输入门店名" :maxlength="20"></el-input>
					</el-form-item>

					<el-form-item>
						<el-select v-model="storeSearch.is_third" placeholder="请选择门店类型">
							<el-option :label="'全部'" :value="0"></el-option>
							<el-option :label="'直营店'" :value="1"></el-option>
							<el-option :label="'加盟店'" :value="2"></el-option>
						</el-select>
					</el-form-item>

					<el-form-item>
						<el-button type="primary" @click="searchstore">查询</el-button>
						<el-button type="primary" @click="resetstore">重置</el-button>
					</el-form-item>
				</div>
				<el-form-item>
					<el-button type="primary" @click="openCreateStoreDialog">添加门店</el-button>
				</el-form-item>
			</div>
		</el-form>
		<create-store-dialog
			:createStoreDialogVisible="createStoreDialogVisible"
			v-if="createStoreDialogVisible"
			@closeAddStoreStaffDialog="closeAddStoreStaffDialog"></create-store-dialog>
		<el-table :data="storeList" class="store-table" :header-cell-style="{height: '48px',background: '#fafafa'}">
			<el-table-column label="编号" prop="id" align="center"></el-table-column>

			<el-table-column label="门店名" prop="name" align="center"></el-table-column>

			<el-table-column label="门店类型" prop="is_third" align="center">
				<template slot-scope="scope">
					<table-tag-component 
						v-if="storeTypeList" 
						:propList="storeTypeList" 
						:tableOriginData="scope.row.is_third"></table-tag-component>
				</template>
			</el-table-column>

			<el-table-column label="店长" prop="name" align="center"></el-table-column>

			<el-table-column label="地区" prop="address" align="center" width="300"></el-table-column>

			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
				<el-button size="mini" @click="editstore(scope.$index, scope.row)">详情</el-button>
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
			:total="pagination.total"></el-pagination>
	</div>
</template>
<script>
	import {storeService} from '../../../common'
	import {createStoreDialog} from './storeList/index.js'
	import {tableTagComponent} from '@/pages/components/index.js'
    export default {
        data() {
            return {
				isLoading: false,
                //门店列表
                storeList: [],
                //表单搜索项
                storeSearch: {
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
				/**
				 * 门店类型字段
				 */
				storeTypeList: [
					{name: '直营店', id: 1},
					{name: '加盟店', id: 2},
				],
				createStoreDialogVisible: false,//创建新门店弹窗
            }
		},
		components: {
			tableTagComponent,
			createStoreDialog,
		},
        computed:{
            /**
             * 全部已添加搜索字段
             */
            searchArray(){
                let arr = [],
                _this = this;

                Object.keys(this.storeSearch).forEach((item, index) =>{
                    //如果搜索字段是数组的话
                    if(Array.isArray(_this.storeSearch[item])){
                        if(_this.storeSearch[item].length){
                            let obj = {}
                            obj[item] = [..._this.storeSearch[item]]
                            obj = {
                                ...obj,
                                key: item
                            }
                            arr.push(obj)
                        }
                    }
                    //如果搜索字段是字符串的话
                    else if(_this.storeSearch[item] != ''){
                        let obj = {}
                        obj[item] = _this.storeSearch[item]
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

                this.isLoading = true
                try{
                    await storeService.getStoreList(tableOption).then(data =>{
						if(data.code == "0"){
							this.storeList = data.data.data
							this.isLoading = false
							//分页信息
							this.pagination.currentPage = data.data.current_page //当前页码
							this.pagination.total = data.data.total //列表总条数
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
            async searchstore(){
                await this.getTableList()
            },
            /**
             * 重置搜索框
             */
            async resetstore(){
                this.storeSearch.name= '' //门店名
                this.storeSearch.is_third= 0//门店类型
                await this.getTableList()
            },
            /**
             * 打开创建门店弹窗
             */
            openCreateStoreDialog(){
                this.createStoreDialogVisible = true
			},
			/**
			 * 关闭创建门店弹窗
			 */
			async closeAddStoreStaffDialog(){
				this.createStoreDialogVisible = false
				await this.getTableList()
			},
            /**
             * 编辑门店
             */
            editstore(index, row){
                this.$router.push({
                    path: "/store/storeItem",
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
.store {
  padding-top: 30px;
  margin: 0 auto;
  .store-form {
    width: 80%;
    min-width: 1100px;
    margin: 0 auto;
    .search-up {
      display: flex;
      justify-content: space-between;
    }
  }
  .store-table {
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







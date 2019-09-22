<template>
    <div class="store" v-loading="isLoading">
        <store-table-component
            :staffTable="storeList"
            :controlScopeLength="100">
            
            <template slot="searchList">
                <div class="search-list">
                    <query-component @updateTable="updateTable"></query-component>
                </div>
            </template>

            <template slot="searchForm">
                <query-tag-component @updateTable="updateTable"></query-tag-component>
            </template>
            
            <template slot="control" slot-scope="controler">
                <el-button size="mini" type="text" @click="editstore(controler.scoper.row)">详情</el-button>
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
                    :total="pagination.total"></el-pagination>
            </template>
        </store-table-component>
        <create-store-dialog
			:createStoreDialogVisible="createStoreDialogVisible"
			v-if="createStoreDialogVisible"
			@closeAddStoreStaffDialog="closeAddStoreStaffDialog"></create-store-dialog>
    </div>
</template>
<script>
	import {storeService,$utils} from '../../../common'
	import {createStoreDialog} from './storeList/index.js'
    import {
        storeTableComponent,
        queryComponent,
        queryTagComponent,
    } from './storeList/index.js'
    export default {
        data() {
            return {
				isLoading: false,
                //门店列表
                storeList: [],
                /**
                 * 分页信息
                 */
                pagination: {
                    total: 0,
                    currentPage: 1,
                    pageNumber: 20,
                },
				createStoreDialogVisible: false,//创建新门店弹窗
            }
		},
		components: {
            createStoreDialog,
            storeTableComponent,
            queryComponent,
            queryTagComponent,
		},
        methods: {
             /**
             * 请求表格数据
             */
            async getTableList(){
                
                try{
                    this.isLoading = true
                    await storeService.getStoreList().then(data =>{
						if(data.code == "0"){
							this.storeList = data.data.data
					
							//分页信息
							this.pagination.currentPage = data.data.current_page //当前页码
                            this.pagination.total = data.data.total //列表总条数
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
                }
            },
            // 由查询组件触发的更新表格事件
            async updateTable(){
                await this.getTableList()
            },
            /**
             * 切换页码
             */
            async handleCurrentPage(val){
                //设置page查询参数
                this.$store.commit('setStoreList', {
                    queryKey: 'page',
                    queryedList: val
                })
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
            editstore(row){
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

</style>







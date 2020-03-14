<template>
    <card-box-component :title="'门店员工'" >
        <template slot="control">
            <el-button 
                size="small" type="primary"
                @click="openAddStroeStaffDialog">添加新店员</el-button>
        </template>
        <el-table 
            slot="contains"  class="person-table" 
            :data="storeStaffList" max-height="500"
            :header-cell-style="{height: '48px',background: '#fafafa'}">
            <el-table-column label="编号" prop="manager_code" align="center"></el-table-column>

            <el-table-column label="姓名" prop="real_name" align="center"></el-table-column>

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
        <add-store-worker-dialog
            :addStoreStaffDialogVisible="addStoreStaffDialogVisible"
            v-if="addStoreStaffDialogVisible"
            @closeAddStoreStaffDialog="closeAddStoreStaffDialog"
            :storeObject="storeDetail"></add-store-worker-dialog>
    </card-box-component>
</template>

<script>
import addStoreWorkerDialog from './addStoreWorkerDialog.vue'
export default {
    components: {
        addStoreWorkerDialog,
    },
    props: {
        storeStaffList: {
            type: Array,
            default(){return []}
        }
    },
    data(){
        return {
            //门店员工职位
            positionTypeList: [{id: 1, name: '店员'}, {id: 2, name: '店长'}],
            //门店详情
			storeDetail: {},
			//添加新店员弹窗显示隐藏
			addStoreStaffDialogVisible: false,
        }
    },
    methods: {
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
    }
}
</script>

<style>

</style>
<template>
	<div class="store-edit" v-loading="is_loading">
		<el-form class="form-style" ref="form" :rules="storeRules" :model="storeForm" label-width="120px">
			<el-form-item label="门店名" prop="name">
				<el-input v-model="storeForm.name" :maxlength="20"></el-input>
			</el-form-item>

			<el-form-item label="门店地区" prop="address">
				<el-input v-model="storeForm.address" :maxlength="20"></el-input>
			</el-form-item>

			<el-form-item label="门店类型" prop="is_third">
				<select-tag-component :propTagList="is_thirdList" v-model="storeForm.is_third" :isSingle="true"></select-tag-component>
			</el-form-item>

			<el-form-item label="经营状态" prop="type">
				<select-tag-component :propTagList="typeList" v-model="storeForm.type" :isSingle="true"></select-tag-component>
			</el-form-item>

			<el-form-item label="店长" prop="store_manager_id">
				<el-select v-model="storeForm.store_manager_id" placeholder="请选择店长">
                    <el-option
                        v-for="item in storeStaffList"
                        :key="item.manager_id"
                        :label="item.manager_name"
                        :value="item.manager_id"
                        ></el-option>
                </el-select>
			</el-form-item>

			<el-form-item label="备注" prop="remarks">
				<el-input v-model="storeForm.remarks" :maxlength="20"></el-input>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="onSubmit('form')">提交</el-button>
				<el-button @click="$router.go(-1)">返回</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import { storeService } from "../../../common";
import { selectTagComponent,cascaderTagComponent } from "@/pages/components";
export default {
	data() {
		return {
			is_loading: false,
			//账户信息
			storeForm: {
				id: 0,
				name: "",
				address: "",
				is_third: 0,
				remarks: "",
				store_manager_id: 0,
				type: ""
			},
			storeStaffList: [],//门店内所有员工列表
			//店铺规则
			storeRules: {
				name: [{ required: true, message: '请填写店铺名称', trigger: "blur" }],
				address: [{ required: true, message: '请填写门店地址', trigger: "blur" }],
			},
			//店铺类型列表
			is_thirdList: [{ id: 1, name: "直营店" }, { id: 2, name: "加盟店" }],
			//经营状态
			typeList: [{ id: 1, name: "正常" }, { id: 2, name: "关闭" }],
		};
	},
	components: {
		selectTagComponent,
		cascaderTagComponent
	},
	methods: {
		/**
		 * 获取门店信息
		 */
		async getStore() {
			try{
				this.is_loading = true
				await storeService.getStore(this.$route.query.id).then(data => {
					if (data.code == "0") {
						this.storeForm = data.data.store
						this.storeForm.type = this.storeForm.type == 'enable' ? 1 : 2
						this.is_loading = false
					}
				}).catch(error => {
					this.$message({
						type: "error",
						message: error.message
					});
					this.is_loading = false
				}).finally(() => {
					this.is_loading = false
				})
			} catch(error){
				this.$message({
					type: "error",
					message: error.message
				});
				this.is_loading = false
			}
		},
		/**
		 * 提交数据
		 */
		async onSubmit(formName) {
			
			await this.$refs[formName].validate( async valid => {
				if (valid) {
					let storeObj = {
						...this.storeForm,
						type: this.storeForm.type == 1 ? 'enable' : 'disable' 
					};
					await storeService.editStore(storeObj).then(data => {
						if (data.code == "0") {
							this.$message({
								type: "success",
								message: data.message
							});
							if(this.$route.query.type == 1){
								this.$router.push({
									path: "/store/storeItem",
									query: {
										id: this.$route.query.id
									}
								});
							}else{
								this.$router.push("/store/storeList");
							}
						}
					}).catch(error => {
						this.$message({
							type: "error",
							message: error.message
						});
					});
				} else {
					return false;
				}
			});
		}
	},
	async mounted() {
		await this.getStore();
		await storeService.getStoreManagerSelection(this.storeForm.id).then(data =>{
			this.storeStaffList = data.data
		}).catch(error =>{
			this.$message({
				type: "error",
				message: error.message
			});
		})
	}
};
</script>
<style lang="scss" scoped>
.store-edit {
  padding: 30px;
  .form-style {
    width: 600px;
  }
}
</style>

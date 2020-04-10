<template>
	<div class="store-edit" v-loading="is_loading">
		<el-form class="form-style" ref="form" :rules="storeRules" :model="storeForm" label-width="120px">
			<el-form-item label="门店编号" prop="store_code">
				{{storeForm.store_code}}
			</el-form-item>

			<el-form-item label="创建时间" prop="created_at">
				{{storeForm.created_at | timeToSecondFomatter}}
			</el-form-item>

			<el-form-item label="创建人" prop="created_manager_name">
				{{storeForm.created_manager_name}}
			</el-form-item>

			<el-form-item label="员工数量" prop="agent_count">
				{{`${storeForm.agent_count} 人`}}
			</el-form-item>

			<el-form-item label="门店名" prop="name">
				<el-input v-model="storeForm.name" :maxlength="20"></el-input>
			</el-form-item>

			<el-form-item label="门店地址" prop="address">
				<el-input v-model="storeForm.address" :maxlength="20"></el-input>
			</el-form-item>

			<el-form-item label="门店类型" prop="is_third">
				<el-radio-group v-model="storeForm.is_third">
                    <el-radio :label="1">直营店</el-radio>
                    <el-radio :label="2">加盟店</el-radio>
                </el-radio-group>
			</el-form-item>

			<el-form-item label="经营状态" prop="status">
				<el-radio-group v-model="storeForm.status">
                    <el-radio :label="1">营业</el-radio>
                    <el-radio :label="2">停业</el-radio>
                </el-radio-group>
			</el-form-item>

			<el-form-item label="店长" prop="store_manager_id">
				<el-select v-model="storeForm.store_manager_id" placeholder="请选择店长">
                    <el-option
                        v-for="item in storeStaffList"
                        :key="item.manager_id"
                        :label="item.real_name"
                        :value="item.manager_id"></el-option>
                </el-select>
			</el-form-item>
			<el-form-item>
				<el-tooltip slot="label" class="item" effect="dark" content="上传门店的营业执照，比例为150*237。" placement="top-start">
					<span>营业执照<i class="el-icon-info"></i></span>
				</el-tooltip>
				<multiple-picture-upload
					v-model="storeForm.licenseFile"
					:title="'营业执照'"
					:maxCount="2"
					:height="150"
					:width="237"></multiple-picture-upload>
			</el-form-item>
			<el-form-item label="备注" prop="remarks">
				<el-input v-model="storeForm.remarks" type="textarea" :maxlength="20"></el-input>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="onSubmit('form')">提交</el-button>
				<el-button @click="$router.go(-1)">返回</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import { storeService } from "@/service/store";
export default {
	data() {
		return {
			is_loading: false,
			//账户信息
			storeForm: {
				id: 0,
				store_code:0,
				name: "",
				address: "",
				is_third: 1,
				remarks: "",
				store_manager_id: 0,
				store_manager_name: '',
				created_manager_id: 0,
				created_manager_name: '',
				status: 1,
				created_at: 0,
				agent_count: 0,
				licenseFile: [],
			},
			storeStaffList: [],//门店内所有员工列表
			//店铺规则
			storeRules: {
				name: [{ required: true, message: '请填写店铺名称', trigger: "blur" }],
				address: [{ required: true, message: '请填写门店地址', trigger: "blur" }],
			},
		};
	},
	methods: {
		/**
		 * 获取门店信息
		 */
		async getStore() {
			try{
				this.is_loading = true
				await Promise.all([
					storeService.getStore(this.$route.query.id),
					storeService.getStoreManagerSelection(this.$route.query.id),
				]).then(data => {
						this.storeForm = data[0].data.store
						this.storeStaffList = data[1].data
						this.is_loading = false
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
					};
					storeObj.store_manager_name= ''
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
	}
};
</script>
<style lang="scss" scoped>
.store-edit {
  padding: 30px;
  .form-style {
    width: 750px;
  }
}
</style>

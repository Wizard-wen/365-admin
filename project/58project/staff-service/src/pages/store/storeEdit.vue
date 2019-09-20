<template>
	<div class="store-edit">
		<el-form class="form-style" ref="form" :rules="storeRules" :model="storeForm" label-width="120px">
			<el-form-item label="门店名" prop="name">
				<el-input v-model="storeForm.name" :maxlength="20"></el-input>
			</el-form-item>

			<el-form-item label="门店地区" prop="address">
				<el-input v-model="storeForm.address" :maxlength="20"></el-input>
			</el-form-item>

			<el-form-item label="门店类型" prop="is_third">
				<select-tag-component :propTagList="typeList" v-model="storeForm.is_third" :isSingle="true"></select-tag-component>
			</el-form-item>

			<el-form-item label="店长" prop="manager">
				<el-select v-model="storeForm.manager" placeholder="请选择店长">
                    <el-option
                        v-for="item in storeStaffList"
                        :key="item.store_id"
                        :label="item.store_name"
                        :value="item.store_id"
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
			//账户信息
			storeForm: {
				id: 0,
				name: "",
				address: "",
				is_third: 0,
				remarks: "",
				phone: "",
				manager: [],
				start_time: 0,
				end_time: 0,
				type: ""
			},
			storeStaffList: [],//门店内所有员工列表
			//店铺规则
			storeRules: {
				name: [{ required: true, message: '请填写店铺名称', trigger: "blur" }],
				address: [{ required: true, message: '请填写门店地址', trigger: "blur" }],
			},
			//店铺类型列表
			typeList: [{ id: 1, name: "直营店" }, { id: 2, name: "加盟店" }],
			//绑定的员工列表
			roleList: []
		};
	},
	components: {
		selectTagComponent,
		cascaderTagComponent
	},
	methods: {
		async getStore() {
			await storeService.getStore(this.$route.query.id).then(data => {
				if (data.code == "0") {
					this.storeForm.id = data.data.store.id;
					this.storeForm.name = data.data.store.name;
					this.storeForm.address = data.data.store.address;
					this.storeForm.is_third = data.data.store.is_third;
					this.storeForm.remarks = data.data.store.remarks;
					this.storeForm.phone = data.data.store.phone;
					this.storeForm.start_time = data.data.store.start_time;
					this.storeForm.end_time = data.data.store.end_time;
					this.storeForm.type = data.data.store.type;
					this.storeForm.manager = data.data.manager;

					this.roleList = data.data.store_manager;
				}
			}).catch(error => {
				this.$message({
					type: "error",
					message: error.message
				});
			});
		},
		/**
		 * 提交数据
		 */
		async onSubmit(formName) {
		let storeObj = {
			id: this.storeForm.id,
			name: this.storeForm.name,
			address: this.storeForm.address,
			is_third: this.storeForm.is_third,
			remarks: this.storeForm.remarks,
			phone: this.storeForm.phone,
			manager: this.storeForm.manager,
			start_time: this.storeForm.start_time,
			end_time: this.storeForm.end_time,
			type: this.storeForm.type
		};
		await this.$refs[formName].validate( async valid => {
			if (valid) {
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
	mounted() {
		this.getStore();
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

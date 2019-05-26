<template>
  <div class="shop-edit">
    <el-form class="form-style" ref="form" :rules="shopRules" :model="shopForm" label-width="120px">
      <el-form-item label="门店名" prop="name">
        <el-input v-model="shopForm.name" :maxlength="20"></el-input>
      </el-form-item>

      <el-form-item label="门店地区" prop="address">
        <el-input v-model="shopForm.address" :maxlength="20"></el-input>
      </el-form-item>

      <el-form-item label="门店类型" prop="is_third">
        <select-tag-component :propTagList="typeList" v-model="shopForm.is_third" :isSingle="true"></select-tag-component>
      </el-form-item>

      <el-form-item label="绑定员工" prop="manager_ids" v-if="$route.query.type==1">
        <select-tag-component :propTagList="roleList" v-model="shopForm.manager_ids" :isSingle="false"></select-tag-component>
      </el-form-item>

      <el-form-item label="备注" prop="remarks">
        <el-input v-model="shopForm.remarks" :maxlength="20"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">提交</el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { shopService } from "../../../common";
import { selectTagComponent,cascaderTagComponent } from "@/pages/components";
export default {
  data() {
    const validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入门店名"));
      } else {
        callback();
      }
    };
    const validateAddress = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("门店地区"));
      } else {
        callback();
      }
    };
    return {
      //账户信息
      shopForm: {
        id: 0,
        name: "",
        address: "",
        is_third: 0,
        remarks: "",
        phone: "",
        manager_ids: [],
        start_time: 0,
        end_time: 0,
        type: ""
      },
      //店铺规则
      shopRules: {
        name: [{ validator: validateName, trigger: "blur" }],
        address: [{ validator: validateAddress, trigger: "blur" }]
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
      await shopService
        .getStore(this.$route.query.id)
        .then(data => {
          if (data.code == "0") {
            this.shopForm.id = data.data.store.id;
            this.shopForm.name = data.data.store.name;
            this.shopForm.address = data.data.store.address;
            this.shopForm.is_third = data.data.store.is_third;
            this.shopForm.remarks = data.data.store.remarks;
            this.shopForm.phone = data.data.store.phone;
            this.shopForm.start_time = data.data.store.start_time;
            this.shopForm.end_time = data.data.store.end_time;
            this.shopForm.type = data.data.store.type;
            this.shopForm.manager_ids = data.data.manager_ids;

            this.roleList = data.data.store_manager;
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
     * 提交数据
     */
    async onSubmit(formName) {
      let shopObj = {
        id: this.shopForm.id,
        name: this.shopForm.name,
        address: this.shopForm.address,
        is_third: this.shopForm.is_third,
        remarks: this.shopForm.remarks,
        phone: this.shopForm.phone,
        manager_ids: this.shopForm.manager_ids,
        start_time: this.shopForm.start_time,
        end_time: this.shopForm.end_time,
        type: this.shopForm.type
      };
      await this.$refs[formName].validate(valid => {
        if (valid) {
          shopService
            .editStore(shopObj)
            .then(data => {
              if (data.code == "0") {
                this.$message({
                  type: "success",
                  message: data.message
                });
                if(this.$route.query.type == 1){
                    this.$router.push({
                      path: "/shop/shopItem",
                      query: {
                        id: this.$route.query.id
                      }
                    });
                }else{
                  this.$router.push("/shop/shopList");
                }
              }
            })
            .catch(error => {
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
.shop-edit {
  padding: 30px;
  .form-style {
    width: 600px;
  }
}
</style>

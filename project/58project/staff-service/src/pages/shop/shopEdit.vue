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
import { selectTagComponent } from "@/pages/components";
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
        is_third: 1,
        remarks: ""
      },
      shopRules: {
        name: [{ validator: validateName, trigger: "blur" }],
        address: [{ validator: validateAddress, trigger: "blur" }]
      },
      typeList: [{ id: 1, name: "直营店" }, { id: 2, name: "加盟店" }] //部门
    };
  },
  components: {
    selectTagComponent
  },
  methods: {
    /**
     * 提交数据
     */
    async onSubmit(formName) {
      let shopObj = {
        id: this.shopForm.id,
        name: this.shopForm.name,
        address: this.shopForm.address,
        is_third: this.shopForm.is_third,
        remarks: this.shopForm.remarks
      };
      await this.$refs[formName].validate(valid => {
        if (valid) {
            shopService.editStore(shopObj)
            .then(data => {
              if (data.code == "0") {
                this.$message({
                  type: "success",
                  message: data.message
                });
                this.$router.push("/shop/shopList");
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

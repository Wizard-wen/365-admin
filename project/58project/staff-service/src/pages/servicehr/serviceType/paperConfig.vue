<template>
    <div class="skill-config">
        <el-form class="skill-form" ref="form" :rules="paperRules" :model="paperForm" label-width="120px">
            <el-form-item label="证书名称" prop="name">
                <el-input v-model="paperForm.name"></el-input>
            </el-form-item>
            <el-form-item label="是否启用">
                <el-switch v-model="paperForm.type"></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">{{$route.query.id? '确认编辑' : '立即创建'}}</el-button>
                <el-button @click="goback">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>

/**
 * type 0 新建  1 编辑
 */
import {hrService} from '../../../../common'

export default {
    data() {
        const nameValidate = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入证书类型名'));
            } else {
                if (!/^[\u4e00-\u9fa5]+$/.test(value)) {
                    callback(new Error('只能输入汉字'));
                }
                callback();
            }
        }
        return {
            //权限表单
            paperForm: {
                id: 0,//id
                name: '',//技能名称
                parent_id: 0,//所属层级
                version: 0,//所属版本号
                type : true,//
            },
            paperRules: {
                name: [
                    { validator: nameValidate, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        /**
         * 提交表单
         * 区分新建和编辑
         */
        async onSubmit(formName) {
            // 定义表单数据
            let formData = {...this.paperForm}

            let type = this.paperForm.type
            //判断type的类型，转换为enable字段
            formData.type = type ? 'enable' : "disable"

            await this.$refs[formName].validate((valid) => {
                if (valid) {
                    hrService.editPaper(formData)
                    .then(data =>{
                        if(data.code == '0'){
                            this.$message({
                                type:"success",
                                message: "修改成功"
                            })
                            this.$router.push('/serviceType/paperList')
                        }
                    }).catch(error =>{
                        this.$message({
                            type:'error',
                            message: error.message
                        })
                    })
                } else {
                    return false;
                }
            });
        },
        goback(){
            this.$router.push("/serviceType/paperList")
        }
    },
    async mounted(){
        store.commit('setLoading',true)
        //id
        let categoryId = this.$route.query.id ? this.$route.query.id : 0;
        if (categoryId) {
            await hrService.getPaper(categoryId)
              .then(data =>{
                  //若是编辑的话回显数据
                  if(this.$route.query.type == 1){
                      let obj = {
                          type: true
                      }
                      /**
                       *  转换是否启用字段，若字段名为
                       *  enable 启用
                       *  disable 不启用
                       */
                      if(data.data.type == "disable"){
                          obj.type = false
                      }

                      //混入obj数据
                      this.paperForm = {
                          ...data.data,
                          ...obj,
                      }
                  }

                  this.selectionList = data.data.selection
              }).catch(error =>{
                  this.$message({
                      type:'error',
                      message: error.message
                  })
              })
        }

        store.commit('setLoading',false)
    }
}
</script>
<style lang="scss" scoped>
    .auth-config{
        padding: 30px;
        .auth-form{
            width: 760px;
        }
    }
</style>


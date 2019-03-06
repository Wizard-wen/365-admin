<template>
    <div class="role-edit">
        <el-form
          class="roleForm"
          ref="form"
          :model="roleForm"
          label-width="120px"
          :rules="roleRules"
        >
            <el-form-item label="名称" prop="name">
                <el-input v-model="roleForm.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">提交</el-button>
                <el-button @click="$router.go(-1)">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import {authService} from '../../../../common'
export default {
    data(){
        const validateName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入角色名'));
            } else {
                callback();
            }
        };
        return {
            //账户信息
            roleForm: {
                name: '', //名称
            },
            //角色校验规则
            roleRules: {
                name: [
                    { validator: validateName, trigger: 'blur' }
                ],
            }
        }
    },
    computed: {
        /**
         * 角色is
         */
        roleId(){
            return this.$route.query.id ? this.$route.query.id : ''
        }
    },
    methods:{
        /**
         * 提交角色信息修改
         */
        async onSubmit(formName){
            await this.$refs[formName].validate((valid) => {
                if (valid) {
                    authService.editRole(this.roleForm.name, this.roleId)
                    .then(data =>{
                        if(data.code == "0"){
                            this.$message({
                                type: "success",
                                message: data.message
                            })
                            this.$router.push('/auth/roleList')
                        }
                    }).catch(error =>{
                        this.$message({
                            type: "error",
                            message: error.message
                        })
                    })
                } else {
                    return false;
                }
            });
        }
    },
    async mounted(){
        let _this = this
        store.commit('setLoading',true)
        try {
            //编辑角色信息
            if(this.$route.query.type == 1){
                await authService.getRole(this.roleId)
                    .then(data =>{
                        this.roleForm.name = data.data.name
                    }).catch(err =>{

                    })
            }

        } catch (error) {

        }
        store.commit('setLoading',false)
    }
}
</script>
<style lang="scss" scoped>
    .role-edit{
        padding-top: 30px;
        .roleForm{
            height: 500px;
            width: 560px;
        }
    }
</style>


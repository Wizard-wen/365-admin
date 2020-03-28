<template>
    <div class="role-edit" v-loading="is_loading">
        <el-form class="roleForm" ref="form" :model="roleForm" label-width="120px" :rules="roleRules">
            <el-form-item label="名称" prop="name">
                <el-input v-model="roleForm.name" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">提交</el-button>
                <el-button @click="$router.go(-1)">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import {authService} from '@/service/auth'
export default {
    data(){
        return {
            is_loading: false,
            //账户信息
            roleForm: {
                id: this.$route.query.id ? this.$route.query.id : '',
                name: '', //名称
            },
            //角色校验规则
            roleRules: {
                name: [
                    {required: true, message: '请填写角色名称',trigger: 'blur',},
                ],
            }
        }
    },
    methods:{
        /**
         * 提交角色信息修改
         */
        async onSubmit(formName){
            await this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    try{
                        this.is_loading = true
                        let roleForm = {
                            ...this.roleForm
                        }
                        await authService.editRole(roleForm).then(data =>{
                            if(data.code == "0"){
                                this.$message({
                                    type: "success",
                                    message: data.message
                                })
                            }
                            this.is_loading = false
                            this.$router.push('/auth/roleList')
                        }).catch(error =>{
                            this.$message({
                                type: "error",
                                message: error.message
                            })
                            this.is_loading = false
                        }).finally(() =>{
                            this.is_loading = false
                        })
                    } catch(error){
                        this.$message({
                            type: "error",
                            message: error.message
                        })
                        this.is_loading = false
                    }
                } else {
                    return false;
                }
            });
        }
    },
    async mounted(){
        try {
            this.is_loading = true
            //编辑角色信息
            if(this.$route.query.type == 1){
                await authService.getRole(this.$route.query.id).then(data =>{
                    this.roleForm.name = data.data.name
                    this.is_loading = false
                }).catch(error =>{
                    this.$message({
                        type: "error",
                        message: error.message
                    })
                    this.is_loading = false
                }).finally(() =>{
                    this.is_loading = false
                })
            } else {
                this.is_loading = false
            }
        } catch (error) {
            this.$message({
                type: "error",
                message: error.message
            })
            this.is_loading = false
        }
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


<template>
    <div>
        <el-form ref="form" :model="accountForm" label-width="120px">
            <el-form-item label="用户名">
                <el-input v-model="accountForm.username"></el-input>
            </el-form-item> 
            <el-form-item label="新密码">
                <el-input v-model="accountForm.password"></el-input>
            </el-form-item> 
            <el-form-item label="请确认密码">
                <el-input v-model="accountForm.repassword"></el-input>
            </el-form-item> 
            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button @click="$router.go(-1)">取消</el-button>
            </el-form-item>
        </el-form>   
    </div>
</template>
<script>
import {authService} from '../../../../common'
export default {
    data(){
        return {
            //账户信息
            accountForm: {
                id: this.$route.query.id ? this.$route.query.id : '',
                account: this.$route.query.account ? this.$route.query.account : '',
                username: '', //用户名
                password: '', //密码
                repassword: '',//确认密码
            }
        }
    },
    computed: {
        
    },
    methods:{
        onSubmit(){

        }
    },
    async mounted(){
        //若是编辑，请求编辑数据
        if(this.$route.query.type == 1){
            await authService.getManager(this.$route.query.id)
                .then(data =>{
                    this.accountForm.username = data.data.name
                })
        }
    }
}
</script>
<style lang="scss" scoped>

</style>


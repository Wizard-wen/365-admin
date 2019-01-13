<template>
    <div>
        <el-form ref="form" :model="roleForm" label-width="120px">
            <el-form-item label="名称">
                <el-input v-model="roleForm.name"></el-input>
            </el-form-item> 
            <el-form-item label="描述">
                <el-input v-model="roleForm.description"></el-input>
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
            roleForm: {
                name: '', //名称
                description: '',//描述
            }
        }
    },

    methods:{
        onSubmit(){

        }
    },
    async mounted(){

    }
}
</script>
<style lang="scss" scoped>

</style>


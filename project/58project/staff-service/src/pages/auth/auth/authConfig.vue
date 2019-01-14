<template>
    <div>
        <div>
            <el-form ref="form" :model="authForm" label-width="120px">
                <el-form-item label="权限路由">
                    <el-input v-model="authForm.route"></el-input>
                </el-form-item>
                <el-form-item label="权限名字">
                    <el-input v-model="authForm.name"></el-input>
                </el-form-item>
                <el-form-item label="权限描述">
                    <el-input v-model="authForm.description"></el-input>
                </el-form-item>
                <el-form-item label="权限图标">
                    <el-input v-model="authForm.icon"></el-input>
                </el-form-item>
                <el-form-item label="权限排序顺序">
                    <el-input v-model="authForm.sort_order"></el-input>
                </el-form-item>
                <el-form-item label="权限父级id">
                    <el-select v-model="authForm.parent_id" placeholder="权限父级id">
                        <el-option 
                            v-for="(item, index) in selectionList" 
                            :key="index" 
                            :label="item.names" 
                            :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否为api路由">
                    <el-switch v-model="authForm.is_api"></el-switch>
                </el-form-item>
                <el-form-item label="是否展示">
                    <el-switch v-model="authForm.is_display"></el-switch>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>




<script>
import {authService} from '../../../../common'
export default {
    data() {
        return {
            authForm: {
                route: '',//权限路由
                name: '',//权限名字
                description: '',//权限描述
                icon: '',//权限图标
                sort_order: '',//权限排序顺序
                parent_id: '',//权限父级id
                is_api: '',//是否为api路由
                is_display: '',//是否展示
            },
            selectionList: []
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        }
    },
    async mounted(){
        store.commit('setLoading',true)
        try{
            debugger
            await authService.getPermission(this.$route.query.id)
                .then(data =>{
                    console.log(data)
                    this.authForm = data.data.permission
                    this.selectionList = data.data.selection
                }).catch(error =>{
                    this.$message({
                        type:'error',
                        message: error.message
                    })
                })
        }catch(e){

        }
        
        store.commit('setLoading',false)
    }
}
</script>


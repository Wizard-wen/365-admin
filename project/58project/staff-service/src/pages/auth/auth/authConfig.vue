<template>
    <div class="auth-config">
        <el-form class="auth-form" ref="form" :model="authForm" label-width="120px">
            <!-- <div> -->
                <el-form-item label="权限路由">
                    <el-input v-model="authForm.route"></el-input>
                </el-form-item>
                <el-form-item label="权限名字">
                    <el-input v-model="authForm.name"></el-input>
                </el-form-item>
                <el-form-item label="权限描述">
                    <el-input v-model="authForm.description"></el-input>
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
                <el-form-item label="是否展示">
                    <el-switch v-model="authForm.is_display"></el-switch>
                </el-form-item>
            <!-- </div> -->
            
            <el-form-item>
                <el-button type="primary" @click="onSubmit">{{$route.query.id? '确认编辑' : '立即创建'}}</el-button>
                <el-button @click="goback">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>




<script>

/**
 * type 0 新建  1 编辑 
 */
import {authService} from '../../../../common'

export default {
    data() {
        return {
            //权限表单
            authForm: {
                id: '',//id
                route: '',//权限路由
                name: '',//权限名字
                description: '',//权限描述
                sort_order: '',//权限排序顺序
                parent_id: '',//权限父级id
                is_display: '',//是否展示，是否在列表中展示 1 显示 2 不显示
            },
            //权限父级id下拉列表
            selectionList: []
        }
    },
    methods: {
        /**
         * 提交表单
         * 区分新建和编辑
         */
        async onSubmit() {
            if(this.authForm.is_display){
                this.authForm.is_display = 1
            } else {
                this.authForm.is_display = 2
            }
            try{
                await authService.editPermission(this.authForm)
                    .then(data =>{
                        if(data.code == '0'){
                            this.$message({
                                type:"success",
                                message: "修改成功"
                            })
                            this.$router.push('/auth/authList')
                        }
                    }).catch(error =>{
                        this.$message({
                            type:'error',
                            message: error.message
                        })
                    })
            } catch(e){

            }
            
        },
        goback(){
            this.$router.push("/auth/authList")
        }
    },
    async mounted(){
        store.commit('setLoading',true)
        try{
            await authService.getPermission(this.$route.query.id)
                .then(data =>{
                    if(data.data.method == "add"){

                    } else {
                        //权限表单字段
                        this.authForm = data.data.permission
                        
                        //是否展示的数据格式转换
                        if(data.data.permission.is_display == 1){
                            this.authForm.is_display = true
                        } else {
                            this.authForm.is_display = false
                        }
                    }
                    
                    //下拉菜单列表
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
<style lang="scss" scoped>
    .auth-config{
        padding: 30px;
        .auth-form{
            width: 760px;
        }
    }
</style>


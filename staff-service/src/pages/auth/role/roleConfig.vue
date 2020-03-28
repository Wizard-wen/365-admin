<template>
    <div class="roleConfig" v-loading="is_loading">
        <div class="tree-container">
            <el-tree
                ref="tree"
                :data="permissionList"
                show-checkbox
                node-key="id"
                :default-checked-keys="rolePermissionIds"
                :props="defaultProps"></el-tree>
        </div>
        <div>
            <el-button type="primary" @click="onSubmit">修改</el-button>
            <el-button @click="goback">取消</el-button>
        </div>
        
    </div>
</template>
<script>
import {authService} from '@/service/auth'
export default {
    data(){
        return {
            is_loading: false,
            rolePermissionIds: [], //已绑定id
            permissionList: [], //全部权限列表
            // 树结构配置
            defaultProps: {
                children: 'children',
                label: 'title'
            }
        }
    },
    methods: {
        async onSubmit(){
            /**
             * 提交时，应当将半选和全选全部都提出来
             * el-tree的回调函数
             */
            let selectedList = [
                ...this.$refs.tree.getCheckedKeys(),
                ...this.$refs.tree.getHalfCheckedKeys()
            ]
            try{
                this.is_loading = true
                let editRolePermissionForm ={
                    id: this.$route.query.id,
                    permissionIds: selectedList,
                }
                await authService.editRolePermission(editRolePermissionForm).then(data =>{
                    if(data.code == '0'){
                        this.$message({
                            type: "success",
                            message: data.message
                        })
                    }
                    this.is_loading = false
                    this.$router.push("/auth/roleList")
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
        },
        /**
         * 返回上一级 
         */
        goback(){
            this.$router.push('/auth/roleList')
        },
    },
    async mounted(){
        try {
            this.is_loading = true
            await authService.getRolePermission(this.$route.query.id).then(data =>{
                // debugger
                //数组形式的树状结构
                this.permissionList = data.permissionList

                //当前所有处于选中状态的叶节点（回显用）
                this.rolePermissionIds = data.rolePermissionIds

                this.is_loading = false
            }).catch(error =>{
                this.$message({
                    type: 'error',
                    message: error.message
                })
                this.is_loading = false
            }).finally(() =>{
                this.is_loading = false
            })
        } catch (error) {
            this.$message({
                type: 'error',
                message: error.message
            })
            this.is_loading = false
        }
    }
}
</script>
<style lang="scss" scoped>
    .roleConfig{
        padding: 30px;
        .tree-container{
            height: 560px;
            width: 100%;
            padding-top: 20px;
            margin-bottom: 20px;
            border-radius: 6px;
            border: 1px solid #ccc;
            overflow: auto;
        }
    }
</style>



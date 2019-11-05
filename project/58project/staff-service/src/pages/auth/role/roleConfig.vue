<template>
    <div class="roleConfig">
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
import {authService} from '@common/index.js'
export default {
    data(){
        return {
            rolePermissionIds: [], //已绑定id
            permissionList: [], //全部权限列表
            roleConfigList: [],//包装好的树形结构渲染的数据
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
             */
            let selectedList = [
                ...this.$refs.tree.getCheckedKeys(),
                ...this.$refs.tree.getHalfCheckedKeys()
            ]

            await authService.editRolePermission(this.$route.query.id, selectedList)
                .then(data =>{
                    if(data.code == '0'){
                        this.$message({
                            type: "success",
                            message: data.message
                        })
                        this.$router.push("/auth/roleList")
                    }
                }).catch(error =>{
                    this.$message({
                        type: "error",
                        message: data.message
                    })
                })
        },
        /**
         * 返回上一级 
         */
        goback(){
            this.$router.push('/auth/roleList')
        },
        /**
         * 拿到所有处于选中状态的叶节点
         * @param arrList 原始树形结构数组
         */
        getSelectedIds(arrList){

            let ids = []; //定义一个用来保存所有 处于选中状态 的 叶节点 的 数组
            
            /**
             * 递归地，将所有的叶节点is_on属性为true的节点存入数组
             */
            function findIds(arr){

                arr.forEach((item, index) =>{
                    if(item.children){
                        findIds(item.children)
                    } else {
                        if(item.is_on){
                            ids.push(item.id)
                        }
                    } 
                })
            }

            findIds(arrList)
            
            return ids
        }
    },
    async mounted(){
        let _this = this
        store.commit('setLoading',true)
        try {
             await authService.getRolePermission(this.$route.query.id)
                
                .then(data =>{
                    //数组形式的树状结构
                    this.permissionList = data.data.permissionList

                    //当前所有处于选中状态的叶节点（回显用）
                    this.rolePermissionIds = this.getSelectedIds(data.data.permissionList)

                    // this.rolePermissionIds = [15]


                    // this.roleConfigList = data.data.permissionList.reduce((arr, item, index) => {
                        
                    //     //判断 当前分支节点 是否在 被选中数组 中
                    //     function hasSonFn(id, arr){
                    //         return {
                    //             isChosen: arr.includes(id)? true : false
                    //         }
                    //     }

                    //     function createObj(obj){
                    //         let sonArr = [],
                    //             hasSon = {};


                    //         hasSon = hasSonFn(obj.id, _this.rolePermissionIds)

                    //         if(obj.children){

                    //             sonArr = obj.children.reduce((arr, item, index)=>{
                    //                 return [
                    //                     ...arr, 
                    //                     createObj(item)
                    //                 ]
                    //             },[])
                    //         } 

                    //         if(sonArr.length){
                    //             return {
                    //                 ...obj,
                    //                 ...hasSon,
                    //                 children: sonArr
                    //             }
                    //         } else {
                    //             return {
                    //                 ...obj,
                    //                 ...hasSon,
                    //             }
                    //         }
                    //     }

                    //     return [
                    //         ...arr,
                    //         createObj(item)
                    //     ]

                    // },[])


                }).catch(err =>{

                })
        } catch (error) {
            
        }
        store.commit('setLoading',false)
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



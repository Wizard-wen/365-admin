<template>
    <div class="roleConfig">
        <div class="tree-container">
            <el-tree
                ref="tree"
                :data="roleConfigList"
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
import {authService} from '../../../../common'
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
            console.log(this.$refs.tree.getCheckedKeys())
            console.log(this.$refs.tree.getHalfCheckedKeys())
            debugger
            await authService.editRolePermission(this.$route.query.id, this.$refs.tree.getCheckedKeys())
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
         * 若存在子节点，统一改变状态
         */
        changeState(item){
            if(item.son){
                item.son.forEach((i, index) =>{
                    i.isChosen = item.isChosen
                })
            }
        },
        /**
         * 拿到所有选中的id
         */
        getSelectedIds(arr1){
            let ids = []
            function findIds(arr){
                arr.forEach((item, index) =>{
                    if(item.son){
                        debugger
                        findIds(item.son)
                    }
                    if(item.isChosen){
                        ids.push(item.id)
                    }
                })
            }
            findIds(arr1)
            return ids
        },
        getCheckedNodes(){

        }
        
    },
    async mounted(){
        let _this = this
        store.commit('setLoading',true)
        try {
             await authService.getRolePermission(this.$route.query.id)
                .then(data =>{
                    this.permissionList = data.data.permissionList
                    this.rolePermissionIds = data.data.rolePermissionIds

                    this.roleConfigList = data.data.permissionList.reduce((arr, item, index) => {

                        function hasSonFn(id, arr){
                            return {
                                isChosen: arr.includes(id)? true: false
                            }
                        }
                        function createObj(obj){
                            let sonArr = [],
                                hasSon = {};

                            hasSon = hasSonFn(obj.id, _this.rolePermissionIds)

                            if(obj.son){
                                sonArr = obj.son.reduce((arr, item, index)=>{
                                    return [...arr, createObj(item)]
                                },[])
                            } 

                            if(sonArr.length){
                                return {
                                    ...obj,
                                    ...hasSon,
                                    children: sonArr
                                }
                            } else {
                                return {
                                    ...obj,
                                    ...hasSon,
                                }
                            }
                        }
                        return [...arr,createObj(item)]
                    },[])
                    console.log(this.roleConfigList[12])
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



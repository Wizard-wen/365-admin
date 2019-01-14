<template>
    <div class="authConfig">
        <div class="container">
            <div 
                class="permission-list"
                v-for="(item, index) in roleConfigList"
                :key="index">
                
                <div class="permission-title">
                    <div class="">{{item.name}}</div>
                    <el-switch v-model="item.isChosen"></el-switch>
                </div>

                <div v-if="item.son" class="permossion-box" style="display: flex;">
                    <div 
                        class=""
                        v-for="(i, inds) in item.son" 
                        :key="inds">
                        <div class="">{{i.name}}</div>
                        <el-switch v-model="i.isChosen"></el-switch>
                    </div>
                </div>

            </div>
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
            roleConfigList: []
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
                                    son: sonArr
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
                    console.log(this.roleConfigList)
                }).catch(err =>{

                })
        } catch (error) {
            
        }
        store.commit('setLoading',false)
    }
}
</script>


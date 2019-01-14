<template>
    <div class="authConfig">
        <div class="container">
            <div 
                v-for="(item, index) in permissionList"
                :key="index">
                <div class="">
                    {{item.name}}
                </div>
                <div v-if="item.son" >
                    <div style="display: flex;">
                        <div 
                            v-for="(i, inds) in item.son" 
                            :key="inds">{{i.name}}</div>
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
        }
    },
    async mounted(){
        store.commit('setLoading',true)
        try {
             await authService.getRolePermission(this.$route.query.id)
                .then(data =>{
                    this.permissionList = data.data.permissionList
                }).catch(err =>{

                })
        } catch (error) {
            
        }
        store.commit('setLoading',false)
    }
}
</script>


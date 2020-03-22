

import {
    apiRequestPermission,
    apiRequestCommon,
} from '@/request/index'

import {
    getAuthListForm,
    editAuthForm,
} from '@/pages/auth/Iauth'

import {$utils} from '@/utils/index' 

export const authPageService = {
    /**
     * 获取权限列表
     */
    getPermissionList(tableOption:getAuthListForm){
        let searchUrl = $utils.changeObjectToPathString(tableOption)
        return apiRequestPermission.getPermissionList(searchUrl)
    },
    /**
     * 获取权限信息
     * @param id 权限id
     */
    getPermission(id:number){
        return apiRequestPermission.getPermission(id)
    },
    /**
     * 编辑权限信息
     * @param editObj 
     */
    editPermission(editObj:editAuthForm){
        return apiRequestPermission.editPermission(editObj)
    },
    /**
     * 物理删除权限
     * @param id 权限id
     */
    deletePermission(id:number){
        return apiRequestPermission.deletePermission(id)
    },
    /**
     * 获取权限树
     */
    getPermissionTree(){
        return apiRequestCommon.getPermissionTree()
    }
}
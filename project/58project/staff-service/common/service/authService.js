/**
 * 权限管理模块
 * created by sxw 
 * 2019/1/9
 */

import authRequest from './request/authRequest.js'
export default {
    /**
     * 获取管理员列表
     * @param page 页码
     * @param name 用户名
     */
    getManagerList(page, name){
        return authRequest.getManagerList(page, name)
    },
    /**
     * 获取管理员角色绑定信息
     */
    getManagerRole(id){
        return authRequest.getManagerRole(id)
    },
    /**
     * 分配绑定管理员角色
     * @param id 角色id
     * @param roleIds 角色id数组
     */
    editManagerRole(id, roleIds){
        return authRequest.editManagerRole(id, roleIds)
    },
    /**
     * 获取管理员信息
     * @param id 管理员id
     */
    getManager(id){
        return authRequest.getManager(id)
    },

    /*************************************角色模块******************************************/
    /**
     * 获取角色列表
     */
    getRoleList(){
        return authRequest.getRoleList()
    },
     /**
     * 获取角色权限信息
     * @param id 角色id
     */
    getRolePermission(id){
        return authRequest.getRolePermission(id)
    },
    /**************************************权限模块****************************************/
    /**
     * 获取权限列表
     */
    getPermissionList(){
        return authRequest.getPermissionList()
    },
    /**
     * 获取权限信息
     * @param id 权限id
     */
    getPermission(id){
        return authRequest.getPermission(id)
    },
}
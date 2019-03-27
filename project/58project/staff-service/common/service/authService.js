/**
 * 权限管理模块
 * created by sxw 
 * 2019/1/9
 */

import authRequest from './request/authRequest.js'
export default {
    /**
     * 获取管理员列表
     * @param tableOption
     */
    getManagerList(tableOption){
        return authRequest.getManagerList(tableOption)
    },
    /**
     * 获取管理员角色绑定信息
     * @param id 管理员id
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
    /**
     * 编辑管理员信息
     * @param editObj
     * | id | int | 必填 | 管理员id |
     * | name | string | 必填 | 角色名 |
     * | account | string | 必填 | 角色账号 |
     * | password | string | 必填 | 密码 |
     * | repassword | string | 必填 | 确认密码 |
     */
    editManager(editObj){
        return authRequest.editManager(editObj)
    },
    /**
     * 物理删除管理员
     * @param id 管理员id
     */
    deleteManager(id){
        return authRequest.deleteManager(id)
    },





    /*************************************角色模块******************************************/
    /**
     * 获取角色列表
     */
    getRoleList(tableOption){
        return authRequest.getRoleList(tableOption)
    },
    /**
     * 获取角色信息
     * @param id 角色id
     */
    getRole(id){
        return authRequest.getRole(id)
    },
    /**
     * 编辑角色信息
     * @param id 角色id
     * @param name 角色名
     */
    editRole(name, id){
        return authRequest.editRole(name, id)
    },
    /**
     * 物理删除角色
     * @param id 角色id
     */
    deleteRole(id){
        return authRequest.deleteRole(id)
    },
     /**
     * 获取角色权限信息
     * @param id 角色id
     */
    getRolePermission(id){
        return authRequest.getRolePermission(id)
    },
    /**
     * 编辑角色权限信息
     * @param id 角色id
     * @param permission 角色绑定权限id组
     */
    editRolePermission(id, permission){
        return authRequest.editRolePermission(id, permission)
    },
    /**************************************权限模块****************************************/
    /**
     * 获取权限列表
     */
    getPermissionList(tableOption){
        return authRequest.getPermissionList(tableOption)
    },
    /**
     * 获取权限信息
     * @param id 权限id
     */
    getPermission(id){
        return authRequest.getPermission(id)
    },
    /**
     * 编辑权限信息
     * @param editObj 
     * | id | int | 必填 | 权限id |
     * | route | string | 必填 | 权限路由 |
     * | name | string | 必填 |  权限名字 |
     * | description | string | 必填 |  权限描述 |
     * | icon | string | 必填 |  权限图标 |
     * | sort_order | int | 必填 | 权限排序顺序 |
     * | parent_id | int | 必填 |  权限父级id |
     * | is_api | int | 必填 |  是否为api路由 |
     * | is_display | int | 必填 |  是否展示 |
     */
    editPermission(editObj){
        return authRequest.editPermission(editObj)
    },
    /**
     * 物理删除权限
     * @param id 权限id
     */
    deletePermission(id){
        return authRequest.deletePermission(id)
    },
    /**
     * 获取权限树
     */
    getPermissionTree(){
        return authRequest.getPermissionTree()
    }
}
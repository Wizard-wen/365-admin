import { api_permission } from "./api_permission";
import axios from 'axios'

export const apiRequestPermission:api_permission = {

    /****************************管理员模块**********************************/
    /**
     * 获取管理员列表
     */
    getManagerList(searchUrl){
        return axios.get(`./admin/permission/getManagerList${searchUrl}`)
    },
    /**
     * 获取管理员信息
     * @param id 管理员id
     */
    getManager(id){
        return axios.get(`./admin/permission/getManager?id=${id}`)
    },
    /**
     * 编辑管理员信息
     */
    editManager(editAccountForm){
        return axios.post(`./admin/permission/editManager`,{
            ...editAccountForm,
        })
    },
    /**
     * 物理删除管理员
     */
    changeManagerType(id){
        return axios.post(`./admin/permission/changeManagerType`,{
            id,
        })
    },

/********************************角色模块**************************************/

    /**
     * 获取角色列表
     */
    getRoleList(searchUrl){
        return axios.get(`./admin/permission/getRoleList${searchUrl}`)
    },
    /**
     * 获取角色信息
     * @param id 角色id
     */
    getRole(id){
        return axios.get(`./admin/permission/getRole?id=${id}`)
    },
    /**
     * 编辑角色信息
     * @param editRoleForm
     */
    editRole(editRoleForm){
        return axios.post(`./admin/permission/editRole`,{
            ...editRoleForm,
        })
    },
    /**
     * 物理删除角色
     * @param id 角色id
     */
    deleteRole(id){
        return axios.post(`./admin/permission/deleteRole`,{
            id: id
        })
    },
    /**
     * 获取角色权限信息
     * @param id 角色id
     */
    getRolePermission(id){
        return axios.get(`./admin/permission/getRolePermission?id=${id}`)
    },
    /**
     * 编辑角色权限信息
     */
    editRolePermission(editRolePermissionForm){
        return axios.post(`./admin/permission/editRolePermission`,{
            ...editRolePermissionForm,
        })
    },

/********************************权限模块**************************************/
    /**
     * 获取权限列表
     */
    getPermissionList(searchUrl){
        return axios.get(`./admin/permission/getPermissionList${searchUrl}`)
    },
    /**
     * 获取权限信息
     * @param id 权限id
     */
    getPermission(id){
        return axios.get(`./admin/permission/getPermission?id=${id}`)
    },
    /**
     * 编辑权限信息
     */
    editPermission(editObj){
        return axios.post(`./admin/permission/editPermission`,{
            ...editObj,
        })
    },
    /**
     * 物理删除权限
     * @param id 权限id
     */
    deletePermission(id){
        return axios.post(`./admin/permission/deletePermission`,{
            id: id
        })
    },
}
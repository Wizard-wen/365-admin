

import {
    editAccountForm,
    editRoleForm,
    editRolePermissionForm,
} from '@/pages/auth/Iauth'

export interface api_permission {
    // 账户相关接口
    getManagerList:{(searchUrl:string):Promise<any>},
    getManager:{(id:number):Promise<any>},
    editManager:{(editAccountForm:editAccountForm):Promise<any>},
    changeManagerType:{(id:number):Promise<any>},//更改账户状态，等同于逻辑删除

    // 角色相关接口
    getRoleList:{(searchUrl:string):Promise<any>},//获取角色列表
    getRole:{(id:number):Promise<any>},//获取角色信息
    editRole:{(editRoleForm:editRoleForm):Promise<any>},//编辑角色信息
    deleteRole:{(id:number):Promise<any>},//删除角色
    getRolePermission:{(id:number):Promise<any>},//获取角色绑定的权限信息
    editRolePermission:{(editRolePermissionForm:editRolePermissionForm):Promise<any>},//编辑角色绑定的权限信息

    // 基础权限相关接口
    getPermissionList:{(searchUrl:string):Promise<any>},
    getPermission:{(id:number):Promise<any>},
    editPermission:{(editObj:object):Promise<any>},
    deletePermission:{(id:number):Promise<any>},
}

interface searchSelsctItem{
    key:'searchkey',
    searchkey:string,
}
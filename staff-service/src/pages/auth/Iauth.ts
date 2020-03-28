



/**
 * 账号信息
 */

export const statusList = [
    {id: 1, name: '启用'},
    {id: 2, name: '停用'}
]
//是否是超级管理员
export const is_administratorList = [
    {id: 1, name: '不是'},
    {id: 2, name: '是'}
]
// 是不是门店店长
export const is_store_managerList = [
    {id: 1, name: '不是'},
    {id: 2, name: '是'}
]

export const isAuthPageDisplayList = [
    {id: 1, name: '展示'},
    {id: 2, name: '不展示'}
]
export interface accountItem {
    store_id?: number;//门店id
    store_name?: string;//门店名

    manager_code?: string;//
    
    // 员工token
    access_token?: string;
    refresh_token?: string;

    // is_administratorList
    is_administrator: 1;//是否是超级管理员
    // statusList
    status: 1//是否停用-状态
    // is_store_managerList
    is_store_manager: 1 //是否是店长

    id: 35 //员工id

    account: string;//账号
    real_name: string;//真实姓名
    department_id: number;//部门
    roleIds: Array<number>;
    
    // 密码
    password:string;//密码
    repassword?:string;//确认密码

    name: string;//用户名
    phone: string;//手机号
    birthday: number;//生日
    icon: string;//头像
    email: string;//邮箱
    wechat: string;//微信号
    personal_intro: string;//个人简介
    urgent: string;//紧急联系人
    current_address: string;//现住址
}


// 编辑账户信息
export interface editAccountForm {
    id?:string;

    //个人信息--个人用户可以更改
    icon: string;//头像
    name:string;//用户名----也改成username?
    phone:string;//电话
    birthday?:string;//
    email?:string;
    wechat:string;//微信号
    personal_intro:string;//个人简介
    urgent:string;//紧急联系人
    current_address:string;//现住址

    account: string;//账号
    real_name: string;//真实姓名
    department_id: number;//部门
    roleIds: Array<number>;
    //密码
    password:string;//密码
    repassword?:string;//确认密码

}
//编辑角色信息
export interface editRoleForm {
    id:number;
    name:string;//角色名
}
//编辑角色绑定的权限信息
export interface editRolePermissionForm {
    id: number;
    permissionIds: Array<number>;
}
// 编辑基础权限信息
export interface editAuthForm {
    id: number,//id
    router: string;//权限路由
    title: string;//权限名字
    description: string;//权限描述
    sort_order: number;//权限排序顺序
    parent_id: number;//权限父级id
    is_display: number;//是否展示，是否在列表中展示 1 显示 2 不显示
}




//获取角色列表查询表单
export interface getRoleListForm {
    currentPage: number;
    pageNumber: number;
    name: string;
}
// 获取账号列表查询表单
export interface getAccountListForm {
    currentPage: number;
    pageNumber: number;
    name: string;
    department_id: number;//部门id
    store_id: number;//门店id
}

export interface getAuthListForm {
    title: string;
    currentPage: number;
    pageNumber: number;
}
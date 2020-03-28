
//所有部门
export const departmentList = [
    {id:0,name:'全部'},
    {id:1,name:'办公室'},
    {id:2,name:'运营中心'},
    {id:3,name:'培训部'},
    {id:4,name:'加盟店'},
    {id:5,name:'直营店'},
    {id:6,name:'开发部'}
]

// 获取个人信息get_for
export enum personalGet_for {
    personal= 'personal',
    basic ='basic',
}

/**
 * 账号基本信息---只读，不可编辑
 */
export interface base_accountItem {
    id:number;
    account:string;//账号
    staff_code:string;//工号
    real_name:string;//真实姓名
    department_id:string;//所属部门
}


/**
 * 个人信息---用户可以变更（独立接口）
 */
export interface personal_infoForm {
    id:number;
    get_for?:string;

    icon:string;//头像
    name: string//用户名
    phone: string,//手机号
    birthday: string//生日
    email: string//邮箱
    wechat: string//微信
    personal_intro: string//个人简介
    urgent: string//紧急联系人
    current_adderss: string//现住址
}

/**
 * 修改密码---独立接口
 */
export interface passwordChangeForm {
    id:number;
    originPassword:string;//原始密码
    newPassword:string;//新密码
    reNewPassword:string;//确认新密码
}


/**
 * 逻辑字段
 */
export interface systemConfig {
    store_id:string;//门店id
    store_name:string;//门店名
    /**
     * 1 是 
     */
    is_administrator:string;//是否超级管理员
    is_store_manager:string;//是否是店长
}

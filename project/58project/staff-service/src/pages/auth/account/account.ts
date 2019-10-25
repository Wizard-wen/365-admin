/**
 * 账号信息
 */
export interface accountItem {
    
    //只读，不可改
    readonly account:string;//账号
    readonly staff_code:string;//工号----自动生成
    
    //仅超级管理员可以改
    readonly real_name:string;//真实姓名
    readonly department_id:string;//所属部门

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

    //密码
    password:string;//密码
    clear_password:string;//明文密码
    
    //token相关字段
    access_token:string;
    refresh_token:string;
    expire:string;//过期时间

    //逻辑字段
    type:string;//状态-是否停用
    is_administrator:string;//是否超级管理员
    is_store_manager:string;
    store_id:string;//门店id
    store_name:string;//门店名

}
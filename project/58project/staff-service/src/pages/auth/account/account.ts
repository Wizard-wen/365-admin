/**
 * 账号信息
 */
export interface accountItem {
    readonly account:string;//账号
    readonly staff_code:string;//工号
    readonly real_name:string;//真实姓名
    readonly department_id:string;//所属部门
    name:string;//姓名
    phone:string;//电话
    birthday?:string;//
    email?:string;
    wechat:string;//微信号
    personal_intro:string;//个人简介
    urgent:string;//紧急联系人
    current_address:string;//现住址



    password:string;//密码
    clear_password:string;//明文密码
    

    access_token:string;
    refresh_token:string;
    expire:string;//过期时间


    is_administrator:string;//是否超级管理员
    type:string;//状态
    
    is_store_manager:string;
    store_id:string;//门店id
    store_name:string;//门店名

}

export const departmentList = [
    {id:0,name:'全部'},
    {id:1,name:'办公室'},
    {id:2,name:'运营中心'},
    {id:3,name:'培训部'},
    {id:4,name:'加盟店'},
    {id:5,name:'直营店'},
    {id:6,name:'开发部'}
]
/**
 * 账号基本信息
 */
export interface base_accountItem {
    readonly account:string;//账号
    readonly staff_code:string;//工号
    readonly real_name:string;//真实姓名
    readonly department_id:string;//所属部门

}
/**
 * 个人信息
 */
export interface personal_info {
    icon:string;//头像
    user_name: string//用户名
    phone: string,//手机号
    birthday: string//生日
    email: string//邮箱
    wechat: string//微信
    personal_intro: string//个人简介
    urgent: string//紧急联系人
    current_adderss: string//现住址
}

/**
 * 
 */
export interface passwordChange {
    originPassword:string;//原始密码
    newPassword:string;//新密码
    reNewPassword:string;//确认新密码
}

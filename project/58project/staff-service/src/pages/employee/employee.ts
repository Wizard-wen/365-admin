
/**
 * 员工信息字段
 */
interface employeeForm {
    id:number;//员工id
    version:number;//操作版本号,两个人同时操作
    //业务字段
    name:string;//员工姓名
    phone:string;//员工联系方式
    icon:string;//头像
    sex:number;//员工性别                
    wechat:string;//微信号
    age:number;//员工年龄
    identify:string;//身份证号
    address:string;//员工住址
    education:number;//教育程度
}


/**
 * 接口我也已经写好了，参见 employeeService.js   employeeRequest.js
 */
/**
 * 员工字段
 */

interface satffItem{
    /**
     * 逻辑字段
     */
    id:number;//员工id
    code:string;//员工号
    version:number;//操作版本号
    created_at:number;//创建时间
    type:number;//签约状态
    sex:number;//性别

    /**
     * 业务字段
     */
    register_at:number;//登记时间
    authentication?:number;//认证状态
    name:string;//姓名
    age:number;//年龄
    phone:string;//电话
    return_msg?:string;//回访信息
    working_status?:number;//接单状态-----工作状态
    
    
    
    
    remarks?:string;//备注（商家情况）
    skill:Array<object>;//职业类型
    service_type:number;//服务类型
    service_crowd?:Array<object>;//可服务人群
    working_age?:number;//工龄
    working_experience?:string;//工作经验（备注）
    nation?:number;//民族
    birthPlace?:string;//籍贯
    identify?:string;//身份证号码
    address:string;//地址
    region:Array<object>;//服务区域 
    education?:number;//学历
    urgent?:string;//紧急联系人电话
    bank_card?:string;//银行卡号
    icon?:string;//照片&&头像
    course?:number;//参加培训课程
    paper?:Array<object>;//技能证书
    source?:number;//信息来源
    manager_id?:number;//创建人id
    manager_name?:string;//创建人姓名
}



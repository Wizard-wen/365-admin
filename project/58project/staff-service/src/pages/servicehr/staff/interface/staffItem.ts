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

    //根据用户习惯，登记时间经常在回访数据时发生变化，因此，登记时间更适合被称为更新时间。
    // 也方便将来根据更改时间做数据展示
    //更新时间是将来要替代登记时间的，但是现在为了适应用户习惯，将登记时间保留
    updated_at:number;//更新时间



    authentication?:number;//认证状态--
    name:string;//姓名

    // 年龄存在一个小问题，如果单纯的记录当年年龄值，每年年龄数据都不会自动更新
    // 解决方案是记录人员的出生年月日
    age:number;//年龄

    birthday:number;//生日，这是新字段，为解决上述问题


    phone:string;//电话
    //电话和回访信息数据的位置紧挨在一起，是因为，可以根据电话找到这个劳动者，然后直接在旁边录入回访信息，比较方便
    return_msg?:string;//回访信息

    //注意区别于 签约状态，这两个字段有相似的地方，但是不一样
    working_status?:number;//接单状态-----工作状态，
    
    
    
    // 记录的是参加哪期培训，劳动者的个人情况等；
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

    // 市内几区+住家
    region:Array<object>;//服务区域 
    education?:number;//学历

    // 姓名/身份 + 电话
    urgent?:string;//紧急联系人电话

    bank_card?:string;//银行卡号

    // 照片字段保留，但是要新添加头像字段和证书字段等
    icon?:string;//照片&&头像





    course?:number;//参加培训课程
    paper?:Array<object>;//技能证书
    source?:number;//信息来源
    manager_id?:number;//创建人id
    manager_name?:string;//创建人姓名


    photo?:Array<object>;//照片

    teacher_comment?:string;//教师评语
}



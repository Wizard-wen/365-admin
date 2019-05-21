/**
 * 员工字段
 */

interface satffItem{

    /****************************逻辑字段************************************************/
    id:number;//员工id
    staff_code:string;//员工号

    manager_id?:number;//创建人id
    
    version:number;//操作版本号
    created_at:number;//创建时间
    type:number;//签约状态   
    sex:number;//性别
    
    /*****************************业务字段***********************************************/

    register_at:number;//登记时间-------可能在以后版本中删除

    /**
     * des 根据用户习惯，登记时间经常在执行回访数据任务时发生变化，因此，登记时间更适合被称为更新时间。
     * 也方便将来根据数据最后的更改时间做 近期回访数据展示
     * 更新时间将来是要替代登记时间的，但是现在为了适应用户习惯，要将登记时间保留
     */
    updated_at:number;//更新时间
    /**
     * 
     */
    authentication?:number;//认证状态

    name:string;//姓名
    /**
     * 年龄存在一个小问题，如果单纯的记录当年年龄值，每年年龄数据都不会自动更新
     * 解决方案是记录人员的出生年月日
     * 目前仍然保留age字段
     */
    age:number;//年龄
    birthday:number;//出生日期
    /**
     * 根据运营人员陈述，电话和回访信息数据的位置紧挨在一起，
     * 是因为，可以根据电话（相当于劳动者的id）直接找到这个劳动者，然后直接在旁边录入回访信息，比较方便
     */
    phone:string;//电话
    return_msg?:string;//回访信息
    
    /**
     * 注意区别于 签约状态，这两个字段有相似的地方，但是不一样
     * 接单状态描述的是劳动者的工作状态
     */
    working_status?:number;//接单状态

    /**
     * 记录的是参加哪期培训，劳动者的个人情况等；
     */
    remarks?:string;//备注（商家情况）
    
    skill:Array<object>;//职业类型
    service_type:number;//服务类型
    service_crowd?:Array<object>;//可服务人群
    working_age?:number;//工龄
    working_experience?:string;//工作经验（备注）
    nation?:number;//民族
    birthPlace?:string;//籍贯
    identify?:string;//身份证号码

    address:string;//地址-----现住址

    /**
     * 市内几区+住家
     */
    region:Array<object>;//区域-----服务区域 
    education?:number;//学历

    /**
     * 格式一般为:  姓名/与劳动者的关系 +
     */
    urgent?:string;//紧急联系人电话

    bank_card?:string;//银行卡号
    /**
     * 这个字段现在包含全部种类的照片，头像，证书，证件照等，将来要逐步拆分
     * 这个字段目前要保留，但是会逐步被替代
     */
    photo?:Array<object>;//照片
    /**
     * 照片字段保留，但是要新添加头像字段和证书字段等
     */
    icon?:string;//头像

    course?:number;//参加培训
    /**
     * 新字段
     */
    teacher_comment?:string;//教师评语
    paper?:Array<object>;//技能证书
    // paper
    
    source?:number;//信息来源
    // 来源名称
    
    
    
    /**
     * 这个字段未来会被替代，因为创建人，将由系统识别
     */
    manager_name?:string;//创建人

    
}



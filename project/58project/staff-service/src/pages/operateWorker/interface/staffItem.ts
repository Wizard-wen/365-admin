

/**
 * 员工字段 封版于 2020.2.14
 */

interface staffItem{

    /****************************逻辑字段************************************************/
    id:number;//员工id

    staff_code:string;//员工编号

    manager_id?:number;//创建人id
    manager_name?:string;//创建人

    version:number;//操作版本号

    created_at:number;//创建时间
    updated_at:number;//更新时间
    return_at:number// 上次回访时间  新字段

    /**
     * 1 启用 2  停用
     */
    status:number;//停用、启用状态 
    
    // 1 未签约 2 已签约
    sign_status?:number;//签约状态

    log:Array<object>;//日志

    //skill 和服务商品列表保持一致
    // 职业类型字段根据服务商品列表返回的树形结构展示，前端采用element的复选框
    skill:Array<object>;//职业类型

    course?:number;//参加培训
    
    /*****************************业务字段***********************************************/

    name:string;//姓名
    /**
     * phone字段将作为id
     */
    phone:string;//电话
    sex:number;//性别

    // 1-12 鼠 猪
    zodiac_ign:string;//属相
    body_height:string;//身高
    body_weight:string;//体重





    /**
     * 若身份证号未知，年龄、出生日期将为空
     */
    age:number;//年龄
    birthday:number;//出生日期
    identify?:string;//身份证号码
    
    

    //这个字段将替代工龄
    worked_at:number;//参加工作时间
    
    nation?:number;//民族
    
    id_photo?:Array<object>;//身份证正反面照片

    // 地址改成现住址
    address:string;//现地址

    education?:number;//学历

    /**
     * 格式一般为:  姓名/与劳动者的关系 + 电话
     */
    urgent_phone?:string;//紧急联系人电话

    /**
     * 这个字段现在包含全部种类的照片，头像，证书，证件照等，将来要逐步拆分
     * 这个字段目前要保留，但是会逐步被替代
     */
    photo?:Array<object>;//照片

    /**
     * 照片字段保留，但是要新添加头像字段和证书字段等
     * 确定一下尺寸
     */
    icon?:string;//头像

    
    
    paper?:Array<object>;//技能证书标签
    certificate?:Array<object>,//技能证书
    
    //后台跑脚本，将这个字段和working_experience字段合并
    remarks?:string;//备注（商家情况）

    //回访信息将由按钮单独触发，弹窗填写
    //加个接口
    return_msg?:string;//回访信息

    /*****************删除字段 ***********************/
    // source?:number;//信息来源
    // source_name?:string;// 来源名称
    // teacher_comment?:string;//教师评语
    // authentication?:number;//认证状态
    // register_at:number;//登记时间-------可能在以后版本中删除
    // status:string;//签约状态
    // working_age?:number;//工龄
    // birthplace?:string;//籍贯
    // service_type:number;//服务类型
    // service_crowd?:Array<object>;//可服务人群
    // working_experience?:string;//工作经验（备注）
    // region:Array<object>;//区域-----服务区域 
    // bank_card?:string;//银行卡号
}

/**
 * 服务人员搜索字段
 */
interface searchWorkerItem{
    staff_code:string;//员工编号
    manager_name?:string;//创建人
    created_at:number;//创建时间
    name:string;//姓名
    
}


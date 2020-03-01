

/**
 * 员工字段 封版于 2020.2.14
 */

export interface workerItem{

    /****************************逻辑字段 10个************************************************/
    id:number;//员工id
    staff_code:string;//员工编号
    manager_id?:number;//创建人id
    manager_name?:string;//创建人
    version:number;//操作版本号
    created_at:number;//创建时间
    updated_at:number;//更新时间
    return_at:number// 上次回访时间  新字段
    // 1 启用 2  停用
    status:number;//停用、启用状态 
    // 1 未签约 2 已签约
    sign_status?:number;//签约状态

    /****************************基本信息15个***************** */
    name:string;//姓名
    // 1 男 2 女
    sex:number;//性别
    //若身份证号未知，年龄、出生日期将为空
    age:number;//年龄
    birthday:number;//出生日期
    identify?:string;//身份证号码
    //phone作为id
    phone:string;//电话
    // 1-12 鼠 猪
    zodiac_ign:number;//属相
    body_height:string;//身高
    body_weight:string;//体重
    nation?:number;//民族
    address:string;//现地址
    education?:number;//学历
    //格式一般为:  姓名/与劳动者的关系 + 电话
    urgent_phone?:string;//紧急联系人
    id_photo?:Array<object>;//身份证正反面照片
    /**
     * 照片字段保留，但是要新添加头像字段和证书字段等
     * 确定一下尺寸
     */
    icon?:string;//头像


    /***************技能信息 7个****************** */
    //skill 和服务商品列表保持一致
    // 职业类型字段根据服务商品列表返回的树形结构展示，前端采用element的复选框
    skill:Array<object>;//职业类型
    //树形结构
    course?:number;//参加培训
    //年份
    worked_at:number;//参加工作时间
    /**
     * 这个字段现在包含全部种类的照片，头像，证书，证件照等，将来要逐步拆分
     * 这个字段目前要保留，但是会逐步被替代
     */
    photo?:Array<object>;//照片
    //下拉框
    paper?:Array<object>;//技能证书标签
    certificate?:Array<object>,//技能证书
    //后台跑脚本，将这个字段和working_experience字段合并
    remarks?:string;//备注（商家情况）


    /***************回访信息 1个 *******************/
    //回访信息将由按钮单独触发，弹窗填写
    //加个接口
    return_msg?:Array<object>;//回访信息

    /***************日志信息 1个*************************/
    /** */
    log:Array<object>;//日志

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
 * 当列表进入编辑页面后，控制当前页面的编辑、提交按钮等状态
 */
export const workerItemType = [
    {
        id: 0,
        type:'运营人员-全部服务人员-创建',
    },
    {
        id: 1,
        type: "运营人员-全部服务人员-编辑"
    },
    {
        id: 2,
        type: "运营人员-回访-编辑"
    },
    {
        id: 3,
        type: "运营人员-异常处理-编辑"
    },
    {
        id: 4,
        type: '运营人员-处理新建申请-编辑'
    }
]


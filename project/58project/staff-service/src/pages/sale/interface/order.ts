/**
 * 订单列表字段
 */
// export interface orderTableObject {
//     code:number; //订单号
//     create_at:number; //创建时间
//     order_id:number ;//订单id
//     phone:number ;//手机号
//     service_category_id:number;//服务分类id
//     name:string;//服务名称
//     source:number;//线上线下渠道
//     type:number;//订单类型
// } 

export interface orderTableObject{
    order_code:string;//订单编号

    /**
     * 订单状态
     * 1 - 匹配中：订单申请通过后，尚未签约的状态，这就是公海订单状态；
     * 2 - 已签约：已经签约，从公海订单中撤出；
     * 3 - 售后匹配中：首次签约后，订单中的合同终止，进入重新匹配状态；
     * 4 - 已终止：订单被终止，订单终止应当是在合同终止余额结算完毕后执行；
     */
    order_status:string;//订单状态
    
    order_time:string;// 下单时间
    order_user_phone:string;//下单客户电话
    order_user:string;//下单客户

    order_source_store:string;// 来源门店
    order_source_manager:string;// 来源人
    
    sign_user:string;// 签约客户
    sign_user_phone:string;// 签约客户联系方式
    sign_user_figure:string;// 签约客户余额
    
    service_staff:string;// 签约服务人员
    service_staff_code:string// 签约服务人员编号
    
    created_staff:string;// 订单创建人
    created_at:string;// 订单创建时间
    
    order_manager:string;// 订单经纪人
    order_manage_store:string;// 订单经纪门店

    /***********订单基本信息*********************/
    work_type:string;//工种
    order_details:string;//订单详情
    service_address:string;//服务地址
    service_duration:string;//工作期间
    wage:string;//工资
}

/**
 * 订单申请
 */
export interface applyOrderObject {
    work_type:string;//工种
    service_address:string;//地址
    service_duration:string;//工作时间
    wage:string;//工资
    order_details:string;//订单详情
    user_phone:string;//客户联系电话
    user_name:string;//客户姓名
    store_id:number;//门店id
    apply_manager_id:number;//申请人id
}


/**
 * 匹配劳动者列表
 */
export interface matchServiceItem {
    code:string; //工号
    name:string;//姓名
    phone:string;//电话
    workType:string;//职业类型
    workStatus:number;// 接单状态
    addPerson:string;// 添加人
}


/**
 * 合同字段
 */
export interface contractItem {
    contact_code:string;//合同编号
    created_at:string;//印制时间
    manageDepartment:string;//责任部门
    manager:string;//责任人
    contract_status:string;// 合同状态
    isSign:Boolean;//是否签约
    firstParty:string;//甲方签约人
    firstPartyId:string;//甲方签约人id
    secondParty:string;//乙方签约人
    secondPartyId:string;//乙方签约人id
    signManager:string;// 签约管家
    signManagerId:string;// 签约管家id
    signed_at:string;// 签约时间
}

/**
 * 签约字段
 */

 export interface signItem{
    sign_user:string;// 雇主
    sign_user_phone:string;// 雇主联系电话
    sign_user_identify:string;// 雇主身份证号

    sign_service:string;// 签约家政服务员
    sign_service_phone:string;// 签约家政服务员电话
    sign_service_identify:string;// 签约家政服务员身份证号
    sign_service_law_add:string;// 签约家政服务员户籍地址
    sign_service_cur_add:string;// 签约家政服务员现住址
    sign_service_urgent:string;// 签约家政服务员紧急联系方式
    /**
     * 服务内容（多选）
     * 1 - 普通家务劳动
     * 2 - 婴幼儿照护
     * 3 - 婴幼儿教育
     * 4 - 产妇与新生儿护理
     * 5 - 老人照护
     * 6 - 病人陪护
     * 7 - 计时服务
     * 8 - 家庭餐制作
     * 9 - 其他
     */
    service_contains:string;// 服务内容
    service_count:string;// 服务对象人数
    /**
     * 护理依赖程度（单选）
     * 1 - 自理
     * 2 - 不自理
     */
    service_level:string;// 护理依赖程度
    /**
     * 服务方式（单选）
     * 1 - 全日住家型
     * 2 - 日间照料型
     * 3 - 计时服务型
     * 4 - 其他
     */
    service_type:string;// 服务方式
    // 服务期限的起止，时间选择器
    service_duration:string;// 服务期限
    // 指的是每个服务周期的服务时间
    service_time:string;// 工作时间

    service_staff_wage:string;// 劳务报酬
    service_user_charge:string;// 客户服务费
    user_pay:string;// 客户缴纳
    
    staff_cash_pledge:string;// 劳动者押金
    
    insurance_beneficiary:string;// 保险受益人
    insurance_duration:string;// 保险年限
    accessory:Array<object>;// 上传附件
    remarks:string;
 }
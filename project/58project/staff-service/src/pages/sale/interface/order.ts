
/**
 * 订单申请
 */
export interface applyOrderObject {
    id:string;//
    version:string;//
    /**
     * pass - 通过
     * refuse - 拒绝
     * null（空） - 待处理
     */
    type:string;//---订单申请类型 
    apply_code:string;//---订单申请编号

    apply_store_name:string;// 来源门店
    apply_store_id:string;// 来源门店id
    apply_manager_name:string;// 来源人
    apply_manager_id:string;// 来源人id

    //申请
    created_manager_id:string;//申请创建人id
    create_manager_name:string;//申请创建人
    create_at:string;//申请创建时间
    
    user_phone:string;//客户联系电话
    user_name:string;//客户姓名
    
    //业务字段
    work_type:string;//工种
    service_address:string;//地址
    service_duration:string;//工作时间
    wage:string;//工资
    order_details:string;//订单详情
}

/**
 * 客户意向，C端来源
 */
export interface orderUserRequireObject {
    id:string;//
    version:string;//

    requireCode:string;//客户需求编号
    /**
     * null - 待处理
     * pass - 已通过
     */
    type:string;//状态
    
    create_at:string;//客户下单时间

    order_user_phone:string;//客户联系电话
    order_user_name:string;//客户姓名
    
    //业务字段
    work_type:string;//工种
    service_address:string;//地址
    service_duration:string;//工作时间
    wage:string;//工资
    order_details:string;//订单详情
}


/**
 * 订单列表字段
 */

export interface orderTableObject{
    id:string;
    version:string;
    apply_id:string;//申请单id，后端字段

    /**
     * 1 - 否
     * 2 - 是
     */
    is_wage:string;//是否发放工资

    order_code:string;//订单编号

    /**
     * 订单状态
     * 1 - 匹配中：订单申请通过后，尚未签约的状态，这就是公海订单状态；
     * 2 - 已签约：已经签约，从公海订单中撤出；
     * 3 - 售后匹配中：首次签约后，订单中的合同终止，进入重新匹配状态；
     * 4 - 已终止：订单被终止，订单终止应当是在合同终止余额结算完毕后执行；
     */
    type:string;//订单状态
    
    

    order_at:string;// 客户下单时间
    order_user_phone:string;//下单客户电话
    order_user_name:string;//下单客户




    apply_at:string;//订单申请时间，从订单申请表传过来的
    apply_store_name:string;// 来源门店
    apply_store_id:string;// 来源门店id
    apply_manager_name:string;// 来源人
    apply_manager_id:string;// 来源人id
    
    sign_user_name:string;// 签约客户
    sign_user_phone:string;// 签约客户联系方式
    sign_user_identify:string;//签约客户身份证号
    sign_user_account:string;// 签约客户余额
    sign_service_start:string;//签约服务开始时间
    sign_service_end:string;//签约服务结束时间
    
    sign_staff_name:string;// 签约服务人员
    sign_staff_id:string;// 签约服务人员id
    sign_staff_code:string// 签约服务人员编号
    sign_staff_phone:string;//签约服务人员电话
    sign_staff_identify:string;//签约服务人员身份证号
    sign_staff_law_address:string;//签约服务人员户籍地址
    sign_staff_cur_address:string;//签约服务人员现住址
    sign_staff_urgent:string;//签约服务人员紧急联系人
    
    created_at:string;// 订单创建时间
    created_manager_name:string;// 订单创建人
    created_manager_id:string;//订单创建人id
    
    agent_manager_name:string;// 订单经纪人
    agent_manager_phone:string;// 订单经纪人电话
    agent_manager_id:string;// 订单经纪人id
    agent_store_name:string;// 订单经纪门店
    agent_store_id:string;// 订单经纪门店id

    /***********订单基本信息*********************/
    work_type:string;//工种
    order_details:string;//订单详情
    service_address:string;//服务地址
    service_duration:string;//工作期间
    wage:string;//工资
}




/**
 * 备选服务人员
 */
export interface matchServiceItem {
    id:string;//
    order_id:string;//订单id
    staff_id:string;//员工id
    staff_code:string; //工号
    staff_name:string;//姓名
    staff_icon:string;//头像
    staff_phone:string;//电话
    type:number;// 签约状态
    created_manager_id:string;// 添加人id
    create_manager_name:string;// 添加人
}


/**
 * 签约字段
 */

export interface signItem{

    contract_number: 'string';//合同编号
    sign_user_name:string;// 雇主
    sign_user_id:string;//雇主id
    sign_user_phone:string;// 雇主联系电话
    sign_user_identify:string;// 雇主身份证号

    sign_staff_name:string;// 签约家政服务员
    sign_staff_id:string;// 签约家政服务员id
    sign_staff_code:string;// 签约家政服务员code
    sign_staff_phone:string;// 签约家政服务员电话
    sign_staff_identify:string;// 签约家政服务员身份证号
    sign_staff_law_address:string;// 签约家政服务员户籍地址
    sign_staff_cur_address:string;// 签约家政服务员现住址
    sign_staff_urgent:string;// 签约家政服务员紧急联系方式
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
    service_start:string;// 服务期限起始
    service_end:string;// 服务期限截止

    // 指的是每个服务周期的服务时间
    service_time:string;// 工作时间

    staff_wage:string;// 劳务报酬
    user_charge:string;// 客户服务费
    user_pay:string;// 客户缴纳
    
    staff_deposit:string;// 劳动者押金
    
    insurance_benefit:string;// 保险受益人
    insurance_start:string;// 保险起始日
    insurance_end:string;//保险终止日

    accessory:Array<object>;// 上传附件
    remarks:string;//备注
 }
/**
 * 合同字段
 */

export interface contractItem{
    id:string;
    order_id:string;//后端关联订单表
    contract_number: string;//合同编号
    contract_code:string;//合同流水号
    
    /**
     * 1 - 待执行
     * 2 - 执行中
     * 3 - 已终止
     */
    type:string;//合同状态

    sign_at:string;//签约时间
    // service_start:string;//服务开始时间
    // service_at:string;//服务终止时间

    sign_manager_id:string;//签约人id
    sign_manager_name:string;//签约人
    sign_store_id:string;//签约门店id
    sign_store_name:string;//签约门店

    sign_user_name:string;// 雇主
    sign_user_id:string;//雇主id
    sign_user_phone:string;// 雇主联系电话
    sign_user_identify:string;// 雇主身份证号

    sign_staff_name:string;// 签约家政服务员
    sign_staff_id:string;// 签约家政服务员id
    sign_staff_code:string;// 签约家政服务员code
    sign_staff_phone:string;// 签约家政服务员电话
    sign_staff_identify:string;// 签约家政服务员身份证号
    sign_staff_law_address:string;// 签约家政服务员户籍地址
    sign_staff_cur_address:string;// 签约家政服务员现住址
    sign_staff_urgent:string;// 签约家政服务员紧急联系方式
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
    service_start:string;// 服务期限起始
    service_end:string;// 服务期限截止

    // 指的是每个服务周期的服务时间
    service_time:string;// 工作时间

    staff_wage:string;// 劳务报酬
    user_charge:string;// 客户服务费
    user_pay:string;// 客户缴纳
    
    staff_deposit:string;// 劳动者押金
    
    insurance_benefit:string;// 保险受益人
    insurance_start:string;// 保险起始日
    insurance_end:string;//保险终止日

    accessory:Array<object>;// 上传附件
    remarks:string;//备注

    contractAccount:contractAccountObject;//合同结算信息
    contractTerminate:contractTerminateObject;//合同终止信息


 }

/**
 * 合同结算信息
 */
 export interface contractAccountObject {
    service_start:string;//服务起始日
    service_end:string;//服务终止日
    service_days:string;//工作天数
    daily_wage:string;//日工资
    total_wage:string;//首月工资合计
    service_cost:string;//服务费扣除
    other_cost:string;//其他扣除
    cost_reason:string;//扣除事由
    real_wage:string;//服务人员实发工资
    return_wage:string;//返还客户金额
 }
/**
 * 合同终止信息
 */
 export interface contractTerminateObject {
    terminate_reason:string;//终止事由
    /**
     * 1 - 否
     * 2 - 是
     */
    is_wage:string;//是否发放工资
    service_start:string;//服务起始日
    service_end:string;//服务终止日
    service_days:string;//工作天数
    daily_wage:string;//日工资
    total_wage:string;//首月工资合计
    service_cost:string;//服务费扣除
    other_cost:string;//其他扣除
    cost_reason:string;//扣除事由
    real_wage:string;//服务人员实发工资
    return_wage:string;//返还客户金额
 }

/**
 * 空合同信息
 */
export interface voidContractItem {
    contract_nmuber:string;//空合同编号（筛选）
    created_at: string;//空合同创建时间（筛选）
    assign_at:string;//分派时间（筛选）
    /**
     * 1 - 空合同
     * 2 - 已分派
     * 3 - 已签约
     */
    type:string;//是否已经签约（筛选）
    manager_id:string;//经纪人id
    manager_name:string;//经纪人名字（筛选）
}
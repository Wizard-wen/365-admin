/**
 * 订单申请
 */
export interface saleApplyOrderItem {
    id:string;//
    version:string;//

    //申请
    created_manager_id:string;//申请创建人id
    create_manager_name:string;//申请创建人
    create_at:string;//申请创建时间

    
    /**
     * pass - 通过
     * refuse - 拒绝
     * null（空） - 待处理
     */
    type:string;//---订单申请类型 
    apply_code:string;//---订单申请编号

    apply_store_name?:string;// 来源门店
    apply_store_id:string;// 来源门店id
    apply_manager_name?:string;// 来源人
    apply_manager_id:string;// 来源人id

    
    
    
    
    user_phone:string;//客户联系电话
    user_name:string;//客户姓名
    
    //业务字段
    work_type:string;//工种
    service_address:string;//地址
    service_duration:string;//工作时间
    wage:string;//工资
    order_details:string;//订单详情
}
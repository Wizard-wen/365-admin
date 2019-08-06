/**
 * 订单列表字段
 */
export interface orderTableObject {
    code:number; //订单号
    create_at:number; //创建时间
    order_id:number ;//订单id
    phone:number ;//手机号
    service_category_id:number;//服务分类id
    name:string;//服务名称
    source:number;//线上线下渠道
    type:number;//订单类型
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




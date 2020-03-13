
// 运营创建订单
export interface createOperateOrderForm {
    work_type: string; //工种
    service_address: string;//地址
    service_duration: string;//工作时间
    wage: string;//工资
    order_details: string;//订单详情
    order_user_phone: string;//客户联系电话
    order_user_name: string;//客户姓名
    apply_store_id: number;//来源门店id
    apply_manager_id: number;//来源人id
    agent_store_id: number;//经纪门店id
    agent_manager_id: number;//经纪人id
}
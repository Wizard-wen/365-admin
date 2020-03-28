


export interface searchOperateOrderForm {
    order_code: string;//订单编号
    type: Array<number>;//订单状态
    order_at: Array<number>;//客户下单时间
    order_user_phone:string;//下单客户电话
    order_user_name: string;//下单客户姓名
    apply_store_id: Array<number>;//来源门店
    apply_manager_id: Array<number>;//来源人
    sign_user_name: string;//签约客户名
    sign_user_phone: string;//签约客户电话
    sign_staff_name: string;//签约服务人员姓名
    sign_staff_code: string;//签约服务人员编号
    sign_staff_phone: string;//签约服务人员电话
    
    created_at: Array<number>;//订单创建时间
    created_manager_id: Array<number>;//订单创建人
    agent_store_id: Array<number>;//经纪门店id
    agent_manager_id: Array<number>; //经纪人id
}
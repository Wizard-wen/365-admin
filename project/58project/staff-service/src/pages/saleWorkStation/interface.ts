


//动态信息-公海订单接口文件
export interface dynamic_informationItem{
    id:string;//订单id
    order_code:string;//订单编号
    created_at:string;//订单创建时间（运营创建时间）
    
    icon:string;//订单经纪人头像
    agent_manager_name:string;// 订单经纪人
    agent_manager_phone:string;// 订单经纪人电话
    agent_manager_id:string;// 订单经纪人id
    agent_store_name:string;// 订单经纪门店
    agent_store_id:string;// 订单经纪门店id
    
    
    work_type:string;//工种
    order_details:string;//订单详情
    service_address:string;//服务地址
    service_duration:string;//工作期间
    wage:string;//工资
}

//待处理订单
export interface  processing_orderItem{
    id:string;
    order_code:string;//订单编号
    created_at:string;//订单创建时间（运营创建时间）

    order_user_phone:string;//下单客户电话
    order_user_name:string;//下单客户


    work_type:string;//工种
    order_details:string;//订单详情
    service_address:string;//服务地址
    service_duration:string;//工作期间
    wage:string;//工资

}
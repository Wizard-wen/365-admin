/**
 * 门店工作台接口文件
 */



export interface dynamic_informationItem{
    
}

/**
 * 获取运营中心数据统计信息
 */

export interface getSaleWorkstationForm{
    get_for:string;//统计维度： 运营个人、全公司
    id:number;
}
export enum get_for{
    personal = 'personal',
    store = 'store',
    total = 'total',
}

interface statisticObject {
    total:number;//总数
    last_month:number;//上月
    this_month:number;//本月
    rate:number;//环比
    last_before_month:number; //上上月
}
// 门店工作人员数据统计
export interface storeWorkerStatistic {
    order_transform_rate:statisticObject;//订单转化率
    sale_amount:statisticObject;//流水
    sale_service_amount:statisticObject;//销售额
    //录入服务人员数量
    //申请的订单数
}





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
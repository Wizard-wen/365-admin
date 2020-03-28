




/**
 * 获取运营中心数据统计信息
 */

export interface getOperateWorkerStationForm{
    get_for:string;//统计维度： 运营个人、全公司
    id:number;
}

export enum get_for{
    personal = 'personal',
    total = 'total',
}

/**
 * 运营中心数据统计信息
 */
export interface  operateStatistic {
    return_staff_count:statisticObject;//回访劳动者数量
    pass_order_count:statisticObject;//通过订单数量
    pass_staff_count:statisticObject;//通过劳动者数量
    return_client_count:statisticObject;//回访客户数量
}

interface statisticObject {
    total:number;//总数
    last_month:number;//上月
    this_month:number;//本月
    rate:number;//环比
    last_before_month:number; //上上月
}


/**
 * 服务人员申请字段
 */
export interface staff_applicationItem{
    id:string;

    created_at:string;//创建时间
    manager_id:string;//管理员id
    manager_name:string;//管理员姓名


    name:string;//服务人员姓名
    age:string;//服务人员年龄
    phone:string;//服务人员手机号
}
/**
 * 门店订单申请字段
 */
export interface store_order_applicationItem{
    id:string;
    
    apply_code: string;
    created_at: string;

    apply_manager_id: string;
    apply_manager_name:string;
    apply_store_id: string;
    apply_store_name: string;
    user_name: string;
    user_phone: string;

    order_details: string;
    service_address: string;
    service_duration: string;
    wage: string;
    work_type: string;
}


//待处理客户端订单申请字段
export interface  user_order_applicationItem{
    id:string;

    require_code: string;//需求编号
    created_at: string;//创建时间

    user_name: string;//客户姓名
    user_phone: string;//客户联系方式

    order_details: string;
    service_address: string;
    service_duration: string;
    wage: string;
    work_type: string;
}
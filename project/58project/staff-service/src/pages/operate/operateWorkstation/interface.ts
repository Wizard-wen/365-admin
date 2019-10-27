



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
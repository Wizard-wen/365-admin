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
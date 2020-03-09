
/**
 * 订单所属模块
 */
export enum orderModuleType{
    salePublicOrderList = 'public', //门店公海订单
    saleOrderList = 'sale',//门店订单
    orderList = 'operate'//运营订单
}


export interface baseSearchOrderItem{
    page: 1, //请求页码
    pageNumber: 20,//单页信息数量
}
// 公海订单搜索
export interface publicSearchOrderItem extends baseSearchOrderItem{
    order_code: string//订单编号
    order_at: Array<number>;//客户下单时间
    agent_store_id: Array<number>;//经纪门店id
    agent_manager_id: Array<number>; //经纪人id
}
//门店订单搜索 运营订单搜索
export interface searchOrderItem extends publicSearchOrderItem{
    
    // order_code: string;//订单编号
    // order_at: Array<number>;//客户下单时间
    // agent_store_id: Array<number>;//经纪门店id
    // agent_manager_id: Array<number>; //经纪人id

    type?: Array<number>;//订单状态
    order_user_phone?:string;//下单客户电话
    order_user_name?: string;//下单客户姓名
    apply_store_id?: Array<number>;//来源门店
    apply_manager_id?: Array<number>;//来源人
    sign_user_name?: string;//签约客户名
    sign_user_phone?: string;//签约客户电话
    sign_staff_name?: string;//签约服务人员姓名
    sign_staff_code?: string;//签约服务人员编号
    sign_staff_phone?: string;//签约服务人员电话
    created_at?: Array<number>;//订单创建时间
    created_manager_id?: Array<number>;//订单创建人
    
}
// 订单配置项
export interface orderFormConfig {
    type: Array<object>;//订单状态
    order_at: Array<object>;//客户下单时间
    apply_manager_id: Array<object>;//来源人
    apply_store_id: Array<object>;//来源门店
    created_at: Array<object>;//订单创建时间
    created_manager_id: Array<object>;//订单创建人
    agent_store_id: Array<object>;//订单经纪门店
    agent_manager_id: Array<object>;//订单经纪人
}



/**
 * 订单状态
 */
export const order_typeList = [
    {name: '匹配中',id: 1,color: '#E6A23C',des: '订单申请通过后，尚未签约的状态，这就是公海订单状态'},
    {name: '已签约',id: 2,color: '#67C23A',des: '已经签约，从公海订单中撤出'},
    {name: '售后匹配中',id: 3,color: '#E6A23C',des: '售后匹配中：首次签约后，订单中的合同终止，进入重新匹配状态'},
    {name: '已终止',id: 4,color: '#F56C6C',des: '已终止：订单被终止，订单终止应当是在合同终止余额结算完毕后执行'},
]

// 订单所属页面
export const public_order_typeList = [
    {id: 1, name: '门店订单申请'},
    {id: 2, name: '客户订单申请'},
    {id: 3, name: '门店订单'},
    {id: 4, name: '门店公海订单'},
    {id: 5, name: '运营订单'},
]

/**
 * 创建于
 */
export const created_atList = [
    {id: 1, name: "今天"},
    {id: 2, name: "昨天"},
    {id: 3, name: "过去7天"},
    {id: 4, name: "过去30天"},
    {id: 5, name: "本周"},
    {id: 6, name: "上周"},
    {id: 7, name: "上个月"},
    {id: 8, name: "本季度"},
    {id: 9, name: "今年"},
    {id: 10, name: "去年"},
]


//分派订单
export interface assignOrderForm{
    order_id: number;
    agent_store_id: number;
    agent_manager_id: number;
    version: number;
}
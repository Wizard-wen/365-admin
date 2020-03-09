import {
    contractItem,
    is_wageList,
} from '@/public/module/contractItem/IcontractItem.ts'

export enum is_wage {
    YES = 1,
    NO = 2,
}
let a:is_wage;

a = 1;


export interface orderItem {
    order: orderBaseItem;
    order_staff: Array<matchedServiceItem>;
    order_contract:Array<contractItem>;
    order_logs:Array<object>;//订单日志
}

// 订单信息
export interface orderBaseItem extends order_agentItem, order_sign_workerItem, 
order_base_messageItem, order_agentItem, order_applyItem
{
    id:string;
    version:string;

    //is_wageList 是否发放工资字段信息
    is_wage:string;//是否发放工资
    order_code:string;//订单编号

    // order_typeList 订单状态字段信息
    type:string;//订单状态
    
    order_at:string;// 客户下单时间
    order_user_phone:string;//下单客户电话
    order_user_name:string;//下单客户
    
    //创建订单操作是指运营人员通过订单申请的行为 
    created_at:string;// 订单创建时间
    created_manager_name:string;// 订单创建人
    created_manager_id:string;//订单创建人id
    //为了记录订单转化率
    first_sign_at:string;//首次签约时间
}

// 订单签约客户信息
export interface order_sign_userItem {
    sign_user_name:string;// 签约客户
    sign_user_phone:string;// 签约客户联系方式
    sign_user_identify:string;//签约客户身份证号
    sign_user_account:string;// 签约客户余额
    sign_service_start:string;//签约服务开始时间
    sign_service_end:string;//签约服务结束时间
}
// 订单签约服务人员信息
export interface order_sign_workerItem{
    sign_staff_name:string;// 签约服务人员
    sign_staff_id:string;// 签约服务人员id
    sign_staff_code:string// 签约服务人员编号
    sign_staff_phone:string;//签约服务人员电话
    sign_staff_identify:string;//签约服务人员身份证号
    sign_staff_law_address:string;//签约服务人员户籍地址
    sign_staff_cur_address:string;//签约服务人员现住址
    sign_staff_urgent:string;//签约服务人员紧急联系人
}
// 订单经纪信息
export interface order_agentItem {
    agent_manager_name:string;// 订单经纪人
    agent_manager_phone:string;// 订单经纪人电话
    agent_manager_id:string;// 订单经纪人id
    agent_store_name:string;// 订单经纪门店
    agent_store_id:string;// 订单经纪门店id
}
// 订单基本信息
export interface order_base_messageItem {
    work_type:string;//工种
    order_details:string;//订单详情
    service_address:string;//服务地址
    service_duration:string;//工作期间
    wage:string;//工资
}
// 订单来源信息
export interface order_applyItem{
    apply_id:string;//申请单id，后端字段
    apply_at:string;//订单申请时间，从订单申请表传过来的
    apply_store_name:string;// 来源门店
    apply_store_id:string;// 来源门店id
    apply_manager_name:string;// 来源人
    apply_manager_id:string;// 来源人id
}

/**
 * 已备选服务人员
 */
export interface matchedServiceItem {
    id:string;//
    order_id:string;//订单id
    staff_id:string;//员工id
    created_manager_id:string;// 添加人id
    // 展示字段
    staff_code:string; //工号
    staff_name:string;//姓名
    staff_icon:string;//头像
    staff_phone:string;//电话
    type:number;// 签约状态
    create_manager_name:string;// 添加人
}
// 订单状态
// export const order_typeList = [
//     {id: 1, name: '匹配中', des: '订单申请通过后，尚未签约的状态，这就是公海订单状态'},
//     {id: 2, name: '已签约', des: '已经签约，从公海订单中撤出'},
//     {id: 3, name: '售后匹配中', des: '售后匹配中：首次签约后，订单中的合同终止，进入重新匹配状态'},
//     {id: 4, name: '已终止', des: '已终止：订单被终止，订单终止应当是在合同终止余额结算完毕后执行'},
// ]



// 订单类型
export const public_order_typeList = [
    {id: 1, name: '门店订单申请'},
    {id: 2, name: '客户订单申请'},
    {id: 3, name: '门店订单'},
    {id: 4, name: '门店公海订单'},
    {id: 5, name: '运营订单'},
]

// 当前所属订单页
export enum orderCurrentPage{
    orderApply =  1, //门店订单申请
    clientRequire = 2,//客户订单申请
    saleOrder = 3,//门店订单
    salePublicOrder = 4,//门店公海订单
    operateOrder = 5,//运营订单
}
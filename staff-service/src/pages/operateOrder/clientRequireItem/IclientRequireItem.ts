

import {order_apply_typeList} from '@/public/module/orderApplyList/IorderApplyList'
// 客户需求
export interface  clientRequireItem {
    id: number;//
    require_code: string;//需求编号
    version: number;//
    type: string; //客户需求状态
    created_at: number;//下单时间
    // 业务字段
    work_type: string;
    wage: string;
    service_duration: string;
    order_details: string;
    service_address: string;
    // 下单客户
    user_phone: string;
    user_name: string;
}
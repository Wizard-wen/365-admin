
import {order_apply_typeList} from '@/public/module/orderApplyList/IorderApplyList'

export interface orderApplyItem {
    id?: string;
    version: string;
    
    apply_code:string;//---订单申请编号
    type: number;//订单申请状态
    created_at: string;//申请创建时间

    // 订单信息
    work_type: string;
    wage: string;
    service_address: string;
    service_duration: string;
    order_details: string;
    // 下单客户
    user_phone: string;
    user_name: string;
    // 申请创建人
    created_manager_name: string;
    created_manager_id: string;
    // 申请来源门店、人
    apply_store_name: string;
    apply_store_id: string;
    apply_manager_name: string;
    apply_manager_id: string; 
}
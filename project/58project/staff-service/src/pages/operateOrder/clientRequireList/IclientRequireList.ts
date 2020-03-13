
import {order_apply_typeList} from '@/public/module/orderApplyList/IorderApplyList'

// 客户需求字段请求
export interface searchClientRequireForm {
    page: number; //请求页码
    pageNumber: number;//单页信息数量

    type: Array<number>;//客户需求状态
    require_code: string;//客户需求编号
    user_phone: string;//下单客户电话
    user_name: string;//下单客户姓名
    created_at: Array<number>;//创建时间
}
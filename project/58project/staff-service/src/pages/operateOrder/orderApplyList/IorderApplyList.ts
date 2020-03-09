




// 请求门店订单申请表单
export interface searchOrderApplyForm{
    page: number; //请求页码
    pageNumber: number;//单页信息数量
    
    type: Array<number>;//订单申请类型
    apply_manager_id:Array<number>;//来源人id
    apply_store_id: Array<number>;//来源门店id
    apply_code: string;//订单申请编号
    created_manager_id: Array<number>;//申请创建人id
    user_phone: string;//客户电话
    user_name: string;//客户姓名
    created_at: Array<number>;//创建时间
}
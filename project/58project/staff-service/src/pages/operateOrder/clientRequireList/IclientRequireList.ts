



export interface searchClientRequireForm {
    page: number; //请求页码
    pageNumber: number;//单页信息数量
    type: Array<number>;//订单申请类型
    require_code: string;//订单申请编号
    user_phone: string;//客户电话
    user_name: string;//客户姓名
    created_at: Array<number>;//创建时间
}
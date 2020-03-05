







// 回访服务人员
export interface returnWorkerList {
    get_for: string;//查询原因'return'
    page: number; //请求页码
    pageNumber: number;//单页信息数量
    name: string;
    phone: string;
}
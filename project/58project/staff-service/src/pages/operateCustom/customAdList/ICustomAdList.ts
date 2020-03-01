
/**
 * 服务人员搜索字段
 */
export interface searchCustomAdItem{
    get_for:string;//请求数据类型
    page?:number;//页码
    pageNumber?:number; //单页数量
    key?:string;//广告位编号
    name?:string;//广告位名
    client:number;//1 客户端 2 服务人员端
    display:number;//展现形式 1 轮播图  2 图片
}

export const displayList = [
    {id:1, name: '轮播图'}, 
    {id: 2, name: '图片'}
]

export const clientList = [
    {id:1, name: '客户端'}, 
    {id: 2, name: '服务人员端'}
]

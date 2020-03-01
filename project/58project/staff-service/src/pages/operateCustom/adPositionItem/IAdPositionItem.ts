/**
 * 服务人员字段
 */
export interface customAdItem{
    id:string;
    key?:string;//广告位编号
    name?:string;//广告位名
    client:number;//1 客户端 2 服务人员端
    display:number;//展现形式 1 轮播图  2 图片
    resource:Array<any>
}
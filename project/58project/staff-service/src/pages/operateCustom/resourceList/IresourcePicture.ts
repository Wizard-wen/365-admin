
/**
 * 说明：url字段是后端需要的。
 * 首次上传，直接复制给url。
 * 编辑时，若未更改图片，url为空。若更改了图片，则将新的url传给后端
 */

export interface resourcePicture {
    id: number;
    name: string;//图片名
    url?: string; // 后端接收图片
    type: number;//图片类型
    icon?: string;//前端逻辑
    typeName?:string;//图片类型名
}

export const  resourceTypeList = [
    {id: 1, name: '长图'},
    {id: 2, name: '全屏'},
    {id: 3, name: '半屏'},
]

export interface searchResourceForm {
    type: number;//资源种类
    page: number; 
    pageNumber: number;
}
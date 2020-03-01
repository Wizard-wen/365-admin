//门店是直营店还是加盟店
export const is_thirdList = [
    {name: '直营店', id: 1},
    {name: '加盟店', id: 2},
]

//门店经营状态
export const runTypeList = [
    { id: 1, name: "营业" }, 
    { id: 2, name: "停业" }
]

export interface searchStoreItem {
    is_third: number; //门店类型
    type: number; //经营状态
    name: string;//门店名
    store_manager_name: string;//店长名
    store_code: string;//门店编号
}
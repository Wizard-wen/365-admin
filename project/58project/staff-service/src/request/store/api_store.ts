



export interface api_store {
    // 获取门店列表
    getStoreList:{(obj:object):Promise<any>},
    // 请求某一门店数据
    getStore:{(id:string):Promise<any>},
    // 编辑门店信息
    editStore:{(editObj:object):Promise<any>},
    // 添加新店员
    addStoreManager:{(paramObj:object):Promise<any>},
    // 解绑门店员工
    unbind:{(paramObj:object):Promise<any>},
    // 门店工作台
    saleWorkBench:{(id:string):Promise<any>},
    // storeData:{():Promise<any>},
}
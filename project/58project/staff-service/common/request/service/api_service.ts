export interface api_service {
    //获取所有商品信息树
    getServiceTree:{():Promise<any>},
    //获取单个服务信息
    getService:{(id:string):Promise<any>},
    //获取服务下拉框
    getServiceSelection:{():Promise<any>},
    //编辑服务信息
    editService:{(serviceObj:object):Promise<any>},
    //删除服务信息
    deleteService:{(id:string):Promise<any>},
}
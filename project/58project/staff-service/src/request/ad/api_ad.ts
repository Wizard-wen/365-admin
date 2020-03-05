export interface api_ad{
    // 获取广告位列表
    getAdPositionList:{(paramObj:object):Promise<any>},
    // 创建广告位
    createAdPosition:{(createAdObj:object):Promise<any>},
    // 获取广告位信息
    getAdPosition:{(type:string,id:string):Promise<any>},
    // 编辑广告位
    editAdPosition:{(adObject:object):Promise<any>},
    // 删除广告位
    deleteAdPosition:{(id:string):Promise<any>},
    // 获取广告位图片
    getAdPositionResource:{(ad_position_resource_id:string):Promise<any>},
    // 编辑广告位图片
    editAdPositionResource:{(paramObj:object):Promise<any>},
    // 删除广告位图片
    deleteAdPositionResource:{(id:string):Promise<any>},
    // 获取全部资源列表
    getAdResourceList:{(paramObj:object):Promise<any>},
    // 编辑资源
    editAdResource:{(resourceObject:object):Promise<any>},
    // 获取资源
    getAdResource:{():Promise<any>},
    // 删除资源
    deleteAdResource:{(id:string):Promise<any>},
}
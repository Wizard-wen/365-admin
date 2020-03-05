import {
    apiRequestAd
} from '../request/ad/index'


import {
    searchCustomAdItem,
} from '../pages/operateCustom/customAdList/ICustomAdList'
import {
    customAdItem,
} from '../pages/operateCustom/adPositionItem/IAdPositionItem'

import {
    resourcePicture,
    searchResourceForm
} from '../pages/operateCustom/resourceList/IresourcePicture'

export const adService = {
    /**
     * 请求列表数据
     */
    getTableList(queryObject:searchCustomAdItem):Promise<any>{
        return apiRequestAd.getAdPositionList(queryObject).then(data => {
            return {
                pagination: {
                    currentPage: data.data.current_page, //当前页码
                    total: data.data.total, //列表总条数
                    pageNumber: data.data.per_page //每页显示数
                },
                workerTable: data.data.data
            }
        })
    },
    /**
     * 创建广告位
     */
    createAdPosition(createAdObj:customAdItem):Promise<any>{
        return apiRequestAd.createAdPosition(createAdObj)
    },
    /**
     * 获取广告位信息
     */
    getAdPosition(type:string, id:string):Promise<any>{
        return apiRequestAd.getAdPosition(type, id)
    },
    /**
     * 编辑广告位
     * @param adObject
     */
    editAdPosition(adObject:customAdItem):Promise<any>{
        return apiRequestAd.editAdPosition(adObject)
    },
    /**
     *  删除广告位 
     */
    deleteAdPosition(id:string):Promise<any>{
        return apiRequestAd.deleteAdPosition(id)
    },


    /**
     * 获取全部资源列表
     * @param paramObj
     */
    getAdResourceList(paramObj:searchResourceForm):Promise<any>{
        return apiRequestAd.getAdResourceList(paramObj)
    },
    /**
     * 编辑资源
     */
    editAdResource(resourceObject:resourcePicture):Promise<any>{
        return apiRequestAd.editAdResource(resourceObject)
    },
    /**
     * 获取资源
     */
    getAdResource():Promise<any>{
        return apiRequestAd.getAdResource()
    },
    /**
     * 删除资源
     * @param id
     */
    deleteAdResource(id:string):Promise<any>{
        return apiRequestAd.deleteAdResource(id)
    },
}
import {apiRequestService} from '@/request/index'


export const productListService = {
    /**
     * 获取所有商品信息树
     */
    getServiceTree(){
        return apiRequestService.getServiceTree()
    },
    /**
     * 获取单个服务信息
     * @param id 服务的id
     */
    getService(id:number){
        return apiRequestService.getService(id)
    },
    /**
     * 获取服务下拉框
     */
    getServiceSelection(){
        return apiRequestService.getServiceSelection()
    },
    /**
     * 编辑服务信息
     * @param serviceObj 服务信息对象
     */
    editService(serviceObj:any){
        return apiRequestService.editService(serviceObj)
    },
    /**
     * 删除服务信息
     */
    deleteService(id:number){
        return apiRequestService.deleteService(id)
    }
}
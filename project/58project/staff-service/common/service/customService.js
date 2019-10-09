import customRequest from './request/customRequest.js'



export default {
    /**
     * 获取广告位列表
     */
    getAdPositionList(){
        return customRequest.getAdPositionList()
    },
    /**
     * 获取全部资源列表
     */
    getAdResourceList(){
        return customRequest.getAdResourceList()
    },
    /**
     * 编辑资源
     */
    editAdResource(resourceObject){
        return customRequest.editAdResource(resourceObject)
    },
    /**
     * 获取资源
     */
    getAdResource(){
        return customRequest.getAdResource()
    },
    /**
     * 获取广告位信息
     */
    getAdPosition(type, id){
        return customRequest.getAdPosition(type, id)
    },
    /**
     * 编辑广告位
     * @param adObject
     */
    editAdPosition(){
        return customRequest.editAdPosition()
    }
}

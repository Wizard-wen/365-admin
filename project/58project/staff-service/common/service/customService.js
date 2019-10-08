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
     * 获取广告位信息
     */
    getAdPosition(){
        return customRequest.getAdPosition()
    },
    /**
     * 编辑广告位
     * @param adObject
     */ 
    editAdPosition(){
        return customRequest.editAdPosition()
    }
}
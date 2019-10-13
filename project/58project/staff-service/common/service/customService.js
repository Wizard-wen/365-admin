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
     * @param paramObj
     */
    getAdResourceList(paramObj){
        return customRequest.getAdResourceList(paramObj)
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
     * 删除资源
     * @param id
     */
    deleteAdResource(id){
        return customRequest.deleteAdResource(id)
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
    },
    /**
     * 获取视频列表
     * @param videoParam
     */
    getVideoList(videoParam){
        return customRequest.getVideoList(videoParam)
    },
    /**
     * 获取视频
     */
    getVideo(id){
        return customRequest.getVideo(id)
    },
    /**
     * 编辑视频
     */
    editVideo(videoObject){
        return customRequest.editVideo(videoObject)
    },
    /**
     * 删除视频
     */
    deleteVideo(id){
        return customRequest.deleteVideo(id)
    }
}

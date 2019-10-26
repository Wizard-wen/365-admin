import axios from 'axios'


export default {
    /**
     * 获取广告位列表
     */
    getAdPositionList(paramObj){
        return axios.post(`./admin/ad/getAdPositionList`,{
            ...paramObj
        })
    },
    /**
     * 获取全部资源列表
     * @param paramObj
     */
    getAdResourceList(paramObj){
        return axios.post(`./admin/ad/getAdResourceList`,{
            ...paramObj
        })
    },
    /**
     * 编辑资源
     */
    editAdResource(resourceObject){
        return axios.post(`./admin/ad/editAdResource`,{
            ...resourceObject
        })
    },
    /**
     * 获取资源
     */
    getAdResource(){
        return axios.get(`./admin/ad/getAdResource`)
    },
    /**
     * 删除资源
     * @param id
     */
    deleteAdResource(id){
        return axios.post(`./admin/ad/deleteAdResource`,{
            id: id
        })
    },
    /**
     * 获取广告位信息
     */
    getAdPosition(type, id){
        return axios.get(`./admin/ad/getAdPosition?client=${type}&id=${id}`)
    },
    /**
     * 编辑广告位
     * @param adObject
     */
    editAdPosition(adObject){
        return axios.post(`./admin/ad/editAdPosition`,{
            ...adObject,
        })
    },
    /**
     * 获取视频列表
     * @param videoParam
     */
    getVideoList(videoParam){
        return axios.post(`./admin/video/getVideoList?`,{
            ...videoParam,
        })
    },
    /**
     * 获取视频
     */
    getVideo(id){
        return axios.get(`./admin/video/getVideo?id=${id}`)
    },
    /**
     * 编辑视频
     */
    editVideo(videoObject){
        return axios.post(`./admin/video/editVideo`,{
            ...videoObject,
        })
    },
    /**
     * 删除视频
     */
    deleteVideo(id){
        return axios.post(`./admin/video/deleteVideo`,{
            id: id,
        })
    },
    /**
     * 获取广告位图片
     */
    getAdPositionResource(id){
        return axios.get(`./admin/ad/getAdPositionResource?id=${id}`)
    },
    /**
     * 编辑广告位图片
     */
    editAdPositionResource(paramObj){
        return axios.post(`./admin/ad/editAdPositionResource`,{
            ...paramObj,
        })
    },
    /**
     * 删除广告位图片
     */
    deleteAdPositionResource(id){
        return axios.post(`./admin/ad/deleteAdPositionResource`,{
            id: id,
        })
    }
}

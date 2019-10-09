import axios from 'axios'


export default {
    /**
     * 获取广告位列表
     */
    getAdPositionList(){
        return axios.post(`./admin/ad/getAdPositionList`)
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
    }

}

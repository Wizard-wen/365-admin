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
     */
    getAdResourceList(){
        return axios.post(`./admin/ad/getAdResourceList`)
    },
    /**
     * 获取广告位信息
     */
    getAdPosition(){
        return axios.post(`./admin/ad/getAdPosition`)
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
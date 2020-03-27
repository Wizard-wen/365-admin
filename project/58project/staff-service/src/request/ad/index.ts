import axios from 'axios'


import {api_ad} from './api_ad'

export const apiRequestAd:api_ad = {
    /**
     * 获取广告位列表
     */
    getAdPositionList(paramObj){
        return axios.post(`./admin/ad/getAdPositionList`,{
            ...paramObj
        })
    },
    /**
     * 创建广告位
     */
    createAdPosition(createAdObj){
        return axios.post(`./admin/ad/createAdPosition`,{
            ...createAdObj
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
     *  删除广告位 
     */
    deleteAdPosition(id){
        return axios.post(`./admin/ad/deleteAdPosition`,{
            id: id
        })
    },

    /**
     * 获取广告位图片
     */
    getAdPositionResource(ad_position_resource_id){
        return axios.get(`./admin/ad/getAdPositionResource?ad_position_resource_id=${ad_position_resource_id}`)
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
            ad_position_resource_id: id,
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
            id,
        })
    },
}
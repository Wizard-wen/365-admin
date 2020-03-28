
import axios from 'axios'
import {api_service} from './api_service'



export const apiRequestService:api_service = {
    /**
     * 获取所有商品信息树
     */
    getServiceTree(){
        return axios.get(`./admin/service/getServiceTree`)
    },
    /**
     * 获取单个服务信息
     * @param id 服务的id
     */
    getService(id){
        return axios.get(`./admin/service/getService?id=${id}`)
    },
    /**
     * 获取服务下拉框
     */
    getServiceSelection(){
        return axios.get(`./admin/service/getServiceSelection`)
    },
    /**
     * 编辑服务信息
     * @param serviceObj 服务信息对象
     */
    editService(serviceObj){
        return axios.post(`./admin/service/editService`,{
            ...serviceObj
        })
    },
    /**
     * 删除服务信息
     */
    deleteService(id){
        return axios.post(`./admin/service/deleteService`, {
            id,
        })
    }
}
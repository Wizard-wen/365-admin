import axios from 'axios'

import {api_store} from './api_store'


export const apiRequestStore:api_store = {
    /**
     * 获取门店列表
     */
    getStoreList(obj){
        return axios.post(`./admin/store/getStoreList`,{
            ...obj,
        })
    },
    /**
     * 请求某一门店数据
     * @param id 门店的id
     */
    getStore(id){
        return axios.get(`./admin/store/getStore?id=${id}`)
    },

    /**
     * 编辑门店信息
     * @param editObj
     */
    editStore(editObj){
        return axios.post(`./admin/store/editStore`,{
            ...editObj
        })
    },
    /**
     * 添加新店员
     */
    addStoreManager(paramObj){
        return axios.post(`./admin/store/addStoreManager`,{
            ...paramObj,
        })
    },
    /**
     * 解绑门店员工
     */
    unbind(paramObj){
        return axios.post(`./admin/store/unbind`,{
            ...paramObj,
        })
    },
    /**
     * 门店工作台
     */
    saleWorkBench(getSaleWorkstationForm){
        return axios.get(`./admin/store/workBench?
            id=${getSaleWorkstationForm.id}&
            get_for=${getSaleWorkstationForm.get_for}`)
    }
}


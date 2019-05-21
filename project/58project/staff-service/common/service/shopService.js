import shopRequest from './request/shopRequest.js'
import Axios from 'axios';

export default {
    /**
     * 获取全部门店列表
     * @param obj 搜索字段
     */
    getStoreList(obj){
        return shopRequest.getStoreList(obj)
    },
    /**
     * 获取某门店信息信息
     */
    getStore(id){
        return shopRequest.getStore(id)
    },
}

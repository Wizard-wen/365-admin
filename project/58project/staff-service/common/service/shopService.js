import shopRequest from './request/shopRequest.js'
import Axios from 'axios';

export default {
    /**
     * 获取全部门店列表
     * @param obj 搜索字段
     */
    getShopList(obj){
        return shopRequest.getShopList(obj)
    },
    /**
     * 获取某门店信息信息
     */
    getShop(id){
        return shopRequest.getShop(id)
    },
}
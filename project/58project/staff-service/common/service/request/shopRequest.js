
/**
 * 门店列表接口
 */
import axios from 'axios'

export default {
    /**
     * 获取门店列表
     * @param obj 搜索字段
     */

    getShopList(tableOption){
        let baseUrl = `./admin/shop/getShopList?pageNumber=${tableOption.pageNumber}&page=${tableOption.currentPage}`
        if(tableOption.searchSelect.length){
            tableOption.searchSelect.forEach((item, index) => {
                baseUrl += `&${item.key}=${item[item.key]}`
            });
        }
        return axios.get(baseUrl)
    },
    /**
     * 请求某一门店数据
     * @param id 员工的id
     */
    getShop(id){
        return axios.get(`./admin/shop/getShop?id=${id}`)
    },
}
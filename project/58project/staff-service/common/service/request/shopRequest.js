
/**
 * 门店列表接口
 */
import axios from 'axios'

export default {
    /**
     * 获取门店列表
     * @param obj 搜索字段
     */

    getStoreList(tableOption){
        let baseUrl = `./admin/store/getStoreList?pageNumber=${tableOption.pageNumber}&page=${tableOption.currentPage}`
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
    getStore(id){
        return axios.get(`./admin/store/getStore?id=${id}`)
    },

    /**
     * 编辑门店信息
     * @param editObj
     */
    editStore(editObj){
        return axios.post(`./admin/store/editStore`,Object.assign({},editObj))
    },
    /**
     * 根据门店id获取门店绑定的账号分页列表
     * @param id 门店的id
     * @param pageNumber 分页
     */
    getStoreManagerList(obj){
      return axios.post(`./admin/store/getStoreManagerList?pageNumber=${obj.pageNumber}&id=${obj.id}`)
  },
}

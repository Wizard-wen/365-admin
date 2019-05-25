import shopRequest from './request/shopRequest.js'

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
      /**
     * 编辑门店信息
     * @param editObj
     */
    editStore(editObj){
      return shopRequest.editStore(editObj)
    },
    /**
     * 根据门店id获取门店绑定的账号分页列表
     * @param id 门店的id
     * @param pageNumber 分页
     */
    getStoreManagerList(obj){
      return shopRequest.getStoreManagerList(obj)
    }
}

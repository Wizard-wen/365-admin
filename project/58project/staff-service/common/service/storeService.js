import storeRequest from './request/storeRequest.js'

export default {
    /**
     * 获取全部门店列表
     * @param obj 搜索字段
     */
    getStoreList(obj){
        return storeRequest.getStoreList(obj)
    },
    /**
     * 获取某门店信息信息
     */
    getStore(id){
        return storeRequest.getStore(id)
    },
      /**
     * 编辑门店信息
     * @param editObj
     */
    editStore(editObj){
      return storeRequest.editStore(editObj)
    },
    /**
     * 根据门店id获取门店绑定的账号分页列表
     * @param id 门店的id
     * @param pageNumber 分页
     */
    getStoreManagerList(obj){
      return storeRequest.getStoreManagerList(obj)
    }
}

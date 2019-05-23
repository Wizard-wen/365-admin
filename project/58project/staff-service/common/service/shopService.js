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
     * | id | int | 必填 | 门店id |
     * | name | string | 必填 | 门店名 |
     * | address | string | 必填 | 门店地址 |
     * | is_third | int | 必填 | 门店类型 |
     * | remarks | string | 选填 | 备注 |
     * | managerIds | array | 选填 | 角色组 |
     */
    editStore(editObj){
      return shopRequest.editStore(editObj)
    },
    /**
     * 物理删除管理员
     * @param id 管理员id
     */
    deleteStore(id){
        return shopRequest.deleteStore(id)
    },
}

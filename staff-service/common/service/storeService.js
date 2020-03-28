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
     * 获取当前未绑定门店员工
     */
    getNotInStoreManagerSelection(){
        return storeRequest.getNotInStoreManagerSelection()
    },
    /**
     * 添加新店员
     */
    addStoreManager(paramObj){
        return storeRequest.addStoreManager(paramObj)
    },
    /**
     * 获取当前门店员工
     */
    
    getStoreManagerSelection(store_id){
        return storeRequest.getStoreManagerSelection(store_id)
    },
    /**
     * 解绑门店员工
     */
    unbind(paramObj){
        return storeRequest.unbind(paramObj)
    }
}

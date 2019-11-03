

export default {
    /**
     * 获取门店列表
     */
    getStoreList(){
        return axios.post(`./admin/store/getStoreList`,{
            ...store.state.storeModule.storeList
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
     * 获取当前未绑定门店员工
     */
    getNotInStoreManagerSelection(){
        return axios.get(`./admin/common/getNotInStoreManagerSelection`)
    },
    /**
     * 添加新店员
     */
    addStoreManager(paramObj){
        return axios.post(`./admin/store/addStoreManager`,{
            ...paramObj
        })
    },
    /**
     * 获取当前门店员工
     */
    
    getStoreManagerSelection(store_id){
        return axios.get(`./admin/common/getStoreManagerSelection?store_id=${store_id}`)
    }, 
    /**
     * 解绑门店员工
     */
    unbind(paramObj){
        return axios.post(`./admin/store/unbind`,{
            ...paramObj
        })
    }
}

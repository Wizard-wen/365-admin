
/**
 * 运营中心空合同、合同接口
 */


 export const operate_contract = {
    /**
     * 获取空合同列表
     */
    getVoidContractList(){
        return axios.post(`./admin/order/getVoidContractList`,{
            ...store.state.operateModule.voidContractList
        })
    },
    /**
     * 创建空合同列表
     * @param paramObj
     */
    createVoidContract(paramObj){
        return axios.post(`./admin/order/createVoidContract`,paramObj)
    },
    /**
     * 分派空合同列表
     * @param paramObj
     */
    assignVoidContract(paramObj){
        return axios.post(`./admin/order/assignVoidContract`,paramObj)
    },
    /**
     * 签约时，销售的空合同
     */
    getManagerVoidContractSelection(){
        return axios.get(`./admin/order/getManagerVoidContractSelection`)
    }
}
export default {
    /**
     * 签约
     * @param signObject
     */
    sign(signObject){
        return axios.post(`./admin/order/sign`,{
            ...signObject,
        })
    },
    /**
     * 获取合同列表
     */
    getContractList(type){
        if(type == 1){
            return axios.post(`./admin/order/getContractList`,{
                ...store.state.saleModule.saleContractList
            })
        } else if (type == 2){
            return axios.post(`./admin/order/getContractList`,{
                ...store.state.operateModule.contractList
            })
        }
    },
    /**
     * 获取合同详情
     * @param id 合同id
     */
    getContract(id){
        return axios.get(`./admin/order/getContract?id=${id}`)
    },
    /**
     * 终止合同
     */
    stopContract(paramObj){
        return axios.post(`./admin/order/stopContract`,{
            ...paramObj,
        })
    },
    /**
     * 结算工资
     */
    settleWage(paramObj){
        return axios.post(`./admin/order/settleWage`,{
            ...paramObj,
        })
    }
}
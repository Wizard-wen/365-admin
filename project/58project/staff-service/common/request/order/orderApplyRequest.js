/**
 * 运营订单申请接口
 */
export default {
    /**
     * 订单申请
     * des 门店申请订单接口
     * @param applyObject 订单申请字段
     */
    applyOrder(applyObject){
        return axios.post(`./admin/order/applyOrder`,{
            ...applyObject
        })
    },
    /**
     * 订单申请列表
     * des 运营中心的订单申请列表，查询条件来源于vuex数据
     */
    getApplicationList(){
        return axios.post(`./admin/order/applicationList`,{
            ...store.state.operateModule.orderApplyList,
        })
    },
    /**
     * 处理订单申请
     * des 运营中心处理订单申请
     * @param sendObj 处理订单字段
     */
    dealApplication(sendObj){
        return axios.post(`./admin/order/dealApplication`,{
            ...sendObj,
        })
    },
    /**
     * 订单申请详情
     * des 运营中心查看订单申请详情
     * @param id 订单申请id
     */
    getApplication(id){
        return axios.get(`./admin/order/getApplication?id=${id}`)
    },
    /**
     * 订单申请字段修改
     * des 运营中心逐个修改订单申请字段
     * @param changeObj 
     */
    editApplication(changeObj){
        return axios.post(`./admin/order/editApplication`,{
            ...changeObj
        })
    },
    /**
     * 订单申请来源修改
     */
    editAppLySource(changeObj){
        return axios.post(`./admin/order/editAppLySource`,{
            ...changeObj
        })
    },
}
/**
 * 订单模块接口
 */
import axios from 'axios'
/**
 * 订单申请相关接口
 */
export const sale_orderApplyRequest = {
    /**
     * 订单申请
     * @param applyObject 订单申请字段
     */
    applyOrder(applyObject){
        return axios.post(`./admin/order/applyOrder`,{
            ...applyObject
        })
    },
}

/**
 * 订单相关接口
 */
export const sale_orderRequest = {
    /**
     * 获取订单列表
     */
    getOrderList(){
        return axios.post(`./admin/order/getOrderList`,
        store.state.saleModule.orderList)
    },
    /**
     * 获取订单信息
     * @param order_id 订单id
     */
    getOrder(order_id){
        return axios.get(`./admin/order/getOrder?id=${order_id}`)
    },
    /**
     * 编辑订单详情字段
     * @param editObj 编辑对象 
     */
    editOrder(editObj){
        debugger
        return axios.post(`./admin/order/editOrder`,
        editObj)
    },
    /**
     * 取消订单
     */
    cancelOrder(obj){
        return axios.post(`./admin/order/cancelOrder`,
            Object.assign({}, obj)
        )
    },
    /**
     * 完成订单
     */
    completeOrder(obj){
        return axios.post(`./admin/order/completeOrder`,
            Object.assign({}, obj)
        )
    },
    /**
     * 派发订单
     */
    assignOrder(obj){
        return axios.post(`./admin/order/assignOrder`,
            Object.assign({}, obj)
        )
    },
}
/**
 * 销售门店备选服务人员相关接口
 */
export const sale_matchServiceRequest = {
    /**
     * 添加订单候选人
     * @param orderStaffObj
     */
    createOrderStaff(orderStaffObj){
        return axios.post(`./admin/order/createOrderStaff`,
        orderStaffObj)
    },
    /**
     * 删除候选人
     * @param orderStaffObj
     */
    deleteOrderStaff(orderStaffObj){
        return axios.post(`./admin/order/deleteOrderStaff`,
        orderStaffObj)
    },
    /**
     * 签约
     * @param signObject
     */
    sign(signObject){
        return axios.post(`./admin/order/sign`,
        signObject)
    },
    /**
     * 拒签
     * @param refuseObj
     */
    refuse(refuseObj){
        return axios.post(`./admin/order/refuse`,
        refuseObj)
    }
}
/**
 * 销售门店服务人员管理相关接口
 */
export const sale_staffRequest = {
    /**
     * 销售创建服务人员
     */
    createStaffBySeller(obj){
        return axios.post(`./admin/staff/createStaffBySeller`,
            Object.assign({}, obj)
        )
    },
    /**
     * 修改服务人员接单状态
     */
    changeWorkingStatus(obj){
        return axios.post(`./admin/staff/changeWorkingStatus`,
            Object.assign({}, obj)
        )
    }
}
/**
 * 订单中的合同处理接口
 */
export const sale_orderContractRequest = {
    /**
     * 终止合同
     */
    stopContract(){
        return axios.post(``)
    },
    /**
     * 结算工资
     */
    settleWage(){
        return axios.post(``)
    }
}

export default {
    ...sale_orderApplyRequest,
    ...sale_orderRequest,
    ...sale_matchServiceRequest,
    ...sale_staffRequest,


    /**
     * 签约前、售后日志
     */
    writeOrderLog(obj){
        return axios.post(`./admin/order/writeOrderLog`,
            Object.assign({}, obj)
        )
    },
}





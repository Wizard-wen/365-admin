/**
 * 订单相关接口
 */
export default {
    /**
     * 运营创建订单
     */
    createOrder(orderParamObj){
        return axios.post(`./admin/order/createOrder`,{
            ...orderParamObj
        })
    },
    /**
     * 获取订单列表
     * @param type 
     */
    getOrderList(type, orderDeafultQueryObject){

        if(type == 1){
            return axios.post(
                `./admin/order/getOrderList`,{
                    ...store.state.operateModule.orderList,
                }
            )
        }else if(type == 2){
            return axios.post(
                `./admin/order/getOrderList`,{
                    ...store.state.saleModule.publicOrderList,
                }
            )
        } else if(type == 3){
            return axios.post(
                `./admin/order/getOrderList`,{
                    ...store.state.saleModule.saleOrderList,
                    ...orderDeafultQueryObject,
                }
            )
        }
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
        return axios.post(`./admin/order/editOrder`,
        editObj)
    },
    /**
     * 终止订单
     */
    cancelOrder(obj){
        return axios.post(`./admin/order/cancelOrder`,
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
    /**
     * 添加订单候选人
     * @param orderStaffObj
     */
    createOrderStaff(orderStaffObj){
        return axios.post(`./admin/order/createOrderStaff`,{
            ...orderStaffObj,
        })
    },
    /**
     * 删除订单候选人
     * @param orderStaffObj
     */
    deleteOrderStaff(orderStaffObj){
        return axios.post(`./admin/order/deleteOrderStaff`,{
            ...orderStaffObj,
        })
    },
    /**
     * 拒绝订单候选人
     * @param refuseObj
     */
    refuse(refuseObj){
        return axios.post(`./admin/order/refuse`,{
            ...refuseObj,
        })
    },
}
/**
 * 订单模块接口
 */
import axios from 'axios'
export default {
    /**
     * 获取订单列表
     */
    getOrderList(tableOption){
        let baseUrl = `./api/admin/order/getOrderList?pageNumber=${tableOption.pageNumber}&page=${tableOption.currentPage}`
        if(tableOption.searchSelect.length){
            tableOption.searchSelect.forEach((item, index) => {
                baseUrl += `&${item.key}=${item[item.key]}`
            });
        }
        return axios.get(baseUrl)
    },
    /**
     * 创建订单
     * @param obj 新订单表单字段
     */
    createOrder(obj){
        return axios.post(`./api/admin/order/createOrder`,
            Object.assign({}, obj)
        )
    },
    /**
     * 获取订单信息
     */
    getOrder(id){
        return axios.get(`./api/admin/order/getOrder?id=${id}`)
    },
    /**
     * 编辑订单
     * @param obj 编辑表单字段
     */
    editOrder(obj){
        return axios.post(`./api/admin/order/editOrder`,
            Object.assign({}, obj)
        )
    },
    /**
     * 添加候选人
     * @param obj 候选人字段信息
     */
    createOrderStaff(obj){
        return axios.post(`./api/admin/order/createOrderStaff`,
            Object.assign({}, obj)
        )
    },
    /**
     * 删除候选人
     * @param id 候选人id
     */
    deleteOrderStaff(id){
        return axios.post(`./api/admin/order/deleteOrderStaff`,
            {id: id}
        )
    },
    /**
     * 签约
     */
    sign(obj){
        return axios.post(`./api/admin/order/sign`,
            Object.assign({}, obj)
        )
    },
    /**
     * 拒签
     */
    refuse(obj){
        return axios.post(`./api/admin/order/refuse`,
            Object.assign({}, obj)
        )
    },
    /**
     * 签约日志
     */
    writeSignLog(obj){
        return axios.post(`./api/admin/order/writeSignLog`,
            Object.assign({}, obj)
        )
    },
    /**
     * 售后日志
     */
    writeMaintainLog(obj){
        return axios.post(`./api/admin/order/writeMaintainLog`,
            Object.assign({}, obj)
        )
    },
    /**
     * 取消订单
     */ 
    cancelOrder(obj){
        return axios.post(`./api/admin/order/cancelOrder`,
            Object.assign({}, obj)
        )
    },
    /**
     * 完成订单
     */ 
    completeOrder(obj){
        return axios.post(`./api/admin/order/completeOrder`,
            Object.assign({}, obj)
        )
    }
}
/**
 * 订单信息
 */
export default {
    /**
     * 获取订单信息
     * @param type 订单种类
     */
    getOrderList(type){ 
        let orderList = []
        orderList = [
            {
                orderState: 1,
                date: "2018-7-12 09:11",
                icon: "",
            },
            {
                orderState: 1,
                date: "2018-7-12 09:11",
                icon: "",
            },
            {
                orderState: 1,
                date: "2018-7-12 09:11",
                icon: "",
            },
            {
                orderState: 1,
                date: "2018-7-12 09:11",
                icon: "",
            },
            {
                orderState: 1,
                date: "2018-7-12 09:11",
                icon: "",
            },
            {
                orderState: 1,
                date: "2018-7-12 09:11",
                icon: "",
            },
        ]
        return Promise.resolve(orderList)
    },
    /**
     * 订单排序
     */
}

import axios from 'axios'


import {api_order} from './api_order'



export const apiRequestOrder:api_order = {
    /**
	 * 客户端订单列表
	 */
	getClientRequireList(queryObject){
		return axios.post(`./admin/order/getRequireList`,{
			...queryObject,
		})
	},
	/**
	 * 客户端订单详情
	 * @param id 订单id
	*/
	getClientRequire(id){
		return axios.get(`./admin/order/getRequire?id=${id}`)
	},
	/**
	 * 客户端订单编辑
	 * @param obj 编辑对象
	*/
	editClientRequire(obj){
		return axios.post(`./admin/order/editRequire`,{
			...obj
		})
	},
	/**
	 * 客户端改变客户意向动态
	*/
	changeRequireType(sendObj){
		return axios.post(`./admin/order/changeRequireType`,{
			...sendObj,
		})
    },
    

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
    getContractList(obj){
        return axios.post(`./admin/order/getContractList`,{
            ...obj
        })
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
    },



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
    getApplicationList(obj){
        return axios.post(`./admin/order/applicationList`,{
            ...obj,
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
    getOrderList(obj){
        return axios.post(
            `./admin/order/getOrderList`,{
                ...obj,
            }
        )
    },
    /**
     * 获取订单信息
     * @param id 订单id
     */
    getOrder(id){
        return axios.get(`./admin/order/getOrder?id=${id}`)
    },
    /**
     * 编辑订单详情字段
     * @param editObj 编辑对象 
     */
    editOrder(editObj){
        return axios.post(`./admin/order/editOrder`,{
            ...editObj
        })
    },
    /**
     * 终止订单
     */
    cancelOrder(obj){
        return axios.post(`./admin/order/cancelOrder`,{
            ...obj,
        })
    },
    /**
     * 派发订单
     */
    assignOrder(obj){
        return axios.post(`./admin/order/assignOrder`,{
            ...obj,
        })
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


    /**
     * 获取空合同列表
     */
    getVoidContractList(obj){
        return axios.post(`./admin/order/getVoidContractList`,{
            ...obj,
        })
    },
    /**
     * 创建空合同列表
     * @param paramObj
     */
    createVoidContract(paramObj){
        return axios.post(`./admin/order/createVoidContract`,{
            ...paramObj,
        })
    },
    /**
     * 分派空合同列表
     * @param paramObj
     */
    assignVoidContract(paramObj){
        return axios.post(`./admin/order/assignVoidContract`,{
            ...paramObj,
        })
    },
    /**
     * 签约时，销售的空合同
     */
    getManagerVoidContractSelection(){
        return axios.get(`./admin/order/getManagerVoidContractSelection`)
    },


    /**
     * 签约前、售后日志
     */
    writeOrderLog(obj){
        return axios.post(`./admin/order/writeOrderLog`,{
            ...obj
        })
    },
    //空合同排重
    checkVoidContract(getCheckVoidContractForm:any){
        return axios.post(`./admin/order/checkVoidContract`,{
            ...getCheckVoidContractForm,
        })
    }
}



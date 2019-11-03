/**
 * 订单及合同接口集合
 */

//客户端订单申请
import clientRequireRequest from './clientRequireRequest.js'
//门店订单申请
import  orderApplyRequest from './orderApplyRequest.js'
//订单接口
import  orderRequest from './orderRequest.js'
//合同接口
import  contractRequest from './contractRequest.js'
//空合同接口
import  voidContractRequest from './voidContractRequest.js'




export const orderModuleRequest = {
    ...clientRequireRequest,
    ...contractRequest,
    ...orderApplyRequest,
    ...orderRequest,
    ...voidContractRequest,
}
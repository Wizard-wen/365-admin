/**
 * 运营模块
 */
import operateRequest from './request/operateRequest.js'
import {store} from '../../common'

/**
 * 运营订单申请service
 */
export const operate_orderApplyRequest = {
    /**
     * 订单申请列表
     */
    getApplicationList(){
        return operateRequest.getApplicationList()
    },
    /**
     * 通过或拒绝订单申请
     */
    dealApplication(sendObj){
        return operateRequest.dealApplication(sendObj)
    },
    /**
     * 订单申请详情
     */
    getApplication(id){
        return operateRequest.getApplication(id)
    },
    /**
     * 订单申请字段修改
     */
    editApplication(changeObj){
        return operateRequest.editApplication(changeObj)
    },
    /**
     * 订单申请来源修改
     */
    editAppLySource(changeObj){
        return operateRequest.editAppLySource(changeObj)
    },

}

/**
 * 运营中心公共接口
 */
export const operate_publicRequest = {
    /**
     * 获取全部门店列表
     */
    getStoreSelection(){
        return operateRequest.getStoreSelection()
    },
    /**
     * 获取全部门店列表
     * @param store_id 门店id
     */
    getStoreManagerSelection(store_id){
        return operateRequest.getStoreManagerSelection(store_id)
    },
    /**
     * 获取所有员工列表
     */
    getManagerSelection(){
        return operateRequest.getManagerSelection()
    },
    /**
     * 服务人员标签配置数据
     */
    getWorkerFormConfig(type){
        return operateRequest.getWorkerFormConfig(type)
    },
    /**
     * 编辑服务人员标签信息配置
     */
    editWorkerFormConfig(obj){
        return operateRequest.editWorkerFormConfig(obj)
    },
    /**
     * 请求订单标签配置数据
     */
    getOrderFormConfig(){
        return operateRequest.getOrderFormConfig()
    },
    /**
     * 请求订单申请标签配置数据
     */
    getApplyFormConfig(){
        return operateRequest.getApplyFormConfig()
    },
    /**
     * 获取证书列表
     */
    getPaperSelection(type = ''){
        return operateRequest.getPaperSelection(type)
    },
}

/**
 * 运营中心服务人员信息接口
 */
export const operate_staffRequest = {
    /**
     * 获取员工列表
     * @param type 列表类别
     */
    getStaffList(type){
        return operateRequest.getStaffList(type)
    },
    /**
     * 获取人员信息
     * @param id 员工id
     */
    getStaff(id){
        return operateRequest.getStaff(id)
    },
    /**
     * 编辑员工
     * @param obj 参考staffItem.ts
     */
    editStaff(obj){
        return operateRequest.editStaff(obj)
    },
    /**
     * 姓名查重
     */
    checkStaffName(id, name){
        return operateRequest.checkStaffName(id, name)
    },
    /**
     * 停用服务人员
     */
    changeStaffType(id, version){
        return operateRequest.changeStaffType(id, version)
    },
    /**
     * 单个服务人员添加回访
     */
    addReturnStaffSingle(id){
        return operateRequest.addReturnStaffSingle(id)
    },
    /**
     * 多个回访人员到回访列表
     */
    addReturnStaff(){
        let obj = store.state.operateModule.queryedList
        return operateRequest.addReturnStaff(obj)
    },
    /**
     * 获取可回访人员数量
     */
    getReturnStaff(){
        //设置回访count查询参数
        store.commit('setWorkerList', {
            queryKey: 'count',
            queryedList: 0
        })
        let obj = store.state.operateModule.queryedList
        return operateRequest.getReturnStaff(obj)
    },
    /**
     * 恢复全部回访人员
     */
    removeReturnStaff(){
        return operateRequest.removeReturnStaff()
    },

    /**
     * 删除申请添加服务人员
     */
    deleteApplyStaff(id){
        return operateRequest.deleteApplyStaff(id)
    },
    /**
     * 提交新申请服务人员 / 恢复异常服务人员 / 导出回访人员
     * @param module  apply warning return
     * @param from list 从列表提交 还是从编辑详情提交
     * @param id 服务人员id
     */
    agreeStaffSingle(module_type, from, id){
        return operateRequest.agreeStaffSingle(module_type, from,id)
    },
}

/**
 * 运营中心客户端订单接口
 */
export const operate_clientRequest = {
    /**
     * 客户端订单列表
     */
    getClientRequireList(){
      return operateRequest.getClientRequireList()
    },
    /**
     * 客户端订单详情
     * @param id 订单id
    */
   getClientRequire(id){
    return operateRequest.getClientRequire(id)
    },
    /**
     * 客户端订单编辑
     * @param obj 编辑对象
    */
    editClientContract(obj){
      return operateRequest.editClientContract(obj)
    }
}

/**
 * 获取商品信息
 */
export const operate_serviceGood = {
    /**
     * 获取所有商品信息树
     */
    getServiceTree(){
        return operateRequest.getServiceTree()
    },
    /**
     * 获取单个服务信息
     * @param id 服务的id
     */
    getService(id){
        return operateRequest.getService(id)
    },
    /**
     * 获取服务下拉框
     */
    getServiceSelection(){
        return operateRequest.getServiceSelection()
    },
    /**
     * 编辑服务信息
     * @param serviceObj 服务信息对象
     */
    editService(serviceObj){
        return operateRequest.editService(serviceObj)
    }
}
/**
 * 运营中心空合同、合同接口
 */
export const operate_contract = {
    /**
     * 获取空合同列表
     */
    getVoidContractList(){
        return operateRequest.getVoidContractList()
    },
    /**
     * 创建空合同列表
     * @param paramObj
     */
    createVoidContract(paramObj){
        return operateRequest.createVoidContract(paramObj)
    },
    /**
     * 分派空合同列表
     * @param paramObj
     */
    assignVoidContract(paramObj){
        return operateRequest.assignVoidContract(paramObj)
    },
    /**
     * 签约时，销售的空合同
     */
    getManagerVoidContractSelection(){
        return operateRequest.getManagerVoidContractSelection()
    }
}
export default {
    ...operate_orderApplyRequest,
    ...operate_publicRequest,
    ...operate_staffRequest,
    ...operate_serviceGood,
    ...operate_clientRequest,
    ...operate_contract,
}

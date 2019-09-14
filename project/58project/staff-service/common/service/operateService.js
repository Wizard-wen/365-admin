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
 * 门店、门店经纪人信息接口
 */
export const operate_storeRequest = {
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

export default {
    ...operate_orderApplyRequest,
    ...operate_storeRequest,
    ...operate_staffRequest,
    ...operate_serviceGood,











    /************************************通用模块****************************************** */
      /**
     * 获取能力标签树
     */
    getAbilityTree(type = ''){
        return operateRequest.getAbilityTree(type)
    },
    /**
     * 获取证书列表
     */
    getPaperSelection(type = ''){
        return operateRequest.getPaperSelection(type)
    },
    /**
     * 获取技能树
     */
    getSkillTree(type = ''){
        return operateRequest.getSkillTree(type)
    },
    /**
     * 省市区数据获取
     */
    getAreaTree(){
        return operateRequest.getAreaTree()
    },
    /**
     * 人员信息配置
     */
    getFormConfig(type){
        return operateRequest.getFormConfig(type)
    },
    /**
     * 标签信息配置
     */
    editFormConfig(obj){
        return operateRequest.editFormConfig(obj)
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

/**
 * 人力资源及技能管理模块
 */
import hrRequest from './request/hrRequest.js'
import {store} from '../../common'
export default {
    /**
     * 获取员工列表
     * @param type 列表类别
     */
    getStaffList(type){
        return hrRequest.getStaffList(type)
    },
    /**
     * 获取人员信息
     * @param id 员工id
     */
    getStaff(id){
        return hrRequest.getStaff(id)
    },
    /**
     * 创建、编辑员工信息
     * @param obj
     */
    editStaff(obj){
        return hrRequest.editStaff(obj)
    },
    /**
     * 姓名查重
     */
    checkStaffName(id, name){
        return hrRequest.checkStaffName(id, name)
    },
    /**
     * 停用服务人员
     */
    changeStaffStatus(id, version){
        return hrRequest.changeStaffStatus(id, version)
    },




    /************************************通用模块****************************************** */
      /**
     * 获取能力标签树
     */
    getAbilityTree(type = ''){
        return hrRequest.getAbilityTree(type)
    },
    /**
     * 获取证书列表
     */
    getPaperSelection(type = ''){
        return hrRequest.getPaperSelection(type)
    },
    /**
     * 获取技能树
     */
    getSkillTree(type = ''){
        return hrRequest.getSkillTree(type)
    },
    /**
     * 省市区数据获取
     */
    getAreaTree(){
        return hrRequest.getAreaTree()
    },
    /**
     * 人员信息配置
     */
    getFormConfig(){
        return hrRequest.getFormConfig()
    },
    /**
     * 标签信息配置
     */
    editFormConfig(obj){
        return hrRequest.editFormConfig(obj)
    },

    /**
     * 单个服务人员添加回访
     */
    addReturnStaffSingle(id){
        return hrRequest.addReturnStaffSingle(id)
    },
    /**
     * 多个回访人员到回访列表
     */
    addReturnStaff(){
        let obj = store.state.hrModule.queryedList
        return hrRequest.addReturnStaff(obj)
    },
    /**
     * 获取可回访人员数量
     */
    getReturnStaff(){
        //设置回访count查询参数
        store.commit('setQueryList', {
            queryKey: 'count', 
            queryedList: 0
        })
        let obj = store.state.hrModule.queryedList
        return hrRequest.getReturnStaff(obj)
    },
    /**
     * 恢复全部回访人员
     */
    removeReturnStaff(){
        return hrRequest.removeReturnStaff()
    },
    /**
     * 恢复全部回访人员
     */
    removeReturnStaff(){
        return hrRequest.removeReturnStaff()
    },

    /**
     * 删除申请添加服务人员
     */
    deleteApplyStaff(id){
        return hrRequest.deleteApplyStaff(id)
    },
    /**
     * 提交新申请服务人员 / 恢复异常服务人员 / 导出回访人员 
     * @param module  apply warning return 
     * @param from list 从列表提交 还是从编辑详情提交
     * @param id 服务人员id
     */
    agreeStaffSingle(module_type, from, id){
        return hrRequest.agreeStaffSingle(module_type, from,id)
    },
}

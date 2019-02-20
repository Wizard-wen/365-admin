/**
 * 人力资源及技能管理模块
 */
import hrRequest from './request/hrRequest.js'
export default {
    /**
     * 获取员工列表
     */
    getStaffList(){
        return hrRequest.getStaffList()
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
     * 获取技能列表
     */
    getStaffSkillList(){
        return hrRequest.getStaffSkillList()
    },
}
/**
 * 人力资源及技能管理模块
 */
import hrRequest from './request/hrRequest.js'
export default {
    /**
     * 获取员工列表
     */
    getStaffList(tableOption){
        return hrRequest.getStaffList(tableOption)
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




    /****************************技能列表模块****************************************/
    /**
     * 技能分类接口
     */
    getCategoryList(tableOption){
        return hrRequest.getCategoryList(tableOption)
    },
    /**
     * 请求某一具体技能接口
     * @param id 技能的id
     */
    getCategory(id){
        return hrRequest.getCategory(id)
    },
    /**
     * 编辑技能接口
     */
    editCategory(obj){
        return hrRequest.editCategory(obj)
    },

    /*****************************能力标签模块******************************************************* */
    /**
     * 能力标签列表接口
     */
    getAbilityList(tableOption){

        return hrRequest.getAbilityList(tableOption)
    },
    /**
     * 请求某一具体能力标签接口
     * @param id 能力标签的id
     */
    getAbility(id){
        return hrRequest.getAbility(id)
    },
    /**
     * 编辑能力标签接口
     */
    editAbility(obj){

        return hrRequest.editAbility(obj)

    },
    /*****************************证书模块******************************************************* */
    /**
     * 证书列表接口
     */
    getPaperList(tableOption){

        return hrRequest.getPaperList(tableOption)
    },
    /**
     * 请求某一证书接口
     * @param id 证书的id
     */
    getPaper(id){
        return hrRequest.getPaper(id)
    },
    /**
     * 编辑证书接口
     */
    editPaper(obj){

        return hrRequest.editPaper(obj)

    },
}

/**
 * 人力资源接口
 */
import axios from 'axios'
export default {
    /**
     * 获取员工列表
     */
    getStaffList(tableOption){
        let baseUrl = `./api/admin/staff/getStaffList?pageNumber=${tableOption.pageNumber}&page=${tableOption.currentPage}`
        if(tableOption.searchSelect.length){
            tableOption.searchSelect.forEach((item, index) => {
                baseUrl += `&${item.key}=${item[item.key]}`
            });
        }
        return axios.get(baseUrl)
    },
    /**
     * 获取人员信息
     * @param id 员工id
     */
    getStaff(id){
        let baseUrl = `./api/admin/staff/getStaff` 
        if(id){
            baseUrl += `?id=${id}`
        }
        return axios.get(baseUrl)
    },
    /**
     * 编辑员工
     * @param id | int | 非必填 | 员工id |
     * @param name |string|必填|姓名|
     * @param phone |string|必填|手机号|
     * @param age |int|必填|年龄|
     * @param address |string|必填|地址|
     * @param bank_card |string|必填|银行卡号|
     * @param version |int|必填|操作版本号|
     * @param labels |对象数组|非必填|能力标签|
     * @param papers |对象数组|非必填|证书|
     * @param skills |对象数组|非必填|技能|
     */
    editStaff(obj){
        obj = Object.assign({},obj)
        return axios.post(`./api/admin/staff/editStaff`,obj)
    },
    /**
     * 获取技能列表
     */
    getStaffSkillList(){
        return axios.get(`./api/admin/staff/getStaffSkillList`)
    },
    /**
     * 审核技能
     */
    reviewStaffSkill(){
        return axios.get(`./api/admin/staff/reviewStaffSkill`)
    },
    /**
     * 删除技能
     */
    deleteStaffSkill(id, version){
        return axios.post(`./api/admin/staff/deleteStaffSkill`,{
            id: id,
            version: version
        })
    },
    /**
     * 省市区数据
     */
    getAreaTree(){
        return axios.get(`./api/admin/common/getAreaTree`)
    },

    /****************************************************************/
    /**
     * 技能分类接口
     */
    getCategoryList(tableOption){
        let baseUrl = `./api/admin/service/getCategoryList?pageNumber=${tableOption.pageNumber}&page=${tableOption.currentPage}`
        if(tableOption.searchSelect.length){
            tableOption.searchSelect.forEach((item, index) => {
                baseUrl += `&${item.key}=${item[item.key]}`
            });
        }
        return axios.get(baseUrl)
    },
    /**
     * 请求某一具体技能接口
     * @param id 技能的id
     */
    getCategory(id){
        return axios.get(`./api/admin/service/getCategory?id=${id}`)
    },
    /**
     * 编辑技能接口
     */
    editCategory(obj){
        
        obj = Object.assign({},obj)

        return axios.post(`./api/admin/service/editCategory`,obj)
    
    },
}
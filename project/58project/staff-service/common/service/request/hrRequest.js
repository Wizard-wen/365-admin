/**
 * 人力资源接口
 */
import axios from 'axios'
export default {
    /**
     * 获取员工列表
     */
    getStaffList(){
        return axios.get(`./api/admin/staff/getStaffList?page=1`)
    },
    /**
     * 获取人员信息
     * @param id 员工id
     */
    getStaff(id){
        return axios.post(`./api/admin/staff/getStaff`, {
            id: id
        })
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
        return axios.get(`./api/admin/getAreaTree`)
    }
}
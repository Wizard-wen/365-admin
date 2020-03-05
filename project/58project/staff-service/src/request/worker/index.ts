
import {api_worker} from './api_worker'
import axios from 'axios'

export const apiRequestWorker:api_worker =  {
    getOperateWorkBench(id) {
        return axios.get(`./admin/staff/workBench?id=${id}`)
    },
    /**
     * 获取员工列表
     * @param queryObject 
     */
    getStaffList(queryObject){
        return axios.post(`./admin/staff/getStaffList`,queryObject)
    },
    /**
     * 获取人员信息
     * @param id 员工id
     */
    getStaff(id){
        return axios.get(`./admin/staff/getStaff?id=${id}`)
    },
    /**
     * 编辑员工
     * @param queryObject 参考staffItem.ts
     */
    editStaff(queryObject){
        return axios.post(`./admin/staff/editStaff`,{
            ...queryObject,
        })
    },
    /**
     * 姓名查重
     */
    checkStaffName(id, name){
        return axios.post(`./admin/staff/checkStaffName`, {
            name,
            id,
        })
    },
     /**
     * 手机号查重
     */
    checkStaffPhone(id, phone){
        return axios.post(`./admin/staff/checkStaffPhone`,{
            phone,
            id,
        })
    },
    /**
     *  改变服务人员状态
     */
    changeStaffType(id, version){
        return axios.post(`./admin/staff/changeStaffType`, {
            version: version,
            id: id
        })
    },
    /**
     * 单个服务人员添加回访
     */
    addReturnStaffSingle(id){
        return axios.post(`./admin/staff/addReturnStaffSingle`,{id: id})
    },
    /**
     * 多个回访人员到回访列表
     */
    addReturnStaff(obj){
        return axios.post(`./admin/staff/addReturnStaff`,{...obj})
    },
    /**
     * 获取可回访人员数量
     */
    getReturnStaff(obj){
        return axios.post(`./admin/staff/getReturnStaff`,{...obj})
    },
    /**
     * 恢复全部回访人员
     */
    removeReturnStaff(){
        return axios.post(`./admin/staff/removeReturnStaff`,{})
    },
    /**
     * 删除申请添加服务人员
     */
    deleteApplyStaff(id){
        return axios.post(`./admin/staff/deleteApplyStaff`,{id,})
    },

    /**
     * 提交新申请服务人员 / 恢复异常服务人员 / 导出回访人员
     * @param module  apply warning return
     * @param from list 从列表提交 还是从编辑详情提交
     * @param id 若是from=list id为人员id  若是from=edit id是服务人员信息object
     */
    agreeStaffSingle(module_type, from, id){
        if(from == 'list'){
            return axios.post(`./admin/staff/agreeStaffSingle`,{
                module: module_type,
                from,
                id,
            })
        } else {
            let obj = {
                module: module_type,
                from,
                id,
            }
            return axios.post(`./admin/staff/agreeStaffSingle`,{
                ...obj
            })
        }

    },
    /**
     * 销售创建服务人员
     */
    createWorkerBySeller(obj){
        return axios.post(`./admin/staff/createStaffBySeller`,{
            ...obj,
        })
    },
    /**
     * 修改服务人员接单状态
     */
    changeWorkingStatus(obj){
        return axios.post(`./admin/staff/changeWorkingStatus`,{
            ...obj,
        })
    }
}
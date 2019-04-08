import employeeRequest from './request/employeeRequest.js'
import Axios from '../../node_modules/axios';

export default {
    /**
     * 获取公司内部员工列表
     * @param obj 搜索字段
     */
    getEmployeeList(obj){
        return employeeRequest.getEmployeeList(obj)
    },
    /**
     * 请求某一员工信息
     */
    getEmployee(id){
        return employeeRequest.getEmployee(id)
    },
    /**
     * 编辑公司内部员工信息
     * @param obj 员工信息字段
     */
    editEmployeeItem(obj){
        return employeeRequest.editEmployeeItem(obj)
    }
}
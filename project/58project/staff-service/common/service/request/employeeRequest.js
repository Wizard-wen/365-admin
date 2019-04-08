
/**
 * 公司内部员工接口
 */
import axios from 'axios'

export default {
    /**
     * 获取公司内部员工列表
     * @param obj 搜索字段
     */

    getEmployeeList(tableOption){
        let baseUrl = `./admin/employee/getEmployeeList?pageNumber=${tableOption.pageNumber}&page=${tableOption.currentPage}`
        if(tableOption.searchSelect.length){
            tableOption.searchSelect.forEach((item, index) => {
                baseUrl += `&${item.key}=${item[item.key]}`
            });
        }
        return axios.get(baseUrl)
    },
    /**
     * 请求某一员工接口
     * @param id 员工的id
     */
    getEmployee(id){
        return axios.get(`./admin/employee/getEmployee?id=${id}`)
    },
    /**
     * 编辑公司内部员工信息
     * @param obj 员工信息字段
     */
    editEmployeeItem(obj){
        return axios.post(`./admin/employee/editEmployeeItem`,{
            ...obj
        })
    }
}
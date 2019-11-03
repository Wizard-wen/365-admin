

export default {
    /**
     * 获取全部门店列表
     */
    getStoreSelection(){
        return axios.get(`./admin/common/getStoreSelection`)
    },
    /**
     * 获取某个门店员工列表
     * @param store_id 门店id
     */
    getStoreManagerSelection(store_id){
        return axios.get(`./admin/common/getStoreManagerSelection?store_id=${store_id}`)
    },
    /**
     * 获取所有员工列表
     */
    getManagerSelection(){
        return axios.get(`./admin/common/getManagerSelection`)
    },
    /**
     * 获取某个部门的全部员工
     */
    getDepartmentManagerSelection(department_id){
        return axios.get(`./admin/common/getDepartmentManagerSelection?department_id=${department_id}`)
    },
    /**
     * 请求服务人员标签配置数据
     * @param type config
     */
    getWorkerFormConfig(type){
        return axios.get(`./admin/formConfig/getWorkerFormConfig?get_for=${type}`)
    },
    /**
     * 标签信息配置
     */
    editWorkerFormConfig(obj){
        return axios.post('./admin/formConfig/editWorkerFormConfig',{
            ...obj
        })
    },
    /**
     * 请求订单标签配置数据
     */
    getOrderFormConfig(){
        return axios.get(`./admin/formConfig/getOrderFormConfig`)
    },
    /**
     * 请求订单申请标签配置数据
     */
    getApplyFormConfig(){
        return axios.get(`./admin/formConfig/getApplyFormConfig`)
    },
    /**
     * 获取证书列表
     */
    getPaperSelection(type){
        if (type) {
            return axios.get(`./admin/common/getPaperSelection?type=${type}`)
        } else {
            return axios.get(`./admin/common/getPaperSelection`)
        }
    },
}
/**
 * 人力资源接口
 */
import axios from 'axios'

export default {
    /**
     * 订单申请列表 
     */
    getApplicationList(){
        return axios.get(`./admin/order/applicationList`)
    },
    /**
     * 通过或拒绝订单申请
     */
    dealApplication(type){
        return axios.get(`./admin/order/dealApplication?type=${type}`)
    },
    /**
     * 订单申请详情
     */
    getApplication(id){
        return axios.get(`./admin/order/getApplication?id=${id}`)
    },
    /**
     * 订单申请字段修改
     */
    editApplication(changeObj){
        return axios.post(`./admin/order/editApplication`,{
            ...changeObj
        })
    },
    /**
     * 订单申请来源修改
     */
    editAppLySource(changeObj){
        return axios.post(`./admin/order/editAppLySource`,{
            ...changeObj
        })
    },
    /**
     * 获取全部门店列表
     */
    getStoreSelection(){
        return axios.get(`./admin/common/getStoreSelection`)
    },
    /**
     * 获取全部门店列表
     * @param store_id 门店id
     */
    getStoreManagerSelection(store_id){
        return axios.get(`./admin/common/getStoreManagerSelection?store_id=${store_id}`)
    },
    







    /**
     * 获取员工列表
     * @param type 列表类别
     */
    getStaffList(type){
        let baseUrl = `./admin/staff/getStaffList`;
        if(type == 0){
            return axios.post(
                baseUrl,
                store.state.hrModule.queryedList
            )
        }else if(type == 1){
            return axios.post(
                baseUrl,
                store.state.hrModule.returnList
            )
        } else if(type == 2){
            return axios.post(
                baseUrl,
                store.state.hrModule.errorList
            )
        } else if(type == 3){
            return axios.post(
                baseUrl,
                store.state.hrModule.newList
            )
        } else if(type == 4){
            return axios.post(
                baseUrl,
                store.state.hrModule.sellerList
            )
        }
    },
    /**
     * 获取人员信息
     * @param id 员工id
     */
    getStaff(id){
        let baseUrl = `./admin/staff/getStaff`
        if(id){
            baseUrl += `?id=${id}`
        }
        return axios.get(baseUrl)
    },
    /**
     * 编辑员工
     * @param obj 参考staffItem.ts
     */
    editStaff(obj){
        obj = Object.assign({},obj)
        return axios.post(`./admin/staff/editStaff`,obj)
    },
    
    /**
     * 姓名查重
     */
    checkStaffName(id, name){
        return axios.post(`./admin/staff/checkStaffName`, {
            name: name,
            id: id
        })
    },






    /**
     *  改变订单状态
     */
    changeStaffType(id, version){
        return axios.post(`./admin/staff/changeStaffType`, {
            version: version,
            id: id
        })
    },

    /********************************通用模块**************************************88 */
    /**
     * 获取能力标签树
     */
    getAbilityTree(type){
        if (type) {
            return axios.get(`./admin/common/getLabelTree?type=${type}`)
        } else {
            return axios.get(`./admin/common/getLabelTree`)
        }
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
    /**
     * 获取技能树
     */
    getSkillTree(type){
        if (type) {
            return axios.get(`./admin/common/getServiceTree?type=${type}`)
        } else {
            return axios.get(`./admin/common/getServiceTree`)
        }
    },
    /**
     * 省市区数据
     */
    getAreaTree(){
        return axios.get(`./admin/common/getAreaTree`)
    },
    /**
     * 请求标签配置数据
     * @param type config 
     */
    getFormConfig(type){
        return axios.get(`./admin/formConfig/getFormConfig?get_for=${type}`)
    },
    /**
     * 标签信息配置
     */
    editFormConfig(obj){
        return axios.post('./admin/formConfig/editFormConfig',{
            ...obj
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
                ...id
            }
            return axios.post(`./admin/staff/agreeStaffSingle`,{
                ...obj
            })
        }

    },

}




/**
 * 运营接口
 */

import axios from 'axios'



/**
 * 运营工作台
 */
export const operate_workstation = {
    getOperateWorkBench(id){
        return axios.get(`./admin/staff/workBench?id=${id}`)
    }
}


/**
 * 运营中心客户端订单接口
 */
export const operate_clientRequest = {
  /**
   * 客户端订单列表
   */
  getClientRequireList(){
    return axios.post(`./admin/order/getRequireList`,store.state.operateModule.clientRequire)
  },
  /**
   * 客户端订单详情
   * @param id 订单id
  */
  getClientRequire(id){
    return axios.get(`./admin/order/getRequire?id=${id}`)
  },
  /**
   * 客户端订单编辑
   * @param obj 编辑对象
  */
 editClientRequire(obj){
    return axios.post(`./admin/order/editRequire`,{...obj})
  },
  /**
   * 客户端改变客户意向动态
   * @param id
   * @param type 状态 （待处理：1，拒绝：2，通过：3）
  */
 changeRequireType(id,type){
    return axios.post(`./admin/order/changeRequireType`,{id:id,type:type})
  },
}
/**
 * 运营订单申请接口
 */
export const operate_orderApplyRequest = {
    /**
     * 订单申请列表
     */
    getApplicationList(){
        return axios.post(
            `./admin/order/applicationList`,
            store.state.operateModule.orderApplyList
        )
    },
    /**
     * 通过或拒绝订单申请
     */
    dealApplication(sendObj){
        return axios.post(`./admin/order/dealApplication?`,{
            ...sendObj,
        })
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
}
/**
 * 运营中心公共接口
 */
export const operate_publicRequest = {
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
/**
 * 运营中心服务人员信息接口
 */
export const operate_staffRequest = {
    /**
     * 获取员工列表
     * @param type 列表类别
     */
    getStaffList(type){
        let baseUrl = `./admin/staff/getStaffList`;

        if(type == 0){
            return axios.post(
                baseUrl,
                store.state.operateModule.workerList
            )//全部服务人员列表
        }else if(type == 1){
            return axios.post(
                baseUrl,
                store.state.operateModule.returnWorkerList
            )//回访服务人员列表
        } else if(type == 2){
            return axios.post(
                baseUrl,
                store.state.operateModule.errorWorkerList
            )//异常服务人员列表
        } else if(type == 3){
            return axios.post(
                baseUrl,
                store.state.operateModule.newWorkerList
            )//新服务人员审核列表
        } else if(type == 4){
            return axios.post(
                baseUrl,
                store.state.saleModule.saleWorkerList
            )
        } else if(type == 5){
            return axios.post(
                baseUrl,
                store.state.saleModule.matchServiceList
            )
        } else if(type == 6){
            return axios.post(
                baseUrl,
                store.state.saleModule.saleOwnWorkerList
            )
        }
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
     * @param obj 参考staffItem.ts
     */
    editStaff(obj){
        return axios.post(`./admin/staff/editStaff`,{
            ...obj
        })
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
                ...id
            }
            return axios.post(`./admin/staff/agreeStaffSingle`,{
                ...obj
            })
        }

    },
}
/**
 * 获取商品信息
 */
export const operate_serviceGood = {
    /**
     * 获取所有商品信息树
     */
    getServiceTree(){
        return axios.get(`./admin/service/getServiceTree`)
    },
    /**
     * 获取单个服务信息
     * @param id 服务的id
     */
    getService(id){
        return axios.get(`./admin/service/getService?id=${id}`)
    },
    /**
     * 获取服务下拉框
     */
    getServiceSelection(){
        return axios.get(`./admin/service/getServiceSelection`)
    },
    /**
     * 编辑服务信息
     * @param serviceObj 服务信息对象
     */
    editService(serviceObj){
        return axios.post(`./admin/service/editService`,{
            ...serviceObj
        })
    },
    /**
     * 删除服务信息
     */
    deleteService(id){
        return axios.post(`./admin/service/deleteService`, {
            id: id,
        })
    }
}
/**
 * 运营中心空合同、合同接口
 */
export const operate_contract = {
    /**
     * 获取空合同列表
     */
    getVoidContractList(){
        return axios.post(`./admin/order/getVoidContractList`,{
            ...store.state.operateModule.voidContractList
        })
    },
    /**
     * 创建空合同列表
     * @param paramObj
     */
    createVoidContract(paramObj){
        return axios.post(`./admin/order/createVoidContract`,paramObj)
    },
    /**
     * 分派空合同列表
     * @param paramObj
     */
    assignVoidContract(paramObj){
        return axios.post(`./admin/order/assignVoidContract`,paramObj)
    },
    /**
     * 签约时，销售的空合同
     */
    getManagerVoidContractSelection(){
        return axios.get(`./admin/order/getManagerVoidContractSelection`)
    }
}
export default {
    ...operate_orderApplyRequest,
    ...operate_publicRequest,
    ...operate_staffRequest,
    ...operate_serviceGood,
    ...operate_clientRequest,
    ...operate_contract,
    ...operate_workstation,
}

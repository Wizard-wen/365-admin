import {
    apiRequestOrder,
    apiRequestFormConfig,
    apiRequestCommon,
} from '@/request/index.ts'

import {searchContractForm} from '@/public/module/contractList/IcontractList.ts'
import {searchVoidContractForm} from '@/pages/operateContract/voidContractList/IvoidContractList.ts'
export const operateContractService = {
     /**
     * 请求合同列表
     */
    async getOperateContractList(contractQueryForm:searchContractForm){

        return  Promise.all([
            apiRequestOrder.getContractList(contractQueryForm),
            apiRequestFormConfig.getOrderFormConfig(),
        ]).then((data) =>{
            
            return {
                contractConfigForm: {
                    ...data[1].data,
                },
                pagination: {
                    currentPage: data[0].data.current_page, //当前页码
                    total: data[0].data.total, //列表总条数
                    pageNumber: data[0].data.per_page //每页显示数
                },
                contractTable: data[0].data.data
            }
        })
    },
    /**
     * 
     */
    async getOperateContract(id:number){
        return apiRequestOrder.getContract(id)
    },
    /**
     * 
     * @param searchVoidContractForm 
     */
    async getOperateVoidContract(searchVoidContractForm:searchVoidContractForm){
        return Promise.all([
            apiRequestOrder.getVoidContractList(searchVoidContractForm),
            // apiRequestFormConfig.getOrderFormConfig(),
            apiRequestCommon.getDepartmentManagerSelection(4),
        ]).then(data =>{
            return {
                voidContractTable: data[0].data.data,
                //分页信息
                pagination: {
                    currentPage: data[0].data.current_page,
                    total: data[0].data.total,
                    pageNumber: data[0].data.per_page
                },
                // voidContractConfigForm: data[1].data,
                storeManagerList: data[1].data,
            }
        })
    },
    /**
     * 创建空合同
     * @param voidContractForm
     */
    async createVoidContract(voidContractForm:any){
        return apiRequestOrder.createVoidContract(voidContractForm)
    },
    /**
     * 分派空合同
     * @param assignVoidContractForm 
     */
    async assignVoidContract(assignVoidContractForm:any){
        return apiRequestOrder.assignVoidContract(assignVoidContractForm)
    },
    /**
     * 按部门查找员工
     * @param department_id 
     */
    async getDepartmentManagerSelection(department_id:number){
        return apiRequestCommon.getDepartmentManagerSelection(department_id)
    },
    /**
     * 获取配置信息
     */
    getWorkerFormConfig(){
        return apiRequestFormConfig.getWorkerFormConfig('edit')
    },
    //空合同排重
    checkVoidContract(getCheckVoidContractForm:any){
        return apiRequestOrder.checkVoidContract(getCheckVoidContractForm)
    }
}
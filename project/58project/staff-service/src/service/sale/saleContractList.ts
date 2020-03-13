import {
    apiRequestOrder,
    apiRequestFormConfig,
} from '@/request/index'
import {searchContractForm} from '@/public/module/contractList/IcontractList.ts'
export const saleContractListService = {
    /**
     * 请求合同列表
     */
    async getSaleContractList(contractQueryForm:searchContractForm){

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
}
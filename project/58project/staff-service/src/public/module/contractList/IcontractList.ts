

export enum contractModuleType{
    saleContractList = 'saleContractList',
    operateContractList = 'operateContractList',
    saleOrderConfig = 'saleOrderConfig',
    operateOrderConfig = 'operateOrderConfig'
}



export interface baseSearchContractForm{
    page: string;
    pageNumber:string;
}
export interface searchContractForm extends baseSearchContractForm{

    contract_code: string;//合同流水号
    contract_number: string;//合同编号
    sign_at: Array<number>;//签约时间
    sign_manager_id: Array<number>;//经纪人
    status: Array<number>;//合同状态
    sign_user_name: string;//雇主姓名
    sign_user_phone: string;//雇主电话
    sign_staff_name: string;//服务人员姓名
    sign_staff_code: string;//服务人员工号
}

interface searchSaleContractForm {

}


export const contract_typeList = [
    {name: '待执行',id: 1},
    {name: '执行中',id: 2},
    {name: '已终止',id: 3},
]
interface searchSaleContractList {
    contract_code:string;//合同流水号
    contract_number:string;//合同编号


    status: Array<number>;//合同状态
    sign_at: Array<number>;//签约时间 
    sign_manager_id: Array<number>;//签约经纪人
    // 经纪门店默认是当前门店
    sign_store_id: Array<number>,//签约经纪门店

    sign_user_name: string;//雇主
    sign_user_phone:string;//雇主电话

    sign_staff_name:string;//签约家政服务员
    sign_staff_code: string;//签约家政服务员员工号
}

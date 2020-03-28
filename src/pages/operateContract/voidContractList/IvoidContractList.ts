






export interface searchVoidContractForm{
    contract_number:string;
    created_at: Array<number>;
    assign_at: Array<number>;
    type: Array<number>;
    manager_id: Array<number>;
}
/**
 * 空合同信息
 */
export interface voidContractItem {
    contract_number:string;//空合同编号（筛选）
    created_at: string;//空合同创建时间（筛选）
    assign_at:string;//分派时间（筛选）
    /**
     * voidContractTypeList
     */
    type:string;//是否已经签约（筛选）
    manager_id:string;//经纪人id
    manager_name:string;//经纪人名字（筛选）
}


export const voidContractTypeList = [
    {id: 1, name: '空合同'},
    {id: 2, name: '未签约'},
    {id: 3, name: '已签约'},
]
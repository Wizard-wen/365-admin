

export interface api_order {
    //客户端订单列表
    getClientRequireList: {(queryObject:object): Promise<any>},
    // 客户端订单详情
    getClientRequire: {(id:number): Promise<any>},
    // 客户端订单编辑
    editClientRequire: {(obj:object): Promise<any>},
    // 客户端改变客户意向动态
    changeRequireType: {(sendObj:object): Promise<any>},
    
    // 门店申请订单
    applyOrder: {(applyObject:object): Promise<any>},
    // 门店订单申请列表
    getApplicationList: {(obj:object): Promise<any>},
    // 处理订单申请
    dealApplication: {(sendObj:object): Promise<any>},
    // 订单申请详情
    getApplication: {(id:number): Promise<any>},
    // 订单申请字段修改
    editApplication: {(changeObj:object): Promise<any>},
    // 订单申请来源修改
    editAppLySource: {(changeObj:object): Promise<any>},
    
    
    // 签约
    sign: {(signObject:object): Promise<any>},
    // 获取合同列表
    getContractList: {(obj:object): Promise<any>},
    // 获取合同详情
    getContract: {(id:number): Promise<any>},
    // 终止合同
    stopContract: {(paramObj:object): Promise<any>},
    // 结算工资
    settleWage: {(paramObj:object): Promise<any>},
    
    // 获取订单列表
    getOrderList: {(obj:object): Promise<any>},
    // 获取订单信息
    getOrder: {(order_id:number): Promise<any>},
    // 运营创建订单
    createOrder: {(orderParamObj:object): Promise<any>},
    // 编辑订单详情字段
    editOrder: {(editObj:object): Promise<any>},
    // 添加订单候选人
    createOrderStaff: {(orderStaffObj:object): Promise<any>},
    // 删除订单候选人
    deleteOrderStaff: {(orderStaffObj:object): Promise<any>},
    // 拒绝订单候选人
    refuse: {(refuseObj:object): Promise<any>},
    // 终止订单
    cancelOrder: {(obj:object): Promise<any>},
    // 派发订单
    assignOrder: {(obj:object): Promise<any>},
    // 获取空合同列表
    getVoidContractList: {(obj:object): Promise<any>},
    // 创建空合同列表
    createVoidContract: {(paramObj:object): Promise<any>},
    // 分派空合同列表
    assignVoidContract: {(paramObj:object): Promise<any>},
    // 签约时，销售的空合同
    getManagerVoidContractSelection: {(): Promise<any>},
    // 签约前、售后日志
    writeOrderLog: {(obj:object): Promise<any>},
    // 
    // writeApplyLog: {(): Promise<any>},

    // 空合同排重
    checkVoidContract:{(getCheckVoidContractForm:any):Promise<any>}
}
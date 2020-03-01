export interface api_formConfig{
    // 请求服务人员标签配置数据
    getWorkerFormConfig:{(type:string):Promise<any>},
    // 标签信息配置
    editWorkerFormConfig:{(obj:object):Promise<any>},
    // 请求订单标签配置数据
    getOrderFormConfig:{():Promise<any>},
    // 请求订单申请标签配置数据
    getApplyFormConfig:{():Promise<any>},
}
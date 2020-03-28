


// 公共订单基本信息修改字段
export interface changeFieldForm{
    id?:string; //订单申请、客户需求
    order_id?:string;//订单
    field:string;
    fieldName:string;
    value:string;
}

// 编辑客户需求订单字段
export interface editClientRequireForm extends changeFieldForm{}
// 编辑门店订单申请字段
export interface editStoreApplicationForm extends changeFieldForm{}
// 编辑门店订单字段
export interface editOrderConfigBaseForm extends changeFieldForm{}

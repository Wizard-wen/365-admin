

import {
    sign_service_typeList,
    sign_service_containsList,
    sign_service_levelList,
} from '@/pages/sale/saleSignPage/IsaleSignItem'
/**
 * 合同字段
 */
export interface contractItem extends baseContractItem, sign_service_workerItem, sign_userItem{
    id:string;
    order_id:string;//合同所属订单

    contract_number: string;//合同编号
    contract_code:string;//合同流水号
    
    // contract_typeList 合同状态字段列表
    type:string;//合同状态
    // is_wageList 工资发放状态
    is_wage:string; //是否发放工资

    sign_at:string;//合同签署时间
    stop_at:string;//合同终止时间

    sign_manager_id:string;//签约人id
    sign_manager_name:string;//签约人姓名
    sign_manager_phone:string;//签约人电话

    sign_store_id:string;//签约门店id
    sign_store_name:string;//签约门店
    
    // 结算 / 终止 合同信息
    account: contractAccountItem | contractTerminateItem;
}

//  合同基本信息 18个字段
export interface baseContractItem {
    /**
     * 服务内容（多选）
     * sign_service_containsList
     */
    service_contains:string;// 服务内容
    /**
     * 护理依赖程度（单选）
     * sign_service_levelList
     */
    service_level:string;// 护理依赖程度
    /**
     * 服务方式（单选）
     * sign_service_typeList
     */
    service_type:string;// 服务方式
    service_count:string;// 服务对象人数
    
    // 服务期限的起止，时间选择器
    service_start:string;// 服务期限起始
    service_end:string;// 服务期限截止

    // 指的是每天怎么工作，例如，早八晚五
    service_time:string;// 工作时间

    service_address:string;//服务地址

    staff_wage:string;// 服务人员劳务报酬
    staff_charge:string;//服务人员服务费费
    staff_deposit:string;// 服务人员押金

    user_charge:string;// 客户服务费
    user_pay:string;// 客户缴纳
    
    insurance_benefit:string;// 保险受益人
    insurance_start:string;// 保险起始日
    insurance_end:string;//保险终止日

    remarks:string;//合同备注

    accessory:Array<object>;// 合同图片附件
}

// 签约服务人员信息 8个字段
export interface sign_service_workerItem{
    sign_staff_name:string;// 签约家政服务员
    sign_staff_id:string;// 签约家政服务员id
    sign_staff_code:string;// 签约家政服务员code
    sign_staff_phone:string;// 签约家政服务员电话
    sign_staff_identify:string;// 签约家政服务员身份证号
    sign_staff_law_address:string;// 签约家政服务员户籍地址
    sign_staff_cur_address:string;// 签约家政服务员现住址
    sign_staff_urgent:string;// 签约家政服务员紧急联系方式
}

// 签约客户信息 4个字段
export interface sign_userItem {
    sign_user_name:string;// 雇主
    sign_user_id:string;//雇主id
    sign_user_phone:string;// 雇主联系电话
    sign_user_identify:string;// 雇主身份证号
}

// 结算 / 终止 合同基本信息
export interface contract_settle_terminate_base {

    service_start:string;//服务起始日
    service_end:string;//服务终止日
    service_days:string;//工作天数
    daily_wage:string;//日工资
    total_wage:string;//首月工资合计
    service_cost:string;//服务费扣除
    other_cost:string;//其他扣除
    cost_reason:string;//扣除事由
    real_wage:string;//服务人员实发工资
    return_wage:string;//返还客户金额

    // 这三个字段有问题
    user_account:string;//客户余额-----
    user_cost: string;//客户支出金额-----
    finally_user_account:string;//扣除后客户余额-----
}

// 结算合同提交表单
export interface settleContractForm extends contract_settle_terminate_base{
    contract_id:string;
}

// 终止合同提交表单
export interface terminateContractForm extends contract_settle_terminate_base{
    contract_id:string;//合同id
    terminate_reason:string;//终止事由
    is_wage?:string;//是否发放工资
}

/**
 * 合同结算信息
 */
export interface contractAccountItem extends contract_settle_terminate_base{
    // 后端生成
    created_at:string;//结算时间
}
/**
 * 合同终止信息
 */
export interface contractTerminateItem extends contract_settle_terminate_base{
    id:string;
    type:string;
    created_at:string;//终止时间，这个字段有问题
}

// 是否发放工资
export const is_wageList = [
    {id: 1,name: '否', color: '#F56C6C' },
    {id: 2, name: '是', color: '#67C23A'}
]

//合同状态
export const contract_typeList = [
    {id: 1, name: '待执行',color: '#E6A23C'},
    {id: 2, name: '执行中',color: '#67C23A'},
    {id: 3, name: '已终止',color: '#F56C6C'},
]



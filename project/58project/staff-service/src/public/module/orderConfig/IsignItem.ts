/**
 * 签约字段
 */

export interface signItem{

    contract_number: string;//合同编号
    sign_user_name:string;// 雇主
    sign_user_id:string;//雇主id
    sign_user_phone:string;// 雇主联系电话
    sign_user_identify:string;// 雇主身份证号

    sign_staff_name:string;// 签约家政服务员
    sign_staff_id:string;// 签约家政服务员id
    sign_staff_code:string;// 签约家政服务员code
    sign_staff_phone:string;// 签约家政服务员电话
    sign_staff_identify:string;// 签约家政服务员身份证号
    sign_staff_law_address:string;// 签约家政服务员户籍地址
    sign_staff_cur_address:string;// 签约家政服务员现住址
    sign_staff_urgent:string;// 签约家政服务员紧急联系方式
    /**
     * 服务内容（多选）
     * sign_service_containsList
     */
    service_contains:number;// 服务内容
    service_count:string;// 服务对象人数
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

    // 服务期限的起止，时间选择器
    service_start:string;// 服务期限起始
    service_end:string;// 服务期限截止

    // 指的是每个服务周期的服务时间
    service_time:string;// 工作时间

    staff_wage:string;// 劳务报酬
    user_charge:string;// 客户服务费
    user_pay:string;// 客户缴纳

    staff_deposit:string;// 劳动者押金
    staff_charge:string;//劳动者服务费

    insurance_benefit:string;// 保险受益人
    insurance_start:string;// 保险起始日
    insurance_end:string;//保险终止日

    accessory:Array<object>;// 上传附件
    remarks:string;//备注
}
// 服务方式列表
export const sign_service_typeList = [
    {id: 1,name: '全日住家型'},
    {id: 2,name: '日间照料型'},
    {id: 3,name: '计时服务型'},
    {id: 4,name: '其他'},
]
//服务内容
export const sign_service_containsList = [
    {id: 1,name: '普通家务劳动'},
    {id: 2,name: '婴幼儿照护'},
    {id: 3,name: '婴幼儿教育'},
    {id: 4,name: '产妇与新生儿护理'},
    {id: 5,name: '老人照护'},
    {id: 6,name: '病人陪护'},
    {id: 7,name: '计时服务'},
    {id: 8,name: '家庭餐制作'},
    {id: 9,name: '其他'},
]
// 护理依赖程度
export const sign_service_levelList = [
    {id: 1,name: '自理'},
    {id: 2,name: '不自理'},
]








// 新建服务人员
export interface newWorkerList {
    get_for: string;//查询原因'apply'
    page: number; //请求页码
    pageNumber: number;//单页信息数量
    name: string;
    phone: string;
}



//简历信息

export interface workerResumeItem {
    cus_name:string;//姓名
    cus_phone:string;//电话
    cus_sex:string;//性别
    cus_identify:string;//身份证号
    //140*100  高 宽
    cus_icon:string;//头像
    // 单行
    skill:Array<number>;//职业类型
    paper:Array<number>;//技能证书
    cus_working_experience:string;//工作经历，个人技能
}


export interface saleCreateWorkeItem{
    name: string,//服务人员姓名
    age: string,
    phone: string,//服务人员电话
    skill:Array<number>,
    seller_remarks: string,//备注信息
}


export interface saleErrorWorkerItem {
    warning_log: string,//日志信息
    id: string,//
}
interface satffIten{
    id:number;//


    //登记时间
    //认证状态
    //姓名
    age:number;//年龄
    //电话
    //回访信息
    sign:string;//接单状态  我们叫做是否签约
    //备注（商家情况）
    //职业类型
    //服务类型
    //可服务人群
    //工龄
    //工作经验（备注）
    nation:number;//民族
    //籍贯
    identify:number;//身份证号码
    address:string;//地址
    region:Array<object>;//区域   我们认为是可服务地区
    education:number;//学历
    //紧急联系人电话
    bank_card?:number;//银行卡号
    icon:string;//照片&&头像
    //参加培训
    paper:Array<object>;//技能证书
    //信息证书
    //信息来源
    //来源名称
    //创建人



    wechat:number;//微信
    status:number;
    staff_code:string;//员工号
}
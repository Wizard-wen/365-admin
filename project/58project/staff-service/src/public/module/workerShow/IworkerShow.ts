
/**
 * 生成图片字段
 */
export interface workerPictureComponent {
    name:string;//姓名
    sex:string;//姓别
    age:string;//年龄
    body_height:string;//身高
    body_weight:string;//体重
    zodiac_sign:string;//属相
    isMarried:string;//婚姻状态
    //140*100  高 宽
    icon:string;//头像
    // 单行
    skill:Array<number>;//职业类型
    paper:Array<number>;//技能证书
    cus_working_experience:string;//工作经历，个人技能
}




//由列表进入服务人员详情页时的状态
export const goWorkerShowItemTypeList = [
    {
        fromPage: '/worker/workerList',
        from_des: '服务人员运营',
        type: 1,
        hasOrderId:false,
    },
    {
        fromPage: '/worker/returnWorkerList',
        from_des: '回访服务人员运营',
        type: 2,
        hasOrderId:false,
    },
    {
        fromPage: '/worker/errorWorkerList',
        from_des: '异常服务人员运营',
        type: 3,
        hasOrderId:false,
    },
    {
        fromPage: '/operate/operateOrderConfig',
        from_des: '运营订单匹配服务人员',
        type: 4,
        hasOrderId:true,
    },
    {
        fromPage: '/sale/saleWorkerList',
        from_des: '门店服务人员列表',
        type: 5,
        hasOrderId:false,
    },
    {
        fromPage: '/sale/saleOrderConfig',
        from_des: '门店订单匹配服务人员',
        type: 6,
        hasOrderId:true,
    },
    {
        fromPage: '/sale/salePublicOrderConfig',
        from_des: '门店公海订单匹配服务人员',
        type: 7,
        hasOrderId:true,
    },
]
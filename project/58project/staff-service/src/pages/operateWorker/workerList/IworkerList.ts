/**
 * 服务人员搜索字段
 */
export interface searchWorkerItem{

    get_for:string;//请求数据类型

    page?:number;//页码
    pageNumber?:number; //单页数量

    name?:string;//姓名
    phone?:string;//电话
    identify?:string;//身份证号
    staff_code?:string;//员工编号
    skill?:Array<number>;//职业类型
    // course:Array<number>;//参加培训
    manager_id?:Array<number>;//创建人
    sign_status?:number;//签约状态
    // working_age:number;//工龄
    nation?:number;//民族
    education?:number;//教育程度
    paper?:Array<number>;//技能证书
}


/**
 * 请求列表状态
 */
export const get_forList = [
    {id: 0,key: 'total',},//全部服务人员,
    {id: 1,key: 'return',},//回访服务人员
    {id: 2,key: 'warning'},//异常服务人员
    {id: 3,key: 'apply'},//审核新服务人员
    {id: 4,key: 'seller'},//服务人员信息库
    {id: 5,key: 'match'},//订单配置服务人员匹配列表
]

export const queryUpdated_at = [
    {id: 1,name: '今天',},
    {id: 2,name: '昨天',},
    {id: 3,name: '过去7天',},
    {id: 4,name: '过去30天',},
    {id: 5,name: '本周',},
    {id: 6,name: '上周',},
    {id: 7,name: '本月',},
    {id: 8,name: '上月',},
    {id: 9,name: '本季度',},
    {id: 10,name: '本年',},
    {id: 11,name: '上年',},
]

export const educationList = [
    {name: '本科及以上',oldId: 1, containsId:[2]},
    {name: '专科',oldId: 4, containsId:[3,10]},
    {name: '高中',oldId: 7, containsId:[5,6]},
    {name: '初中',oldId: 8,},
    {name: '小学',oldId: 9,}
]


export const zodiac_ignList =[
    {id: 1, name: '鼠'},
    {id: 2, name: '牛'},
    {id: 3, name: '虎'},
    {id: 4, name: '兔'},
    {id: 5, name: '龙'},
    {id: 6, name: '蛇'},
    {id: 7, name: '马'},
    {id: 8, name: '羊'},
    {id: 9, name: '猴'},
    {id: 10, name: '鸡'},
    {id: 11, name: '狗'},
    {id: 12, name: '猪'},
]

export const work_age_list = [
    {id: 0, name: '全部'},
    {id: 1, name: '1年'},
    {id: 2, name: '2年'},
    {id: 3, name: '3年'},
    {id: 4, name: '4年'},
    {id: 5, name: '5年'},
    {id: 6, name: '5年以上'},
]
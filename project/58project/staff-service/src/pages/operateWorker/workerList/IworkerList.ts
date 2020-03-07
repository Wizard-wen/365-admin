import {workerItem} from '@/pages/operateWorker/workerItem/IworkerItem'

/**
 * 服务人员列表
 * des 共五种服务人员列表
 */
export enum listType {
    workerList = "total",//运营中心服务人员信息库,
    returnWorkerList ="return",//回访服务人员
    newWorkerList ="apply",//审核新服务人员
    errorWorkerList ="warning",//异常服务人员
    // saleOwnWorkerList ="",
    saleWorkerList ="seller",//门店服务人员信息库
    //match为非停用服务人员
    matchWorkerList ="match",//订单配置服务人员匹配列表
}


/**
 * 服务人员基本搜索字段
 */
export interface baseSearchWorkerItem {
    get_for:string;//请求数据类型

    page?:number;//页码
    pageNumber?:number; //单页数量

    name?:string;//姓名
    phone?:string;//电话
}

/**
 * 运营中心服务人员信息库搜索字段
 */
export interface operateSearchWorkerItem extends baseSearchWorkerItem{
    identify:string;//身份证号
    staff_code:string;//员工编号
    service_category:Array<number>;//职业类型
    course:Array<number>;//参加培训
    manager:Array<number>;//创建人
    sign_status:number;//签约状态
    working_age:number;//工龄
    nation:Array<number>;//民族
    education:Array<number>;//教育程度
    paper_category:Array<number>;//技能证书
}
/**
 * 运营中心回访服务人员搜索字段
 */
export interface operateReturnSearchWorkerItem extends baseSearchWorkerItem{}
/**
 * 运营中心异常服务人员搜索字段
 */
export interface operateErrorSearchWorkerItem extends baseSearchWorkerItem{}
/**
 * 运营中心新建服务人员搜索字段
 */
export interface operateCreateSearchWorkerItem extends baseSearchWorkerItem{}
/**
 * 门店服务人员信息库搜索字段
 */
export interface saleSearchWorkerItem extends operateSearchWorkerItem{
    /**
     * 销售门店之前存在”由我创建的服务人员“，现在取消这个列表
     * 在门店的服务人员中增加一个由我创建的选项，
     * 这个选项会自动将当前门店工作人员的id作为manager_id的查询参数
     */
    manager:Array<number>;//创建人
}
/**
 * 运营中心回访服务人员搜索字段
 */
export interface orderMatchSearchWorkerItem extends baseSearchWorkerItem{}




/**
 * 服务人员列表字段
 */
export interface workerList extends workerItem{
    paper_ids:Array<number>;
    skill_ids:Array<number>;
    course_ids:Array<number>;
}

// 时间查询区间
export const updated_at = [
    {name: '全部',id: 0},
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
// 教育程度
export const educationList = [
    {name: '全部',id: 0},
    {name: '本科及以上',id: 1,},
    {name: '专科',id: 2,},
    {name: '高中',id: 3,},
    {name: '初中',id: 4,},
    {name: '小学',id: 5,},
]
// 生肖
export const zodiac_signList =[
    {name: '全部',id: 0},
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
// 工龄查询区间
export const work_age_list = [
    {id: 0, name: '全部'},
    {id: 1, name: '1年'},
    {id: 2, name: '2年'},
    {id: 3, name: '3年'},
    {id: 4, name: '4年'},
    {id: 5, name: '5年'},
    {id: 6, name: '6年及以上'},
]

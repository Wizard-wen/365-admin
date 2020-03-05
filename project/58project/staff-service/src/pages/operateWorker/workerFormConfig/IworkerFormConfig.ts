





/**
 * 服务人员配置项
 */
export interface workerFormConfig{
    course:Array<formConfigItem>;//参加培训
    nation:Array<formConfigItem>;//民族
    paper_category:Array<formConfigItem>;//技能证书标签
    education:Array<formConfigItem>;
    updated_type:Array<formConfigItem>;
    manager:Array<formConfigItem>;
    skill:Array<formConfigItem>;
    // service_category:Array<object>;//职业类型
    // service_crowd:Array<object>;//可服务人群
    // service_region:Array<object>;//区域
    // service_type:Array<object>;//服务类型
    // source:Array<object>;//信息来源
    // working_age:Array<object>;//工龄
    // working_status:Array<object>;//接单状态
}

/**
 * 配置项
 */
interface formConfigItem {
    id:number|string;
    name:string;
    status:number|string;
    version:number|string;
    children?:Array<formConfigItem>;
}
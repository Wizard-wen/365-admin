





/**
 * 服务人员配置项
 */
export interface workerConfigForm{
    course:Array<formConfigItem>;//参加培训
    nation:Array<formConfigItem>;//民族
    paper_category:Array<formConfigItem>;//技能证书标签
    updated_type:Array<formConfigItem>;
    manager:Array<formConfigItem>;
    skill:Array<formConfigItem>;
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
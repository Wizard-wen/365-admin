interface requireItem{
    code?:number;//需求的顺序号，唯一性标识
    /**
     * 需求所属生命周期
     */
    state:number;

    original:originalRequireItem;
    review:requireItem
}


/**
 * 原始需求字段
 * des 由业务人员创建原始需求，更改确认无误后，提交需求。
 */
interface originalRequireItem{
    readonly id?:number;//原始需求id，创建时生成
    readonly initiatorName:string;//原始需求的提出者姓名
    readonly initiatorCode:number;//原始需求的提出者id，有疑惑时便于追溯
    readonly init_create_at:number;//原始需求的创建时间
    readonly init_submit_at:number;//原始需求的提交时间

    requireName:string;//需求名
    description:string;//需求描述

    priority:number;//优先级element 五星
}

/**
 * 需求评审字段
 */

interface reviewItem{

    // 产品设计人PD(product designer)
    readonly pdName:string;//需求评审的创建人姓名
    readonly pdCode:number;//需求评审的创建人id 
    readonly pd_created_at:number;//需求评审的创建时间
    readonly pd_submit_at:number;//需求评审的提交时间
    /**
     * 需求分类
     * 新增功能 1 功能改进 2 
     */
    type:number;
    /**
     * 需求等级
     * 基础模块 1 基于现有模块扩展 2
     * 若是基础模块，显示出一个表单，相当于新创建一个模块
     * 若是基于现有模块扩展，显示出一个级联选择器，相当于在现有基础上去选择
     */
    level:number;

    moduleName:string;//模块名
    moduleId?:number;//所属模块id

    moduleDes:string; //需求描述
    /**
     * 预计实现功能列表，实现程度
     */
    functionList:Array<functionItem>;//功能列表
    
    readonly cost:number;//项目成本,根据功能列表里的估价自动生成

    develop_start:number;//开发起始点
    develop_over:number;//开发结束点
    test_deadline:number;//预计提测时间
    online_deadline:number;//预计上线时间

    developers:Array<object>;//参与的开发人员


    //备注
}

/**
 * 需求预计实现功能详情
 */
interface functionItem{
    functionCode?:number;//功能id
    functionName:string;//功能名
    result:string;//要实现的效果
    cost:number;//功能报价
}
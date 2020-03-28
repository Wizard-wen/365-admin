/**
 * 服务人员字段
 */
export interface customAdItem{
    id:string;
    key?:string;//广告位编号
    name?:string;//广告位名
    client:number;//1 客户端 2 服务人员端
    display:number;//展现形式 1 轮播图  2 图片
    resource:Array<adResourceItem>
}


/**
 * 广告位图片元素
 */
export interface adResourceItem{
    ad_position_resource_id:string;//

    //广告位展示的广告图片
    resource_object: {
        id:string;//
        name:string;//
        /**
         * 1 长图 2 全屏 3 半屏
         */
        type:string;//图片类型
        url:string;//广告图片url
    }

    /**
     * 广告位跳转至什么页面
     * 1 活动页 2 详情页
     */
    jump_type:string;//跳转至什么页面
    //跳转至服务详情页
    client_category_id:string;//服务详情id

    // 跳转至活动页，活动页是图片
    activity_object: {
        id:string;
        type: string;
        url: string;
        name: string;
    }
}  
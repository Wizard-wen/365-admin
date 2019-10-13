/**
 * 
 */
export interface productItem{
    name:string;
    //父级id 若为0 代表是分类
    parent_id:string;
    //如果是分类的话，有这个图片
    banner_url:string;
    //是否展示
    status:string;
    files: Array<productPictureItem>;
}

export interface productPictureItem{

}


/**
 * 图片素材
 */
export interface resourceItem{
    id:string;//
    /**
     * 1 长图 2 全屏 3 半屏
     */
    type:string;//图片类型
    name:string;//图片名称
    url:string;//路径url
}

export interface adPositionItem{
    /**
     * 1 客户端  2 服务端
     */
    client:string;//客户端还是服务端
    /**
     * 1 轮播图 2 图片
     */
    display:string;//展现形式
    key:string;//
    name:string;//
    resource: Array<adItem>//资源数组
}


export interface adItem{
    id:string;//

    adPictureObject: {
        id:string;//
        name:string;//
        /**
         * 1 长图 2 全屏 3 半屏
         */
        type:string;//图片类型
        url:string;//广告图片url
    }

    /**
     * 1 活动页 2 详情页
     */
    jump_type:string;//跳转至什么页面
    
    client_category_id:string;//详情页id

    // activity_url:string;//活动页的长图url
    
    activity_url_object: {
        id:string;
        type: string;
        url: string;
        name: string;
    }
}  

/**
 * 视频
 */
export interface videoItem{
    id:string;
    name: string;//视频名称
    teacher:string;//主讲人
    created_at:string;//上传时间
    pictureUrl:string;//缩略图
    videoUrl:string;//视频的腾讯视频url
    resource:Array<videoPicItem>;
}

export interface videoPicItem{
    id:string;//
    name:string;//图片名称
    /**
     * 1 长图 2 全屏 3 半屏
     */
    type:string;//图片类型
    url:string;//广告图片url
}







/**
 * 证书数组
 */

interface parperItem{
    id?:number;
    paper_category_name:string;//证书分类名
    paper_category_id:number;//证书分类id
    images:Array<imageItem>;//证书图片数组
}

interface imageItem{
    name:string;//图片名--后端
    path:string;//地址--后端
    url:string;//回显的url
    status?:string;
    uid?:number;
}


/**
 * 证书类型数组
 */

interface paper_category_item{
    id:number;
    name:string;
    type:string;
    version:number;
}
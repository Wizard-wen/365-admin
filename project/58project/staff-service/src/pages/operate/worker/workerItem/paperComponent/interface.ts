


/**
 * 证书数组
 */
const paperList:Array<parperItem> = [];

interface parperItem{
    id?:number;
    paper_category_name:string;//证书分类名
    paper_category_id:number;//证书分类id
    images:Array<imageItem>;//证书图片数组
}

interface imageItem{
    name: string;//图片名
    path:string;//返回后台的url
    url:string;//前端渲染的url
}


/**
 * 证书类型数组
 */
const paper_category:Array<paper_category_item> = [];

interface paper_category_item{
    id:number;
    name:string;
    type:string;
    version:number;
}
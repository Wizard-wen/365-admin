/**
 * 
 */

export interface paperObject{
    paper_category_name:string;
    paper_category_id:number;
    images:Array<imageObject>;
}


interface imageObject{
    name:string;//图片名--后端
    path:string;//地址--后端
    url:string;//回显的url
    status?:string;
    uid?:number;
}
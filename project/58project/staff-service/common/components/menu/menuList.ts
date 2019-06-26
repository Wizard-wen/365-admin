/**
 * 1.定义
 *  中间节点（不可跳转节点），是指不带路由跳转的节点，点击中间节点只能展开下一级节点，不会产生路由跳转
 *  叶节点（终端页面、可跳转接点），是指带路由跳转的节点，点击叶节点可以发生路由跳转，叶节点可能含有子页面。
 *  子页面，子页面属于某个叶节点，是由终端页面链接的页面，但是不在导航栏里展示，在子页面里刷新页面，导航高亮会定位到叶节点。
 */

/**
 * 中间节点（不可跳转节点）数据结构
 */
interface midsideNodeItem {
    children:Array<object>;
    id:number;
    is_display:number;
    level:Array<string>;
    parent_id:number;
    router:string;
    title:string;
}

/**
 * 叶节点（终端页面、可跳转节点）数据结构
 */
interface leafNodeItem {
    contains: Array<object>;//contains 是终端页面的子页面，是不展示的，但是在子页面刷新时，自动跳回终端页面
    id:number;
    is_display:number;
    level: Array<object>;
    parent_id:number;
    router:string;
    title:string; //
}

/**
 * 子页面数据结构
 */
interface childPageItem{
    id:number;
    is_display:number;
    level: Array<object>;
    parent_id:number;
    router:string;
    title:string; //
}
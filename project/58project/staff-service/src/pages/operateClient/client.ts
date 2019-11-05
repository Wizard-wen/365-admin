
//客户信息接口
export interface clientObj{
    id:string;

    /**
     * 签约客户的三个必填信息
     */
    real_name:string;//真实姓名---筛选
    phone:string;//手机号码---筛选
    identify:string;//证件号码---筛选

    /**
     * 
     */
    nick_name:string;//昵称---筛选
    icon:string;//头像---筛选
    sex:string;//性别---筛选
    birthday:string;//生日---筛选

    service_address:Array<object>;//服务地址，可能有多个，类似于淘宝的收货地址

    orderList: [];
}
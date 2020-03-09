/**
 * 备选服务人员
 */
export interface matchServiceItem {
    id:string;//
    order_id:string;//订单id
    staff_id:string;//员工id
    staff_code:string; //工号
    staff_name:string;//姓名
    staff_icon:string;//头像
    staff_phone:string;//电话
    type:number;// 签约状态
    created_manager_id:string;// 添加人id
    create_manager_name:string;// 添加人
}

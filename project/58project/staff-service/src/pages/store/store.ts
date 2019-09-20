/**
 * 门店信息
 */

export interface storeObject {
    id: number; //门店id
	
	created_at:string;//创建时间
	created_manager_id:string;//创建人
	create_manager_name:string;//创建人姓名
    store_name: string; //门店名
    store_address: string; //门店地址
    is_third: number; //门店类型
    store_manager_id:string;//门店店长id
    store_manager_name:string;//门店店长名
    agent_count:string;//员工数量
    remarks: string; //备注
    type: string; //门店状态
	store_staff_list:Array<staffObject>;//门店员工
	licenseFile: Array<licenseFileObject>;//门店营业执照
}
/**
 * 门店执照对象
 */
interface licenseFileObject{

}
/**
 * 门店员工信息对象-----关联员工信息表(讨论)
 */
interface staffObject{
	name: string;//
	position:string;//职位
	phone:string;//
}
//门店是直营店还是加盟店
export const is_thirdList = [
    {name: '直营店', id: 1},
    {name: '加盟店', id: 2},
]

//门店经营状态
export const runTypeList = [
    { id: 1, name: "营业" }, 
    { id: 2, name: "停业" }
]
//门店员工职位
export const positionTypeList = [
    {id: 1, name: '店员'}, 
    {id: 2, name: '店长'}
]

// 搜索门店
export interface searchStoreForm {
    is_third: number; //门店类型
    type: number; //经营状态
    name: string;//门店名
    store_manager_name: string;//店长名
    store_code: string;//门店编号
}

// 创建门店表单
export interface editStoreForm {
    
    name: string;//门店名
    address: string;//门店地址
    is_third: number;//门店类型 直营 加盟
    remarks: string;//备注信息


    id?: number; //门店id
	created_at?:string;//创建时间
	created_manager_id?:string;//创建人
    create_manager_name?:string;//创建人姓名
    store_code?:string;//门店号
    store_manager_id?:string;//门店店长id
    store_manager_name?:string;//门店店长名
    agent_count?:string;//员工数量
    status?: string; //门店状态
}

// 门店添加新员工
export interface addStoreWorkerForm {
    store_id: number;//门店id
    store_name: string;//门店名
    store_manager_id: number;//员工id
}
//解绑门店员工表单
export interface unbindStoreWorkerForm {
    store_manager_id: number;
}
// 获取门店统计数据
export interface getTotalSaleStatisticForm{
    get_for: string;//total
    id?:number;
}
/**
 * 门店信息
 */
export interface storeObject {
    store:editStoreForm;
	store_staff_list:Array<staffObject>;//门店员工
	licenseFile?: Array<licenseFileObject>;//门店营业执照
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



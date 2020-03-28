
import {
    getSaleWorkstationForm,
} from '@/pages/saleWorkStation/saleWorkStation'


import {
    searchStoreForm,
    editStoreForm,
} from '@/pages/store/Istore'

export interface api_store {
    // 获取门店列表
    getStoreList:{(searchStoreForm:searchStoreForm):Promise<any>},
    // 请求某一门店数据
    getStore:{(id:string):Promise<any>},
    // 编辑门店信息
    editStore:{(editStoreForm:editStoreForm):Promise<any>},
    // 添加新店员
    addStoreManager:{(paramObj:object):Promise<any>},
    // 解绑门店员工
    unbind:{(paramObj:object):Promise<any>},
    // 门店工作台
    saleWorkBench:{(queryUrl:string):Promise<any>},

    // 获取半年数据
    getHalfYearData:{():Promise<any>},
}
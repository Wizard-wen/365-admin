import {
    apiRequestStore,
    apiRequestCommon,
} from '@/request/index'


import {
    searchStoreForm,
    editStoreForm,
    addStoreWorkerForm,
    unbindStoreWorkerForm,
    getTotalSaleStatisticForm,
} from '@/pages/store/Istore'
import {$utils} from '@/utils/index'
export const storeService = {
    /**
     * 请求列表数据
     */
    getStoreList(queryObject:searchStoreForm):Promise<any>{
        return apiRequestStore.getStoreList(queryObject).then(data => {
            return {
                pagination: {
                    currentPage: data.data.current_page, //当前页码
                    total: data.data.total, //列表总条数
                    pageNumber: data.data.per_page //每页显示数
                },
                storeTable: data.data.data
            }
        })
    },
    /**
     * 获取某门店信息信息
     */
    getStore(id: string){
        return apiRequestStore.getStore(id)
    },
	/**
     * 编辑门店信息
     * @param editStoreForm
     */
    editStore(editStoreForm:editStoreForm){
      	return apiRequestStore.editStore(editStoreForm)
	},
    /**
     * 添加新店员
     */
    addStoreManager(addStoreWorkerForm:addStoreWorkerForm){
        return apiRequestStore.addStoreManager(addStoreWorkerForm)
    },
    /**
     * 解绑门店员工
     */
    unbind(unbindStoreWorkerForm:unbindStoreWorkerForm){
        return apiRequestStore.unbind(unbindStoreWorkerForm)
    },
    /**
     * 获取当前门店员工
     */
    
    getStoreManagerSelection(store_id:number){
        return apiRequestCommon.getStoreManagerSelection(store_id)
    },
    /**
     * 获取当前未绑定门店员工
     */
    getNotInStoreManagerSelection(store_id:number){
        return apiRequestCommon.getNotInStoreManagerSelection(store_id)
    },
    /**
     * 获取近半年门店数据
     */
    getHalfYearData(){
        return apiRequestStore.getHalfYearData()
    },
    /**
     * 获取门店统计数据
     */
    getSaleWorkBench(getTotalSaleStatisticForm:getTotalSaleStatisticForm){
        let queryUrl = $utils.changeObjectToPathString(getTotalSaleStatisticForm)
        return apiRequestStore.saleWorkBench(queryUrl)
    }

}
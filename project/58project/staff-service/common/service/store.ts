import {
    apiRequestStore
} from '../request/store/index'


import {
    searchStoreItem,
} from '../../src/pages/store/storeList/IStoreList'

export const storeService = {
    /**
     * 请求列表数据
     */
    getTableList(queryObject:searchStoreItem):Promise<any>{
        return apiRequestStore.getStoreList(queryObject).then(data => {
            return {
                pagination: {
                    currentPage: data.data.current_page, //当前页码
                    total: data.data.total, //列表总条数
                    pageNumber: data.data.per_page //每页显示数
                },
                workerTable: data.data.data
            }
        })
    },
}
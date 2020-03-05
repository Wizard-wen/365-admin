import {
    apiRequestWorker,
    apiRequestCommon,
    apiRequestFormConfig,
    apiRequestService,
} from '../request/index'

import {
    workerItem,
} from '../pages/operateWorker/workerItem/IworkerItem'

import {
    workerFormConfig,
} from '../pages/operateWorker/workerFormConfig/IworkerFormConfig'

import {
    searchWorkerItem,
} from '../pages/operateWorker/workerList/IworkerList'

export const operateWorkerService = {
    /**
     * 请求列表数据
     */
    getTableList(type:string, queryObject:searchWorkerItem):Promise<any>{

        return  Promise.all([
            apiRequestFormConfig.getWorkerFormConfig(type), //获取表单配置字段
            apiRequestWorker.getStaffList(queryObject), //获取列表数据
            apiRequestService.getServiceTree() //服务商品树形
        ]).then(data =>{

            return {
                workerConfigForm: {
                    ...data[0].data,
                },
                pagination: {
                    currentPage: data[1].data.current_page, //当前页码
                    total: data[1].data.total, //列表总条数
                    pageNumber: data[1].data.per_page //每页显示数
                },
                workerTable: data[1].data.data
            }
        })
    },

    /**
     * 拼接service_crowd（服务人群）字段
     * @param selectedArr 原始数据
     * 
     */
    // setCommitAttr(selectedArr:Array<object>, configList:any, keyName:string){
    //     class sendItem {
    //         name
    //     }
    //     return selectedArr.reduce((arr:any, item:any)=>{
    //         var serviceItem:any = null
    //         selectedArr.forEach((it:any) =>{

    //             if(it == item.id){
    //                 serviceItem = {}
    //                 serviceItem[keyName] = item.id;
    //                 serviceItem['name'] = item.name;
    //             }
    //         })
    //         return serviceItem == null ? arr : arr.concat(serviceItem)
    //     },[])
    // },
    /**
     * 
     * @param type 查询类型  edit 使用 config 编辑
     */
    async getWorkerFormConfig(type:string):Promise<any>{
        return apiRequestFormConfig.getWorkerFormConfig(type)
    },
    async getWorker(id:string, workerFormConfig:workerFormConfig):Promise<any>{
        let skillConfig = workerFormConfig.skill
        return apiRequestWorker.getStaff(id).then(data =>{
            if(data.code == "0"){

                var workerForm = data.data
                workerForm.skill = workerForm.skill.map((item:number) =>{
                    return setTreeArray(item,skillConfig)
                })

                return workerForm
            }
        })
    }


}
/**
 * 将叶节点数组，转换成级联选择器的数据格式
 * @param key 当前key
 * @param tree  级联选择器渲染的树形数组
 */
function setTreeArray(key:number,tree:Array<any>){
    var tmpParentIdList:any = [];
    function getTreeInitModel(key:number,tree:Array<any>){
        for (var i = 0; i < tree.length; i++) {
            if (tree[i].id == key) {
                tmpParentIdList.push(tree[i].id);
                return true;
            }else{
                if (tree[i].children && tree[i].children.length > 0) {
                    if (getTreeInitModel(key,tree[i].children)) {
                        tmpParentIdList.push(tree[i].id);
                        return true;
                    }
                } 
            }
        }
        return false;
    }
    getTreeInitModel(key,tree);
    return tmpParentIdList.reverse()
}






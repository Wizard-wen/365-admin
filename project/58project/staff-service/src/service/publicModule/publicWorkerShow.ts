import {
    apiRequestWorker,
    apiRequestFormConfig,
} from '@/request/index'
import {workerConfigForm} from '@/pages/operateWorker/workerConfigForm/IworkerConfigForm'
export const publicWorkerShowService = {

    /**
     * 获取服务人员信息
     * @param id 
     * @param workerConfigForm 
     */
    async getPublicWorkerShow(id:string, workerConfigForm:workerConfigForm):Promise<any>{
        let skillConfig = workerConfigForm.skill
        return apiRequestWorker.getStaff(id).then(data =>{
            if(data.code == "0"){

                var workerForm = data.data
                workerForm.skill = workerForm.skill.map((item:number) =>{
                    return setTreeArray(item,skillConfig)
                })

                return workerForm
            }
        })
    },

    getPublicWorkerConfigForm(type:string){
        return apiRequestFormConfig.getWorkerFormConfig(type)
    },
    /**
     * 包装级联选择器的数据
     * @param arr 级联选择器原始数据
     */
    sendCascanderData(originArr:any){
        if(originArr.length == 0){
            return []
        }
        if(Array.isArray(originArr[0])){
            return originArr.reduce((arr:any,item:any) => {
                if(item.length == 1){
                    return [...arr,item[0]]
                } else {
                    let length = item.length -1
                    return [...arr,item[length]]
                }   
            },[])
        } else {
            return [originArr[originArr.length-1]]
        }
    },

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
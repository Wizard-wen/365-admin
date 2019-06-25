/**
 * 有关分类的方法
 */
import store from '../store'
import classifyService from './request/classifyService'
export default{
    /**
     * 获取分类列表
     */
    async getClassifyList(){
        return classifyService.getClassifyList();
    }
}
